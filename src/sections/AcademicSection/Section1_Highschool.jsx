// src/sections/HighSchoolSection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import NarrativeCard from '../../components/cards/NarrativeCard';

const HighSchoolSection = () => {
  return (
    <section className="section-full" id="highschool-section">
      {/* Left side content */}
      <div className="section-content-large section-left">
        <div className="w-full md:w-1/2">
          <AnimatedElement 
            animationType="slide-left"
            animationDuration="normal"
            animationEasing="smooth"
            onEnter={() => console.log('High school journey entered')}
            onExit={() => console.log('High school journey exited')}
          >
            <div className="section-header">
              <p className="section-subtitle">
                My path to tech began with intense preparation in high school. To secure a spot 
                at Bogazici University—Turkey's premier IT program that accepts only the top 1000 students 
                nationally—required extraordinary focus. Starting at rank 4999 in the preliminary exam 
                (thanks to my literature skills), I doubled down on technical subjects and climbed to rank 573 
                in the decisive second exam. This early challenge taught me that persistence and targeted effort 
                can overcome seemingly insurmountable odds.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
      
      {/* Right side content */}
      <div className="section-content section-right">
        <div className="w-full md:w-1/2">
          <AnimatedElement 
            animationType="slide-right"
            animationDuration="normal"
            animationEasing="smooth"
            onEnter={() => console.log('Bogazici praise entered')}
            onExit={() => console.log('Bogazici praise exited')}
          >
            <NarrativeCard
              title="Bogazici University"
              description="Regarded as the most prestigious university in Turkey, Bogazici University's Computer Engineering program is highly competitive, accepting only the top 1000 students nationally. The rigorous curriculum and world-class faculty provide an exceptional foundation in computer science fundamentals and advanced topics."
              color="#4285f4"
              position="center"
              gif="/placeholder-bogazici.gif"
              caption="Bogazici University campus"
            />
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default HighSchoolSection;