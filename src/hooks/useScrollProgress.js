import { useState, useEffect } from 'react';

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);
    };

    // Calculate initial scroll progress
    calculateScrollProgress();

    // Add event listeners
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    window.addEventListener('resize', calculateScrollProgress, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      window.removeEventListener('resize', calculateScrollProgress);
    };
  }, []);

  return scrollProgress;
};
