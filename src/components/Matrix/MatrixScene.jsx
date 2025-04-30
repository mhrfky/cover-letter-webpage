import React, { useEffect, useRef, useState } from 'react';
import { loadDuckImage } from './assetLoader';
import { 
  updateAsciiMap, 
  drawMatrixFrame, 
  initializeDrops, 
  getScrollInfo 
} from './matrixUtils';

/**
 * Enhanced Matrix Scene component with visibility fix
 * Only changes the visibility check and z-index
 */
const MatrixScene = ({ 
  containerStyle = {}, 
  assetScale = 1.0,
  children,
  assetUrl = null,
  darkMode = true,
  intensity = 1.0,
  speed = 1.0,
  showAsset = true,
}) => {
  // Refs for DOM elements and animation
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const requestRef = useRef(null);
  const imgRef = useRef(null);
  const imgDimensionsRef = useRef({ width: 0, height: 0 });
  
  // State for visibility and animation
  const [scrollState, setScrollState] = useState({
    isInView: false,
    scrollPercentage: 0,
    elementScrollProgress: 0.5,
    visiblePercentage: 0
  });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    
    // Set up canvas
    const ctx = canvas.getContext('2d');
    let width = container.clientWidth;
    let height = container.clientHeight;
    
    // Update canvas dimensions
    const updateDimensions = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      drops = initializeDrops(width);
    };
    
    // Animation variables
    let drops = initializeDrops(width);
    let angle = 0;
    let asciiMap = [];
    let matrixOpacity = 0;
    
    // Set initial dimensions
    updateDimensions();
    
    // Load the image once with specified scale
    if (!imgRef.current) {
      if (assetUrl) {
        // Load custom image
        const img = new Image();
        img.onload = () => {
          imgRef.current = img;
          const scaledWidth = img.width * assetScale;
          const scaledHeight = img.height * assetScale;
          imgDimensionsRef.current = { width: scaledWidth, height: scaledHeight };
        };
        img.src = assetUrl;
      } else {
        // Load default duck image
        loadDuckImage(assetScale, (loadedImg, imgWidth, imgHeight) => {
          imgRef.current = loadedImg;
          imgDimensionsRef.current = { width: imgWidth, height: imgHeight };
        });
      }
    }
    
    // Check scroll position and update state - KEY FIX HERE
    const checkScrollPosition = () => {
      const info = getScrollInfo(container);
      
      // FIX: Always keep in view for debugging
      const fixedInfo = {
        ...info,
        isInView: true, // Force visibility
        visiblePercentage: Math.max(info.visiblePercentage, 20) // Minimum visibility
      };
      
      setScrollState(fixedInfo);
      
      // Fade in/out based on visibility
      if (fixedInfo.visiblePercentage > 0) {
        // Smoothly fade in as element enters view, fade out as it leaves
        matrixOpacity = Math.min(1, fixedInfo.visiblePercentage * 2) * intensity;
      } else {
        matrixOpacity = 0;
      }
    };
    
    // Animation function
    const animate = () => {
      if (matrixOpacity <= 0) {
        // Fully clear canvas when invisible
        ctx.clearRect(0, 0, width, height);
        requestRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Apply fade effect for trailing - darker in dark mode, lighter in light mode
      if (darkMode) {
        ctx.fillStyle = `rgba(0,0,0,${0.1 * matrixOpacity})`;
      } else {
        ctx.fillStyle = `rgba(255,255,255,${0.1 * matrixOpacity})`;
      }
      ctx.fillRect(0, 0, width, height);
      
      // Get container position relative to viewport
      const containerRect = container.getBoundingClientRect();
      
      // Calculate asset position - centered horizontally, follows scroll vertically
      const assetX = width / 2;
      
      // The asset's Y position is based on the scroll position relative to the container
      const scrollY = window.scrollY;
      const containerTop = containerRect.top + window.scrollY;
      const assetY = scrollY - containerTop + window.innerHeight / 2;
      
      // Add subtle horizontal movement
      const time = Date.now() / 1000;
      const bounceX = Math.sin(time * 0.3 * speed) * width * 0.03;
      
      // Update asset rotation
      angle = (angle - 0.5 * speed) % 360;
      
      // Create ASCII map from image if image is loaded and we want to show it
      if (imgRef.current && showAsset) {
        const { width: imageWidth, height: imageHeight } = imgDimensionsRef.current;
        
        asciiMap = updateAsciiMap({
          img: imgRef.current,
          angle,
          imageWidth,
          imageHeight,
          imageX: assetX + bounceX,
          imageY: assetY,
          width,
          height
        });
      } else {
        // Empty array if we don't want to show the asset
        asciiMap = [];
      }
      
      // Draw the matrix frame with current opacity and asset position
      drops = drawMatrixFrame({
        ctx,
        width,
        height,
        drops,
        asciiMap,
        img: imgRef.current,
        opacity: matrixOpacity,
        duckY: assetY, // Pass asset position to matrix frame drawing
        darkMode
      });
      
      // Continue animation
      requestRef.current = requestAnimationFrame(animate);
    };
    
    // Set up event listeners
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('scroll', checkScrollPosition);
    
    // Initial check
    checkScrollPosition();
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.removeEventListener('scroll', checkScrollPosition);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [assetScale, assetUrl, darkMode, intensity, speed, showAsset]);
  
  return (
    <div 
      ref={containerRef} 
      style={{
        position: 'absolute', // Position absolutely in the section
        width: '100%',
        height: '100%',
        overflow: 'visible', // KEY FIX: Allow matrix to overflow
        background: 'transparent',
        ...containerStyle
      }}
    >
      {/* Matrix Canvas */}
      <canvas 
        ref={canvasRef} 
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0 // Keep this lower
        }}
      />
      
      {/* Content Container */}
      {children && (
        <div 
          className="matrix-content"
          style={{
            position: 'relative',
            zIndex: 1, // Higher than canvas
            width: '100%', 
            height: '100%',
            background: 'transparent',
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default MatrixScene;