import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import AsciiComponent from '../components/Matrix/AsciiComponent';
const TalentsSection = () => {
  // Skill data
  const skills = [
    {
      id: 'fast-learner',
      title: "Fast Learner",
      description: "I can quickly adapt to new technologies and concepts, allowing me to be productive in diverse environments.",
      instances: [],
      animation: "slide-left"
    },
    {
      id: 'adaptable',
      title: "Adaptable",
      description: "Comfortable working in changing environments and pivoting based on new requirements or constraints.",
      instances: [],
      animation: "slide-right"
    },
    {
      id: 'self-development',
      title: "Self-Directed Learning",
      description: "I continuously seek out opportunities to improve my skills and knowledge in web development and beyond.",
      instances: [],
      animation: "slide-left"
    },
    {
      id: 'ownership',
      title: "Ownership Mindset",
      description: "I take responsibility for my work and ensure projects are completed to a high standard.",
      instances: [],
      animation: "tilt"
    },
    {
      id: 'quality',
      title: "Quality Focus",
      description: "I prioritize writing clean, maintainable code and delivering polished user experiences.",
      instances: [],
      animation: "bounce"
    }
  ];

  // Delay definitions based on index
  const getDelay = (index) => {
    const delays = ['short', 'medium', 'long'];
    return delays[index % 3];
  };
  
  return (
    <section id="talents-section" className="section-large section-right">
      {/* Matrix Scene in its own container with proper positioning */}
      <div className="section-content-large section-left" height="150vh">
        <div className="w-full md:w-1/2">
          <div style={{ position: 'absolute', top: '-20%', left: '-18%' }}>
              <AsciiComponent
                filePath="./can-do.txt"
                width={200}
                height={200}
                scale={1}
                cellSize={24}
                float={true}
                floatAmount={20}
                floatSpeed={0.1}
                fontColor="#63c5ed"
                letterSpacing={1}
                shiny={true} // Enable shiny effect
                glowColor="rgba(99, 197, 237, 0.8)"
                glowSize={8}
                pulse={true}
                pulseSpeed={0.8}
              />
          </div>
        </div>
      </div>

      <div className="section-content section-content-medium">
        {/* Section intro - hide when out of view */}
        <AnimatedElement
          animationType="zoom-in"
          hideWhenOutOfView={true}
        >
          <div className="section-header" style={{ textAlign: 'right', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            <h2 className="section-title">Who am I?</h2>
            <p className="section-subtitle">
              I am a versatile developer with a passion for building innovative and user-friendly applications. I have developed
              a wide range of skills and experiences, including web development, software engineering, AI Solutions, Reinforcement Learning,
              Backend Development, Game Development and more.
            </p>
          </div>
        </AnimatedElement>

      </div>
    </section>
  );
};

export default TalentsSection;