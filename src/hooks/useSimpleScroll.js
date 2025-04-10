import { useState, useEffect } from 'react';

/**
 * Simple hook to track scroll position and active section
 */
const useSimpleScroll = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeSection, setActiveSection] = useState('intro-section');

  useEffect(() => {
    // Simple scroll handler to track scroll position and active section
    function handleScroll() {
      // Get scroll position using multiple methods for cross-browser compatibility
      const position = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      
      // Update scroll position state
      setScrollPosition(position);
      
      // Simple section detection
      const sections = document.querySelectorAll('section');
      const offset = window.innerHeight / 3;
      
      sections.forEach(section => {
        if (!section || !section.id) return;
        
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        
        if (
          position >= sectionTop && 
          position < sectionTop + sectionHeight
        ) {
          setActiveSection(section.id);
        }
      });
    }
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { scrollPosition, activeSection };
};

export default useSimpleScroll;