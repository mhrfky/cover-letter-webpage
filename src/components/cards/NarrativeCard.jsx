// src/components/cards/NarrativeCard.js
import React from 'react';
import TextContentCard from "../TextContentCard.jsx";
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
          <TextContentCard
              title="Project Overview"
              description="Key points from our research:"
              textFilePath="/bogazici.txt"
              color="#00796b"
              textColor="#2c3e50"
              fontFamily="Georgia, serif"
              fontSize="4px"
              position="left"
          />

          {caption && <p className="caption">{caption}</p>}
        </div>
      )}
    </div>
  );
};

export default NarrativeCard;