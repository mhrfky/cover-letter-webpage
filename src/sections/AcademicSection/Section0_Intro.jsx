import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import MatrixScene from '../../components/Matrix/MatrixScene';

const IntroSection = () => {
  return (
    <section id="intro-section">
      
      {/* Content outside MatrixScene to ensure animations work properly */}
      <div className="section-content" style={{ position: 'relative', zIndex: 0, backgroundColor: 'transparent !important' }}>
        <AnimatedElement 
          animationType="zoom-in"
          animationDuration="normal"
          animationEasing="smooth"
          onEnter={() => console.log('Academic intro entered')}
          onExit={() => console.log('Academic intro exited')}
        >
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto', backgroundColor: 'transparent !important' }}>
            <h2 className="section-title">My Academic Journey</h2>
            <p className="section-subtitle">
              From succeeding in Turkey's competitive entrance exams to its top IT program to pursuing specialized AI research at TUM, my academic journey has been intense but rewarding, shaping both my knowledge and approach to continuous learning.
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