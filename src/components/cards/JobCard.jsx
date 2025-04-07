import React from 'react';

const JobCard = ({ 
  company, 
  role, 
  period, 
  description, 
  responsibilities = [], 
  technologies = [] 
}) => {
  return (
    <div className="card job-card">
      <div className="job-header">
        <h3 className="job-role">{role}</h3>
        <div className="job-company-period">
          <span className="job-company">{company}</span>
          <span className="job-period">{period}</span>
        </div>
      </div>
      
      <p className="job-description">{description}</p>
      
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

export default JobCard;