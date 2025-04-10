import React, { useState, useEffect } from 'react';
import IntroSection from './sections/IntroSection';
import TalentsSection from './sections/TalentsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ConclusionSection from './sections/ConclusionSection';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ScrollDebugger from './components/ScrollDebugger';
import AcademicJourney from './sections/AcademicJourney';
import BackgroundContainer from './backgrounds/BackgroundContainer';
import useScrollPosition from './hooks/useScrollPosition';

// Import styles - order matters, fixed.css must be last to override previous styles
import './styles/main.css';

const App = () => {
  const [showDebugger, setShowDebugger] = useState(false);
  
  // Use our custom hook for scroll position and active section
  const { position: scrollPosition, activeSection } = useScrollPosition();

  // Add keyboard shortcut to toggle debugger
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        setShowDebugger(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      {/* Background container - completely separate from content */}
      <BackgroundContainer 
        scrollPosition={scrollPosition} 
        activeSection={activeSection} 
      />
      
      {/* Main content */}
      <div className="app">
        {/* Main sections */}
        <IntroSection />
        <TalentsSection />
        <AcademicJourney />
        <ExperienceSection />
        <ProjectsSection />
        <ConclusionSection />
        
        {/* Navigation components */}
        <Navigation />
        <ScrollToTop />
        
        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <p>Scroll to explore</p>
          <div className="scroll-arrow">↓</div>
        </div>
        
        {/* Debugger - press Ctrl+D to toggle */}
        {showDebugger && (
          <ScrollDebugger 
            scrollPosition={scrollPosition} 
            activeSection={activeSection} 
          />
        )}
        
        {/* Simple scroll position display that's always visible */}
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '14px',
          fontFamily: 'monospace',
          zIndex: 1000
        }}>
          Scroll: {Math.round(scrollPosition)}px<br/>
          Section: {activeSection}
        </div>
      </div>
    </>
  );
};

export default App;