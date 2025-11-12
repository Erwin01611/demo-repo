import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Philosophy.css';

gsap.registerPlugin(ScrollTrigger);

export const Philosophy = () => {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const principlesRef = useRef([]);
  const closingRef = useRef(null);

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

      // Animate label
      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // Animate headline with scale
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 },
        '-=0.3'
      )
      // Animate principles with stagger
      .fromTo(
        principlesRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.3,
          onStart: function() {
            // Add subtle highlight effect as each principle appears
            this.targets().forEach((target, index) => {
              gsap.fromTo(
                target,
                { backgroundColor: 'rgba(100, 150, 255, 0.1)' },
                {
                  backgroundColor: 'rgba(100, 150, 255, 0)',
                  duration: 1.2,
                  delay: index * 0.3
                }
              );
            });
          }
        },
        '-=0.4'
      )
      // Animate closing statement
      .fromTo(
        closingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      );
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="philosophy">
      <div className="philosophy-content">
        <p ref={labelRef} className="philosophy-label">
          MY APPROACH
        </p>

        <h2 ref={headlineRef} className="philosophy-headline">
          Humans should do interesting work. Let AI handle the rest.
        </h2>

        <div className="philosophy-principles">
          <div
            ref={(el) => (principlesRef.current[0] = el)}
            className="principle-item"
          >
            <span className="principle-mark">→</span>
            <span>Start with the problem, not the tool</span>
          </div>
          <div
            ref={(el) => (principlesRef.current[1] = el)}
            className="principle-item"
          >
            <span className="principle-mark">→</span>
            <span>Automate the boring, amplify the human</span>
          </div>
          <div
            ref={(el) => (principlesRef.current[2] = el)}
            className="principle-item"
          >
            <span className="principle-mark">→</span>
            <span>Build for maintainability, not just speed</span>
          </div>
          <div
            ref={(el) => (principlesRef.current[3] = el)}
            className="principle-item"
          >
            <span className="principle-mark">→</span>
            <span>Measure impact in hours saved and errors prevented</span>
          </div>
        </div>

        <p ref={closingRef} className="philosophy-closing">
          Technology serves people, not the other way around.
        </p>
      </div>
    </section>
  );
};
