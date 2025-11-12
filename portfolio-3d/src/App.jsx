import { Canvas3D } from './components/Canvas3D';
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
        <section className="section section-1">
          <div className="content">
            <h1>Portfolio 3D</h1>
            <p>Scroll to see the magic happen</p>
            <p className="scroll-indicator">Progress: {Math.round(scrollProgress * 100)}%</p>
          </div>
        </section>

        <section className="section section-2">
          <div className="content">
            <h2>Section 2</h2>
            <p>Watch the sphere rotate as you scroll</p>
          </div>
        </section>

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
