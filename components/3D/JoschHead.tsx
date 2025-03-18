import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

// Configuration variables
const HEAD_CONTROL = {
  maxRotationX: 0.2, // Maximum X rotation (controls Step Size)
  maxRotationY: 0.8, // Maximum Y rotation (controls Noise Scale)
  smoothing: 0.1, // Smoothing factor (lower = smoother but slower)
};

interface JoschHeadProps {
  onStepSizeChange?: (value: number) => void;
  onNoiseScaleChange?: (value: number) => void;
  initialStepSize?: number;
  initialNoiseScale?: number;
}

export const JoschHead = ({
  onStepSizeChange,
  onNoiseScaleChange,
  initialStepSize = 0.03,
  initialNoiseScale = 0.1,
}: JoschHeadProps = {}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Base rotation values
  const baseRotation: [number, number, number] = useMemo(
    () => [0.795, 0.119, -0.355],
    []
  );

  // Target rotation values
  const targetRotation = useRef<{ x: number; y: number; z: number }>({
    x: baseRotation[0],
    y: baseRotation[1],
    z: baseRotation[2],
  });

  // Track parameter values
  const stepSizeRef = useRef<number>(initialStepSize || 0.03);
  const noiseScaleRef = useRef<number>(initialNoiseScale || 0.1);

  // Track dragging state
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);
  const [lastMouseY, setLastMouseY] = useState(0);

  // Map rotation to parameter values
  const rotationToStepSize = (rotX: number): number => {
    const normalizedValue =
      (rotX - (baseRotation[0] - HEAD_CONTROL.maxRotationX)) /
      (2 * HEAD_CONTROL.maxRotationX);
    return THREE.MathUtils.clamp(0.01 + normalizedValue * 0.09, 0.01, 0.1);
  };

  const rotationToNoiseScale = (rotY: number): number => {
    const normalizedValue =
      (rotY - (baseRotation[1] - HEAD_CONTROL.maxRotationY)) /
      (2 * HEAD_CONTROL.maxRotationY);
    return THREE.MathUtils.clamp(0.05 + normalizedValue * 0.25, 0.05, 0.3);
  };

  // Update rotation and parameters based on current rotation
  useFrame(() => {
    if (!groupRef.current) return;

    // Smoothly interpolate current rotation to target rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x,
      HEAD_CONTROL.smoothing
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      HEAD_CONTROL.smoothing
    );

    // Keep z rotation constant
    groupRef.current.rotation.z = baseRotation[2];

    // Convert rotations to parameter values
    const newStepSize = rotationToStepSize(groupRef.current.rotation.x);
    const newNoiseScale = rotationToNoiseScale(groupRef.current.rotation.y);

    // Only update if values changed significantly
    if (Math.abs(newStepSize - stepSizeRef.current) > 0.001) {
      stepSizeRef.current = newStepSize;
      if (onStepSizeChange) {
        onStepSizeChange(newStepSize);
      }
    }

    if (Math.abs(newNoiseScale - noiseScaleRef.current) > 0.001) {
      noiseScaleRef.current = newNoiseScale;
      if (onNoiseScaleChange) {
        onNoiseScaleChange(newNoiseScale);
      }
    }
  });

  // Handle global mouse events for continuous dragging
  useEffect(() => {
    if (!isDragging || !groupRef.current) return;

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      // Get client positions from either mouse or touch event
      const clientX =
        "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

      // Calculate deltas
      const deltaX = clientX - lastMouseX;
      const deltaY = clientY - lastMouseY;

      // Update target rotation (not directly updating the mesh)
      targetRotation.current.y = THREE.MathUtils.clamp(
        targetRotation.current.y + deltaX * 0.005,
        baseRotation[1] - HEAD_CONTROL.maxRotationY,
        baseRotation[1] + HEAD_CONTROL.maxRotationY
      );

      targetRotation.current.x = THREE.MathUtils.clamp(
        targetRotation.current.x + deltaY * 0.005,
        baseRotation[0] - HEAD_CONTROL.maxRotationX,
        baseRotation[0] + HEAD_CONTROL.maxRotationX
      );

      // Update last position
      setLastMouseX(clientX);
      setLastMouseY(clientY);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    // Add event listeners
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("touchend", handleEnd);
    window.addEventListener("touchcancel", handleEnd);

    return () => {
      // Remove event listeners
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("touchend", handleEnd);
      window.removeEventListener("touchcancel", handleEnd);
    };
  }, [isDragging, lastMouseX, lastMouseY, baseRotation]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setLastMouseX(e.clientX);
    setLastMouseY(e.clientY);
  };

  return (
    <group ref={groupRef} dispose={null} rotation={baseRotation} scale={0.013}>
      <Suspense fallback={<Model url="/models/josch2k.glb" />}>
        <Brille />

        <Model url="/models/josch50k3.glb" onPointerDown={handlePointerDown} />
      </Suspense>
    </group>
  );
};

