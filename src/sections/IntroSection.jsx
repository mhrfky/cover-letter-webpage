import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import MatrixScene from '../components/Matrix/MatrixScene';

const IntroSection = () => {
  return (
    <section id="intro-section" className="section-large section-center">
      <MatrixScene
        assetScale={1.0}
        showDebug={false}
        intensity={1.2}
        speed={1.2}
        showAsset={true}  // Set to true if you want to show the asset
        containerStyle={{
          height: '100%',
          position: 'absolute',  // Make matrix scene an absolute background
          top: 0,
          left: 0,
          width: '100%'
        }}
      />
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