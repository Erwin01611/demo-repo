import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function for smooth easing
const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

// Helper function for linear interpolation
const lerp = (start, end, t) => start + (end - start) * t;

// Individual bar component
const TimeBar = ({ index, scrollProgress }) => {
  const meshRef = useRef();

  useFrame(() => {
    if (!meshRef.current) return;

    // Map scroll progress from 0.375-0.5 to 0-1 for this section
    const caseStudyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.375) / 0.125));
    const easedProgress = easeInOutCubic(caseStudyProgress);

    // Start positions: 5 bars spread out (-4, -2, 0, 2, 4)
    const startX = (index - 2) * 2;
    // End position: all bars compress to center (0)
    const endX = 0;
    const targetX = lerp(startX, endX, easedProgress);

    // Start height: tall bars (different heights for visual interest)
    const startHeight = 3 - index * 0.2;
    // End height: bars become shorter, except the last one stays tall
    const endHeight = index === 4 ? 3 : 0.5;
    const targetHeight = lerp(startHeight, endHeight, easedProgress);

    // Position and scale
    meshRef.current.position.x = targetX;
    meshRef.current.scale.y = targetHeight;

    // Color transition: red/orange -> blue/green
    const startColor = new THREE.Color(index % 2 === 0 ? '#ff6644' : '#ff8844');
    const endColor = new THREE.Color('#64ff96');
    const currentColor = new THREE.Color().lerpColors(startColor, endColor, easedProgress);

    if (meshRef.current.material) {
      meshRef.current.material.color = currentColor;
      meshRef.current.material.emissive = currentColor;
      meshRef.current.material.emissiveIntensity = 0.4 + easedProgress * 0.2;
    }

    // Fade out bars 0-3 at the end
    if (index < 4) {
      meshRef.current.material.opacity = 1 - easedProgress * 0.8;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[(index - 2) * 2, 0, 0]}>
        <boxGeometry args={[0.8, 1, 0.8]} />
        <meshStandardMaterial
          color="#ff6644"
          emissive="#ff6644"
          emissiveIntensity={0.4}
          metalness={0.3}
          roughness={0.4}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </group>
  );
};

// Grid/timeline component
const Timeline = ({ scrollProgress }) => {
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;

    // Map scroll progress
    const caseStudyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.375) / 0.125));

    // Fade in timeline
    groupRef.current.children.forEach((child) => {
      if (child.material) {
        child.material.opacity = caseStudyProgress * 0.3;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Horizontal base line */}
      <mesh position={[0, -2, 0]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.3} />
      </mesh>

      {/* Vertical grid lines */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, -1, 0]}>
          <boxGeometry args={[0.05, 2, 0.05]} />
          <meshBasicMaterial color="#ffffff" transparent={true} opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// Label component
const Labels = ({ scrollProgress }) => {
  // Note: In a real implementation, you'd use Text from @react-three/drei
  // For now, we'll just add marker spheres
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;

    const caseStudyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.375) / 0.125));

    // Fade markers based on progress
    groupRef.current.children.forEach((child, index) => {
      if (child.material) {
        // First 4 markers fade out, last one stays
        if (index < 4) {
          child.material.opacity = (1 - caseStudyProgress) * 0.5;
        } else {
          child.material.opacity = 0.8;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {/* Day markers */}
      {[-4, -2, 0, 2, 4].map((x, i) => (
        <mesh key={i} position={[x, -2.5, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshBasicMaterial color="#64ff96" transparent={true} opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
};

export const CalendarViz = ({ scrollProgress }) => {
  // Opacity control
  const caseStudyProgress = Math.max(0, Math.min(1, (scrollProgress - 0.375) / 0.125));
  const opacity = caseStudyProgress < 0.1 ? caseStudyProgress / 0.1 : 1;

  if (opacity <= 0) return null;

  return (
    <group>
      {/* Timeline/Grid */}
      <Timeline scrollProgress={scrollProgress} />

      {/* Day markers */}
      <Labels scrollProgress={scrollProgress} />

      {/* 5 bars representing days */}
      {[0, 1, 2, 3, 4].map((index) => (
        <TimeBar key={index} index={index} scrollProgress={scrollProgress} />
      ))}

      {/* Success indicator - appears at end */}
      {caseStudyProgress > 0.7 && (
        <mesh position={[0, 2.5, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#64ff96"
            emissive="#64ff96"
            emissiveIntensity={0.8}
            transparent={true}
            opacity={Math.min(1, (caseStudyProgress - 0.7) / 0.3)}
          />
        </mesh>
      )}
    </group>
  );
};
