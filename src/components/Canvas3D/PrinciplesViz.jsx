import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function for smooth easing
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Central hub component
const CentralHub = ({ scrollProgress }) => {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Map scroll progress from 0.75-0.875 to 0-1 for this section
    const philosophyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.125));

    // Gentle rotation
    meshRef.current.rotation.y += 0.002;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;

    // Pulse effect
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
    meshRef.current.scale.setScalar(pulse);

    // Glow intensity based on progress
    meshRef.current.material.emissiveIntensity = 0.6 + philosophyProgress * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#a0b0ff"
        emissive="#a0b0ff"
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.2}
      />
    </mesh>
  );
};

// Orbiting node component
const OrbitingNode = ({ orbitRadius, orbitSpeed, startAngle, color, scrollProgress }) => {
  const meshRef = useRef();
  const lineRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Map scroll progress from 0.75-0.875 to 0-1
    const philosophyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.125));
    const easedProgress = easeInOutCubic(philosophyProgress);

    // Start scattered, move to orbital positions
    const scatteredRadius = orbitRadius * 2.5;
    const currentRadius = lerp(scatteredRadius, orbitRadius, easedProgress);

    // Calculate orbital position
    const angle = startAngle + state.clock.elapsedTime * orbitSpeed * easedProgress;
    const x = Math.cos(angle) * currentRadius;
    const y = Math.sin(angle) * currentRadius;
    const z = Math.sin(angle * 0.5) * 0.5 * easedProgress; // Slight 3D variation

    meshRef.current.position.set(x, y, z);

    // Rotation
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x += 0.005;

    // Update connection line to central hub
    if (lineRef.current && lineRef.current.geometry) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, 0, 0, 0); // Center
      positions.setXYZ(1, x, y, z); // Node position
      positions.needsUpdate = true;
    }

    // Line opacity based on progress
    if (lineRef.current) {
      lineRef.current.material.opacity = easedProgress * 0.4;

      // Pulse effect on lines
      const pulseLine = Math.sin(state.clock.elapsedTime * 2 + startAngle) * 0.2 + 0.8;
      lineRef.current.material.opacity = easedProgress * 0.4 * pulseLine;
    }
  });

  return (
    <group>
      {/* Node */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Connection line to center */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([0, 0, 0, 0, 0, 0])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent={true}
          opacity={0.4}
          linewidth={2}
        />
      </line>
    </group>
  );
};

// Rings or orbital paths (subtle guides)
const OrbitalPath = ({ radius, scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;

    const philosophyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.125));

    // Fade in orbital paths
    meshRef.current.material.opacity = philosophyProgress * 0.15;

    // Slow rotation
    meshRef.current.rotation.z += 0.001;
  });

  return (
    <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, 0.01, 16, 64]} />
      <meshBasicMaterial
        color="#8096ff"
        transparent={true}
        opacity={0.15}
      />
    </mesh>
  );
};

export const PrinciplesViz = ({ scrollProgress }) => {
  // Opacity control
  const philosophyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.75) / 0.125));
  const opacity = philosophyProgress < 0.1 ? philosophyProgress / 0.1 : 1;

  if (opacity <= 0) return null;

  // Define 4 orbiting nodes (representing 4 principles)
  const nodes = [
    {
      id: 1,
      orbitRadius: 2.5,
      orbitSpeed: 0.3,
      startAngle: 0,
      color: '#7080ff',
    },
    {
      id: 2,
      orbitRadius: 2.5,
      orbitSpeed: 0.25,
      startAngle: Math.PI / 2,
      color: '#90a0ff',
    },
    {
      id: 3,
      orbitRadius: 2.5,
      orbitSpeed: 0.35,
      startAngle: Math.PI,
      color: '#a0b0ff',
    },
    {
      id: 4,
      orbitRadius: 2.5,
      orbitSpeed: 0.28,
      startAngle: (Math.PI * 3) / 2,
      color: '#b0c0ff',
    },
  ];

  return (
    <group>
      {/* Orbital path guide */}
      <OrbitalPath radius={2.5} scrollProgress={scrollProgress} />

      {/* Central hub */}
      <CentralHub scrollProgress={scrollProgress} />

      {/* Orbiting nodes */}
      {nodes.map((node) => (
        <OrbitingNode
          key={node.id}
          orbitRadius={node.orbitRadius}
          orbitSpeed={node.orbitSpeed}
          startAngle={node.startAngle}
          color={node.color}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Ambient glow effect */}
      {philosophyProgress > 0.5 && (
        <mesh>
          <sphereGeometry args={[4, 32, 32]} />
          <meshBasicMaterial
            color="#a0b0ff"
            transparent={true}
            opacity={Math.min(0.03, (philosophyProgress - 0.5) * 0.06)}
            side={THREE.BackSide}
          />
        </mesh>
      )}
    </group>
  );
};
