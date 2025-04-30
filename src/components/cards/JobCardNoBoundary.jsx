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
      <div
          className={`job-card ${direction === "right" ? "job-card-right" : "job-card-left"}`}
          style={{
            maxWidth: '50vw',
            width: '100%',
            margin: direction === "right" ? "0 0 0 auto" : "0 auto 0 0",
            boxSizing: 'border-box',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0px 20px rgba(0, 255, 68, 0.2)',

            background: 'rgba(0, 150, 0, 0.5);',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: direction === "right" ? "right" : "left"
        }}>
        <span className="section-subtitle" style={{
          // color: '#38bdf8',
          fontWeight: 'bold',
          // fontSize: '1.2rem',
          marginBottom: '8px'
        }}>{company}</span>

          <div className="job-period-container" style={{
            display: 'flex',
            flexDirection: direction === "right" ? "row-reverse" : "row",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: '16px'
          }}>
          <span className="section-title" style={{
            // fontSize: '0.95rem',
            fontWeight: '600',
            marginRight: direction === "right" ? '0' : '10px',
            marginLeft: direction === "right" ? '10px' : '0'
          }}>{role}</span>
            <span className="period-subtitle" style={{
              // fontSize: '0.85rem',
              // color: '#94a3b8',
              fontStyle: 'italic'
            }}>{period}</span>
          </div>

          <p className="section-subtitle" style={{
            // fontSize: '0.95rem',
            lineHeight: '1.6',
            marginBottom: '16px',
            // color: '#e2e8f0',
            textAlign: direction === "right" ? "right" : "left"
          }}>{description}</p>

          {responsibilities.length > 0 && (
              <div className="job-responsibilities" style={{
                marginBottom: '16px',
                textAlign: direction === "right" ? "right" : "left"
              }}>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  // color: '#f8fafc'
                }}>Key Responsibilities:</h4>
                <ul style={{
                  paddingLeft: direction === "right" ? '0' : '20px',
                  paddingRight: direction === "right" ? '20px' : '0',
                  marginTop: '8px',
                  listStylePosition: direction === "right" ? "inside" : "outside",
                  fontSize: '0.9rem',
                  lineHeight: '1.5'
                }}>
                  {responsibilities.map((responsibility, index) => (
                      <li key={index} style={{
                        marginBottom: '6px',
                        textAlign: direction === "right" ? "right" : "left"
                      }}>{responsibility}</li>
                  ))}
                </ul>
              </div>
          )}

          {technologies.length > 0 && (
              <div className="job-technologies" style={{
                textAlign: direction === "right" ? "right" : "left"
              }}>
                <h4 style={{
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  // color: '#f8fafc'
                }}>Technologies:</h4>
                <div className="tech-tags" style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  justifyContent: direction === "right" ? "flex-end" : "flex-start"
                }}>
                  {technologies.map((tech, index) => (
                      <span
                          key={index}
                          className="tech-tag"
                          style={{
                            display: 'inline-block',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.8rem',
                            background: 'rgba(0, 189, 0, 0.15)',
                            border: '1px solid rgba(0, 189, 0, 0.3)',
                            // color: '#38bdf8'
                          }}
                      >{tech}</span>
                  ))}
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default JobCardNoBoundary;