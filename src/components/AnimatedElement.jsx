import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const AnimatedElement = ({ 
  children, 
  className = '',
  animationType = 'fade', 
  animationDuration = 'normal',
  animationDelay = '',
  hideWhenOutOfView = true, // New prop to control if element hides when scrolled away
  onEnter,
  onExit,
  style = {},
  ...props
}) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly reduce the bottom margin to trigger earlier
  });
  
  // Track if the element was ever visible
  const [wasEverVisible, setWasEverVisible] = useState(false);
  
  useEffect(() => {
    if (isVisible) {
      setWasEverVisible(true);
      if (onEnter) onEnter();
    } else if (!isVisible && wasEverVisible) {
      if (onExit) onExit();
    }
  }, [isVisible, onEnter, onExit, wasEverVisible]);
  
  // Determine the display state based on visibility and hideWhenOutOfView prop
  // If hideWhenOutOfView is true, use current visibility state
  // Otherwise, once it's been visible, keep it showing
  const displayState = hideWhenOutOfView 
    ? (isVisible ? 'show' : 'hidden')
    : (isVisible || wasEverVisible ? 'show' : 'hidden');
    
  const animationClass = `${animationType}-${displayState}`;
  
  const durationClass = animationDuration ? `duration-${animationDuration}` : '';
  const delayClass = animationDelay ? `delay-${animationDelay}` : '';
  
  const classNames = [
    'animated',
    animationClass,
    durationClass,
    delayClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={ref}
      className={classNames}
      style={{
        ...style
      }}
      data-animation-type={animationType}
      data-visible={isVisible}
      {...props}
    >
      {children}
    </div>
  );
};

export default AnimatedElement;