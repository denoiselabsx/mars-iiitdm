"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  Preload,
} from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/rover.glb");

function Rover({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { scene } = useGLTF("/models/rover.glb");
  const group = useRef<THREE.Group>(null);

  // Normalise model: center + scale-to-fit so it doesn't depend on the GLB's authored scale
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

    // Lift it slightly so it sits on the ground plane
    cloned.position.y = -0.6;

    // Materials tweak — slightly less reflective so it reads on dark bg
    cloned.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          if ((m as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            const std = m as THREE.MeshStandardMaterial;
            std.envMapIntensity = 0.6;
          }
        });
      }
    });

    return cloned;
  }, [scene]);

  useFrame((_, delta) => {
    if (!group.current) return;
    const p = progressRef.current ?? 0;

    // Continuous idle rotation (slow) — augmented by scroll
    // Idle: 0.08 rad/sec. Scroll adds up to ~1.5 rad of extra Y.
    group.current.rotation.y += delta * (0.08 + p * 0.5);

    // Subtle pitch as user scrolls — emphasises the chassis underneath
    const targetX = -0.12 * p;
    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(1, delta * 3);
  });

  return (
    <group ref={group}>
      <primitive object={normalised} />
    </group>
  );
}

function CameraRig({ progressRef }: { progressRef: React.RefObject<number> }) {
  const { camera, size } = useThree();
  const isPortrait = size.height > size.width;

  useFrame((_, delta) => {
    const p = progressRef.current ?? 0;

    // Slightly oblique, low-angle hero framing — pulls in subtly on scroll
    const baseDist = isPortrait ? 6.2 : 4.4;
    const targetZ = baseDist - p * 0.7;
    const targetY = 0.5 + p * 0.4;
    const targetX = 0.3 - p * 0.3;

    camera.position.x += (targetX - camera.position.x) * Math.min(1, delta * 2.5);
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 2.5);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 2.5);
    camera.lookAt(0, 0.2, 0);
  });

  return null;
}

function Loader() {
  return null; // Suspense fallback; we keep it invisible — section bg is already on-brand
}

type Props = {
  progressRef: React.RefObject<number>;
  className?: string;
};

export function RoverScene({ progressRef, className }: Props) {
  return (
    <div className={className}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0.6, 5.5], fov: 35, near: 0.1, far: 50 }}
        shadows
      >
        <PerspectiveCamera makeDefault fov={35} position={[0, 0.6, 5.5]} />

        <ambientLight intensity={0.18} />
        <directionalLight
          position={[4, 6, 4]}
          intensity={1.8}
          color="#fff1e0"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-5, 3, -2]} intensity={0.4} color="#5cf2ff" />
        <pointLight position={[0, -2, 3]} intensity={0.6} color="#c1440e" distance={8} />

        <Suspense fallback={<Loader />}>
          <Rover progressRef={progressRef} />
          <Environment preset="sunset" environmentIntensity={0.4} />
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.45}
            blur={2.6}
            far={4}
            color="#08080c"
          />
          <Preload all />
        </Suspense>

        <CameraRig progressRef={progressRef} />
      </Canvas>
    </div>
  );
}
