import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function for smooth easing
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Data particle component
const DataParticle = ({ index, scrollProgress }) => {
  const meshRef = useRef();
  const trailRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    // Map scroll progress from 0.625-0.75 to 0-1 for this section
    const pipelineProgress = Math.max(0, Math.min(1, (scrollProgress - 0.625) / 0.125));
    const easedProgress = easeInOutCubic(pipelineProgress);

    // Stagger particle flow
    const particleDelay = (index % 15) * 0.07; // Each of 15 sources starts at different time
    const particleProgress = Math.max(0, Math.min(1, (easedProgress - particleDelay) / (1 - particleDelay)));

    // Define start and end positions
    // Start: scattered on left side (representing 15 different systems)
    const row = Math.floor(index / 5);
    const col = index % 5;
    const startX = -5;
    const startY = -2 + row * 1.5;
    const startZ = -1 + col * 0.5;

    // End: organized grid on right side (unified output)
    const endRow = Math.floor(index / 5);
    const endCol = index % 5;
    const endX = 4;
    const endY = -2 + endRow * 1.5;
    const endZ = -0.5 + endCol * 0.5;

    // Intermediate position (pipeline processing in middle)
    const midX = 0;
    const midY = startY + Math.sin(index * 0.5) * 0.5; // Slight variation
    const midZ = 0;

    // Use bezier-like curve through pipeline
    let x, y, z;
    if (particleProgress < 0.5) {
      // First half: move from source to pipeline
      const t = particleProgress * 2;
      x = lerp(startX, midX, t);
      y = lerp(startY, midY, t);
      z = lerp(startZ, midZ, t);
    } else {
      // Second half: move from pipeline to output
      const t = (particleProgress - 0.5) * 2;
      x = lerp(midX, endX, t);
      y = lerp(midY, endY, t);
      z = lerp(midZ, endZ, t);
    }

    meshRef.current.position.set(x, y, z);

    // Color transition: chaotic colors -> unified purple/blue
    const chaoticColors = [
      new THREE.Color('#ff4444'),
      new THREE.Color('#ff8844'),
      new THREE.Color('#ffaa44'),
      new THREE.Color('#44ff88'),
      new THREE.Color('#4488ff'),
    ];
    const startColor = chaoticColors[index % chaoticColors.length];
    const endColor = new THREE.Color('#9664ff');

    const currentColor = new THREE.Color().lerpColors(startColor, endColor, particleProgress);

    meshRef.current.material.color = currentColor;
    meshRef.current.material.emissive = currentColor;
    meshRef.current.material.emissiveIntensity = 0.5 + particleProgress * 0.5;

    // Opacity
    meshRef.current.material.opacity = particleProgress < 0.05 ? particleProgress / 0.05 :
                                        particleProgress > 0.95 ? (1 - particleProgress) / 0.05 : 1;

    // Size pulsing
    const pulseSpeed = 2 + (index % 3) * 0.5;
    const pulseFactor = 1 + Math.sin(state.clock.elapsedTime * pulseSpeed) * 0.2 * (1 - particleProgress);
    meshRef.current.scale.setScalar(0.15 * pulseFactor);
  });

  return (
    <mesh ref={meshRef} position={[-5, 0, 0]}>
      <sphereGeometry args={[0.15, 16, 16]} />
      <meshStandardMaterial
        color="#ff4444"
        emissive="#ff4444"
        emissiveIntensity={0.5}
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
};

// Pipeline stage markers
const PipelineStage = ({ position, label, scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;

    const pipelineProgress = Math.max(0, Math.min(1, (scrollProgress - 0.625) / 0.125));

    // Pulse when active
    const pulseIntensity = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
    meshRef.current.material.emissiveIntensity = pipelineProgress * pulseIntensity;
    meshRef.current.material.opacity = pipelineProgress;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <cylinderGeometry args={[0.3, 0.3, 2, 16]} />
      <meshStandardMaterial
        color="#9664ff"
        emissive="#9664ff"
        emissiveIntensity={0.7}
        transparent={true}
        opacity={1}
        metalness={0.5}
        roughness={0.3}
      />
    </mesh>
  );
};

