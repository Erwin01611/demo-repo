import { Canvas } from '@react-three/fiber';
// import { RotatingSphere } from './RotatingSphere';
import { FloatingShapes } from './FloatingShapes';
import { ChaosElements } from './ChaosElements';
import './Canvas3D.css';

export const Canvas3D = ({ scrollProgress }) => {
  console.log('[Canvas3D] Rendering with scrollProgress:', scrollProgress);

  // Show FloatingShapes in Hero section (0-0.15)
  const showFloating = scrollProgress < 0.15;

  // Show ChaosElements in Problem section (0.1-0.3)
  const showChaos = scrollProgress > 0.1 && scrollProgress < 0.3;

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

        {showFloating && <FloatingShapes scrollProgress={scrollProgress} />}
        {showChaos && <ChaosElements scrollProgress={scrollProgress} />}

        {/* <RotatingSphere scrollProgress={scrollProgress} /> */}
      </Canvas>
    </div>
  );
};
