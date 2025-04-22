// assetLoader.js
// Utility functions for loading and scaling assets

/**
 * Loads an image with a specified scale factor
 * @param {string} primarySrc - Primary image source URL
 * @param {string} fallbackSrc - Fallback image source if primary fails
 * @param {number} scale - Scale factor for the image (default: 3.5)
 * @param {Function} onLoad - Callback function called when image is loaded
 * @returns {Image} - The image object
 */
export function loadImage(primarySrc, fallbackSrc, scale = 3.5, onLoad) {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    
    img.onload = () => {
      // Calculate scaled dimensions
      const imageWidth = img.width * scale;
      const imageHeight = img.height * scale;
      
      // Process the image with higher resolution if scale > 1
      if (scale > 1) {
        const scaledImage = scaleImage(img, scale);
        
        // Call the callback with the loaded image and its dimensions
        if (typeof onLoad === 'function') {
          onLoad(scaledImage.img, imageWidth, imageHeight, scaledImage.canvas);
        }
      } else {
        // Call the callback with the original image and its dimensions
        if (typeof onLoad === 'function') {
          onLoad(img, imageWidth, imageHeight);
        }
      }
    };
    
    img.onerror = () => {
      console.log(`Failed to load image from ${primarySrc}, trying fallback...`);
      
      // Try fallback source if primary fails
      if (fallbackSrc) {
        img.src = fallbackSrc;
      }
    };
    
    // Set primary source
    img.src = primarySrc;
    
    return img;
  }
  
  /**
   * Scale an image to a higher resolution
   * @param {Image} img - The source image
   * @param {number} scale - Scale factor
   * @returns {Object} - Object containing scaled image and canvas
   */
  function scaleImage(img, scale) {
    // Create a temporary canvas for scaling
    const canvas = document.createElement('canvas');
    canvas.width = img.width * scale;
    canvas.height = img.height * scale;
    const ctx = canvas.getContext('2d');
    
    // Use better image scaling algorithm if available
    if (ctx.imageSmoothingEnabled !== undefined) {
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    }
    
    // Draw the image at the larger size
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    // Create a new image from the canvas
    const scaledImg = new Image();
    scaledImg.src = canvas.toDataURL();
    
    return {
      img: scaledImg,
      canvas: canvas,
      ctx: ctx
    };
  }
  
  /**
   * Loads the duck image with scaling
   * @param {number} scale - Scale factor for the image (default: 3.5)
   * @param {Function} onLoad - Callback function called when image is loaded
   * @returns {Image} - The duck image object
   */
  export function loadDuckImage(scale = 1, onLoad) {
    // Primary source
    const primarySrc = 'https://i.imgur.com/AanAdvF.png';
    
    // Fallback to simple duck silhouette SVG
    const fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzAsMzBjMC0xNi41LTEzLjUtMzAtMzAtMzBTMTAsMTMuNSwxMCwzMGMwLDEzLjMsOC43LDI0LjUsOC43LDI0LjVsLTAuMiwwLjVjLTAuMiwwLjUtMC43LDEtMS43LDEuNGMtMiwwLjgtNSwwLjUtOCwxQzQuMyw1Ny42LDEsNjQuNywxLDcyYzAsMTEsOSwyMCwyMCwyMGM2LjgsMCwxMi44LTMuNCwxNi40LTguNmMyLjYsMi4yLDYsMy42LDkuNiwzLjZjOC4zLDAsMTUtNi43LDE1LTE1YzAtNC42LTIuMS04LjctNS4zLTExLjRjMC4yLTEuMywwLjMtMi42LDAuMy00YzAtMTIuNy0xMC0yMy4xLTEwLTIzLjFsMi02Yy0yLjgtMC40LTE1LDQtMTUsNGMxLjEtMi4yLDIuNi01LjUsNC04LjhDNDksMjAsNjUsMjIsNjUsMjJjMCwwLDIsMTUtMyw0Yy0zLDItMiwwLTIsMGM1LTIsNiw0LjYsMCw0LjZjLTEsMy00LDQtNCw0aDEzVjMwTTMwLDg1Yy03LjIsMC0xMy01LjgtMTMtMTNjMC03LjIsNS44LTEzLDEzLTEzYzcuMiwwLDEzLDUuOCwxMywxM0M0Myw3OS4yLDM3LjIsODUsMzAsODV6Ii8+PC9zdmc+';
    
    return loadImage(primarySrc, fallbackSrc, scale, onLoad);
  }
  
  /**
   * Creates a rotated image on a temporary canvas
   * @param {Image} img - The source image
   * @param {number} angle - Rotation angle in degrees (default: 0)
   * @param {number} width - Width of the output (default: img.width)
   * @param {number} height - Height of the output (default: img.height)
   * @returns {Object} - Canvas context and image data
   */
  export function createRotatedImage(img, angle = 0, width = null, height = null) {
    // Use image dimensions if not specified
    const outputWidth = width || img.width;
    const outputHeight = height || img.height;
    
    // Create a temporary canvas for rotation
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = outputWidth;
    tempCanvas.height = outputHeight;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Clear and prepare for rotation
    tempCtx.clearRect(0, 0, outputWidth, outputHeight);
    
    if (angle !== 0) {
      // Apply rotation
      tempCtx.save();
      tempCtx.translate(outputWidth/2, outputHeight/2);
      tempCtx.rotate(angle * Math.PI / 180);
      tempCtx.drawImage(
        img, 
        -img.width/2, 
        -img.height/2, 
        img.width, 
        img.height
      );
      tempCtx.restore();
    } else {
      // No rotation, just draw centered
      const x = (outputWidth - img.width) / 2;
      const y = (outputHeight - img.height) / 2;
      tempCtx.drawImage(img, x, y, img.width, img.height);
    }
    
    // Get the pixel data
    const imageData = tempCtx.getImageData(0, 0, outputWidth, outputHeight);
    
    return {
      canvas: tempCanvas,
      ctx: tempCtx,
      imageData: imageData,
      pixels: imageData.data,
      width: outputWidth,
      height: outputHeight
    };
  }