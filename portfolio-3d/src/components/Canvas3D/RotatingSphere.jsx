import { useRef, useEffect } from 'react';

export const RotatingSphere = ({ scrollProgress }) => {
  const groupRef = useRef();

  useEffect(() => {
    console.log('[RotatingSphere] Component mounted!');
    return () => console.log('[RotatingSphere] Component unmounted!');
  }, []);

  useEffect(() => {
    console.log('[RotatingSphere] Scroll progress changed:', scrollProgress);
    if (groupRef.current) {
      // Rotate based on scroll progress
      // Full rotation = 2 * PI radians
      groupRef.current.rotation.y = scrollProgress * Math.PI * 4;
      groupRef.current.rotation.x = scrollProgress * Math.PI * 2;
      console.log('[RotatingSphere] Rotation updated:', {
        y: groupRef.current.rotation.y,
        x: groupRef.current.rotation.x
      });
    }
  }, [scrollProgress]);

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Solid magenta sphere with emissive glow */}
      <mesh>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={1}
          wireframe={false}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Cyan wireframe overlay - slightly larger to sit on top */}
      <mesh scale={1.01}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshBasicMaterial
          color="#00ffff"
          wireframe={true}
          transparent={true}
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};
