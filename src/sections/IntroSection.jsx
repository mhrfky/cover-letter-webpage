import React from 'react';
import AnimatedElement from '../components/AnimatedElement';

const IntroSection = () => {
  return (
    <section id="intro-section" className="section-large section-center">
      <div className="section-content section-content-medium">

        <AnimatedElement 
          animationType="fade" 
          animationDuration="slow"
          onEnter={() => console.log('Intro section entered')}
        >
          <h2 className="section-title">Interactive Cover Letter</h2>
          <p className="section-subtitle">
          I have noticed that traditional cover letters might come as stale and generic. 
          So, I decided to create a more lighthearted cover letter to share my journey in 
          a fun way. I hope you enjoy it!
          </p>
        </AnimatedElement>

      </div>
    </section>
  );
};

export default IntroSection;