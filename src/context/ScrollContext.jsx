import React, { createContext, useContext, useState, useEffect } from 'react';

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [totalHeight, setTotalHeight] = useState(5000); // Initial height, can be adjusted

  useEffect(() => {
    // Set the body height to enable scrolling
    document.body.style.height = `${totalHeight}px`;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Calculate scroll percentage (0 to 1)
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const currentPercent = Math.min(currentScrollY / maxScroll, 1);
      setScrollPercent(currentPercent);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to initialize values
    handleScroll();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [totalHeight]);

  const setHeight = (height) => {
    setTotalHeight(height);
  };

  return (
    <ScrollContext.Provider value={{ scrollY, scrollPercent, totalHeight, setHeight }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};