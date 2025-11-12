import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { RotatingSphere } from './RotatingSphere';
import './Canvas3D.css';

export const Canvas3D = ({ scrollProgress }) => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <RotatingSphere scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
