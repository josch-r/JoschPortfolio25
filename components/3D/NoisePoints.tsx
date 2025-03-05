"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
// import { useControls } from "leva"
import type * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";

const noise3D = createNoise3D();

const AgentsScene = React.memo(
  ({
    a_count = 20000,
    stepSize = 0.03,
    noiseScale = 0.1,
    randomness = 0.02,
  }: {
    a_count?: number;
    stepSize?: number;
    noiseScale?: number;
    randomness?: number;
  }) => {
    const pointsRef = useRef<THREE.Points>(null);

    // const stepSize = 0.03;
    // const noiseScale = 0.1;
    const pointSize = 0.04;
    const pointOpacity = 0.75;
    const boundaryX = 26;
    const boundaryY = 14;
    const boundaryZNear = 0;
    const boundaryZFar = -35;
    // const randomness = 0.02;
    const timeInfluence = 0.1;
    const resetProbability = 0.002;
    const velocityFactor = 0.05;

    const [positions, colors, velocities] = useMemo(() => {
      const positions = new Float32Array(a_count * 3);
      const colors = new Float32Array(a_count * 3);
      const velocities = new Float32Array(a_count * 3);
      for (let i = 0; i < a_count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 2 * boundaryX;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * boundaryY;
        positions[i * 3 + 2] =
          Math.random() * (boundaryZNear - boundaryZFar) + boundaryZFar;
        colors[i * 3] = Math.random();
        colors[i * 3 + 1] = Math.random();
        colors[i * 3 + 2] = Math.random();
        velocities[i * 3] = 0;
        velocities[i * 3 + 1] = 0;
        velocities[i * 3 + 2] = 0;
      }
      return [positions, colors, velocities];
    }, [boundaryX, boundaryY, boundaryZNear, boundaryZFar, a_count]);

    const wrapValue = useMemo(
      () =>
        (value: number, min: number, max: number): number => {
          const range = max - min;
          return ((((value - min) % range) + range) % range) + min;
        },
      []
    );

    const resetParticle = (index: number, positions: Float32Array) => {
      positions[index] = (Math.random() - 0.5) * 2 * boundaryX;
      positions[index + 1] = (Math.random() - 0.5) * 2 * boundaryY;
      positions[index + 2] =
        boundaryZFar + Math.random() * (boundaryZNear - boundaryZFar);
    };

    useFrame(({ clock }) => {
      if (!pointsRef.current) return;

      const time = clock.getElapsedTime();
      const positionAttribute = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;

      const timeOffset = time * timeInfluence;
      const noiseOffsets = new Float32Array(a_count * 3);
      for (let i = 0; i < a_count; i++) {
        const i3 = i * 3;
        noiseOffsets[i3] =
          noise3D(
            positions[i3] * noiseScale,
            positions[i3 + 1] * noiseScale,
            positions[i3 + 2] * noiseScale + timeOffset
          ) *
          Math.PI *
          2;
        noiseOffsets[i3 + 1] =
          noise3D(
            positions[i3] * noiseScale + 100,
            positions[i3 + 1] * noiseScale + 100,
            positions[i3 + 2] * noiseScale + timeOffset
          ) *
          Math.PI *
          2;
        noiseOffsets[i3 + 2] = Math.random() * randomness;
      }

      positions.forEach((_, i) => {
        const i3 = i * 3;
        velocities[i3] =
          velocities[i3] * velocityFactor +
          (Math.cos(noiseOffsets[i3]) * stepSize + noiseOffsets[i3 + 2]);
        velocities[i3 + 1] =
          velocities[i3 + 1] * velocityFactor +
          (Math.sin(noiseOffsets[i3]) * stepSize + noiseOffsets[i3 + 2]);
        const z = positions[i3 + 2] + velocities[i3 + 2] * velocityFactor;
        const angle2 = noiseOffsets[i3 + 1];
        const randomOffset = noiseOffsets[i3 + 2];
        positions[i3 + 2] = wrapValue(
          z +
            (Math.cos(angle2) + Math.sin(angle2)) * 0.5 * stepSize +
            randomOffset,
          boundaryZFar,
          boundaryZNear
        );

        positions[i3] = wrapValue(
          positions[i3] + velocities[i3],
          -boundaryX,
          boundaryX
        );
        positions[i3 + 1] = wrapValue(
          positions[i3 + 1] + velocities[i3 + 1],
          -boundaryY,
          boundaryY
        );

        if (Math.random() < resetProbability) {
          resetParticle(i3, positions);
          velocities[i3] = 0;
          velocities[i3 + 1] = 0;
          velocities[i3 + 2] = 0;
        }
      });

      positionAttribute.needsUpdate = true;
    });

    return (
      <Points ref={pointsRef} positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={pointSize}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={pointOpacity}
        />
      </Points>
    );
  }
);

AgentsScene.displayName = "AgentsScene";

const NoisePoints = ({
  count = 20000,
  stepSize = 0.03,
  noiseScale = 0.1,
  randomness = 0.02,
}: {
  count?: number;
  stepSize?: number;
  noiseScale?: number;
  randomness?: number;
}) => {
  return <AgentsScene a_count={count} stepSize={stepSize} noiseScale={noiseScale} randomness={randomness}/>;
};

export default NoisePoints;
