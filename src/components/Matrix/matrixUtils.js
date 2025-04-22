// matrixUtils.js
// Utility functions for Matrix rain effect with scrolling enhancements
import { createRotatedImage } from './assetLoader';
import { imageToAscii, ASCII_DENSE } from './asciiConverter';

// Constants
const FONT_SIZE = 16;
const MATRIX_CHARS = ASCII_DENSE;

/**
 * Create ASCII mapping from an image for matrix display
 * @param {Object} params - Parameters for the mapping
 * @param {Image} params.img - The source image
 * @param {number} params.angle - Rotation angle in degrees
 * @param {number} params.imageWidth - Width of the image
 * @param {number} params.imageHeight - Height of the image
 * @param {number} params.imageX - X position of the image center
 * @param {number} params.imageY - Y position of the image center
 * @param {number} params.width - Width of the canvas
 * @param {number} params.height - Height of the canvas
 * @returns {Array} - Array of ASCII characters with positions
 */
export function updateAsciiMap({
  img,
  angle,
  imageWidth,
  imageHeight,
  imageX,
  imageY,
  width,
  height
}) {
  // Use our decoupled functions to create a rotated image
  const rotatedImage = createRotatedImage(img, angle, imageWidth, imageHeight);
  
  // Convert the rotated image to ASCII
  const asciiData = imageToAscii({
    imageData: rotatedImage.imageData,
    width: imageWidth,
    height: imageHeight,
    cellSize: FONT_SIZE,
    charset: MATRIX_CHARS,
    invertBrightness: false,
    colored: false
  });
  
  // Convert to the format expected by the matrix code
  const asciiMap = [];
  
  // Calculate the number of columns in the canvas
  const columns = Math.floor(width / FONT_SIZE);
  
  // Process each ASCII character from our converter
  for (let y = 0; y < asciiData.height; y++) {
    for (let x = 0; x < asciiData.width; x++) {
      const char = asciiData.chars[y][x];
      
      // Skip spaces (transparent/empty areas)
      if (char === ' ') continue;
      
      // Calculate screen position
      const screenX = imageX - imageWidth/2 + (x * FONT_SIZE);
      const screenY = imageY - imageHeight/2 + (y * FONT_SIZE);
      
      const matrixCol = Math.floor(screenX / FONT_SIZE);
      const matrixRow = Math.floor(screenY / FONT_SIZE);
      
      // Only add if within extended screen bounds
      const extendedBounds = 5; // Allow characters slightly outside visible area
      if (matrixCol >= -extendedBounds && matrixCol < columns + extendedBounds && 
          matrixRow >= -extendedBounds && matrixRow < Math.ceil(height / FONT_SIZE) + extendedBounds) {
        asciiMap.push({
          col: matrixCol,
          row: matrixRow,
          char: char,
          x: matrixCol * FONT_SIZE,
          y: matrixRow * FONT_SIZE
        });
      }
    }
  }
  
  return asciiMap;
}

/**
 * Draw a single frame of the matrix animation
 * @param {Object} params - Parameters for drawing the matrix frame
 * @param {CanvasRenderingContext2D} params.ctx - Canvas context
 * @param {number} params.width - Width of the canvas
 * @param {number} params.height - Height of the canvas
 * @param {Array} params.drops - Array of drop positions
 * @param {Array} params.asciiMap - ASCII map of characters
 * @param {Image} params.img - The source image
 * @param {number} params.opacity - Opacity of the matrix effect
 * @param {number} params.duckY - Y position of the duck
 * @param {boolean} params.darkMode - Whether to use dark mode colors
 * @returns {Array} - Updated array of drop positions
 */
