import { useRef, useEffect } from 'react';

export const RotatingSphere = ({ scrollProgress }) => {
  const meshRef = useRef();

  useEffect(() => {
    console.log('[RotatingSphere] Component mounted!');
    return () => console.log('[RotatingSphere] Component unmounted!');
  }, []);

  useEffect(() => {
    console.log('[RotatingSphere] Scroll progress changed:', scrollProgress);
    if (meshRef.current) {
      // Rotate based on scroll progress
      // Full rotation = 2 * PI radians
      meshRef.current.rotation.y = scrollProgress * Math.PI * 4;
      meshRef.current.rotation.x = scrollProgress * Math.PI * 2;
      console.log('[RotatingSphere] Rotation updated:', {
        y: meshRef.current.rotation.y,
        x: meshRef.current.rotation.x
      });
    }
  }, [scrollProgress]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
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
  );
};
