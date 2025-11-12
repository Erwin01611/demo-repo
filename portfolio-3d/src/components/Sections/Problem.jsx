import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Problem.css';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const Problem = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const painPointsRef = useRef([]);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create timeline for scroll-triggered animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        defaults: { ease: 'power2.out' },
      });

      // Animate label first
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // Animate headline
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
      // Animate pain points with stagger
      .fromTo(
        painPointsRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.3 },
        '-=0.4'
      )
      // Animate bottom text
      .fromTo(
        bottomTextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="problem">
      <div className="problem-content">
        <p ref={labelRef} className="problem-label">
          THE REALITY
        </p>

        <h2 ref={headlineRef} className="problem-headline">
          Your team is drowning in repetitive work
        </h2>

        <ul className="problem-list">
          <li
            ref={(el) => (painPointsRef.current[0] = el)}
            className="problem-item"
          >
            <span className="problem-bullet">→</span>
            <span>5-day month-end close cycles</span>
          </li>
          <li
            ref={(el) => (painPointsRef.current[1] = el)}
            className="problem-item"
          >
            <span className="problem-bullet">→</span>
            <span>Manual reconciliation errors costing thousands</span>
          </li>
          <li
            ref={(el) => (painPointsRef.current[2] = el)}
            className="problem-item"
          >
            <span className="problem-bullet">→</span>
            <span>Hours wasted on data entry and validation</span>
          </li>
        </ul>

        <p ref={bottomTextRef} className="problem-question">
          Sound familiar?
        </p>
      </div>
    </section>
  );
};
