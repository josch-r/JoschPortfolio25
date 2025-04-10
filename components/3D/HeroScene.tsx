"use client";

import { Environment } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { JoschHead } from "./JoschHead";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { Html } from "@react-three/drei";

const NoisePoints = dynamic(() => import("./NoisePoints"), { ssr: false });

const noise3D = createNoise3D();

// Performance monitoring component with model switching
const PerformanceMonitor = ({ onPerformanceIssue }: { onPerformanceIssue: () => void }) => {
  const lastTime = useRef(performance.now());
  const frameCount = useRef(0);
  const lowFpsCount = useRef(0);
  const fpsThreshold = 25; // FPS threshold to consider as "bad performance"
  const consecutiveFramesThreshold = 3; // Number of consecutive low FPS frames before logging

  useFrame(() => {
    frameCount.current++;
    
    // Check FPS every 20 frames (more frequent checks)
    if (frameCount.current % 20 === 0) {
      const currentTime = performance.now();
      const elapsedTime = currentTime - lastTime.current;
      // FPS calculation: number of frames (20) divided by elapsed time in seconds
      const fps = Math.round((20 * 1000) / elapsedTime);
      
      // Reset timer for next measurement
      lastTime.current = currentTime;
      
      // Check if FPS is below threshold
      if (fps < fpsThreshold) {
        lowFpsCount.current++;
        
        // If we've had several consecutive low FPS measurements
        if (lowFpsCount.current >= consecutiveFramesThreshold) {
          // console.log(`Performance warning: FPS is ${fps} (below ${fpsThreshold}) for ${lowFpsCount.current} consecutive measurements`);
          // Trigger model switch
          onPerformanceIssue();
          // Reset counter after logging to avoid spam
          lowFpsCount.current = 0;
        }
      } else {
        // Reset counter if FPS is good
        lowFpsCount.current = 0;
      }
    }
  });

  return null;
};

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
        decay={1.8}
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
  const [sceneKey, setSceneKey] = useState(0); // Key to force scene remount
  const [IsMediumMode, setIsMediumMode] = useState(false);
  const [isLowMode, setIsLowMode] = useState(false);

  const handleStepSizeChange = (value: number) => {
    setStepSize(value);
  };

  const handleNoiseScaleChange = (value: number) => {
    setNoiseScale(value);
  };

  // Function to handle performance issues
  const handlePerformanceIssue = () => {
    if (!IsMediumMode && !isLowMode) {
      console.log("Reloading scene with medium quality model due to performance issues");
      setIsMediumMode(true);
      setModelUrl("/models/josch14kMobile.glb");
      setParticleCount(7000);
      
      // Force a complete scene remount by changing the key
      setSceneKey(prevKey => prevKey + 1);
    } else if (!isLowMode) {
      setIsLowMode(true);
      console.log("Reloading scene with low poly model due to performance issues");
      setModelUrl("/models/josch2k.glb");
      setParticleCount(4000);
      setSceneKey(prevKey => prevKey + 1);
    }
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
      setIsMediumMode(true);
      // setCustomData(7000);
    } else if (cpuCores <= 6) {
      setParticleCount(10000); // Medium count for mid-range devices
      // setCustomData(10000);
      console.log("Medium count for mid-range devices");
      setModelUrl("/models/josch14kMobile.glb");
      setIsMediumMode(true);
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
      <Canvas 
        camera={{ position: [0, -1, 10], fov: 60 }}
        key={sceneKey} // Key to force remount
      >
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
          
          {/* Performance monitoring component */}
          <PerformanceMonitor onPerformanceIssue={handlePerformanceIssue} />
          
          {/* <Perf
            position="bottom-left"
            customData={{
              value: particleCount,
              name: "Particle count" as unknown as number,
              info: "particles" as unknown as number,
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
