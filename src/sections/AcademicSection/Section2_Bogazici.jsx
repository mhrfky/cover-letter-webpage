// src/sections/BogaziciSection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import Image from '../../components/Image';
import SkillCard from '../../components/cards/SkillCard';
import AsciiComponent from "../../components/Matrix/AsciiComponent.jsx";
import AsciiArtCard from "../../components/AsciiArtCard.jsx";

const BogaziciSection = () => {
  // Key areas studied at Bogazici with colors
  const keyAreas = [
    { name: "Theoretical Computer Science", color: '#10b981' },
    { name: "Data Structures & Algorithms", color: '#ef4444' },
    { name: "Hardware Engineering", color: '#3b82f6' },
    { name: "Embedded Systems", color: '#8b5cf6' },
    { name: "Network Engineering", color: '#2dd4bf' },
    { name: "Machine Learning", color: '#f59e0b' },
    { name: "Natural Language Processing", color: '#ec4899' },
    { name: "AI Development", color: '#10b981' },
    { name: "System Engineering", color: '#10b981' },
    { name: "Database Development", color: '#2dd4bf'}
  ];

  // Delay definitions based on index
  const getDelay = (index) => {
    const delays = ['short', 'medium', 'long'];
    return delays[index % 3];
  };

  return (
      <section className="section-right section-large" id="bogazici-section">
        <div className="section-content force-right-align">
          {/* Bogazici Experience */}
          <div className="mb-16">
            <h2 className="section-title text-center mb-10">Bogazici University Experience</h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Left column: Description */}
              <div className="w-full md:w-1/2">
                <AnimatedElement
                    animationType="fade"
                    animationDuration="normal"
                    animationEasing="smooth"
                >
                  <div className="flex flex-col items-end">
                    <AsciiArtCard
                        title=""
                        description=""
                        textFilePath="/bogazici.txt"
                        color="#00FF41"
                        textColor="#00FF41"
                        fontSize="4px"
                        position="right"
                    />

                    <p className="section-subtitle text-right">
                      During my time at <span style={{ color: '#38bdf8', fontWeight: '600' }}>Boğaziçi University</span> — Turkey's most prestigious institution —
                      I discovered a world of boundless intellectual curiosity. Like a child in a sweet shop,
                      I was captivated by the diversity of knowledge available to me.
                      <br/><br/>
                      The <span style={{ color: '#38bdf8', fontWeight: '600' }}>exceptional academic environment</span> allowed me to explore multiple disciplines,
                      cultivating the versatility that defines my approach today. This renowned institution's
                      rich tradition of excellence shaped my rigorous analytical thinking and innovative problem-solving abilities.
                    </p>
                  </div>
                </AnimatedElement>
              </div>

              {/* Right column: Key Areas in tech-style display */}
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
                    textAlign: 'right',
                    marginLeft: 'auto' // Push to the right
                  }}>
                    <div style={{
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      color: '#4fb0c6',
                      marginBottom: '10px',
                      textAlign: 'right'
                    }}>
                      Key Areas of Study:
                    </div>

                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '8px',
                      justifyContent: 'flex-end' // Align items to the right
                    }}>
                      {keyAreas.map((area, index) => (
                          <AnimatedElement
                              key={index}
                              animationType="slide-right"
                              animationDelay={getDelay(index)}
                              onEnter={() => console.log(`${area.name} entered viewport`)}
                              hideWhenOutOfView={true}
                          >
                            <span
                                style={{
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

export default BogaziciSection;