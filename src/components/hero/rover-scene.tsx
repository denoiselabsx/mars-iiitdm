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

useGLTF.preload("/models/rover.glb");

type Refs = {
  progressRef: React.RefObject<number>;
  velocityRef: React.RefObject<number>;
  dragOffsetRef: React.RefObject<number>;
};

function Rover({ progressRef, velocityRef, dragOffsetRef }: Refs) {
  const { scene } = useGLTF("/models/rover.glb");
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0); // accumulated inertial spin

  const normalised = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    cloned.position.sub(center);

    const targetHeight = 2.4;
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = targetHeight / maxDim;
    cloned.scale.setScalar(scale);
    cloned.position.y = -0.6;

    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if ((m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            const std = m as THREE.MeshStandardMaterial;
            std.envMapIntensity = 0.7;
          }
        });
      }
    });

    return cloned;
  }, [scene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const isPortrait = state.size.height > state.size.width;
    const p = progressRef.current ?? 0;
    const v = velocityRef.current ?? 0;
    const drag = dragOffsetRef.current ?? 0;

    let targetY: number;
    let targetX: number;

    if (isPortrait) {
      // ── MOBILE ─────────────────────────────────────────
      // Drag is the primary input. Scroll adds slow ambient rotation only.
      const ambient = p * Math.PI * 0.4; // ~1/5 turn over entire scroll
      targetY = ambient + drag;
      targetX = 0; // no pitch on mobile — keep rover stable for predictable drag
      // No inertial velocity overlay on mobile (it conflicts with drag)
      spin.current *= 0.5;
    } else {
      // ── DESKTOP ────────────────────────────────────────
      const baseY = p * Math.PI * 2.8; // ~1.4 turns over hero scroll
      spin.current += v * 0.0012;
      spin.current *= Math.pow(0.04, delta);
      targetY = baseY + spin.current;
      targetX = -0.15 * Math.sin(p * Math.PI);
    }

    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(1, delta * 6);
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3);
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

        <ambientLight intensity={0.32} color="#dcdce0" />
        <directionalLight
          position={[5, 7, 5]}
          intensity={1.6}
          color="#ffffff"
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 4, -2]} intensity={0.45} color="#a8d8ff" />
        <hemisphereLight args={["#c0e0ff", "#1a1a22", 0.25]} />

        <Suspense fallback={null}>
          <Rover
            progressRef={progressRef}
            velocityRef={velocityRef}
            dragOffsetRef={dragOffsetRef}
          />
          <Environment preset="studio" environmentIntensity={0.35} />
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
