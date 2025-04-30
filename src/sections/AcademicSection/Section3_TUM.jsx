// src/sections/TUMSection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import NarrativeCard from '../../components/cards/NarrativeCard';
import SkillCard from '../../components/cards/SkillCard';
import AsciiArtCard from "../../components/AsciiArtCard.jsx";

const TUMSection = () => {
  // Specialized studies at TUM with colors
  const specializedStudies = [
    { name: "Deep Learning", color: '#10b981' },
    { name: "Advanced Machine Learning", color: '#ef4444' },
    { name: "Reinforcement Learning", color: '#3b82f6' },
    { name: "C++ Programming", color: '#8b5cf6' },
    { name: "Computer Vision", color: '#2dd4bf' }
  ];
  
  const getDelay = (index) => {
    const delays = ['short', 'medium', 'long'];
    return delays[index % 3];
  };
  
  return (
      <section className="right-large" id="tum-section">


          <div className="section-content-large">



            {/* TUM Master's Experience */}
            <div>
              <div className="section-header">
                {/* Left column: Master's Program Description */}
                <div className="w-full md:w-1/2">
                  <AnimatedElement
                      animationType="tilt"
                      animationDuration="normal"
                      animationEasing="smooth"
                  >
                    <h2 className="section-title">TUM Master's Program</h2>
                    <AsciiArtCard
                        title=""
                        description=""
                        textFilePath="/tum.txt"
                        color="#00FF41"
                        textColor="#00FF41"
                        fontSize="4px"
                        position="left"
                    />
                    <p className="section-subtitle">
                      At Technical University of Munich, I built upon my foundation while pursuing specialized
                      knowledge in emerging technologies. My coursework focused on deep learning architectures,
                      advanced machine learning techniques, reinforcement learning theory, and computer vision systems.
                      The international environment at TUM exposed me to diverse approaches to problem-solving
                      and expanded my perspective beyond pure technical implementation to consider broader implications
                      of technological solutions.
                    </p>
                  </AnimatedElement>
                </div>

                {/* Right column: Specialized Studies */}
                <div className="w-full md:w-1/2">
                  <AnimatedElement
                      animationType="fade"
                      animationDuration="normal"
                      animationEasing="smooth"
                  >
                    <div style={{
                      padding: '20px',
                      borderRadius: '12px',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                      textAlign: 'left',
                      marginRight: 'auto' // Push to the left
                    }}>
                      <div style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        color: '#4fb0c6',
                        marginBottom: '10px',
                        textAlign: 'left'
                      }}>
                        Specialized Studies:
                      </div>

                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        justifyContent: 'flex-start' // Align items to the left
                      }}>
                        {specializedStudies.map((area, index) => (
                            <AnimatedElement
                                key={index}
                                animationType="slide-left"
                                animationDelay={getDelay(index)}
                                onEnter={() => console.log(`${area.name} entered viewport`)}
                                hideWhenOutOfView={true}
                            >
                        <span
                            style={{
                              // background: `${area.color}30`,
                              color: 'white',
                              padding: '5px 12px',
                              borderRadius: '20px',
                              fontSize: '0.85rem',
                              border: `1px solid ${area.color}50`,
                              display: 'inline-block',
                              transition: 'all 0.3s ease',
                              cursor: 'default'
                            }}
                        >
                          <p className="section-subtitle"> {area.name}</p>
                        </span>
                            </AnimatedElement>
                        ))}
                      </div>
                    </div>
                  </AnimatedElement>
                </div>
              </div>
            </div>
          </div>
        </section>
        );
        };

        export default TUMSection;