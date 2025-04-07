// src/components/cards/NarrativeCard.js
import React from 'react';

const NarrativeCard = ({
  title,
  description,
  color = '#4285f4',
  gif,
  caption,
  position = 'center'
}) => {
  // Set position styles
  const getPositionStyle = () => {
    switch (position) {
      case 'left':
        return { marginRight: 'auto', marginLeft: '0' };
      case 'right':
        return { marginLeft: 'auto', marginRight: '0' };
      case 'center':
      default:
        return { marginLeft: 'auto', marginRight: 'auto' };
    }
  };

  return (
    <div 
      className="narrative-card card"
      style={{
        borderLeft: `4px solid ${color}`,
        ...getPositionStyle()
      }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
      
      {gif && (
        <div className="narrative-gif">
          <img src={gif} alt={title} />
          {caption && <p className="caption">{caption}</p>}
        </div>
      )}
    </div>
  );
};

export default NarrativeCard;