import React, { useEffect, useState, useRef } from 'react';
import { loadImage } from './assetLoader';
import { imageToAscii, ASCII_DENSE, ASCII_SIMPLE } from './asciiConverter';

/**
 * EnhancedAsciiComponent
 * A component that displays ASCII art from either an image source or a text file
 * with visual effects and customizable styling
 * 
 * @param {Object} props
 * @param {string} props.src - Image source URL (used if mode is 'image')
 * @param {string} props.filePath - Path to ASCII art text file (used if mode is 'file')
 * @param {string} props.mode - 'image' or 'file' to determine the source type (default: 'image')
 * @param {string} props.alt - Alt text for accessibility (default: "ASCII Art")
 * @param {number} props.width - Container width in pixels (default: 200)
 * @param {number} props.height - Container height in pixels (default: 200)
 * @param {number} props.scale - Scale factor for image processing or text display (default: 1)
 * @param {number} props.cellSize - Cell size for image-to-ASCII conversion (default: 12)
 * @param {boolean} props.invertBrightness - Whether to invert brightness in conversion (default: false)
 * @param {string} props.fontColor - Text color (default: "#00FF41")
 * @param {string} props.backgroundColor - Background color (default: "transparent")
 * @param {Array} props.charset - Character set for ASCII conversion (default: ASCII_SIMPLE)
 * @param {Object} props.style - Additional style object to apply (default: {})
 * @param {string} props.className - Additional class names (default: "")
 * @param {boolean} props.float - Enable floating animation (default: false)
 * @param {number} props.floatSpeed - Speed of floating animation (default: 1)
 * @param {number} props.floatAmount - Pixels to float up and down (default: 10)
 * @param {number} props.rotation - Static rotation angle in degrees (default: 0)
 * @param {number|null} props.fontSize - Custom font size (auto-calculated if null)
 * @param {number} props.letterSpacing - Additional letter spacing (default: 0)
 * @param {boolean} props.enhanceReadability - Apply readability enhancements (default: true)
 * @param {boolean} props.shiny - Enable shiny effect (default: false)
 * @param {string} props.glowColor - Color for glow effect (default: "rgba(0, 255, 68, 0.7)")
 * @param {number} props.glowSize - Size of glow in pixels (default: 5)
 * @param {boolean} props.pulse - Enable pulsing effect (default: false)
 * @param {number} props.pulseSpeed - Speed of pulse animation (default: 1)
 * @param {boolean} props.colorCycle - Enable color cycling (default: false)
 * @param {boolean} props.sparkle - Enable random character sparkling (default: false)
 * @param {number} props.sparkleDensity - Percentage of characters that sparkle (default: 0.05)
 * @param {boolean} props.shimmer - Enable shimmer effect (default: false)
 * @param {number} props.shimmerSpeed - Speed of shimmer effect (default: 1)
 * @param {string} props.fontFamily - Font family (default: "monospace")
 * @param {number} props.lineHeight - Line height multiplier (default: 0.95)
 */
const AsciiComponent = ({
  // Source options
  src,
  filePath,
  mode = 'file', // 'image' or 'file'
  
  // Display options
  alt = "ASCII Art",
  width = 200,
  height = 200,
  scale = 1,
  cellSize = 12,
  invertBrightness = false,
  fontColor = "#00FF41",
  backgroundColor = "transparent",
  charset = ASCII_SIMPLE,
  style = {},
  className = "",
  
  // Animation options
  float = false,
  floatSpeed = 1,
  floatAmount = 10,
  rotation = 0,
  
  // Font options
  fontSize = null,
  letterSpacing = 0,
  enhanceReadability = true,
  fontFamily = "monospace",
  lineHeight = 0.95,
  
  // Effect options
  shiny = false,
  glowColor = "rgba(0, 255, 68, 0.7)",
  glowSize = 5,
  pulse = false,
  pulseSpeed = 1,
  colorCycle = false,
  sparkle = false,
  sparkleDensity = 0.05,
  shimmer = false,
  shimmerSpeed = 1,
}) => {
  const [asciiArt, setAsciiArt] = useState("");
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const [position, setPosition] = useState(0);
  const [time, setTime] = useState(0);
  const [randomChars, setRandomChars] = useState([]);
  
  // Load ASCII art from either an image or a text file
  useEffect(() => {
    setLoading(true);
    
    if (mode === 'image' && src) {
      // Load and convert image to ASCII (original functionality)
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
            colored: false
          });
          
          processAsciiArt(asciiResult.toString());
        }
      );
    } else if (mode === 'file' && filePath) {
      // NEW: Load ASCII art from a text file
      const loadAsciiFile = async () => {
        try {
          // Try to use window.fs if available, otherwise use fetch
          let fileContent;
          
          if (typeof window !== 'undefined' && window.fs && window.fs.readFile) {
            fileContent = await window.fs.readFile(filePath, { encoding: 'utf8' });
          } else {
            const response = await fetch(filePath);
            
            if (!response.ok) {
              throw new Error(`Failed to fetch ASCII art: ${response.status}`);
            }
            
            fileContent = await response.text();
          }
          
          processAsciiArt(fileContent);
        } catch (err) {
          console.error('Error loading ASCII art file:', err);
          setAsciiArt("Error loading ASCII art");
          setLoading(false);
        }
      };
      
      loadAsciiFile();
    } else {
      // No valid source provided
      setAsciiArt("No source provided");
      setLoading(false);
    }
  }, [src, filePath, mode, scale, cellSize, charset, invertBrightness, rotation, enhanceReadability]);
  
  // Process the loaded ASCII art
  const processAsciiArt = (content) => {
    setAsciiArt(content);
    
    // Initialize random positions for sparkle effect
    if (sparkle) {
      const lines = content.split('\n');
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
  };
  
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
      className={`enhanced-ascii-component ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
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
          fontFamily
        }}>
          Loading...
        </div>
      ) : (
        <pre 
          style={{
            margin: 0,
            padding: 0,
            color: generateFontColor(),
            fontFamily,
            fontSize: `${calculateFontSize()}px`,
            lineHeight,
            letterSpacing: `${letterSpacing}px`,
            whiteSpace: 'pre',
            transform: `translateY(${position}px)`,
            maxWidth: '100%',
            maxHeight: '100%',
            overflow: 'visible',
            textAlign: 'center',
            userSelect: 'none',
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

export default AsciiComponent;