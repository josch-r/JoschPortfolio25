"use client";

import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Perf } from "r3f-perf";
import dynamic from "next/dynamic";
import { JoschHead } from "./JoschHead";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

const NoisePoints = dynamic(() => import("./NoisePoints"), { ssr: false });

const noise3D = createNoise3D();

const Agent = ({ radius }: { radius: number }) => {
  const ref = useRef<THREE.Mesh>(new THREE.Mesh());
  const lightRef = useRef<THREE.PointLight>(null);

  const angleOffset = Math.random() * Math.PI * 3;
  const distanceOffset = Math.random() * 4 - 3;
  const speed = Math.random() * 0.75 + 0.2;
  const noiseOffset = Math.random() * 100;

  const frameCount = useRef(0);

  useFrame(() => {
    frameCount.current += 0.01;

    const angle = angleOffset + frameCount.current * speed;
    const x = (radius + distanceOffset) * Math.cos(angle);
    const z = (radius + distanceOffset) * Math.sin(angle);

    const y = noise3D(frameCount.current + noiseOffset, 0, 0) * 0.5;

    const position = new THREE.Vector3(x, y, z);
    if (ref.current) ref.current.position.copy(position);
    if (lightRef.current) lightRef.current.position.copy(position);
  });

  return (
    <pointLight
      ref={lightRef}
      color="white"
      intensity={1}
      distance={9}
      decay={2}
    />
  );
};

export function HeroScene() {
  const radius = 5;

  return (
    <div className="absolute w-full h-[100vh]">
      <Canvas camera={{ position: [0, -1, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment preset="night" background={false} environmentIntensity={.8}/>

          <NoisePoints />
          {Array.from({ length: 30 }).map((_, i) => (
            <Agent key={i} radius={radius} />
          ))}
          <JoschHead />
          <OrbitControls enableZoom={false} />
          <Perf position="bottom-left" />
        </Suspense>
      </Canvas>
    </div>
  );
}
