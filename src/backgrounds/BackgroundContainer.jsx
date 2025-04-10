import React from 'react';
import '../styles/backgrounds.css';

/**
 * BackgroundContainer - Simplified version for testing
 */
const BackgroundContainer = ({ scrollPosition, activeSection }) => {
  // Define background styles directly for testing
  const sectionBackgrounds = {
    'intro-section': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    'talents-section': 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
    'academic-journey': 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    'experience-section': 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    'projects-section': 'linear-gradient(135deg, #3a6186 0%, #89253e 100%)',
    'conclusion-section': 'linear-gradient(135deg, #004e92 0%, #000428 100%)',
    'highschool-section': 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)'
  };
  
  // Get current background or fallback to intro section
  const currentBackground = sectionBackgrounds[activeSection] || sectionBackgrounds['intro-section'];
  
  // Simple parallax calculation
  const parallaxOffset = 0//scrollPosition * 0.05;
  
  return (
    <div className="background-container">
      <div 
        className="background-layer far-layer"
        style={{
          background: currentBackground,
          transform: `translateY(-${parallaxOffset}px)`
        }}
      >
        {/* Debug info */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '8px',
          borderRadius: '4px',
          fontSize: '12px',
          maxWidth: '250px'
        }}>
          <div>Background active for: {activeSection}</div>
          <div>Scroll position: {Math.round(scrollPosition)}px</div>
          <div>Parallax offset: {Math.round(parallaxOffset)}px</div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundContainer;