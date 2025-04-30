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
  // Matrix green theme colors
  const matrixGreen = '#00FF41';
  const matrixDarkGreen = '#003B00';
  const matrixLightGreen = '#00FF41';
  const matrixBgGreen = 'rgba(0, 77, 0, 0.5)';
  const matrixBorderGreen = 'rgba(0, 255, 65, 0.3)';

  return (
      <div
          className={`project-card ${direction === "right" ? "project-card-right" : "project-card-left"}`}
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            padding: '2.5vh 2vw',
            borderRadius: '1vw',
            boxShadow: '0 0 2vw rgba(0, 255, 68, 0.2)',
            background: matrixBgGreen,
            backdropFilter: 'blur(8px)',
            border: `1px solid ${matrixBorderGreen}`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: direction === "right" ? "flex-end" : "flex-start",
            textAlign: direction === "right" ? "right" : "left"
          }}
      >
      <span
          className="genre-tag"
          style={{
            display: 'inline-block',
            padding: '0.5vh 1vw',
            background: 'rgba(0, 255, 65, 0.15)',
            color: matrixGreen,
            borderRadius: '0.5vw',
            fontFamily: 'monospace',
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '1vh',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            border: `1px solid ${matrixBorderGreen}`
          }}
      >
        {genre}
      </span>

        <div className="project-title-container" style={{ marginBottom: '1.5vh', width: '100%' }}>
          <h3 style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: matrixLightGreen,
            margin: '0',
            fontFamily: 'inherit'
          }}>
            {title}
          </h3>
        </div>

        <p style={{
          fontSize: '0.95rem',
          lineHeight: '1.6',
          marginBottom: '2vh',
          color: '#e2e8f0',
          width: '100%',
          fontFamily: 'inherit'
        }}>
          {description}
        </p>

        {achievements.length > 0 && (
            <div className="project-achievements" style={{
              marginBottom: '2vh',
              width: '100%'
            }}>
              <h4 style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                marginBottom: '1vh',
                color: matrixLightGreen,
                fontFamily: 'inherit'
              }}>
                Key Achievements:
              </h4>
              <ul style={{
                paddingLeft: direction === "right" ? '0' : '2vw',
                paddingRight: direction === "right" ? '2vw' : '0',
                margin: '0',
                listStylePosition: direction === "right" ? "inside" : "outside",
                color: '#e2e8f0'
              }}>
                {achievements.map((achievement, index) => (
                    <li key={index} style={{
                      marginBottom: '0.8vh',
                      fontSize: '0.9rem',
                      lineHeight: '1.4',
                      textAlign: direction === "right" ? "right" : "left",
                      fontFamily: 'inherit'
                    }}>
                      {achievement}
                    </li>
                ))}
              </ul>
            </div>
        )}

        {technologies.length > 0 && (
            <div className="project-technologies" style={{ width: '100%', marginBottom: '2vh' }}>
              <h4 style={{
                fontSize: '0.95rem',
                fontWeight: '600',
                marginBottom: '1vh',
                color: matrixLightGreen,
                fontFamily: 'inherit'
              }}>
                Technologies:
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5vw',
                justifyContent: direction === "right" ? "flex-end" : "flex-start"
              }}>
                {technologies.map((tech, index) => (
                    <span
                        key={index}
                        style={{
                          display: 'inline-block',
                          padding: '0.4vh 0.8vw',
                          background: 'rgba(0, 255, 65, 0.15)',
                          border: `1px solid ${matrixBorderGreen}`,
                          color: matrixLightGreen,
                          borderRadius: '0.4vw',
                          fontSize: '0.8rem',
                          marginBottom: '0.5vh',
                          fontFamily: 'inherit'
                        }}
                    >
                {tech}
              </span>
                ))}
              </div>
            </div>
        )}

        {(links.demo || links.repo) && (
            <div style={{
              display: 'flex',
              gap: '1vw',
              justifyContent: direction === "right" ? "flex-end" : "flex-start",
              width: '100%'
            }}>
              {links.demo && (
                  <a
                      href={links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.8vh 1.5vw',
                        background: 'rgba(0, 255, 65, 0.7)',
                        color: '#000000',
                        borderRadius: '0.4vw',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                      }}
                  >
                    View Demo
                  </a>
              )}
              {links.repo && (
                  <a
                      href={links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.8vh 1.5vw',
                        background: 'transparent',
                        color: matrixLightGreen,
                        border: `1px solid ${matrixBorderGreen}`,
                        borderRadius: '0.4vw',
                        textDecoration: 'none',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit'
                      }}
                  >
                    View Code
                  </a>
              )}
            </div>
        )}
      </div>
  );
};

export default ProjectCard;