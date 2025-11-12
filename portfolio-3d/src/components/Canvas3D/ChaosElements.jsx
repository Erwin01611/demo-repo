import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Individual chaos element component
const ChaosElement = ({
  geometry,
  position,
  rotationSpeed,
  color,
  scale,
  scrollProgress,
  chaosOffset,
}) => {
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;

    // Map scroll progress from 0.125-0.25 to 0-1 for this section
    const problemProgress = Math.max(0, Math.min(1, (scrollProgress - 0.125) / 0.125));

    // Calculate chaos intensity (peaks in the middle)
    // Goes from 0 → 1 → 0 as problemProgress goes 0 → 0.5 → 1
    const chaosIntensity = Math.sin(problemProgress * Math.PI);

    // Apply chaotic movement
    const chaosX = Math.sin(state.clock.elapsedTime * chaosOffset[0]) * chaosIntensity * 2;
    const chaosY = Math.cos(state.clock.elapsedTime * chaosOffset[1]) * chaosIntensity * 2;
    const chaosZ = Math.sin(state.clock.elapsedTime * chaosOffset[2]) * chaosIntensity * 1.5;

    groupRef.current.position.x = position[0] + chaosX;
    groupRef.current.position.y = position[1] + chaosY;
    groupRef.current.position.z = position[2] + chaosZ;

    // Erratic rotation (faster during chaos)
    groupRef.current.rotation.x += rotationSpeed[0] * (1 + chaosIntensity * 2);
    groupRef.current.rotation.y += rotationSpeed[1] * (1 + chaosIntensity * 2);
    groupRef.current.rotation.z += rotationSpeed[2] * (1 + chaosIntensity * 2);

    // Scale pulsing
    const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1 * chaosIntensity;
    groupRef.current.scale.setScalar(scale * pulseFactor);
  });

  return (
    <group ref={groupRef}>
      {/* Solid shape with emissive glow */}
      <mesh>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.02}>
        {geometry}
        <meshBasicMaterial
          color={color}
          wireframe={true}
          transparent={true}
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};

export const ChaosElements = ({ scrollProgress }) => {
  // Opacity control - fade in at start of section, fade out at end
  const problemProgress = Math.max(0, Math.min(1, (scrollProgress - 0.125) / 0.125));
  const opacity = problemProgress < 0.1 ? problemProgress / 0.1 :
                  problemProgress > 0.9 ? (1 - problemProgress) / 0.1 : 1;

  // Define chaotic shapes with warning colors
  const elements = [
    {
      id: 1,
      geometry: <boxGeometry args={[0.8, 0.8, 0.8]} />,
      position: [-3, 2, -1],
      rotationSpeed: [0.02, 0.025, 0.015],
      chaosOffset: [1.2, 0.8, 1.5],
      color: '#ff4444', // red
      scale: 0.6,
    },
    {
      id: 2,
      geometry: <cylinderGeometry args={[0.3, 0.3, 1.2, 8]} />,
      position: [4, -1, 0],
      rotationSpeed: [0.018, 0.03, 0.012],
      chaosOffset: [0.9, 1.4, 1.1],
      color: '#ff6644', // orange-red
      scale: 0.7,
    },
    {
      id: 3,
      geometry: <boxGeometry args={[1.2, 0.4, 0.4]} />,
      position: [-2, -2, 1],
      rotationSpeed: [0.025, 0.015, 0.028],
      chaosOffset: [1.5, 1.0, 0.7],
      color: '#444444', // dark gray
      scale: 0.5,
    },
    {
      id: 4,
      geometry: <coneGeometry args={[0.5, 1, 8]} />,
      position: [3, 3, -2],
      rotationSpeed: [0.022, 0.035, 0.018],
      chaosOffset: [0.8, 1.6, 1.3],
      color: '#ff8844', // orange
      scale: 0.6,
    },
    {
      id: 5,
      geometry: <octahedronGeometry args={[0.6]} />,
      position: [-4, 0, 2],
      rotationSpeed: [0.03, 0.02, 0.025],
      chaosOffset: [1.1, 0.9, 1.7],
      color: '#666666', // gray
      scale: 0.5,
    },
    {
      id: 6,
      geometry: <boxGeometry args={[0.5, 1.5, 0.5]} />,
      position: [1, -3, -1],
      rotationSpeed: [0.028, 0.018, 0.032],
      chaosOffset: [1.4, 1.2, 0.6],
      color: '#ff4444', // red
      scale: 0.4,
    },
    {
      id: 7,
      geometry: <tetrahedronGeometry args={[0.7]} />,
      position: [0, 2, 2],
      rotationSpeed: [0.015, 0.028, 0.022],
      chaosOffset: [0.7, 1.5, 1.0],
      color: '#ff6644', // orange-red
      scale: 0.5,
    },
    {
      id: 8,
      geometry: <cylinderGeometry args={[0.2, 0.5, 1, 6]} />,
      position: [-1, -1, -2],
      rotationSpeed: [0.032, 0.022, 0.018],
      chaosOffset: [1.6, 0.8, 1.2],
      color: '#884444', // dark red
      scale: 0.6,
    },
    {
      id: 9,
      geometry: <boxGeometry args={[0.6, 0.6, 1.2]} />,
      position: [5, 1, 1],
      rotationSpeed: [0.02, 0.03, 0.025],
      chaosOffset: [0.9, 1.3, 1.4],
      color: '#555555', // dark gray
      scale: 0.5,
    },
    {
      id: 10,
      geometry: <dodecahedronGeometry args={[0.5]} />,
      position: [-3, -4, 0],
      rotationSpeed: [0.025, 0.02, 0.03],
      chaosOffset: [1.3, 1.1, 0.9],
      color: '#ff8844', // orange
      scale: 0.4,
    },
  ];

  if (opacity <= 0) return null;

  return (
    <group opacity={opacity}>
      {elements.map((element) => (
        <ChaosElement
          key={element.id}
          geometry={element.geometry}
          position={element.position}
          rotationSpeed={element.rotationSpeed}
          color={element.color}
          scale={element.scale}
          scrollProgress={scrollProgress}
          chaosOffset={element.chaosOffset}
        />
      ))}
    </group>
  );
};
