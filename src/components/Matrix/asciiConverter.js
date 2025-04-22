// asciiConverter.js
// Utility functions for converting images to ASCII art

// Default character sets for ASCII conversion (from dense to sparse)
export const ASCII_DENSE = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
export const ASCII_SIMPLE = "@%#*+=-:. ";

/**
 * Convert an image to ASCII characters
 * @param {Object} params - Parameters for ASCII conversion
 * @param {ImageData} params.imageData - The image data to convert
 * @param {number} params.width - Width of the image
 * @param {number} params.height - Height of the image
 * @param {number} params.cellSize - Size of each ASCII character cell (default: 8)
 * @param {string} params.charset - Character set for ASCII conversion (default: ASCII_DENSE)
 * @param {boolean} params.invertBrightness - Whether to invert the brightness mapping (default: false)
 * @param {boolean} params.colored - Whether to preserve color information (default: false)
 * @returns {Object} - ASCII art representation with characters and color info
 */
export function imageToAscii({
  imageData,
  width,
  height,
  cellSize = 8,
  charset = ASCII_DENSE,
  invertBrightness = false,
  colored = false
}) {
  // Calculate grid dimensions
  const cols = Math.floor(width / cellSize);
  const rows = Math.floor(height / cellSize);
  
  // Result arrays
  const asciiChars = [];
  const colorInfo = [];
  
  // Process image data and create ASCII grid
  for (let y = 0; y < rows; y++) {
    const rowChars = [];
    const rowColors = [];
    
    for (let x = 0; x < cols; x++) {
      // Get average color and brightness for this cell
      const cellData = getCellData(imageData, x, y, cellSize, width, height);
      
      if (cellData.avgAlpha < 20) {
        // Transparent pixel, use space
        rowChars.push(' ');
        rowColors.push({ r: 0, g: 0, b: 0, a: 0 });
        continue;
      }
      
      // Map brightness to character
      let charIndex;
      if (invertBrightness) {
        charIndex = Math.floor((1 - cellData.brightness) * (charset.length - 1));
      } else {
        charIndex = Math.floor(cellData.brightness * (charset.length - 1));
      }
      
      const char = charset[charIndex];
      rowChars.push(char);
      
      // Save color information if needed
      if (colored) {
        rowColors.push({ 
          r: cellData.avgRed, 
          g: cellData.avgGreen, 
          b: cellData.avgBlue, 
          a: cellData.avgAlpha 
        });
      } else {
        rowColors.push(null);
      }
    }
    
    asciiChars.push(rowChars);
    colorInfo.push(rowColors);
  }
  
  return {
    chars: asciiChars,
    colors: colorInfo,
    width: cols,
    height: rows,
    cellSize: cellSize,
    
    // Helper method to get ASCII as string (one row per line)
    toString: function() {
      return this.chars.map(row => row.join('')).join('\n');
    },
    
    // Helper method to get HTML with colored output
    toHTML: function() {
      let html = '';
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const char = this.chars[y][x];
          if (this.colors[y][x] && colored) {
            const color = this.colors[y][x];
            html += `<span style="color: rgba(${color.r}, ${color.g}, ${color.b}, ${color.a/255});">${char}</span>`;
          } else {
            html += char;
          }
        }
        html += '<br>';
      }
      return html;
    },
    
    // Helper method to draw to canvas
    drawToCanvas: function(ctx, x = 0, y = 0, charWidth = this.cellSize, charHeight = this.cellSize) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `${charHeight}px monospace`;
      
      for (let row = 0; row < this.height; row++) {
        for (let col = 0; col < this.width; col++) {
          const char = this.chars[row][col];
          
          if (colored && this.colors[row][col]) {
            const color = this.colors[row][col];
            ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a/255})`;
          } else {
            ctx.fillStyle = '#FFF';
          }
          
          const posX = x + (col + 0.5) * charWidth;
          const posY = y + (row + 0.5) * charHeight;
          ctx.fillText(char, posX, posY);
        }
      }
    }
  };
}

/**
 * Get average color and brightness data for a cell
 * @param {ImageData} imageData - The image data
 * @param {number} cellX - Cell X position
 * @param {number} cellY - Cell Y position
 * @param {number} cellSize - Size of each cell
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {Object} - Cell color and brightness data
 */
function getCellData(imageData, cellX, cellY, cellSize, width, height) {
  const pixels = imageData.data;
  let totalRed = 0;
  let totalGreen = 0;
  let totalBlue = 0;
  let totalAlpha = 0;
  let pixelCount = 0;
  
  const startX = cellX * cellSize;
  const startY = cellY * cellSize;
  const endX = Math.min(startX + cellSize, width);
  const endY = Math.min(startY + cellSize, height);
  
  for (let y = startY; y < endY; y++) {
    for (let x = startX; x < endX; x++) {
      const i = (y * width + x) * 4;
      
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];
      
      // Skip fully transparent pixels
      if (a === 0) continue;
      
      totalRed += r;
      totalGreen += g;
      totalBlue += b;
      totalAlpha += a;
      pixelCount++;
    }
  }
  
  // If cell is completely transparent, return default values
  if (pixelCount === 0) {
    return {
      avgRed: 0,
      avgGreen: 0,
      avgBlue: 0,
      avgAlpha: 0,
      brightness: 0
    };
  }
  
  const avgRed = Math.round(totalRed / pixelCount);
  const avgGreen = Math.round(totalGreen / pixelCount);
  const avgBlue = Math.round(totalBlue / pixelCount);
  const avgAlpha = Math.round(totalAlpha / pixelCount);
  
  // Calculate brightness (0-1 range)
  // Using standard luminance formula
  const brightness = (0.299 * avgRed + 0.587 * avgGreen + 0.114 * avgBlue) / 255;
  
  return {
    avgRed,
    avgGreen,
    avgBlue,
    avgAlpha,
    brightness
  };
}

/**
 * Convert image data to a simple ASCII string
 * @param {ImageData} imageData - The image data to convert
 * @param {number} width - Width of the image
 * @param {number} height - Height of the image
 * @param {number} cellSize - Size of each ASCII character cell (default: 8)
 * @param {string} charset - Character set for ASCII conversion (default: ASCII_SIMPLE)
 * @returns {string} - ASCII art as a string
 */
export function imageDataToAsciiString(imageData, width, height, cellSize = 8, charset = ASCII_SIMPLE) {
  const result = imageToAscii({
    imageData, 
    width, 
    height, 
    cellSize, 
    charset, 
    invertBrightness: false,
    colored: false
  });
  
  return result.toString();
}

/**
 * Helper function to create ASCII art from an Image element
 * @param {Image} img - The source image
 * @param {Object} options - Options for conversion (cellSize, charset, etc.)
 * @returns {Object} - ASCII art object
 */
export function imageElementToAscii(img, options = {}) {
  // Create a temporary canvas to get image data
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = img.width;
  canvas.height = img.height;
  
  // Draw the image
  ctx.drawImage(img, 0, 0);
  
  // Get the image data
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  
  // Convert to ASCII
  return imageToAscii({
    imageData: imageData,
    width: canvas.width,
    height: canvas.height,
    ...options
  });
}