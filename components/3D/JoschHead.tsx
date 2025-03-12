import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

// Configuration variables for easy adjustment
const HEAD_TRACKING = {
  maxRotationX: 1,  // Maximum horizontal rotation (reduced)
  maxRotationY: 0.2,  // Maximum vertical rotation (increased)
  sensitivity: 0.1,   // Base sensitivity multiplier
  smoothing: 0.03      // Lerp factor (0-1): lower = smoother but slower
};

export const JoschHead = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Base rotation values
  const baseRotation: [number, number, number] = [0.795, 0.119, -0.355];

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Use pointer instead of deprecated mouse property
    const pointer = state.pointer;
    
    // Calculate normalized pointer position
    const x = (pointer.x * viewport.width) / 2;
    // Invert the y value to fix up/down movement
    const y = (-pointer.y * viewport.height) / 2;
    
    // Apply subtle rotation with smooth lerping
    // Reduced horizontal (x) rotation
    const targetRotationX = baseRotation[0] + THREE.MathUtils.clamp(
      y * HEAD_TRACKING.sensitivity, 
      -HEAD_TRACKING.maxRotationX, 
      HEAD_TRACKING.maxRotationX
    );
    
    // Increased vertical (y) rotation
    const targetRotationY = baseRotation[1] + THREE.MathUtils.clamp(
      x * HEAD_TRACKING.sensitivity, 
      -HEAD_TRACKING.maxRotationY, 
      HEAD_TRACKING.maxRotationY
    );
    
    // Smoothly interpolate current rotation to target rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, 
      targetRotationX, 
      HEAD_TRACKING.smoothing
    );
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, 
      targetRotationY, 
      HEAD_TRACKING.smoothing
    );
    
    // Keep the z rotation constant
    groupRef.current.rotation.z = baseRotation[2];
  });

  return (
    <group 
      ref={groupRef}
      dispose={null} 
      position={[0.002, 0.039, -0.004]}
      rotation={baseRotation}
      scale={0.013}
    >
      <Suspense fallback={<Model url='/models/josch2k.glb' />}>
        <Model url="/models/josch50k3.glb" />
      </Suspense>
    </group>
  );
};

function Model({ url }: { url: string }) {
  const { nodes, materials } = useGLTF(url);

  return (
    <mesh
      geometry={(nodes.josch3 as THREE.Mesh).geometry} 
      material={materials['Marble.001']}
    />
  );
}

useGLTF.preload('/models/josch50k3.glb');
useGLTF.preload('/models/josch2k.glb');
