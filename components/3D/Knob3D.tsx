import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, useGLTF } from "@react-three/drei";
import { Mesh, Group } from "three";

interface Knob3DProps {
  position: [number, number, number];
  name: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export const Knob3D = React.memo(
  ({ position, name, value, min, max, onChange }: Knob3DProps) => {
    const knobRef = useRef<Group>(null);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [lastMouseX, setLastMouseX] = useState<number>(0);
    const [lastMouseY, setLastMouseY] = useState<number>(0);
    const valueRef = useRef(value);

    const { nodes, materials } = useGLTF("models/knob-transformed.glb");

    // Update ref when value prop changes
    useEffect(() => {
      valueRef.current = value;
    }, [value]);

    // Map value to rotation (270 degrees range, from -135 to +135 degrees)
    const valueToRotation = (val: number): number => {
      // Reverse the rotation direction by adding a negative sign
      return -((val - min) / (max - min)) * Math.PI * 1.5 + Math.PI * 0.75;
    };

    useFrame(() => {
      if (knobRef.current) {
        // Change from rotation.z to rotation.y
        knobRef.current.rotation.z = valueToRotation(valueRef.current);
      }
    });

    // Handle global mouse events for continuous dragging
    useEffect(() => {
      if (!isDragging) return;

      let prevX = lastMouseX;
      let currentValue = valueRef.current;

      const handleMouseMove = (e: MouseEvent) => {
        const deltaX = e.clientX - prevX;

        // Adjust rotation calculation for more intuitive control
        // Swap deltaX and deltaY for horizontal rotation
        const rotationDelta = deltaX * 0.01;

        // Map rotation to value change
        const valueDelta = (rotationDelta * (max - min)) / Math.PI;
        currentValue = Math.min(max, Math.max(min, currentValue + valueDelta));

        onChange(currentValue);
        valueRef.current = currentValue;

        // Update previous positions
        prevX = e.clientX;
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [isDragging, lastMouseX, lastMouseY, max, min, onChange]);

    const handlePointerDown = (e: PointerEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      setLastMouseX(e.clientX);
      setLastMouseY(e.clientY);
    };

    return (
      <group position={position}>
        <group ref={knobRef}>
          <mesh
            geometry={(nodes.Node1 as Mesh).geometry}
            material={materials["#1C1C1CFF"]}
            scale={[0.04, 0.04, 0.04]}
            onPointerDown={handlePointerDown}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <mesh
              geometry={(nodes.Node2 as Mesh).geometry}
              material={materials["#EB8333"]}
            />
          </mesh>
        </group>
        {isDragging && (
          <group>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.2}
              color={"#fff"}
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono-Regular.ttf"
            >
              {name}
            </Text>
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.2}
              color={"#fff"}
              anchorX="center"
              anchorY="middle"
              font="/fonts/GeistMono-Regular.ttf"
            >
              {value.toFixed(3)}
            </Text>
          </group>
        )}
      </group>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.position === nextProps.position &&
      Math.abs(prevProps.value - nextProps.value) < 0.001 &&
      prevProps.name === nextProps.name
    );
  }
);

Knob3D.displayName = "Knob3D";
useGLTF.preload("models/knob-transformed.glb");
