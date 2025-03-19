"use client";

import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
// import { Perf } from "r3f-perf";
import dynamic from "next/dynamic";
import { JoschHead } from "./JoschHead";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

const NoisePoints = dynamic(() => import("./NoisePoints"), { ssr: false });

const noise3D = createNoise3D();

const Agent = React.memo(({ radius }: { radius: number }) => {
  const ref = useRef(new THREE.Mesh());
  const lightRef = useRef<THREE.PointLight>(null);
  const positionRef = useRef(new THREE.Vector3());
  const frameCount = useRef(0);

  // Pre-calculate random values
  const angleOffset = useRef(Math.random() * Math.PI * 3).current;
  const distanceOffset = useRef(Math.random() * 4 - 3).current;
  const speed = useRef(Math.random() * 0.75 + 0.2).current;
  const noiseOffset = useRef(Math.random() * 100).current;

  useFrame(() => {
    frameCount.current += 0.01;

    const angle = angleOffset + frameCount.current * speed;
    const x = (radius + distanceOffset) * Math.cos(angle);
    const z = (radius + distanceOffset) * Math.sin(angle);
    const y = noise3D(frameCount.current + noiseOffset, 0, 0) * 0.5;

    // Reuse the Vector3 object
    positionRef.current.set(x, y, z);

    if (ref.current) ref.current.position.copy(positionRef.current);

    // Only update light position every few frames
    if (lightRef.current && frameCount.current % 0.03 < 0.01) {
      lightRef.current.position.copy(positionRef.current);
    }
  });

  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0} />
      </mesh>
      <pointLight
        ref={lightRef}
        intensity={0.95}
        distance={9}
        decay={2}
        color="#ffffff"
      />
    </>
  );
});


Agent.displayName = "Agent";

export function HeroScene() {
  const radius = 5;
  const [stepSize, setStepSize] = useState(0.03);
  const [noiseScale, setNoiseScale] = useState(0.1);
  const [modelUrl, setModelUrl] = useState("/models/josch50k4.glb");

  const [particleCount, setParticleCount] = useState(20000);

  const handleStepSizeChange = (value: number) => {
    setStepSize(value);
  };

  const handleNoiseScaleChange = (value: number) => {
    setNoiseScale(value);
  };

  useEffect(() => {
    // Simple device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPerfDevice = window.navigator.hardwareConcurrency <= 4;
    const cpuCores = window.navigator.hardwareConcurrency || 4;

    // console.log("Device detection:", { isMobile, cpuCores });

    if (isMobile || isLowPerfDevice) {
      setParticleCount(7000); // Lower count for mobile/low-end devices
      setModelUrl("/models/josch14kMobile.glb");
      // setCustomData(7000);
    } else if (cpuCores <= 6) {
      setParticleCount(10000); // Medium count for mid-range devices
      // setCustomData(10000);
      console.log("Medium count for mid-range devices");
      setModelUrl("/models/josch14kMobile.glb");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.75 }}
      className="absolute w-full h-[100vh]"
    >
      <Canvas camera={{ position: [0, -1, 10], fov: 60 }}>
        <Suspense fallback={<Loader />}>
          <Environment
            preset="night"
            background={false}
            environmentIntensity={0.8}
          />

          <NoisePoints
            count={particleCount}
            stepSize={stepSize}
            noiseScale={noiseScale}
            randomness={0.02}
          />
          {Array.from({ length: 15 }).map((_, i) => (
            <Agent key={i} radius={radius} />
          ))}

          
          <JoschHead
            onStepSizeChange={handleStepSizeChange}
            onNoiseScaleChange={handleNoiseScaleChange}
            initialStepSize={stepSize}
            initialNoiseScale={noiseScale}
            modelUrl={modelUrl}
          />
          {/* <Perf
            position="bottom-left"
            customData={{
              value: particleCount,
              name: "Particle count" as unknown as number,
              info: "" as unknown as number,
              round: 0, // No decimal places needed for particle count
            }}
          /> */}
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}%</Html>;
}