export function drawMatrixFrame({ 
  ctx, 
  width, 
  height, 
  drops, 
  asciiMap,
  img,
  opacity = 1,
  duckY = 0,
  darkMode = true
}) {
  // Set text properties
  ctx.font = "700 " + FONT_SIZE + "px monospace";
  
  // Keep track of image positions
  const imagePositions = new Set();
  
  // Draw asset ASCII characters
  if (img && asciiMap.length > 0) {
    // Use bright green in dark mode, darker green in light mode
    ctx.fillStyle = darkMode ? 
      `rgba(0,255,68,${opacity})` : 
      `rgba(0,180,48,${opacity})`;
    
    for (let j = 0; j < asciiMap.length; j++) {
      const item = asciiMap[j];
      ctx.fillText(item.char, item.x, item.y);
      imagePositions.add(item.col + ',' + item.row);
    }
  }
  
  // Draw matrix rain, avoiding image positions
  // Standard matrix green with opacity in dark mode, darker green in light mode
  ctx.fillStyle = darkMode ? 
    `rgba(0,204,51,${opacity})` : 
    `rgba(0,130,30,${opacity})`;
  
  const columns = Math.floor(width / FONT_SIZE);
  const rows = Math.floor(height / FONT_SIZE);
  
  // Calculate a reasonable range of matrix drops around the focus point
  // This makes the matrix drops follow the focus point rather than cover the entire container
  const focusRowApprox = Math.floor(duckY / FONT_SIZE);
  const visibleRows = Math.ceil(window.innerHeight / FONT_SIZE);
  const visibleRowStart = Math.max(0, focusRowApprox - visibleRows);
  const visibleRowEnd = focusRowApprox + visibleRows;
  
  for(let i = 0; i < columns; i++) {
    // Get current drop position
    let dropRow = drops[i];
    
    // Reset drops that have moved too far
    // Keep drops within a reasonable range of the focus position
    if (dropRow < visibleRowStart - 10 || dropRow > visibleRowEnd + 10) {
      // Reset to a position near the top of the visible area
      drops[i] = visibleRowStart + Math.floor(Math.random() * 10) - 10;
      dropRow = drops[i];
    }
    
    const index = Math.floor(Math.random() * MATRIX_CHARS.length);
    const x = i * FONT_SIZE;
    const y = dropRow * FONT_SIZE;
    
    // Only draw if drop is potentially visible
    if (dropRow >= visibleRowStart - 10 && dropRow <= visibleRowEnd) {
      if (!imagePositions.has(i + ',' + dropRow)) {
        ctx.fillText(MATRIX_CHARS[index], x, y);
      }
    }
    
    // Increment drop position
    drops[i]++;
    
    // Random resets for variety
    if (Math.random() < 0.002) {
      // Reset to just above visible area
      drops[i] = visibleRowStart + Math.floor(Math.random() * 10) - 10;
    }
  }
  
  return drops;
}

/**
 * Initialize the matrix drops array
 * @param {number} width - Width of the canvas
 * @returns {Array} - Array of drop positions
 */
export function initializeDrops(width) {
  const columns = Math.floor(width / FONT_SIZE);
  const drops = Array(columns).fill(0);
  
  // Randomize initial positions for more natural look
  for (let i = 0; i < drops.length; i++) {
    drops[i] = Math.floor(Math.random() * 30);
  }
  
  return drops;
}

/**
 * Get scroll info for the element
 * @param {HTMLElement} element - The element to check
 * @returns {Object} - Object containing scroll information
 */
export function getScrollInfo(element) {
  if (!element) return { isInView: false, scrollPercentage: 0 };
  
  const rect = element.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const totalHeight = document.body.scrollHeight;
  const scrollableDistance = totalHeight - viewportHeight;
  
  // Calculate viewport intersection
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visiblePercentage = visibleHeight / rect.height;
  
  // Calculate scroll percentage relative to document
  const scrollPercentage = Math.min(1, Math.max(0, scrollTop / scrollableDistance));
  
  // Calculate scroll percentage relative to element
  // 0 = element just entered at bottom, 0.5 = element centered, 1 = element just left at top
  let elementScrollProgress = 0;
  
  if (rect.height + viewportHeight > 0) {
    elementScrollProgress = (viewportHeight - rect.top) / (rect.height + viewportHeight);
    elementScrollProgress = Math.max(0, Math.min(1, elementScrollProgress));
  }
  
  return {
    isInView: visiblePercentage > 0,
    scrollPercentage,
    elementScrollProgress,
    visiblePercentage
  };
}