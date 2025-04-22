// UIManager.jsx - Final version with fixed animation handling
import React, { useState, useEffect, useRef } from 'react';
import { useScroll } from '../../context/ScrollContext';
import '../../styles/animations.css';

const UIManager = ({ elements, debug = false }) => {
  const { scrollY, scrollPercent, totalHeight } = useScroll();
  const elementRefs = useRef({});
  const [renderCount, setRenderCount] = useState(0); // To force re-renders
  const animationFrameRef = useRef(null);
  
  // Debug logger
  const debugLog = (message, data) => {
    if (debug) {
      console.log(`%c[UIManager] ${message}`, 'background: #333; color: #bada55', data || '');
    }
  };

  // Initialize refs and track animation state
  useEffect(() => {
    elements.forEach(element => {
      if (!elementRefs.current[element.id]) {
        elementRefs.current[element.id] = { 
          isVisible: false,
          isAnimating: false,
          wasEverVisible: false,
          // Initial state for animation sequence
          animationState: 'new', // new -> hidden -> animating -> visible
          // Capture animation config
          animationType: element.animationType || 'fade',
          duration: element.animationDuration || 'normal',
          easing: element.animationEasing || 'smooth'
        };
        
        debugLog(`Initialized element: ${element.id}`, {
          animationType: element.animationType || 'fade',
          duration: element.animationDuration || 'normal',
          easing: element.animationEasing || 'smooth'
        });
      }
    });
  }, [elements, debug]);
  
  // Step 1: First render for new elements - set them to hidden state
  useEffect(() => {
    const newElements = elements.filter(element => {
      const elementRef = elementRefs.current[element.id];
      return elementRef && elementRef.animationState === 'new';
    });

    if (newElements.length > 0) {
      debugLog('Step 1: Preparing new elements', newElements.map(e => e.id));
      
      // Set elements to hidden state
      newElements.forEach(element => {
        const ref = elementRefs.current[element.id];
        if (ref) {
          ref.animationState = 'hidden';
          debugLog(`Set ${element.id} to hidden state`);
        }
      });
      
      // Force a render to ensure hidden state is applied
      setRenderCount(prev => prev + 1);
      
      // Schedule next step with requestAnimationFrame for proper timing
      animationFrameRef.current = requestAnimationFrame(() => {
        // Step 2: After hidden state is applied, set elements that should be visible to animating
        const currentPosition = scrollPercent * totalHeight;
        
        debugLog('Step 2: Starting animations for visible elements', { currentPosition });
        
        newElements.forEach(element => {
          const shouldBeVisible = 
            currentPosition >= element.triggerStart && 
            currentPosition <= element.triggerEnd;
          
          const ref = elementRefs.current[element.id];
          if (ref && shouldBeVisible) {
            ref.animationState = 'animating';
            ref.isVisible = true;
            ref.wasEverVisible = true;
            
            debugLog(`Starting animation for ${element.id}`);
            
            if (element.onEnter) {
              element.onEnter();
            }
            
            // Schedule transition to 'visible' state after animation completes
            const duration = element.animationDuration === 'slow' ? 1500 : 
                           element.animationDuration === 'fast' ? 500 : 1000;
            
            setTimeout(() => {
              if (elementRefs.current[element.id]) {
                elementRefs.current[element.id].animationState = 'visible';
                elementRefs.current[element.id].isAnimating = false;
                debugLog(`Animation complete for ${element.id}`);
                setRenderCount(prev => prev + 1);
              }
            }, duration);
          }
        });
        
        // Force render to start animations
        setRenderCount(prev => prev + 1);
      });
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [elements, scrollPercent, totalHeight, debug]);
  
  // Handle visibility changes for existing elements
  useEffect(() => {
    const currentPosition = scrollPercent * totalHeight;
    
    elements.forEach(element => {
      // Skip elements that are still in initial animation sequence
      const ref = elementRefs.current[element.id];
      if (!ref || ref.animationState === 'new' || ref.animationState === 'animating') {
        return;
      }
      
      const shouldBeVisible = 
        currentPosition >= element.triggerStart && 
        currentPosition <= element.triggerEnd;
      
      // Only update if visibility actually changed
      if (ref.isVisible !== shouldBeVisible) {
        debugLog(`Visibility change for ${element.id}: ${ref.isVisible} -> ${shouldBeVisible}`);
        
        // Update state
        ref.isAnimating = true;
        ref.isVisible = shouldBeVisible;
        
        // If becoming visible, mark as ever visible
        if (shouldBeVisible) {
          ref.wasEverVisible = true;
          ref.animationState = 'animating';
          
          // Call onEnter callback
          if (element.onEnter) {
            element.onEnter();
          }
        } else {
          ref.animationState = 'hidden';
          
          // Call onExit callback when becoming invisible
          if (element.onExit) {
            element.onExit();
          }
        }
        
        // Reset animation state after animation duration
        const duration = element.animationDuration === 'slow' ? 1500 : 
                        element.animationDuration === 'fast' ? 500 : 1000;
        
        setTimeout(() => {
          if (elementRefs.current[element.id]) {
            elementRefs.current[element.id].isAnimating = false;
            elementRefs.current[element.id].animationState = shouldBeVisible ? 'visible' : 'hidden';
            debugLog(`Transition complete for ${element.id}`);
            setRenderCount(prev => prev + 1);
          }
        }, duration);
        
        // Force re-render to start transition
        setRenderCount(prev => prev + 1);
      }
    });
  }, [scrollPercent, totalHeight, elements, debug]);
  
  return (
    <div className="ui-container">
      {elements.map(element => {
        const Component = element.component;
        const elementRef = elementRefs.current[element.id];
        
        // Skip rendering if ref doesn't exist yet
        if (!elementRef) return null;
        
        const { 
          isVisible, 
          isAnimating, 
          wasEverVisible, 
          animationState,
          animationType,
          duration,
          easing
        } = elementRef;
        
        // Don't render elements that have never been visible and aren't in animation sequence
        if (animationState === 'new' || (!isVisible && !wasEverVisible && animationState === 'hidden' && !isAnimating)) {
          return null;
        }
        
        // Get animation classes
        const animDelay = element.animationDelay || '';
        
        const baseClasses = `animate duration-${duration} ease-${easing} ` + 
                         (animDelay ? `delay-${animDelay} ` : '');
        
        // Apply appropriate visibility class - this is the KEY part for different animations
        const visibilityClass = isVisible ? 
          `${animationType}-show` : 
          `${animationType}-hidden`;
        
        debugLog(`Rendering ${element.id}`, {
          animationState,
          animationType,
          visibilityClass,
          isVisible
        });
        
        return (
          <div 
            key={element.id}
            id={`ui-element-${element.id}`}
            className={`ui-element ${baseClasses} ${visibilityClass}`}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${element.position.x}px, ${element.position.y}px)`,
              zIndex: element.position.z || 10,
              maxWidth: '600px',
              padding: '20px',
              // backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              pointerEvents: isVisible ? 'auto' : 'none',
              // Use visibility instead of display for animations
              visibility: (!isVisible && !isAnimating && animationState === 'hidden') ? 'hidden' : 'visible'
            }}
            data-element-id={element.id}
            data-animation-state={animationState}
            data-animation-type={animationType}
            data-visible={isVisible}
          >
            {debug && (
              <div style={{
                position: 'absolute', 
                top: 0, 
                right: 0, 
                // background: '#333', 
                color: 'white', 
                padding: '2px 5px', 
                fontSize: '10px',
                zIndex: 99
              }}>
                {element.id}: {animationState} ({animationType})
              </div>
            )}
            <Component 
              {...element.props} 
              isVisible={isVisible}
            />
          </div>
        );
      })}
    </div>
  );
};

export default UIManager;