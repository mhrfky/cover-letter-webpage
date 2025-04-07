import React from 'react';
import { useScroll } from '../context/ScrollContext';

const MidLayer = ({ config }) => {
  const { scrollPercent } = useScroll();
  
  // Check which elements should be visible at current scroll position
  const getVisibleElements = () => {
    return config.elements.filter(element => 
      scrollPercent >= element.startAt && scrollPercent <= element.endAt
    );
  };
  
  const visibleElements = getVisibleElements();
  
  // Calculate parallax effect for mid-layer elements
  // Mid layer moves faster than far layer but slower than near layer
  const getParallaxStyle = (element) => {
    const parallaxFactor = element.parallaxFactor || 1;
    const baseOffset = scrollPercent * -150 * parallaxFactor; // More movement than far layer
    
    // Add element-specific offsets
    let xOffset = baseOffset * (element.direction?.x || 0);
    let yOffset = baseOffset * (element.direction?.y || 1); // Default vertical movement
    
    // Calculate progress within element's visible range
    const visibleRange = element.endAt - element.startAt;
    const elementProgress = (scrollPercent - element.startAt) / visibleRange;
    
    // Apply any custom animation based on progress
    if (element.animation) {
      switch (element.animation.type) {
        case 'fade':
          const opacity = element.animation.fadeIn 
            ? Math.min(1, elementProgress * 2) 
            : Math.max(0, 1 - elementProgress * 2);
          return {
            transform: `translate(${xOffset}px, ${yOffset}px)`,
            opacity,
            transition: 'transform 0.1s ease-out, opacity 0.5s ease-out'
          };
        case 'scale':
          const startScale = element.animation.startScale || 0.5;
          const endScale = element.animation.endScale || 1.5;
          const scale = startScale + (endScale - startScale) * elementProgress;
          return {
            transform: `translate(${xOffset}px, ${yOffset}px) scale(${scale})`,
            transition: 'transform 0.1s ease-out'
          };
        case 'rotate':
          const startAngle = element.animation.startAngle || 0;
          const endAngle = element.animation.endAngle || 360;
          const rotation = startAngle + (endAngle - startAngle) * elementProgress;
          return {
            transform: `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          };
        default:
          return {
            transform: `translate(${xOffset}px, ${yOffset}px)`,
            transition: 'transform 0.1s ease-out'
          };
      }
    }
    
    return {
      transform: `translate(${xOffset}px, ${yOffset}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };
  
  return (
    <div className="mid-layer" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}>
      {visibleElements.map((element, index) => {
        const elementStyle = getParallaxStyle(element);
        
        // Render different types of mid-layer elements
        let elementContent;
        switch (element.type) {
          case 'shape':
            elementContent = (
              <div 
                style={{
                  width: element.size?.width || 100,
                  height: element.size?.height || 100,
                  backgroundColor: element.color || 'rgba(255, 255, 255, 0.2)',
                  borderRadius: element.borderRadius || 0,
                  boxShadow: element.shadow || 'none'
                }}
              />
            );
            break;
          case 'image':
            elementContent = (
              <img 
                src={element.src} 
                alt={element.alt || 'Parallax element'} 
                style={{
                  width: element.size?.width || 'auto',
                  height: element.size?.height || 'auto',
                  objectFit: element.objectFit || 'contain'
                }}
              />
            );
            break;
          case 'text':
            elementContent = (
              <div 
                style={{
                  color: element.color || 'white',
                  fontFamily: element.fontFamily || 'inherit',
                  fontSize: element.fontSize || '2rem',
                  fontWeight: element.fontWeight || 'normal',
                  textShadow: element.textShadow || 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {element.content}
              </div>
            );
            break;
          default:
            elementContent = null;
        }
        
        return (
          <div 
            key={element.id || index}
            className="mid-layer-element"
            style={{
              position: 'absolute',
              top: `${element.position?.y || 50}%`,
              left: `${element.position?.x || 50}%`,
              transform: `translate(-50%, -50%)`,
              ...elementStyle
            }}
          >
            {elementContent}
          </div>
        );
      })}
    </div>
  );
};

export default MidLayer;