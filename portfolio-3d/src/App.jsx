import { Canvas3D } from './components/Canvas3D';
import { Hero, Problem, Transformation, CaseStudy1, CaseStudy2 } from './components/Sections';
import { useScrollProgress } from './hooks/useScrollProgress';
import './App.css';

function App() {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Fixed 3D Canvas */}
      <Canvas3D scrollProgress={scrollProgress} />

      {/* Scrollable Content */}
      <div className="scroll-container">
        {/* Hero Section */}
        <Hero />

        {/* Problem Section */}
        <Problem />

        {/* Transformation Section */}
        <Transformation />

        {/* Case Study 1 */}
        <CaseStudy1 />

        {/* Case Study 2 */}
        <CaseStudy2 />
      </div>
    </>
  );
}

export default App;
