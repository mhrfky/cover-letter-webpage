import React from 'react';
import { useScroll } from '../context/ScrollContext';

const FarLayer = ({ config }) => {
  const { scrollPercent } = useScroll();
  
  // Determine which background should be visible based on scroll percentage
  const getCurrentBackground = () => {
    for (const bg of config.backgrounds) {
      if (scrollPercent >= bg.startAt && scrollPercent <= bg.endAt) {
        return bg;
      }
    }
    return config.backgrounds[0]; // Default to first background
  };
  
  const currentBg = getCurrentBackground();
  
  // Calculate transition progress when between backgrounds
  const getTransitionProgress = (bg) => {
    const nextBgIndex = config.backgrounds.findIndex(b => b.id === bg.id) + 1;
    if (nextBgIndex >= config.backgrounds.length) return 0;
    
    const nextBg = config.backgrounds[nextBgIndex];
    const transitionStart = nextBg.startAt - 0.05; // Start transition slightly before next bg
    
    if (scrollPercent < transitionStart) return 0;
    if (scrollPercent > nextBg.startAt) return 1;
    
    return (scrollPercent - transitionStart) / (nextBg.startAt - transitionStart);
  };
  
  const transitionProgress = getTransitionProgress(currentBg);
  const nextBgIndex = config.backgrounds.findIndex(b => b.id === currentBg.id) + 1;
  const nextBg = nextBgIndex < config.backgrounds.length ? config.backgrounds[nextBgIndex] : null;
  
  // Calculate parallax effect
  const getParallaxStyle = (bg) => {
    // Slow movement based on scroll position
    const yOffset = scrollPercent * -50; // Move slightly upward as we scroll
    
    return {
      transform: `translateY(${yOffset}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };
  
  const parallaxStyle = getParallaxStyle(currentBg);
  
  return (
    <div className="far-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      {/* Current background */}
      <div 
        className="background-element"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: currentBg.type === 'gradient' 
            ? currentBg.value 
            : `url(${currentBg.value})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 1 - transitionProgress,
          ...parallaxStyle
        }}
      />
      
      {/* Next background (for transition) */}
      {nextBg && transitionProgress > 0 && (
        <div 
          className="background-element"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: nextBg.type === 'gradient' 
              ? nextBg.value 
              : `url(${nextBg.value})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: transitionProgress,
            ...getParallaxStyle(nextBg)
          }}
        />
      )}
    </div>
  );
};

export default FarLayer;