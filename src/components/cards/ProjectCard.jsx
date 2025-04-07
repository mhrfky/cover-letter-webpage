import React from 'react';

const ProjectCard = ({ 
  genre, 
  title, 
  description, 
  achievements = [], 
  technologies = [],
  links = {},
  direction = "left"
}) => {
  return (
    <div className={`project-card ${direction === "right" ? "project-card-right" : "project-card-left"}`}>
      <span className="section-subtitle">{genre}</span>
      
      {direction === "left" && (
        <div className="project-period-container">
          <span className="section-title">{title}</span>
        </div>
      )}
      {direction === "right" && (
        <div className="project-period-container">
          <span className="section-title">{title}</span>
        </div>
      )}
      
      <p className="section-subtitle">{description}</p>
      
      {achievements.length > 0 && (
        <div className="project-achievements">
          <h4>Key Achievements:</h4>
          <ul>
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </div>
      )}
      
      {technologies.length > 0 && (
        <div className="project-technologies">
          <h4>Technologies:</h4>
          <div className="tech-tags">
            {technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      )}
      
      {(links.demo || links.repo) && (
        <div className={`project-links ${direction === "right" ? "project-links-right" : "project-links-left"}`}>
          {links.demo && (
            <a href={links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
              View Demo
            </a>
          )}
          {links.repo && (
            <a href={links.repo} target="_blank" rel="noopener noreferrer" className="project-link">
              View Code
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectCard;