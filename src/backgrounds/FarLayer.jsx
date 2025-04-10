import React, { useMemo, useEffect } from 'react';

/**
 * FarLayer - Handles the furthest background layer with the slowest parallax movement
 * This component just renders different backgrounds based on the active section
 * and applies subtle parallax effects.
 */
const FarLayer = ({ activeSection, scrollPosition }) => {
  // Log when props change to help debug
  useEffect(() => {
    console.log("FarLayer received new props:", { activeSection, scrollPosition });
  }, [activeSection, scrollPosition]);

  // Define background styles for each section
  const sectionBackgrounds = useMemo(() => ({
    'intro-section': {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
    },
    'talents-section': {
      background: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
    },
    'academic-journey': {
      background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    },
    'experience-section': {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
    },
    'projects-section': {
      background: 'linear-gradient(135deg, #3a6186 0%, #89253e 100%)',
    },
    'conclusion-section': {
      background: 'linear-gradient(135deg, #004e92 0%, #000428 100%)',
    },
    'highschool-section': {
      background: 'linear-gradient(135deg, #4b6cb7 0%, #182848 100%)',
    }
  }), []);

  // Calculate parallax effect for the far layer (slowest movement)
  const parallaxOffset = useMemo(() => {
    return scrollPosition * 0.05; // Very small multiplier for subtle movement
  }, [scrollPosition]);

  return (
    <div className="background-layer far-layer">
      {/* Render a background div for each section */}
      {Object.entries(sectionBackgrounds).map(([sectionId, styles]) => (
        <div
          key={sectionId}
          className={`section-background ${activeSection === sectionId ? 'active' : ''}`}
          style={{
            ...styles,
            transform: `translateY(-${parallaxOffset}px)`,
            opacity: activeSection === sectionId ? 1 : 0
          }}
        >
          {/* Debug text to show which background is active - remove in production */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: 'white',
            background: 'rgba(0,0,0,0.5)',
            padding: '5px',
            borderRadius: '4px',
            fontSize: '12px',
            display: activeSection === sectionId ? 'block' : 'none'
          }}>
            Active: {sectionId}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FarLayer;