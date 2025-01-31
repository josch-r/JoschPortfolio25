"use client"

import React, { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { createNoise3D } from "simplex-noise"
import { useControls } from "leva"
import type * as THREE from "three"
import { Points, PointMaterial } from "@react-three/drei"

const noise3D = createNoise3D()

const AGENT_COUNT = 20000;

const AgentsScene = React.memo(() => {
  const pointsRef = useRef<THREE.Points>(null)

  const {
    stepSize,
    noiseScale,
    pointSize,
    pointOpacity,
    boundaryX,
    boundaryY,
    boundaryZNear,
    boundaryZFar,
    randomness,
    timeInfluence,
    resetProbability,
    velocityFactor,
  } = useControls("Noise Points", {
    stepSize: { value: 0.03, min: 0.001, max: 0.2, step: 0.001 },
    noiseScale: { value: 0.1, min: 0.01, max: 1, step: 0.01 },
    pointSize: { value: 0.04, min: 0.01, max: 1, step: 0.01 },
    pointOpacity: { value: 0.6, min: 0, max: 1, step: 0.01 },
    boundaryX: { value: 26, min: 1, max: 50, step: 0.1 },
    boundaryY: { value: 14, min: 1, max: 50, step: 0.1 },
    boundaryZNear: { value: 0, min: -100, max: 0, step: 1 },
    boundaryZFar: { value: -35, min: -200, max: -10, step: 1 },
    randomness: { value: 0.02, min: 0, max: 1, step: 0.01 },
    timeInfluence: { value: 0.1, min: 0, max: 1, step: 0.01 },
    resetProbability: { value: 0.002, min: 0, max: 0.1, step: 0.0001 },
    velocityFactor: { value: 0.05, min: 0.01, max: 0.99, step: 0.01 },
  })

  const [positions, colors, velocities] = useMemo(() => {
    const positions = new Float32Array(AGENT_COUNT * 3)
    const colors = new Float32Array(AGENT_COUNT * 3)
    const velocities = new Float32Array(AGENT_COUNT * 3)
    for (let i = 0; i < AGENT_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2 * boundaryX
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2 * boundaryY
      positions[i * 3 + 2] = Math.random() * (boundaryZNear - boundaryZFar) + boundaryZFar
      colors[i * 3] = Math.random()
      colors[i * 3 + 1] = Math.random()
      colors[i * 3 + 2] = Math.random()
      velocities[i * 3] = 0
      velocities[i * 3 + 1] = 0
      velocities[i * 3 + 2] = 0
    }
    return [positions, colors, velocities]
  }, [boundaryX, boundaryY, boundaryZNear, boundaryZFar])

  const wrapValue = useMemo(
    () =>
      (value: number, min: number, max: number): number => {
        const range = max - min
        return ((((value - min) % range) + range) % range) + min
      },
    [],
  )

  const resetParticle = (index: number, positions: Float32Array) => {
    positions[index] = (Math.random() - 0.5) * 2 * boundaryX
    positions[index + 1] = (Math.random() - 0.5) * 2 * boundaryY
    positions[index + 2] = boundaryZFar + Math.random() * (boundaryZNear - boundaryZFar)
  }

  useFrame(({ clock }) => {
    if (!pointsRef.current) return

    const time = clock.getElapsedTime()
    const positionAttribute = pointsRef.current.geometry.getAttribute("position") as THREE.BufferAttribute
    const positions = positionAttribute.array as Float32Array

    const timeOffset = time * timeInfluence
    const noiseOffsets = new Float32Array(AGENT_COUNT * 3)
    for (let i = 0; i < AGENT_COUNT; i++) {
      const i3 = i * 3
      noiseOffsets[i3] =
        noise3D(
          positions[i3] * noiseScale,
          positions[i3 + 1] * noiseScale,
          positions[i3 + 2] * noiseScale + timeOffset,
        ) *
        Math.PI *
        2
      noiseOffsets[i3 + 1] =
        noise3D(
          positions[i3] * noiseScale + 100,
          positions[i3 + 1] * noiseScale + 100,
          positions[i3 + 2] * noiseScale + timeOffset,
        ) *
        Math.PI *
        2
      noiseOffsets[i3 + 2] = Math.random() * randomness
    }

    positions.forEach((_, i) => {
      const i3 = i * 3
      velocities[i3] = velocities[i3] * velocityFactor + (Math.cos(noiseOffsets[i3]) * stepSize + noiseOffsets[i3 + 2])
      velocities[i3 + 1] =
        velocities[i3 + 1] * velocityFactor + (Math.sin(noiseOffsets[i3]) * stepSize + noiseOffsets[i3 + 2])
      const z = positions[i3 + 2] + velocities[i3 + 2] * velocityFactor
      const angle2 = noiseOffsets[i3 + 1]
      const randomOffset = noiseOffsets[i3 + 2]
      positions[i3 + 2] = wrapValue(
        z + (Math.cos(angle2) + Math.sin(angle2)) * 0.5 * stepSize + randomOffset,
        boundaryZFar,
        boundaryZNear,
      )

      positions[i3] = wrapValue(positions[i3] + velocities[i3], -boundaryX, boundaryX)
      positions[i3 + 1] = wrapValue(positions[i3 + 1] + velocities[i3 + 1], -boundaryY, boundaryY)

      if (Math.random() < resetProbability) {
        resetParticle(i3, positions)
        velocities[i3] = 0
        velocities[i3 + 1] = 0
        velocities[i3 + 2] = 0
      }
    })

    positionAttribute.needsUpdate = true
  })

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
  )
})

AgentsScene.displayName = "AgentsScene"

const NoisePoints = () => {
  return <AgentsScene />
}

export default NoisePoints

