import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Individual shape component
const FloatingShape = ({
  geometry,
  startPos,
  endPos,
  startRot,
  color,
  scale,
  scrollProgress
}) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Map scroll progress from 0-0.125 to 0-1 for this section
    const heroProgress = Math.min(scrollProgress / 0.125, 1);

    // Interpolate position
    groupRef.current.position.x = lerp(startPos[0], endPos[0], heroProgress);
    groupRef.current.position.y = lerp(startPos[1], endPos[1], heroProgress);
    groupRef.current.position.z = lerp(startPos[2], endPos[2], heroProgress);

    // Add continuous rotation
    groupRef.current.rotation.x += startRot[0];
    groupRef.current.rotation.y += startRot[1];
    groupRef.current.rotation.z += startRot[2];
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Solid shape with emissive glow */}
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.02}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

export const FloatingShapes = ({ scrollProgress }) => {
  // Define shapes with their properties
  const shapes = [
    {
      id: 1,
      geometry: <boxGeometry args={[1, 1, 1]} />,
      startPos: [-4, 3, -2],
      endPos: [-3, 2, 1],
      startRot: [0.01, 0.015, 0.005],
      color: '#ff00ff', // magenta
      scale: 0.6,
    },
    {
      id: 2,
      geometry: <sphereGeometry args={[0.5, 32, 32]} />,
      startPos: [5, -2, -3],
      endPos: [3, -1, 0],
      startRot: [0.008, 0.012, 0.01],
      color: '#00ffff', // cyan
      scale: 0.8,
    },
    {
      id: 3,
      geometry: <torusGeometry args={[0.5, 0.2, 16, 32]} />,
      startPos: [-3, -3, 2],
      endPos: [-2, -2, -1],
      startRot: [0.015, 0.01, 0.012],
      color: '#ff00ff', // magenta
      scale: 0.5,
    },
    {
      id: 4,
      geometry: <octahedronGeometry args={[0.6]} />,
      startPos: [4, 2, 1],
      endPos: [2, 1, -2],
      startRot: [0.012, 0.018, 0.008],
      color: '#ff66ff', // pink
      scale: 0.7,
    },
    {
      id: 5,
      geometry: <icosahedronGeometry args={[0.5]} />,
      startPos: [0, 4, -1],
      endPos: [0, 2, 2],
      startRot: [0.01, 0.01, 0.015],
      color: '#00ffff', // cyan
      scale: 0.5,
    },
    {
      id: 6,
      geometry: <torusKnotGeometry args={[0.4, 0.15, 64, 8]} />,
      startPos: [-5, 0, 0],
      endPos: [-3, 0, -2],
      startRot: [0.008, 0.015, 0.01],
      color: '#ff66ff', // pink
      scale: 0.4,
    },
    {
      id: 7,
      geometry: <boxGeometry args={[0.8, 0.8, 0.8]} />,
      startPos: [3, -4, 2],
      endPos: [2, -2, 1],
      startRot: [0.015, 0.01, 0.012],
      color: '#00ffff', // cyan
      scale: 0.3,
    },
  ];

  return (
    <group>
      {shapes.map((shape) => (
        <FloatingShape
          key={shape.id}
          geometry={shape.geometry}
          startPos={shape.startPos}
          endPos={shape.endPos}
          startRot={shape.startRot}
          color={shape.color}
          scale={shape.scale}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  );
};
