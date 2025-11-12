import { Canvas } from '@react-three/fiber';
// import { RotatingSphere } from './RotatingSphere';
import { FloatingShapes } from './FloatingShapes';
import { ChaosElements } from './ChaosElements';
import { OrderElements } from './OrderElements';
import { CalendarViz } from './CalendarViz';
import { MatchingViz } from './MatchingViz';
import './Canvas3D.css';

export const Canvas3D = ({ scrollProgress }) => {
  console.log('[Canvas3D] Rendering with scrollProgress:', scrollProgress);

  // Show FloatingShapes in Hero section (0-0.15)
  const showFloating = scrollProgress < 0.15;

  // Show ChaosElements in Problem section (0.1-0.28)
  const showChaos = scrollProgress > 0.1 && scrollProgress < 0.28;

  // Show OrderElements in Transformation section (0.23-0.42)
  const showOrder = scrollProgress > 0.23 && scrollProgress < 0.42;

  // Show CalendarViz in Case Study 1 section (0.37-0.54)
  const showCalendar = scrollProgress > 0.37 && scrollProgress < 0.54;

  // Show MatchingViz in Case Study 2 section (0.5-0.7)
  const showMatching = scrollProgress > 0.5 && scrollProgress < 0.7;

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
        {showOrder && <OrderElements scrollProgress={scrollProgress} />}
        {showCalendar && <CalendarViz scrollProgress={scrollProgress} />}
        {showMatching && <MatchingViz scrollProgress={scrollProgress} />}

        {/* <RotatingSphere scrollProgress={scrollProgress} /> */}
      </Canvas>
    </div>
  );
};
