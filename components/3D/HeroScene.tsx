"use client";

import { Environment, useProgress, Html } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { JoschHead } from "./JoschHead";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { motion } from "framer-motion";

const NoisePoints = dynamic(() => import("./NoisePoints"), { ssr: false });

const noise3D = createNoise3D();

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

// Performance monitoring component with model switching
const PerformanceMonitor = ({ onPerformanceIssue }: { onPerformanceIssue: () => void }) => {
  const lastTime = useRef<number | null>(null);
  const frameCount = useRef(0);
  const lowFpsCount = useRef(0);
  const fpsThreshold = 25; // FPS threshold to consider as "bad performance"
  const consecutiveFramesThreshold = 3; // Number of consecutive low FPS frames before logging

  useEffect(() => {
    lastTime.current = performance.now();
  }, []);

  useFrame(() => {
    if (lastTime.current === null) {
      lastTime.current = performance.now();
      return;
    }

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
          onPerformanceIssue();
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
  const baseSeed = radius * 100;

  // Pre-calculate random values
  const angleOffset = useRef(pseudoRandom(baseSeed + 1) * Math.PI * 3).current;
  const distanceOffset = useRef(pseudoRandom(baseSeed + 2) * 4 - 3).current;
  const speed = useRef(pseudoRandom(baseSeed + 3) * 0.75 + 0.2).current;
  const noiseOffset = useRef(pseudoRandom(baseSeed + 4) * 100).current;

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
  const getInitialSceneState = () => {
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPerfDevice = hardwareConcurrency <= 4;

    if (isMobile || isLowPerfDevice) {
      return {
        stepSize: 0.03,
        noiseScale: 0.1,
        modelUrl: "/models/josch14kMobile.glb",
        particleCount: 7000,
        sceneKey: 0,
        isMediumMode: true,
        isLowMode: false,
      };
    }

    if (hardwareConcurrency <= 6) {
      return {
        stepSize: 0.03,
        noiseScale: 0.1,
        modelUrl: "/models/josch14kMobile.glb",
        particleCount: 10000,
        sceneKey: 0,
        isMediumMode: true,
        isLowMode: false,
      };
    }

    return {
      stepSize: 0.03,
      noiseScale: 0.1,
      modelUrl: "/models/josch50k4.glb",
      particleCount: 20000,
      sceneKey: 0,
      isMediumMode: false,
      isLowMode: false,
    };
  };

  const [sceneState, setSceneState] = useState(getInitialSceneState);

  const handleStepSizeChange = (value: number) => {
    setSceneState((currentState) => ({ ...currentState, stepSize: value }));
  };

  const handleNoiseScaleChange = (value: number) => {
    setSceneState((currentState) => ({ ...currentState, noiseScale: value }));
  };

  const handlePerformanceIssue = useCallback(() => {
    setSceneState((currentState) => {
      if (!currentState.isMediumMode && !currentState.isLowMode) {
        return {
          ...currentState,
          isMediumMode: true,
          modelUrl: "/models/josch14kMobile.glb",
          particleCount: 7000,
          sceneKey: currentState.sceneKey + 1,
        };
      }

      if (!currentState.isLowMode) {
        return {
          ...currentState,
          isLowMode: true,
          modelUrl: "/models/josch2k.glb",
          particleCount: 4000,
          sceneKey: currentState.sceneKey + 1,
        };
      }

      return currentState;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      className="absolute w-full h-[100vh]"
    >
      <Canvas
        camera={{ position: [0, -1, 10], fov: 60 }}
        dpr={[1, 1.5]}
        key={sceneState.sceneKey}
      >
        <Suspense fallback={<Loader />}>
          <Environment
            preset="night"
            background={false}
            environmentIntensity={0.8}
          />

          <NoisePoints
            count={sceneState.particleCount}
            stepSize={sceneState.stepSize}
            noiseScale={sceneState.noiseScale}
            randomness={0.02}
          />
          {Array.from({ length: 15 }).map((_, i) => (
            <Agent key={i} radius={radius} />
          ))}

          
          <JoschHead
            onStepSizeChange={handleStepSizeChange}
            onNoiseScaleChange={handleNoiseScaleChange}
            initialStepSize={sceneState.stepSize}
            initialNoiseScale={sceneState.noiseScale}
            modelUrl={sceneState.modelUrl}
          />
          
          <PerformanceMonitor onPerformanceIssue={handlePerformanceIssue} />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

function Loader() {
  const { progress } = useProgress();
  return <Html center>{Math.round(progress)}%</Html>;
}