interface ModelProps {
  url: string;
  onPointerDown?: (e: React.PointerEvent) => void;
}

function Model({ url, onPointerDown }: ModelProps) {
  const { nodes, materials } = useGLTF(url);
  return (
    <group position={[0,1,0]}>
      <mesh
        geometry={(nodes.josch3 as THREE.Mesh).geometry}
        material={materials["Marble.001"]}
        onPointerDown={onPointerDown}
      />
    </group>
  );
}

type GLTFResult = GLTF & {
  nodes: {
    BügelL: THREE.Mesh;
    defaultMaterial001: THREE.Mesh;
    defaultMaterial007: THREE.Mesh;
    defaultMaterial004: THREE.Mesh;
    defaultMaterial002: THREE.Mesh;
  };
  materials: {
    MetalThingy: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
    GLASSES: THREE.MeshStandardMaterial;
    GlassesFront: THREE.MeshStandardMaterial;
    Material: THREE.MeshPhysicalMaterial;
  };
};

const Brille = () => {
  const { nodes, materials } = useGLTF("/models/brille2.glb") as GLTFResult;

  return (
    <group
      dispose={null}
      position={[2,-25.4, 31.8]}
      scale={1000}
      rotation={[-0.79, -0.33, 0.16]}
    >
      <mesh geometry={nodes.defaultMaterial001.geometry} material={materials['Material.001']} rotation={[-0.043, 0, 0]} scale={0.028} />
      <mesh geometry={nodes.defaultMaterial004.geometry} material={materials.GlassesFront} rotation={[-0.043, 0, 0]} scale={0.028} />
      <mesh geometry={nodes.defaultMaterial002.geometry} material={materials.Material} rotation={[-0.043, 0, 0]} scale={0.028} />
      {/*
      For high res brille
      
      <mesh
        geometry={nodes.BügelL.geometry}
        material={materials.MetalThingy}
        rotation={[-1.682, 0.004, -0.105]}
        scale={0.028}
      />
      <mesh
        geometry={nodes.defaultMaterial001.geometry}
        material={materials["Material.001"]}
        rotation={[-0.043, 0, 0]}
        scale={0.028}
      />
      <mesh
        geometry={nodes.defaultMaterial007.geometry}
        material={materials.GLASSES}
        rotation={[-1.613, 0, 0]}
        scale={0.028}
      />
      <mesh
        geometry={nodes.defaultMaterial004.geometry}
        material={materials.GlassesFront}
        rotation={[-0.043, 0, 0]}
        scale={0.028}
      />
      <mesh
        geometry={nodes.defaultMaterial002.geometry}
        material={materials.Material}
        rotation={[-0.043, 0, 0]}
        scale={0.028}
      /> */}
    </group>
  );
};

useGLTF.preload("/models/josch50k3.glb");
useGLTF.preload("/models/brille2.glb");
useGLTF.preload("/models/josch2k.glb");
