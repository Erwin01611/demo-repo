import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Helper function for smooth easing
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Individual order element component
const OrderElement = ({
  geometry,
  startPos,
  endPos,
  color,
  scale,
  scrollProgress,
  index,
}) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Map scroll progress from 0.25-0.375 to 0-1 for this section
    const transformProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.125));

    // Apply smooth easing
    const easedProgress = easeInOutCubic(transformProgress);

    // Interpolate position from chaos to order
    groupRef.current.position.x = lerp(startPos[0], endPos[0], easedProgress);
    groupRef.current.position.y = lerp(startPos[1], endPos[1], easedProgress);
    groupRef.current.position.z = lerp(startPos[2], endPos[2], easedProgress);

    // Synchronized rotation when in final position
    if (transformProgress > 0.7) {
      const rotationSpeed = 0.003;
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.1;
    } else {
      // Slower rotation during transformation
      groupRef.current.rotation.y += 0.01 * (1 - easedProgress);
      groupRef.current.rotation.x += 0.008 * (1 - easedProgress);
    }

    // Scale effect - slight grow as they organize
    const scaleFactor = lerp(0.8, 1, easedProgress);
    groupRef.current.scale.setScalar(scale * scaleFactor);
  });

  return (
    <group ref={groupRef}>
      {/* Solid shape with emissive glow */}
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.02}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.3}
        />
      </mesh>
    </group>
  );
};

export const OrderElements = ({ scrollProgress }) => {
  // Opacity control - fade in at start, stay visible throughout section
  const transformProgress = Math.max(0, Math.min(1, (scrollProgress - 0.25) / 0.125));
  const opacity = transformProgress < 0.1 ? transformProgress / 0.1 : 1;

  // Define organized final positions in a circular pattern
  const radius = 3;
  const angleStep = (Math.PI * 2) / 8;

  // Define shapes with chaotic start positions and organized end positions
  const elements = [
    {
      id: 1,
      geometry: <boxGeometry args={[0.6, 0.6, 0.6]} />,
      startPos: [-4, 2, -1],
      endPos: [Math.cos(angleStep * 0) * radius, Math.sin(angleStep * 0) * radius, 0],
      color: '#00ffff', // cyan
      scale: 0.7,
    },
    {
      id: 2,
      geometry: <sphereGeometry args={[0.35, 32, 32]} />,
      startPos: [3, -2, 1],
      endPos: [Math.cos(angleStep * 1) * radius, Math.sin(angleStep * 1) * radius, 0],
      color: '#4da6ff', // light blue
      scale: 0.8,
    },
    {
      id: 3,
      geometry: <boxGeometry args={[0.5, 0.5, 0.5]} />,
      startPos: [-2, -3, -2],
      endPos: [Math.cos(angleStep * 2) * radius, Math.sin(angleStep * 2) * radius, 0],
      color: '#00ffff', // cyan
      scale: 0.6,
    },
    {
      id: 4,
      geometry: <octahedronGeometry args={[0.4]} />,
      startPos: [4, 3, 2],
      endPos: [Math.cos(angleStep * 3) * radius, Math.sin(angleStep * 3) * radius, 0],
      color: '#80d4ff', // pale blue
      scale: 0.7,
    },
    {
      id: 5,
      geometry: <sphereGeometry args={[0.3, 32, 32]} />,
      startPos: [-3, 1, 2],
      endPos: [Math.cos(angleStep * 4) * radius, Math.sin(angleStep * 4) * radius, 0],
      color: '#00ffff', // cyan
      scale: 0.6,
    },
    {
      id: 6,
      geometry: <icosahedronGeometry args={[0.35]} />,
      startPos: [2, -4, -1],
      endPos: [Math.cos(angleStep * 5) * radius, Math.sin(angleStep * 5) * radius, 0],
      color: '#4da6ff', // light blue
      scale: 0.7,
    },
    {
      id: 7,
      geometry: <boxGeometry args={[0.55, 0.55, 0.55]} />,
      startPos: [0, 4, -2],
      endPos: [Math.cos(angleStep * 6) * radius, Math.sin(angleStep * 6) * radius, 0],
      color: '#b3e0ff', // very pale blue
      scale: 0.65,
    },
    {
      id: 8,
      geometry: <octahedronGeometry args={[0.38]} />,
      startPos: [-4, -1, 1],
      endPos: [Math.cos(angleStep * 7) * radius, Math.sin(angleStep * 7) * radius, 0],
      color: '#00ffff', // cyan
      scale: 0.7,
    },
  ];

  if (opacity <= 0) return null;

  return (
    <group>
      {/* Center sphere that appears when elements are organized */}
      {transformProgress > 0.5 && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#00ffff"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
            transparent={true}
            opacity={Math.min(1, (transformProgress - 0.5) * 2)}
          />
        </mesh>
      )}

      {elements.map((element, index) => (
        <OrderElement
          key={element.id}
          geometry={element.geometry}
          startPos={element.startPos}
          endPos={element.endPos}
          color={element.color}
          scale={element.scale}
          scrollProgress={scrollProgress}
          index={index}
        />
      ))}
    </group>
  );
};
