import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Transformation.css';

gsap.registerPlugin(ScrollTrigger);

export const Transformation = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const metricsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power3.out' },
      });

      // Animate label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // Animate headline with scale
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        '-=0.3'
      )
      // Animate subtext
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      // Animate metric cards with stagger
      .fromTo(
        metricsRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2 },
        '-=0.3'
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="transformation">
      <div className="transformation-content">
        <p ref={labelRef} className="transformation-label">
          THE TRANSFORMATION
        </p>

        <h2 ref={headlineRef} className="transformation-headline">
          From chaos to clarity in milliseconds
        </h2>

        <p ref={subtextRef} className="transformation-subtext">
          Watch complexity become simplicity through intelligent automation
        </p>

        <div className="transformation-metrics">
          <div
            ref={(el) => (metricsRef.current[0] = el)}
            className="metric-card"
          >
            <div className="metric-value">95% faster</div>
            <div className="metric-label">Processing time</div>
          </div>

          <div
            ref={(el) => (metricsRef.current[1] = el)}
            className="metric-card"
          >
            <div className="metric-value">Zero errors</div>
            <div className="metric-label">Accuracy rate</div>
          </div>

          <div
            ref={(el) => (metricsRef.current[2] = el)}
            className="metric-card"
          >
            <div className="metric-value">2-day close</div>
            <div className="metric-label">New timeline</div>
          </div>
        </div>
      </div>
    </section>
  );
};
