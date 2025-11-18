import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CaseStudy3.css';

gsap.registerPlugin(ScrollTrigger);

export const CaseStudy3 = () => {
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
    <section ref={sectionRef} className="case-study-3">
      <div className="case-study-content">
        <div className="case-study-header">
          <p ref={labelRef} className="case-study-label">
            CASE STUDY 03
          </p>
          <h2 ref={titleRef} className="case-study-title">
            Enterprise Data Pipeline
          </h2>
          <p ref={contextRef} className="case-study-context">
            Tech company, 50M+ records daily
          </p>
        </div>

        <div className="case-study-body">
          <div ref={problemRef} className="case-study-section">
            <h3 className="section-heading">The Challenge</h3>
            <ul className="section-list">
              <li>Fragmented data across 15+ systems</li>
              <li>Manual ETL processes taking hours</li>
              <li>Data quality issues causing downstream errors</li>
            </ul>
          </div>

          <div ref={solutionRef} className="case-study-section">
            <h3 className="section-heading">The Solution</h3>
            <ul className="section-list">
              <li>Built scalable ETL pipeline with Python</li>
              <li>Automated data validation and cleaning</li>
              <li>Real-time monitoring and alerting</li>
            </ul>
          </div>

          <div className="case-study-results">
            <h3 className="section-heading">Results</h3>
            <div className="results-grid">
              <div
                ref={(el) => (resultsRef.current[0] = el)}
                className="result-card"
              >
                <div className="result-value">15</div>
                <div className="result-label">Systems unified</div>
                <div className="result-detail">Single pipeline</div>
              </div>
              <div
                ref={(el) => (resultsRef.current[1] = el)}
                className="result-card"
              >
                <div className="result-value">94%</div>
                <div className="result-label">Faster processing</div>
                <div className="result-detail">4hr → 15min</div>
              </div>
              <div
                ref={(el) => (resultsRef.current[2] = el)}
                className="result-card"
              >
                <div className="result-value">95%</div>
                <div className="result-label">Error reduction</div>
                <div className="result-detail">Near-zero defects</div>
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
                Apache Airflow
              </span>
              <span ref={(el) => (techStackRef.current[2] = el)} className="tech-tag">
                PostgreSQL
              </span>
              <span ref={(el) => (techStackRef.current[3] = el)} className="tech-tag">
                Docker
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
