import React from 'react';

const JobCardNoBoundary = ({ 
  company, 
  role, 
  period, 
  description, 
  responsibilities = [], 
  technologies = [],
  direction = "left" 
}) => {
  return (
    <div className={`job-card ${direction === "right" ? "job-card-right" : "job-card-left"}`}>
        <span className="section-subtitle">{company}</span>

        {direction === "left" && (
        <div className="job-period-container">
          <span className="section-title">{role}</span>
          <span className="period-subtitle">{period}</span>
        </div>
        )}
        {direction === "right" && (
          <div className="job-period-container">
            <span className="period-subtitle">{period}</span>
            <span className="section-title">{role}</span>
          </div>
        )}
      
      <p className="section-subtitle">{description}</p>
      
      {responsibilities.length > 0 && (
        <div className="job-responsibilities">
          <h4>Key Responsibilities:</h4>
          <ul>
            {responsibilities.map((responsibility, index) => (
              <li key={index}>{responsibility}</li>
            ))}
          </ul>
        </div>
      )}
      
      {technologies.length > 0 && (
        <div className="job-technologies">
          <h4>Technologies:</h4>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCardNoBoundary;