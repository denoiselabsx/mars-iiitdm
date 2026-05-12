"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

// DRACO decoder hosted by Google (cached across the web; ~30KB gzipped).
// The rover GLB now also uses EXT_meshopt_compression — drei loads its
// decoder when the 4th arg (useMeshopt) is true.
const DRACO_DECODER = "https://www.gstatic.com/draco/v1/decoders/";

useGLTF.preload("/models/rover.glb", DRACO_DECODER, true);

// ─── Material remapper ────────────────────────────────────────────────
// The exported rover has no textures — only material *names* like
// "Paint - Enamel Glossy (Black)" or "Opaque(196,53,39)". Three.js loads
// these with default-white PBR factors so the whole rover renders black
// against our dark hero. This function walks the scene, reads each
// material's name, and remaps it to realistic PBR values:
//   - "Opaque(R,G,B)" → use the exact RGB as baseColor
//   - Named presets ("Steel - Satin", "Aluminum - Polished", "Paint -
//     Metallic (X)", "Powder Coat (Black)", "Chrome", "ABS", "Polymide",
//     "EPX *") → mapped to a curated palette that reads on dark.
// The result: steel parts catch highlights, painted body is a unified
// dark mass, decal/indicator colours stay vivid. The rover looks like a
// proper engineering render.
type MatSpec = {
  color: string;
  metalness: number;
  roughness: number;
  emissive?: string;
  emissiveIntensity?: number;
};

function remapMaterial(name: string): MatSpec {
  // 1) Opaque(R,G,B) — exact RGB triplet authored by the CAD source.
  //    Common for indicators, decals, panels, wires.
  const rgb = name.match(/Opaque\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\)/i);
  if (rgb) {
    const [r, g, b] = [
      Number(rgb[1]) / 255,
      Number(rgb[2]) / 255,
      Number(rgb[3]) / 255,
    ];
    // Detect highly saturated reds/oranges → they're brand-aligned decals;
    // give them a touch of emissive so they pop against the dark scene.
    const isVibrant = (r > 0.5 && g < 0.4 && b < 0.4) || (r > 0.9 && g > 0.4 && b < 0.3);
    return {
      color: `rgb(${rgb[1]}, ${rgb[2]}, ${rgb[3]})`,
      metalness: 0.1,
      roughness: 0.55,
      emissive: isVibrant ? `rgb(${rgb[1]}, ${rgb[2]}, ${rgb[3]})` : undefined,
      emissiveIntensity: isVibrant ? 0.12 : 0,
    };
  }

  const n = name.toLowerCase();

  // 2) Steel — catches light, becomes the "machinery silhouette".
  if (n.includes("steel")) {
    return { color: "#9a9da3", metalness: 0.88, roughness: 0.32 };
  }
  // 3) Aluminum — slightly cooler / brighter than steel.
  if (n.includes("aluminum") && n.includes("polished")) {
    return { color: "#c8ccd2", metalness: 0.95, roughness: 0.18 };
  }
  if (n.includes("aluminum")) {
    return { color: "#aab0b8", metalness: 0.8, roughness: 0.42 };
  }
  // 4) Chrome — high reflectivity.
  if (n.includes("chrome")) {
    return { color: "#1a1a1d", metalness: 1.0, roughness: 0.22 };
  }
  // 5) Paint — matte body panels. Different tints for variety.
  if (n.includes("paint") && n.includes("silver")) {
    return { color: "#9da0a4", metalness: 0.5, roughness: 0.45 };
  }
  if (n.includes("paint") && n.includes("yellow")) {
    return { color: "#d4a838", metalness: 0.3, roughness: 0.5, emissive: "#d4a838", emissiveIntensity: 0.08 };
  }
  if (n.includes("paint") && n.includes("dark grey")) {
    return { color: "#26262a", metalness: 0.15, roughness: 0.62 };
  }
  if (n.includes("paint") && n.includes("metallic")) {
    return { color: "#1f1f23", metalness: 0.4, roughness: 0.4 };
  }
  if (n.includes("paint") && n.includes("enamel")) {
    return { color: "#202024", metalness: 0.1, roughness: 0.55 };
  }
  // 6) Powder coat — matte structural.
  if (n.includes("powder")) {
    return { color: "#1a1a1d", metalness: 0.08, roughness: 0.82 };
  }
  // 7) ABS — printed plastic, typically light/white.
  if (n.includes("abs")) {
    return { color: "#e8e8ea", metalness: 0.0, roughness: 0.72 };
  }
  // 8) Polymide / Kapton — amber-orange film.
  if (n.includes("polymide") || n.includes("kapton")) {
    return { color: "#b87a32", metalness: 0.1, roughness: 0.5, emissive: "#b87a32", emissiveIntensity: 0.06 };
  }
  // 9) EPX (resin) — engineering plastic, slate.
  if (n.includes("epx")) {
    return { color: "#5a5a60", metalness: 0.1, roughness: 0.55 };
  }
  // 10) Fallback — neutral dark grey so unknown materials never go pure black.
  return { color: "#3a3a3e", metalness: 0.2, roughness: 0.6 };
}

const _tmpColor = new THREE.Color();
function applyRoverMaterials(root: THREE.Object3D) {
  root.traverse((obj) => {
    if (!(obj as THREE.Mesh).isMesh) return;
    const mesh = obj as THREE.Mesh;
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach((m) => {
      const std = m as THREE.MeshStandardMaterial;
      if (!std.isMeshStandardMaterial) return;
      const spec = remapMaterial(std.name ?? "");
      std.color = _tmpColor.set(spec.color).clone();
      std.metalness = spec.metalness;
      std.roughness = spec.roughness;
      if (spec.emissive) {
        std.emissive = _tmpColor.set(spec.emissive).clone();
        std.emissiveIntensity = spec.emissiveIntensity ?? 0.1;
      } else {
        std.emissive = _tmpColor.set("#000000").clone();
        std.emissiveIntensity = 0;
      }
      std.envMapIntensity = 1.0;
      std.needsUpdate = true;
    });
  });
}

type Refs = {
  progressRef: React.RefObject<number>;
  velocityRef: React.RefObject<number>;
  dragOffsetRef: React.RefObject<number>;
};

function Rover({ progressRef, velocityRef, dragOffsetRef }: Refs) {
  const { scene } = useGLTF("/models/rover.glb", DRACO_DECODER, true);
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0); // accumulated inertial spin

  const normalised = useMemo(() => {
    const cloned = scene.clone(true);

    // The FBX→glTF export is Z-up. Three.js is Y-up. Rotate the inner mesh
    // -90° about X so the rover sits flat. We wrap everything in an outer
    // group so the recentre + scale logic operates on a single object.
    cloned.rotation.x = -Math.PI / 2;

    const oriented = new THREE.Group();
    oriented.add(cloned);
    oriented.updateMatrixWorld(true);

    // Compute bbox AFTER rotation. setFromObject walks descendants and
    // uses their world matrices, so this returns the rotated bbox.
    const box = new THREE.Box3().setFromObject(oriented);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    // Scale to a target world-space size. Use max axis so the rover always
    // fits the hero viewport regardless of which axis dominates.
    const targetSize = 2.4;
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetSize / maxDim;
    oriented.scale.setScalar(scale);

    // After scaling, the bbox centroid is at `center * scale` in the outer
    // group's parent frame. Shift the outer group so the centroid sits
    // below the camera's lookAt point — this keeps the rover's tall
    // manipulator arm from poking into the navbar area at the top of the
    // viewport when the model rotates.
    oriented.position.set(
      -center.x * scale,
      -center.y * scale - 0.15,
      -center.z * scale,
    );

    // Walk meshes once: enable shadows, then apply the name→PBR remapper so
    // the rover renders with realistic materials despite having no textures.
    oriented.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    applyRoverMaterials(oriented);

    return oriented;
  }, [scene]);

  // Continuous idle yaw accumulator — used on mobile only (desktop is
  // scroll-driven, so adding constant idle there would compete with input).
  const idleY = useRef(0);

  useFrame((state, delta) => {
    if (!group.current) return;
    const isPortrait = state.size.height > state.size.width;
    const p = progressRef.current ?? 0;
    const v = velocityRef.current ?? 0;
    const drag = dragOffsetRef.current ?? 0;
    const t = state.clock.elapsedTime;

    // Gentle vertical bob — sine wave, tiny amplitude. Adds presence so
    // the rover never feels static, on both desktop and mobile.
    const bob = Math.sin(t * 0.9) * 0.025;

    let targetY: number;
    let targetX: number;

    if (isPortrait) {
      // ── MOBILE ─────────────────────────────────────────
      // Three layers stack:
      //   1. Continuous idle — slow ambient turn (~1 rev / 28s) so the
      //      rover is never frozen.
      //   2. Scroll-driven — same eased cubic as desktop but smaller total
      //      (1.2π ≈ 0.6 turns) since mobile scroll travel is shorter and
      //      we don't want the rover to feel frantic on a phone.
      //   3. Drag offset — finger input pushes the rover ahead with inertia
      //      that decays after release (same `spin` accumulator as desktop).
      idleY.current += 0.22 * delta;
      const easedM =
        p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const scrollYm = easedM * Math.PI * 1.2;
      // Flick-inertia from drag velocity (uses the velocityRef which the
      // scroll-hero already plumbs from touch deltas on mobile).
      spin.current += v * 0.0010;
      spin.current *= Math.pow(0.08, delta);
      targetY = idleY.current + scrollYm + drag + spin.current;
      // Subtle pitch tied to scroll as you read.
      targetX = -0.08 * Math.sin(p * Math.PI);
    } else {
      // ── DESKTOP ────────────────────────────────────────
      // Scroll-driven rotation with three polish layers:
      //   1. Eased mapping — easeInOutCubic on `p` so rotation accelerates
      //      into the middle of the scroll and decelerates near the ends,
      //      instead of a flat 1:1 linear feed. Feels weighted, not robotic.
      //   2. Larger total rotation (3.2π ≈ 1.6 turns) for more drama.
      //   3. Stronger inertia coefficient (0.0016 vs 0.0012) so flick-
      //      scrolls produce a satisfying carry-through spin that decays.
      const eased =
        p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      const scrollY = eased * Math.PI * 3.2;

      spin.current += v * 0.0016;
      spin.current *= Math.pow(0.06, delta); // slightly slower decay → richer carry

      targetY = scrollY + spin.current;
      // Pitch breathes: down a touch as you scroll in, level at extremes.
      targetX = -0.18 * Math.sin(p * Math.PI);
    }

    // Critically-damped lerp toward targets. Y eases tighter than X for
    // crisp yaw response while pitch breathes more gently.
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 7);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3);
    group.current.position.y = bob;
  });

  return (
    <group ref={group}>
      <primitive object={normalised} />
    </group>
  );
}

