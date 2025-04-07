import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';

const IntroSection = () => {
  return (
    <section id="intro-section">
      <div className="section-content">
        <AnimatedElement 
          animationType="zoom-in"
          animationDuration="normal"
          animationEasing="smooth"
          onEnter={() => console.log('Academic intro entered')}
          onExit={() => console.log('Academic intro exited')}
        >
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            <h2 className="section-title">My Academic Journey</h2>
            <p className="section-subtitle">
            I've studied a lot, real a lot. From the competitive entrance exams to Turkey's best IT program to my
             specialized AI research at TUM, my academic journey has been intense but rewarding. These experiences
              have shaped not just what I know, but how I approach problems and continuous learning.
            </p>
          </div>
          <TextContent
            title=""
            content=""
            align="center"
            maxWidth="800px"
          />
        </AnimatedElement>
      </div>
    </section>
  );
};

export default IntroSection;