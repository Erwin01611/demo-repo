import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function for smooth easing
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Matching pair component (left shape + right shape + connecting line)
const MatchingPair = ({ pairIndex, leftStart, rightStart, finalY, scrollProgress }) => {
  const leftMeshRef = useRef();
  const rightMeshRef = useRef();
  const lineRef = useRef();

  useFrame(() => {
    if (!leftMeshRef.current || !rightMeshRef.current || !lineRef.current) return;

    // Map scroll progress from 0.5-0.625 to 0-1 for this section
    const matchProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.125));
    const easedProgress = easeInOutCubic(matchProgress);

    // Each pair starts matching at different times (staggered)
    const pairDelay = pairIndex * 0.12; // Stagger by 12%
    const pairProgress = Math.max(0, Math.min(1, (easedProgress - pairDelay) / (1 - pairDelay)));

    // Left shape positions
    const leftStartX = -4;
    const leftEndX = -1.5;
    const leftX = lerp(leftStartX, leftEndX, pairProgress);
    const leftY = lerp(leftStart[1], finalY, pairProgress);
    const leftZ = lerp(leftStart[2], 0, pairProgress);

    leftMeshRef.current.position.set(leftX, leftY, leftZ);

    // Right shape positions
    const rightStartX = 4;
    const rightEndX = 1.5;
    const rightX = lerp(rightStartX, rightEndX, pairProgress);
    const rightY = lerp(rightStart[1], finalY, pairProgress);
    const rightZ = lerp(rightStart[2], 0, pairProgress);

    rightMeshRef.current.position.set(rightX, rightY, rightZ);

    // Color transition: orange/red -> blue/green
    const unmatchedColor = new THREE.Color(pairIndex % 2 === 0 ? '#ff8844' : '#ff6644');
    const matchedColor = new THREE.Color(pairIndex % 3 === 0 ? '#64c8ff' : '#64ff96');

    const currentColor = new THREE.Color().lerpColors(unmatchedColor, matchedColor, pairProgress);

    leftMeshRef.current.material.color = currentColor;
    leftMeshRef.current.material.emissive = currentColor;
    leftMeshRef.current.material.emissiveIntensity = 0.3 + pairProgress * 0.3;

    rightMeshRef.current.material.color = currentColor;
    rightMeshRef.current.material.emissive = currentColor;
    rightMeshRef.current.material.emissiveIntensity = 0.3 + pairProgress * 0.3;

    // Update connecting line
    if (lineRef.current.geometry) {
      const positions = lineRef.current.geometry.attributes.position;
      positions.setXYZ(0, leftX, leftY, leftZ);
      positions.setXYZ(1, rightX, rightY, rightZ);
      positions.needsUpdate = true;
    }

    // Line opacity and color
    lineRef.current.material.opacity = pairProgress * 0.8;
    lineRef.current.material.color = matchedColor;
    lineRef.current.material.emissive = matchedColor;
    lineRef.current.material.emissiveIntensity = pairProgress * 1.5;
  });

  return (
    <group>
      {/* Left shape */}
      <mesh ref={leftMeshRef} position={[leftStart[0], leftStart[1], leftStart[2]]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#ff8844"
          emissive="#ff8844"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Right shape */}
      <mesh ref={rightMeshRef} position={[rightStart[0], rightStart[1], rightStart[2]]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color="#ff8844"
          emissive="#ff8844"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.3}
        />
      </mesh>

      {/* Connecting line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2}
            array={new Float32Array([
              leftStart[0], leftStart[1], leftStart[2],
              rightStart[0], rightStart[1], rightStart[2]
            ])}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#64c8ff"
          transparent={true}
          opacity={0}
          linewidth={2}
        />
      </line>
    </group>
  );
};

export const MatchingViz = ({ scrollProgress }) => {
  // Opacity control
  const matchProgress = Math.max(0, Math.min(1, (scrollProgress - 0.5) / 0.125));
  const opacity = matchProgress < 0.1 ? matchProgress / 0.1 : 1;

  if (opacity <= 0) return null;

  // Define 7 pairs with scattered start positions
  const pairs = [
    {
      id: 1,
      leftStart: [-4, 3, -1],
      rightStart: [4, 2.8, -1.2],
      finalY: 2.5,
    },
    {
      id: 2,
      leftStart: [-4, 1.5, 1],
      rightStart: [4, 1.3, 0.8],
      finalY: 1.5,
    },
    {
      id: 3,
      leftStart: [-4, 0, -1.5],
      rightStart: [4, 0.2, 1],
      finalY: 0.5,
    },
    {
      id: 4,
      leftStart: [-4, -1.5, 0.5],
      rightStart: [4, -1.3, -0.8],
      finalY: -0.5,
    },
    {
      id: 5,
      leftStart: [-4, -3, 1.2],
      rightStart: [4, -2.8, 0],
      finalY: -1.5,
    },
    {
      id: 6,
      leftStart: [-4, 2.2, 0.8],
      rightStart: [4, -0.5, -1.5],
      finalY: -2.5,
    },
    {
      id: 7,
      leftStart: [-4, -4, -0.5],
      rightStart: [4, 4, 1.5],
      finalY: -3.5,
    },
  ];

  return (
    <group>
      {/* Labels/indicators */}
      {matchProgress < 0.3 && (
        <>
          {/* Left side label */}
          <mesh position={[-4, 4.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff6644" transparent={true} opacity={1 - matchProgress * 3} />
          </mesh>

          {/* Right side label */}
          <mesh position={[4, 4.5, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial color="#ff6644" transparent={true} opacity={1 - matchProgress * 3} />
          </mesh>
        </>
      )}

      {/* Matching pairs */}
      {pairs.map((pair, index) => (
        <MatchingPair
          key={pair.id}
          pairIndex={index}
          leftStart={pair.leftStart}
          rightStart={pair.rightStart}
          finalY={pair.finalY}
          scrollProgress={scrollProgress}
        />
      ))}

      {/* Success indicator - appears when matching is complete */}
      {matchProgress > 0.8 && (
        <mesh position={[0, 4.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#64ff96"
            emissive="#64ff96"
            emissiveIntensity={1.2}
            transparent={true}
            opacity={Math.min(1, (matchProgress - 0.8) / 0.2)}
          />
        </mesh>
      )}
    </group>
  );
};
