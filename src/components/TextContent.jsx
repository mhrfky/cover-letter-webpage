// src/components/TextContent.js
import React from 'react';

const TextContent = ({ 
  title, 
  content, 
  align = 'left', 
  maxWidth = '100%',
  fontSize = 'medium'
}) => {
  const textAlign = align === 'center' ? 'center' : align === 'right' ? 'right' : 'left';
  
  const fontSizeClass = {
    'small': 'text-sm',
    'medium': 'text-base',
    'large': 'text-xl',
    'xlarge': 'text-2xl'
  }[fontSize] || 'text-base';
  
  return (
    <div 
      className="text-content" 
      style={{ 
        textAlign, 
        maxWidth, 
        margin: align === 'center' ? '0 auto' : '0',
        backgroundColor: 'transparent !important',
      }}
    >
      {/* {title && (
        <h2 className="text-content-title mb-4 font-bold text-xl">{title}</h2>
      )} */}
      <p className={`${fontSizeClass} leading-relaxed`}>{content}</p>
    </div>
  );
};

export default TextContent;