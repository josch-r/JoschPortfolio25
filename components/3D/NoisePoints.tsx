"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import type * as THREE from "three";
import { Points, PointMaterial } from "@react-three/drei";
import { useEffect } from "react";

const noise3D = createNoise3D();

const BOUNDARY_X = 26;
const BOUNDARY_Y = 14;
const BOUNDARY_Z_NEAR = 0;
const BOUNDARY_Z_FAR = -35;
const TIME_INFLUENCE = 0.1;
const RESET_PROBABILITY = 0.002;
const VELOCITY_FACTOR = 0.05;
const POINT_SIZE = 0.04;
const POINT_OPACITY = 0.75;

const particleCache = new Map<number, ParticleData>();

const pseudoRandom = (seed: number) => {
  const value = Math.sin(seed) * 10000;
  return value - Math.floor(value);
};

type ParticleData = {
  positions: Float32Array;
  colors: Float32Array;
  velocities: Float32Array;
  count: number;
};

const wrapValue = (value: number, min: number, max: number): number => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const resetParticle = (i3: number, positions: Float32Array) => {
  positions[i3] = (pseudoRandom(i3 + 1) - 0.5) * 2 * BOUNDARY_X;
  positions[i3 + 1] = (pseudoRandom(i3 + 2) - 0.5) * 2 * BOUNDARY_Y;
  positions[i3 + 2] =
    BOUNDARY_Z_FAR + pseudoRandom(i3 + 3) * (BOUNDARY_Z_NEAR - BOUNDARY_Z_FAR);
};

const createParticleData = (count: number): ParticleData => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (pseudoRandom(i3 + 1) - 0.5) * 2 * BOUNDARY_X;
    positions[i3 + 1] = (pseudoRandom(i3 + 2) - 0.5) * 2 * BOUNDARY_Y;
    positions[i3 + 2] =
      pseudoRandom(i3 + 3) * (BOUNDARY_Z_NEAR - BOUNDARY_Z_FAR) +
      BOUNDARY_Z_FAR;
    colors[i3] = pseudoRandom(i3 + 4);
    colors[i3 + 1] = pseudoRandom(i3 + 5);
    colors[i3 + 2] = pseudoRandom(i3 + 6);
  }

  return { positions, colors, velocities, count };
};

const getParticleData = (count: number) => {
  const cachedParticleData = particleCache.get(count);

  if (cachedParticleData) {
    return cachedParticleData;
  }

  const particleData = createParticleData(count);
  particleCache.set(count, particleData);

  return particleData;
};

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
    const { positions, colors } = getParticleData(a_count);
    const velocitiesRef = useRef<Float32Array>(new Float32Array(a_count * 3));

    useEffect(() => {
      velocitiesRef.current = new Float32Array(a_count * 3);
    }, [a_count]);

    useFrame(({ clock }) => {
      if (!pointsRef.current) return;

      const velocities = velocitiesRef.current;

      const time = clock.getElapsedTime();
      const positionAttribute = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      const positions = positionAttribute.array as Float32Array;
      const timeOffset = time * TIME_INFLUENCE;

      for (let i = 0; i < a_count; i++) {
        const i3 = i * 3;
        const px = positions[i3];
        const py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        const angleX =
          noise3D(
            px * noiseScale,
            py * noiseScale,
            pz * noiseScale + timeOffset
          ) *
          Math.PI *
          2;
        const angleY =
          noise3D(
            px * noiseScale + 100,
            py * noiseScale + 100,
            pz * noiseScale + timeOffset
          ) *
          Math.PI *
          2;
        const randomOffset = pseudoRandom(i3 + timeOffset) * randomness;

        velocities[i3] =
          velocities[i3] * VELOCITY_FACTOR +
          Math.cos(angleX) * stepSize +
          randomOffset;
        velocities[i3 + 1] =
          velocities[i3 + 1] * VELOCITY_FACTOR +
          Math.sin(angleX) * stepSize +
          randomOffset;

        positions[i3] = wrapValue(px + velocities[i3], -BOUNDARY_X, BOUNDARY_X);
        positions[i3 + 1] = wrapValue(
          py + velocities[i3 + 1],
          -BOUNDARY_Y,
          BOUNDARY_Y
        );
        positions[i3 + 2] = wrapValue(
          pz +
            (Math.cos(angleY) + Math.sin(angleY)) * 0.5 * stepSize +
            randomOffset,
          BOUNDARY_Z_FAR,
          BOUNDARY_Z_NEAR
        );

        if (pseudoRandom(i3 + timeOffset + 1) < RESET_PROBABILITY) {
          resetParticle(i3, positions);
          velocities[i3] = 0;
          velocities[i3 + 1] = 0;
          velocities[i3 + 2] = 0;
        }
      }

      positionAttribute.needsUpdate = true;
    });

    return (
      <Points ref={pointsRef} positions={positions} colors={colors}>
        <PointMaterial
          transparent
          vertexColors
          size={POINT_SIZE}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={POINT_OPACITY}
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
  return (
    <AgentsScene
      a_count={count}
      stepSize={stepSize}
      noiseScale={noiseScale}
      randomness={randomness}
    />
  );
};

export default NoisePoints;
