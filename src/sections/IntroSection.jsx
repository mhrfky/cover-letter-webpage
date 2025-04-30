import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import MatrixScene from '../components/Matrix/MatrixScene';
import AsciiComponent from '../components/Matrix/AsciiComponent';

const IntroSection = () => {
  return (
      <div>

          <section>
              <MatrixScene/>

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

              <section id="talents-section" height = "200vh" className="section-large section-right">


                  <div className="section-content section-content-medium">
                      {/* Section intro - hide when out of view */}
                      <AnimatedElement
                          animationType="zoom-in"
                          hideWhenOutOfView={true}
                      >
                          <div className="section-header"
                               style={{textAlign: 'right', maxWidth: '800px', margin: '0 auto 2rem auto'}}>
                              <h2 className="section-title">Who am I?</h2>
                              <p className="section-subtitle">
                                  I am a versatile developer with a passion for building innovative and user-friendly
                                  applications. I have developed
                                  a wide range of skills and experiences, including web development, software
                                  engineering,
                                  AI Solutions, Reinforcement Learning,
                                  Backend Development, Game Development and more.
                              </p>
                          </div>
                      </AnimatedElement>

                  </div>
              </section>
              <section id="talents-section" className="section-large section-right">


              </section>
          </section>
      </div>
);
};

export default IntroSection;