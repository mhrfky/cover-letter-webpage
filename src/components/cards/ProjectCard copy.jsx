import React from 'react';

const ProjectCard = ({ 
  genre, 
  title, 
  description, 
  achievements = [], 
  technologies = [],
  links = {}
}) => {
  return (
    <div className="card project-card">
      <div className="project-header">
        <span className="project-genre">{genre}</span>
        <h3 className="project-title">{title}</h3>
      </div>
      
      <p className="project-description">{description}</p>
      
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
        <div className="project-links">
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