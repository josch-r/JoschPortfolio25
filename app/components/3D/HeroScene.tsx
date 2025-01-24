"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute w-full h-full">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight
            position={[5, 5, 5]}
            angle={0.35}
            penumbra={1}
            intensity={10}
          />
          <pointLight position={[-10, -10, -10]} />
          <Box />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
