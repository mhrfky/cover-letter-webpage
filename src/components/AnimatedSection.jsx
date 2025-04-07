import React, { useEffect } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedSection = ({ 
  id, 
  className = '',
  animationType = 'fade', 
  animationDelay = '',
  onEnter = () => {},
  onExit = () => {},
  children 
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  
  useEffect(() => {
    if (isVisible) {
      onEnter();
    } else {
      onExit();
    }
  }, [isVisible, onEnter, onExit]);
  
  // Create animation classes based on props and visibility
  const getAnimationClasses = () => {
    const baseClass = className || '';
    const animationClass = isVisible 
      ? `${animationType}-show` 
      : `${animationType}-hidden`;
    const delayClass = animationDelay ? `delay-${animationDelay}` : '';
    
    return `${baseClass} ${animationClass} ${delayClass}`.trim();
  };

  return (
    <div
      id={id}
      ref={ref}
      className={getAnimationClasses()}
      data-section-id={id}
      data-animation-type={animationType}
      data-visible={isVisible}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;