import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const RotatingSphere = ({ scrollProgress }) => {
  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current) {
      // Rotate based on scroll progress
      // Full rotation = 2 * PI radians
      meshRef.current.rotation.y = scrollProgress * Math.PI * 4;
      meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
    }
  }, [scrollProgress]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#8b5cf6"
        wireframe={false}
        metalness={0.5}
        roughness={0.2}
      />
    </mesh>
  );
};
