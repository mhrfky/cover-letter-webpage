// src/components/Image.js
import React from 'react';

const Image = ({
  src,
  alt,
  caption,
  width = "100%",
  height = "auto",
  borderRadius = "8px",
  shadow = true
}) => {
  return (
    <div className="image-container" style={{ width }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height,
          borderRadius,
          boxShadow: shadow ? "0 4px 6px rgba(0, 0, 0, 0.1)" : "none",
          display: "block"
        }}
      />
      {caption && (
        <p className="image-caption text-sm opacity-70 mt-2 text-center">
          {caption}
        </p>
      )}
    </div>
  );
};

export default Image;