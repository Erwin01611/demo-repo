import { Canvas3D } from './components/Canvas3D';
import { Hero, Problem } from './components/Sections';
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

        <section className="section section-3">
          <div className="content">
            <h2>Section 3</h2>
            <p>Smooth scroll-based animations</p>
          </div>
        </section>

        <section className="section section-4">
          <div className="content">
            <h2>Section 4</h2>
            <p>Inspired by lusion.co</p>
          </div>
        </section>

        <section className="section section-5">
          <div className="content">
            <h2>The End</h2>
            <p>Keep scrolling to see the sphere complete its rotation</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
