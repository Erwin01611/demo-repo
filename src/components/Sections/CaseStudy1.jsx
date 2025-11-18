import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CaseStudy1.css';

gsap.registerPlugin(ScrollTrigger);

export const CaseStudy1 = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const contextRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const resultsRef = useRef([]);
  const techStackRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power2.out' },
      });

      // Animate label and title
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.3'
      )
      .fromTo(
        contextRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.4'
      )
      // Animate problem section
      .fromTo(
        problemRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.2'
      )
      // Animate solution section
      .fromTo(
        solutionRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.3'
      )
      // Animate results with emphasis
      .fromTo(
        resultsRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.15 },
        '-=0.2'
      )
      // Animate tech stack tags
      .fromTo(
        techStackRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
        '-=0.3'
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="case-study-1">
      <div className="case-study-content">
        <div className="case-study-header">
          <p ref={labelRef} className="case-study-label">
            CASE STUDY 01
          </p>
          <h2 ref={titleRef} className="case-study-title">
            Month-End Close Automation
          </h2>
          <p ref={contextRef} className="case-study-context">
            Global manufacturing firm, $2B revenue
          </p>
        </div>

        <div className="case-study-body">
          <div ref={problemRef} className="case-study-section">
            <h3 className="section-heading">The Challenge</h3>
            <ul className="section-list">
              <li>5-day manual close process</li>
              <li>30+ data sources requiring reconciliation</li>
              <li>High error rate causing delays</li>
            </ul>
          </div>

          <div ref={solutionRef} className="case-study-section">
            <h3 className="section-heading">The Solution</h3>
            <ul className="section-list">
              <li>Built Python automation pipeline</li>
              <li>Real-time data validation with Pandas</li>
              <li>Automated reconciliation algorithms</li>
            </ul>
          </div>

          <div className="case-study-results">
            <h3 className="section-heading">Results</h3>
            <div className="results-grid">
              <div
                ref={(el) => (resultsRef.current[0] = el)}
                className="result-card"
              >
                <div className="result-value">80%</div>
                <div className="result-label">Time reduction</div>
                <div className="result-detail">5 days → 1 day</div>
              </div>
              <div
                ref={(el) => (resultsRef.current[1] = el)}
                className="result-card"
              >
                <div className="result-value">Zero</div>
                <div className="result-label">Manual errors</div>
                <div className="result-detail">100% accuracy</div>
              </div>
              <div
                ref={(el) => (resultsRef.current[2] = el)}
                className="result-card"
              >
                <div className="result-value">$200K</div>
                <div className="result-label">Annual savings</div>
                <div className="result-detail">ROI in 6 months</div>
              </div>
            </div>
          </div>

          <div className="case-study-tech">
            <h3 className="section-heading">Tech Stack</h3>
            <div className="tech-stack">
              <span ref={(el) => (techStackRef.current[0] = el)} className="tech-tag">
                Python
              </span>
              <span ref={(el) => (techStackRef.current[1] = el)} className="tech-tag">
                Pandas
              </span>
              <span ref={(el) => (techStackRef.current[2] = el)} className="tech-tag">
                SQL
              </span>
              <span ref={(el) => (techStackRef.current[3] = el)} className="tech-tag">
                Power BI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
