import { useState, useEffect } from 'react';

/**
 * Hook to track scroll position and active section
 * This is completely isolated from other components
 */
const useScrollPosition = () => {
  // Track both scroll position and active section
  const [scrollData, setScrollData] = useState({
    position: 0,
    activeSection: 'intro-section'
  });

  // Set up the scroll listener
  useEffect(() => {
    // Function to get the current scroll position across browsers
    const getScrollPosition = () => {
      // Try multiple approaches for cross-browser compatibility
      return window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
    };

    // Function to determine active section
    const determineActiveSection = (scrollPos) => {
      const sections = document.querySelectorAll('section');
      const offset = window.innerHeight / 3;
      let newActiveSection = scrollData.activeSection; // Default to current

      sections.forEach(section => {
        if (!section || !section.id) return;
        
        const sectionTop = section.offsetTop - offset;
        const sectionHeight = section.offsetHeight;
        
        if (
          scrollPos >= sectionTop && 
          scrollPos < sectionTop + sectionHeight
        ) {
          newActiveSection = section.id;
        }
      });

      return newActiveSection;
    };

    // Combined scroll handler
    const handleScroll = () => {
      const position = getScrollPosition();
      const activeSection = determineActiveSection(position);
      
      // Only update if something changed
      if (position !== scrollData.position || activeSection !== scrollData.activeSection) {
        console.log(`Scroll detected: ${position}px, active: ${activeSection}`);
        setScrollData({ position, activeSection });
      }
    };
    
    // Add scroll listener with options for best performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollData.activeSection, scrollData.position]);

  return scrollData;
};

export default useScrollPosition;