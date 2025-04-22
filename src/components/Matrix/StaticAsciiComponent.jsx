// StaticAsciiComponent.jsx
import React, { useEffect, useState, useRef } from 'react';
import { loadImage } from './assetLoader';
import { imageToAscii, ASCII_DENSE, ASCII_SIMPLE } from './asciiConverter';

/**
 * A lightweight component that displays an image as ASCII art in a text element
 * with enhanced visual effects for a "shiny" appearance
 */
const StaticAsciiComponent = ({
  src,
  alt = "ASCII Art",
  width = 200,
  height = 200,
  scale = 1,
  cellSize = 12, // Larger default cell size for more visible characters
  invertBrightness = false,
  fontColor = "#00FF41",
  backgroundColor = "transparent",
  charset = ASCII_SIMPLE, // Simpler charset by default for better readability
  style = {},
  className = "",
  float = false,  // Enable floating animation
  floatSpeed = 1, // Speed of floating animation
  floatAmount = 10, // Pixels to float up and down
  rotation = 0, // Static rotation angle (in degrees)
  fontSize = null, // Custom font size (auto-calculated if null)
  letterSpacing = 0, // Additional letter spacing for readability
  enhanceReadability = true, // Apply readability enhancements
  
  // Shiny effect options
  shiny = false, // Enable shiny effect
  glowColor = "rgba(0, 255, 68, 0.7)", // Color for glow effect
  glowSize = 5, // Size of glow in pixels
  pulse = false, // Enable pulsing effect
  pulseSpeed = 1, // Speed of pulse animation
  colorCycle = false, // Enable color cycling
  sparkle = false, // Enable random character sparkling
  sparkleDensity = 0.05, // Percentage of characters that sparkle (0-1)
  shimmer = false, // Enable shimmer effect (horizontal wave of brightness)
  shimmerSpeed = 1, // Speed of shimmer effect
}) => {
  const [asciiArt, setAsciiArt] = useState("");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);
  const [randomChars, setRandomChars] = useState([]);
  
  // Load and convert image to ASCII on mount
  useEffect(() => {
    setLoading(true);
    
    loadImage(
      src, 
      null, // No fallback
      scale,
      (loadedImg, imgWidth, imgHeight) => {
        // Create a temporary canvas for the image processing
        const canvas = document.createElement('canvas');
        
        // Reduce resolution for more visible characters
        const scaledWidth = enhanceReadability ? Math.min(imgWidth, 80 * cellSize) : imgWidth;
        const scaleFactor = scaledWidth / imgWidth;
        const scaledHeight = imgHeight * scaleFactor;
        
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        
        const ctx = canvas.getContext('2d');
        
        // Enhance contrast for better ASCII visibility
        if (enhanceReadability) {
          // Draw with enhanced contrast
          ctx.filter = 'contrast(1.2) brightness(1.1)';
        }
        
        // Apply rotation if needed
        if (rotation !== 0) {
          ctx.translate(canvas.width/2, canvas.height/2);
          ctx.rotate(rotation * Math.PI / 180);
          ctx.drawImage(
            loadedImg, 
            -scaledWidth/2, 
            -scaledHeight/2, 
            scaledWidth, 
            scaledHeight
          );
        } else {
          // Draw the image
          ctx.drawImage(loadedImg, 0, 0, scaledWidth, scaledHeight);
        }
        
        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Convert to ASCII
        const asciiResult = imageToAscii({
          imageData,
          width: canvas.width,
          height: canvas.height,
          cellSize,
          charset,
          invertBrightness,
          colored: false // Always false for static ASCII
        });
        
        // Set ASCII art for rendering
        setAsciiArt(asciiResult.toString());
        
        // Initialize random positions for sparkle effect
        if (sparkle) {
          const lines = asciiResult.toString().split('\n');
          const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
          const numSparkles = Math.floor(totalChars * sparkleDensity);
          
          const newRandomChars = [];
          for (let i = 0; i < numSparkles; i++) {
            const lineIndex = Math.floor(Math.random() * lines.length);
            if (lines[lineIndex].trim().length > 0) {
              const charIndex = Math.floor(Math.random() * lines[lineIndex].length);
              newRandomChars.push({ line: lineIndex, char: charIndex });
            }
          }
          setRandomChars(newRandomChars);
        }
        
        setLoading(false);
      }
    );
  }, [src, scale, cellSize, charset, invertBrightness, rotation, enhanceReadability, sparkle, sparkleDensity]);
  
  // Floating and shiny animation effects
  useEffect(() => {
    if (loading) return;
    
    let animationFrameId;
    let startTime = null;
    
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Update position for floating effect
      if (float) {
        const newPosition = Math.sin(elapsed * 0.001 * floatSpeed) * floatAmount;
        setPosition(newPosition);
      }
      
      // Update time for various effects
      if (pulse || colorCycle || shimmer) {
        setTime(elapsed * 0.001);
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [loading, float, floatSpeed, floatAmount, pulse, colorCycle, shimmer]);
  
  // Calculate appropriate font size based on cell size and width
  const calculateFontSize = () => {
    if (fontSize !== null) return fontSize;
    
    // Use a larger font size for better visibility
    // For small widths, use a minimum size that's still readable
    const minSize = Math.max(8, cellSize * 0.8);
    
    // Estimate characters per line from the first line of ASCII art
    const firstLine = asciiArt.split('\n')[0] || "";
    const charsPerLine = firstLine.length;
    
    if (charsPerLine === 0) return minSize;
    
    // Calculate font size that ensures characters are easily readable
    // Aim for character width of approximately 60% of cell size
    const calculatedSize = (width / charsPerLine) * 0.6;
    
    return Math.max(minSize, calculatedSize);
  };
  
  // Generate shiny text shadow CSS
  const generateTextShadow = () => {
    if (!shiny && !enhanceReadability) return 'none';
    
    let shadow = '';
    
    // Basic text shadow for readability
    if (enhanceReadability && !shiny) {
      return '0 0 2px rgba(0,0,0,0.5)';
    }
    
    // Glow effect
    if (shiny) {
      // Calculate pulse intensity if enabled
      const pulseIntensity = pulse ? 
        0.7 + (0.3 * Math.sin(time * pulseSpeed * Math.PI)) : 
        1;
      
      // Base glow
      shadow = `0 0 ${glowSize * pulseIntensity}px ${glowColor}`;
      
      // Add more layers for stronger glow
      shadow += `, 0 0 ${glowSize * 2 * pulseIntensity}px ${glowColor}`;
      shadow += `, 0 0 ${glowSize * 3 * pulseIntensity}px ${glowColor}`;
      
      // Add a white core for extra shininess
      shadow += `, 0 0 ${glowSize * 0.5}px rgba(255, 255, 255, 0.8)`;
    }
    
    return shadow;
  };
  
  // Generate font color based on effects
  const generateFontColor = () => {
    if (!colorCycle) return fontColor;
    
    // HSL color cycling - keeps the same lightness and saturation but cycles the hue
    // Extract the base green color in HSL
    // For #00FF41, this is approximately hue: 135, saturation: 100%, lightness: 50%
    const baseHue = 135;
    const hue = (baseHue + (time * 50 * pulseSpeed)) % 360;
    
    return `hsl(${hue}, 100%, 50%)`;
  };
  
  // Create the sparkle effect by adding spans with special styling
  const renderAsciiWithEffects = () => {
    if (!sparkle && !shimmer) return asciiArt;
    
    const lines = asciiArt.split('\n');
    
    return (
      <>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} style={{ whiteSpace: 'pre' }}>
            {line.split('').map((char, charIndex) => {
              // Check if this character should sparkle
              const shouldSparkle = randomChars.some(
                pos => pos.line === lineIndex && pos.char === charIndex
              );
              
              // Calculate shimmer effect if enabled
              let shimmerOpacity = 1;
              if (shimmer) {
                // Create a horizontal wave of brightness
                const shimmerPhase = (charIndex / line.length) * 2 * Math.PI;
                shimmerOpacity = 0.5 + 0.5 * Math.sin(shimmerPhase + time * shimmerSpeed * 5);
              }
              
              if (shouldSparkle || shimmer) {
                return (
                  <span 
                    key={charIndex} 
                    style={{
                      opacity: shimmer ? shimmerOpacity : 1,
                      color: shouldSparkle ? '#FFFFFF' : undefined,
                      textShadow: shouldSparkle ? 
                        '0 0 5px #FFFFFF, 0 0 10px #FFFFFF, 0 0 15px #FFFFFF' : 
                        undefined,
                      animation: shouldSparkle ? 
                        'sparkle 1s infinite alternate' : 
                        undefined
                    }}
                  >
                    {char}
                  </span>
                );
              }
              
              return char;
            })}
          </div>
        ))}
        
        {/* Add keyframe animation for sparkling */}
        {sparkle && (
          <style>
            {`
              @keyframes sparkle {
                0% { opacity: 0.5; }
                100% { opacity: 1; }
              }
            `}
          </style>
        )}
      </>
    );
  };
  
  return (
    <div 
      ref={containerRef}
      className={`static-ascii-component ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor, // Transparent by default
        ...style
      }}
    >
      {loading ? (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: fontColor,
          fontSize: '14px',
          fontFamily: 'monospace'
        }}>
          Loading...
        </div>
      ) : (
        <pre 
          style={{
            margin: 0,
            padding: 0,
            color: generateFontColor(),
            fontFamily: 'monospace',
            fontSize: `${calculateFontSize()}px`,
            lineHeight: '0.95', // Slightly tighter line height but still readable
            letterSpacing: `${letterSpacing}px`,
            whiteSpace: 'pre', // Preserve whitespace
            transform: `translateY(${position}px)`,
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'visible', // Allow overflow to show full ASCII
            textAlign: 'center',
            userSelect: 'none', // Prevent text selection
            display: 'block',
            backgroundColor: 'transparent',
            textShadow: generateTextShadow(),
            transition: 'text-shadow 0.3s ease, color 0.3s ease',
            filter: pulse && !shiny ? `brightness(${0.7 + (0.3 * Math.sin(time * pulseSpeed * Math.PI))})` : 'none',
          }}
          aria-label={alt}
        >
          {sparkle || shimmer ? renderAsciiWithEffects() : asciiArt}
        </pre>
      )}
    </div>
  );
};

export default StaticAsciiComponent;