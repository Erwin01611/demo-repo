import { Canvas } from '@react-three/fiber';
// import { RotatingSphere } from './RotatingSphere';
import { FloatingShapes } from './FloatingShapes';
import './Canvas3D.css';

export const Canvas3D = ({ scrollProgress }) => {
  console.log('[Canvas3D] Rendering with scrollProgress:', scrollProgress);

  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'rgba(255, 0, 0, 0.1)' }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        <FloatingShapes scrollProgress={scrollProgress} />
        {/* <RotatingSphere scrollProgress={scrollProgress} /> */}
      </Canvas>
    </div>
  );
};
