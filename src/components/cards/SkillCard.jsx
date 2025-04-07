import React from 'react';

const SkillCard = ({ title, description, instances = [] }) => {
  return (
    <div className="card skill-card">
      <h3>{title}</h3>
      <p>{description}</p>
      
      {instances.length > 0 && (
        <div className="skill-instances">
          <h4>Examples:</h4>
          <ul>
            {instances.map((instance, index) => (
              <li key={index}>{instance}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SkillCard;