// Connection lines showing data flow
const FlowLine = ({ start, end, scrollProgress }) => {
  const lineRef = useRef();

  useFrame(() => {
    if (!lineRef.current) return;

    const pipelineProgress = Math.max(0, Math.min(1, (scrollProgress - 0.625) / 0.125));

    // Update line opacity and color
    lineRef.current.material.opacity = pipelineProgress * 0.3;

    // Animated dash offset for flow effect
    if (lineRef.current.material.dashOffset !== undefined) {
      lineRef.current.material.dashOffset -= 0.05;
    }
  });

  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2}
          array={new Float32Array([...start, ...end])}
          itemSize={3}
        />
      </bufferGeometry>
      <lineDashedMaterial
        color="#9664ff"
        transparent={true}
        opacity={0.3}
        linewidth={1}
        dashSize={0.5}
        gapSize={0.3}
      />
    </line>
  );
};

export const PipelineViz = ({ scrollProgress }) => {
  // Opacity control
  const pipelineProgress = Math.max(0, Math.min(1, (scrollProgress - 0.625) / 0.125));
  const opacity = pipelineProgress < 0.1 ? pipelineProgress / 0.1 : 1;

  if (opacity <= 0) return null;

  // Create 15 data particles (representing 15 systems)
  const particles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <group>
      {/* Source zone indicator (left) */}
      {pipelineProgress < 0.4 && (
        <>
          <mesh position={[-5, 0, 0]}>
            <boxGeometry args={[1, 4, 2]} />
            <meshBasicMaterial
              color="#ff6644"
              wireframe={true}
              transparent={true}
              opacity={(1 - pipelineProgress * 2.5) * 0.3}
            />
          </mesh>
          {/* Label sphere */}
          <mesh position={[-5, 3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial
              color="#ff6644"
              transparent={true}
              opacity={1 - pipelineProgress * 2.5}
            />
          </mesh>
        </>
      )}

      {/* Pipeline stages (middle) */}
      <PipelineStage position={[-1.5, 0, 0]} label="Extract" scrollProgress={scrollProgress} />
      <PipelineStage position={[0, 0, 0]} label="Transform" scrollProgress={scrollProgress} />
      <PipelineStage position={[1.5, 0, 0]} label="Load" scrollProgress={scrollProgress} />

      {/* Flow lines between stages */}
      {pipelineProgress > 0.2 && (
        <>
          <FlowLine start={[-5, 0, 0]} end={[-1.5, 0, 0]} scrollProgress={scrollProgress} />
          <FlowLine start={[-1.5, 0, 0]} end={[0, 0, 0]} scrollProgress={scrollProgress} />
          <FlowLine start={[0, 0, 0]} end={[1.5, 0, 0]} scrollProgress={scrollProgress} />
          <FlowLine start={[1.5, 0, 0]} end={[4, 0, 0]} scrollProgress={scrollProgress} />
        </>
      )}

      {/* Output zone indicator (right) */}
      {pipelineProgress > 0.6 && (
        <>
          <mesh position={[4, 0, 0]}>
            <boxGeometry args={[1, 4, 2]} />
            <meshBasicMaterial
              color="#9664ff"
              wireframe={true}
              transparent={true}
              opacity={Math.min(1, (pipelineProgress - 0.6) * 2.5) * 0.4}
            />
          </mesh>
          {/* Label sphere */}
          <mesh position={[4, 3, 0]}>
            <sphereGeometry args={[0.2, 16, 16]} />
            <meshBasicMaterial
              color="#9664ff"
              transparent={true}
              opacity={Math.min(1, (pipelineProgress - 0.6) * 2.5)}
            />
          </mesh>
        </>
      )}

      {/* Data particles flowing through pipeline */}
      {particles.map((index) => (
        <DataParticle key={index} index={index} scrollProgress={scrollProgress} />
      ))}

      {/* Success indicator - appears when pipeline is complete */}
      {pipelineProgress > 0.85 && (
        <mesh position={[0, 4, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial
            color="#9664ff"
            emissive="#9664ff"
            emissiveIntensity={1.5}
            transparent={true}
            opacity={Math.min(1, (pipelineProgress - 0.85) / 0.15)}
          />
        </mesh>
      )}
    </group>
  );
};
