import React, { useEffect, useState } from 'react';

const ScrollDebugger = ({ scrollPosition, activeSection }) => {
  const [sections, setSections] = useState([]);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  
  // Collect section information on mount and when active section changes
  useEffect(() => {
    const sectionElements = document.querySelectorAll('section');
    const offset = window.innerHeight / 3;
    
    const sectionData = Array.from(sectionElements).map(section => {
      const rect = section.getBoundingClientRect();
      const sectionTop = section.offsetTop - offset;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      return {
        id: section.id,
        top: sectionTop,
        bottom: sectionBottom,
        height: section.offsetHeight,
        isActive: section.id === activeSection,
        isVisible: (
          scrollPosition >= sectionTop && 
          scrollPosition < sectionBottom
        )
      };
    });
    
    setSections(sectionData);
    setViewport({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }, [activeSection, scrollPosition]);
  
  const debuggerStyle = {
    position: 'fixed',
    bottom: '10px',
    left: '10px',
    background: 'rgba(0, 0, 0, 0.8)',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    zIndex: 1000,
    fontFamily: 'monospace',
    fontSize: '12px',
    maxWidth: '300px',
    maxHeight: '80vh',
    overflow: 'auto'
  };

  return (
    <div style={debuggerStyle}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Debug Info</div>
      
      <div>Scroll Position: {Math.round(scrollPosition)}px</div>
      <div>Active Section: {activeSection}</div>
      <div>Window: {viewport.width}x{viewport.height}px</div>
      <div>Document Height: {document.body.scrollHeight}px</div>
      
      <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Sections:</div>
      <div style={{ fontSize: '10px' }}>
        {sections.map(section => (
          <div 
            key={section.id}
            style={{ 
              margin: '5px 0',
              padding: '5px',
              background: section.isActive ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
              border: section.isVisible ? '1px solid rgba(255, 255, 255, 0.5)' : 'none'
            }}
          >
            <div>{section.id}</div>
            <div>Range: {Math.round(section.top)}px - {Math.round(section.bottom)}px</div>
            <div>Height: {Math.round(section.height)}px</div>
            <div>State: {section.isActive ? '✓ Active' : ''} {section.isVisible ? '👁 Visible' : ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollDebugger;