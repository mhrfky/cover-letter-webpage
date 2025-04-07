// src/sections/BogaziciSection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import Image from '../../components/Image';
import SkillCard from '../../components/cards/SkillCard';

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
                <p className="section-subtitle">
                  My path to tech began with intense preparation in high school. To secure a spot 
                  at Bogazici University—Turkey's premier IT program that accepts only the top 1000 students 
                  nationally—required extraordinary focus. Starting at rank 4999 in the preliminary exam 
                  (thanks to my literature skills), I doubled down on technical subjects and climbed to rank 573 
                  in the decisive second exam. This early challenge taught me that persistence and targeted effort 
                  can overcome seemingly insurmountable odds.
                </p>
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
                            background: `${area.color}30`,
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