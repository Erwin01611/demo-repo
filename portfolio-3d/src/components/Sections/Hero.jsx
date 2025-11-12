import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Hero.css';

export const Hero = () => {
  const questionsRef = useRef([]);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // GSAP animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate questions with stagger
    tl.fromTo(
      questionsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    )
    // Animate name
    .fromTo(
      nameRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3' // Start slightly before previous animation ends
    )
    // Animate subtitle
    .fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-questions">
          <p
            ref={(el) => (questionsRef.current[0] = el)}
            className="hero-question"
          >
            What if your month-end close took 2 days instead of 5?
          </p>
          <p
            ref={(el) => (questionsRef.current[1] = el)}
            className="hero-question"
          >
            What if reconciliation happened automatically with zero errors?
          </p>
          <p
            ref={(el) => (questionsRef.current[2] = el)}
            className="hero-question hero-question-emphasis"
          >
            That's what I build.
          </p>
        </div>

        <h1 ref={nameRef} className="hero-name">
          Farrukh Mirzaev
        </h1>

        <p ref={subtitleRef} className="hero-subtitle">
          Automation-First Data Scientist
        </p>
      </div>
    </section>
  );
};
