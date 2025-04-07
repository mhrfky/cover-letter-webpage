import React, { useState, useEffect } from 'react';

const ScrollDebugger = () => {
  const [scrollInfo, setScrollInfo] = useState({
    scrollY: 0,
    windowHeight: 0,
    documentHeight: 0,
    sections: []
  });

  useEffect(() => {
    const updateScrollInfo = () => {
      const sections = Array.from(document.querySelectorAll('section')).map(section => ({
        id: section.id,
        offsetTop: section.offsetTop,
        height: section.offsetHeight,
        isInView: section.getBoundingClientRect().top < window.innerHeight && 
                 section.getBoundingClientRect().bottom > 0
      }));

      setScrollInfo({
        scrollY: window.scrollY,
        windowHeight: window.innerHeight,
        documentHeight: document.body.offsetHeight,
        sections
      });
    };

    window.addEventListener('scroll', updateScrollInfo);
    window.addEventListener('resize', updateScrollInfo);
    
    // Initial update
    updateScrollInfo();
    
    return () => {
      window.removeEventListener('scroll', updateScrollInfo);
      window.removeEventListener('resize', updateScrollInfo);
    };
  }, []);

  // Style for the debugger panel
  const debuggerStyle = {
    position: 'fixed',
    top: '10px',
    left: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '4px',
    zIndex: 9999,
    fontSize: '12px',
    width: '250px',
    maxHeight: '80vh',
    overflowY: 'auto'
  };

  return (
    <div style={debuggerStyle}>
      <h3>Scroll Debug Info</h3>
      <p>Scroll Y: {scrollInfo.scrollY}px</p>
      <p>Window Height: {scrollInfo.windowHeight}px</p>
      <p>Document Height: {scrollInfo.documentHeight}px</p>
      
      <h4>Sections:</h4>
      <ul>
        {scrollInfo.sections.map(section => (
          <li key={section.id} style={{color: section.isInView ? 'lime' : 'white'}}>
            {section.id}: Top {section.offsetTop}px, Height {section.height}px, 
            {section.isInView ? ' IN VIEW' : ' not in view'}
          </li>
        ))}
      </ul>
      
      <button 
        onClick={() => {
          document.querySelectorAll('section').forEach(section => {
            section.classList.add('debug-outline');
          });
        }}
        style={{marginTop: '10px', padding: '5px'}}
      >
        Highlight Sections
      </button>
    </div>
  );
};

export default ScrollDebugger;