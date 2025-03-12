"use client";

import { Environment, Text } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
// import { Perf, setCustomData } from "r3f-perf";
import dynamic from "next/dynamic";
import { JoschHead } from "./JoschHead";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";
import { Knob3D } from "./Knob3D";

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
        intensity={0.75}
        distance={9}
        decay={2}
        color="#ffffff"
      />
    </>
  );
});

// Add this hook to your component
const useResponsiveKnobGroup = () => {
  const [position, setPosition] = useState<[number, number, number]>([
    12, -6, -7,
  ]);
  const [rotation, setRotation] = useState<[number, number, number]>([
    -0.2, -0.6, 0,
  ]);

  useEffect(() => {
    const handleResize = () => {
      // Mobile (< 768px)
      if (window.innerWidth < 768) {
        setPosition([0, -8, -8] as [number, number, number]);
        setRotation([0, 0, 0] as [number, number, number]);
      }
      // Tablet (768px - 1024px)
      else if (window.innerWidth < 1280) {
        setPosition([0, -7, -6] as [number, number, number]);
        setRotation([0, 0, 0] as [number, number, number]);
      }
      // Desktop
      else {
        setPosition([12, -6, -7] as [number, number, number]);
        setRotation([-0.2, -0.6, 0] as [number, number, number]);
      }
    };

    // Set initial position
    handleResize();

    // Update on resize
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { position, rotation };
};

// Add displayName for better debugging
Agent.displayName = "Agent";

export function HeroScene() {
  const radius = 5;
  const [stepSize, setStepSize] = useState(0.03);
  const [noiseScale, setNoiseScale] = useState(0.1);
  const [showValues, setShowValues] = useState<boolean>(false);
  const [randomness, setRandomness] = useState(0.02);

  const [particleCount, setParticleCount] = useState(20000);

  // Add these handler functions before the return statement
  const handleStepSizeChange = (value: number) => {
    setStepSize(value);
    setShowValues(true);
    setTimeout(() => setShowValues(false), 2000);
  };

  const handleNoiseScaleChange = (value: number) => {
    setNoiseScale(value);
    setShowValues(true);
    setTimeout(() => setShowValues(false), 2000);
  };

  useEffect(() => {
    // Simple device detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const isLowPerfDevice = window.navigator.hardwareConcurrency <= 4;
    const cpuCores = window.navigator.hardwareConcurrency || 4;

    // setCustomData(20000);
    console.log("Device detection:", { isMobile, cpuCores });

    if (isMobile || isLowPerfDevice) {
      setParticleCount(7000); // Lower count for mobile/low-end devices
      // setCustomData(7000);
    } else if (cpuCores <= 6) {
      setParticleCount(10000); // Medium count for mid-range devices
      // setCustomData(10000);
      console.log("Medium count for mid-range devices");
    }
    // High-end devices keep the default 20000
  }, []);

  // Get responsive position and rotation for knob group
  const { position: knobGroupPosition, rotation: knobGroupRotation } =
    useResponsiveKnobGroup();

  return (
    <div className="absolute w-full h-[100vh]">
      <Canvas camera={{ position: [0, -1, 10], fov: 60 }}>
        <Suspense fallback={null}>
          <Environment
            preset="night"
            background={false}
            environmentIntensity={0.8}
          />

          <NoisePoints
            count={particleCount}
            stepSize={stepSize}
            noiseScale={noiseScale}
            randomness={randomness}
          />
          {Array.from({ length: 30 }).map((_, i) => (
            <Agent key={i} radius={radius} />
          ))}

          {/* 3D Knobs */}
          <group position={knobGroupPosition} rotation={knobGroupRotation}>
            <pointLight
              position={[0, 0, 2]}
              intensity={0.2}
              distance={5}
              decay={1}
            />
            <pointLight
              position={[1.5, 0, 2]}
              intensity={0.2}
              distance={5}
              decay={1}
            />
            <pointLight
              position={[-1.5, 0, 2]}
              intensity={0.2}
              distance={5}
              decay={1}
            />
            <Text
              position={[0, -1.1, 0]}
              fontSize={0.2}
              color={"#949494"}
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono-Regular.ttf"
            >
              Tweak to shape the flow
            </Text>
            <Knob3D
              position={[-1.5, 0, 0]}
              name="Step Size"
              value={stepSize}
              min={0.001}
              max={0.2}
              onChange={setStepSize}
            />
            <Knob3D
              position={[0, 0, 0]}
              name="Noise Scale"
              value={noiseScale}
              min={0.001}
              max={0.7}
              onChange={setNoiseScale}
            />
            <Knob3D
              position={[1.5, 0, 0]}
              name="Randomness"
              value={randomness}
              min={0}
              max={0.4}
              onChange={setRandomness}
            />
          </group>

          <JoschHead
            onStepSizeChange={handleStepSizeChange}
            onNoiseScaleChange={handleNoiseScaleChange}
            initialStepSize={stepSize}
            initialNoiseScale={noiseScale}
          />
          {/* Display current values when changing */}
          {showValues && (
            <Text
              position={[0, -3, -5]}
              color="white"
              fontSize={0.5}
              anchorX="center"
              anchorY="middle"
            >
              {`Step Size: ${stepSize.toFixed(
                3
              )} | Noise Scale: ${noiseScale.toFixed(3)}`}
            </Text>
          )}
          {/* <OrbitControls enableZoom={false} /> */}
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
    </div>
  );
}