function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  useFrame((state, delta) => {
    const { camera, size } = state;
    const isPortrait = size.height > size.width;
    const p = progressRef.current ?? 0;

    // Mobile camera pulls in tight — rover dominates the viewport
    const baseDist = isPortrait ? 4.6 : 4.6;
    const targetZ = baseDist - p * 0.3;
    const targetY = isPortrait ? 0.45 : 0.45 + p * 0.25;
    const targetX = isPortrait ? 0 : 0.25 - p * 0.2;

    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 2.5);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2.5);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.5);
    camera.lookAt(0, 0.15, 0);
  });

  return null;
}

type Props = Refs & {
  className?: string;
};

export function RoverScene({ progressRef, velocityRef, dragOffsetRef, className }: Props) {
  // Detect mobile/touch at mount; choose perf-tuned canvas params accordingly.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse), (max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <div className={className}>
      <Canvas
        // Tight DPR on mobile (halves pixel work on phones with 3x screens)
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0.45, 4.8], fov: 35, near: 0.1, far: 50 }}
        // Per-light shadow maps off on mobile; ContactShadows still provides ground shadow.
        shadows={!isMobile}
      >
        <PerspectiveCamera makeDefault fov={35} position={[0, 0.45, 4.8]} />

        {/* Lighting tuned for the remapped-material rover. Key light from
            front-top-right gives steel parts their highlights; a cool fill
            from back-left separates the silhouette from the dark scene; a
            warm rim from below-right adds a Mars-tinted edge glow. */}
        <ambientLight intensity={0.45} color="#dcdce0" />
        <directionalLight
          position={[5, 7, 5]}
          intensity={2.2}
          color="#ffffff"
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 4, -2]} intensity={0.7} color="#a8d8ff" />
        <directionalLight position={[2, -2, 4]} intensity={0.45} color="#d65a3a" />
        <hemisphereLight args={["#c0e0ff", "#1a1a22", 0.35]} />

        <Suspense fallback={null}>
          <Rover
            progressRef={progressRef}
            velocityRef={velocityRef}
            dragOffsetRef={dragOffsetRef}
          />
          <Environment preset="studio" environmentIntensity={0.6} />
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.55}
            blur={isMobile ? 2.2 : 2.8}
            far={4}
            color="#000000"
            resolution={isMobile ? 256 : 512}
          />
          <Preload all />
        </Suspense>

        <CameraRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
