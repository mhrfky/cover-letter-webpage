import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import SkillCard from '../components/cards/SkillCard';
import MatrixScene from '../components/Matrix/MatrixScene'
import StaticAsciiComponent from '../components/Matrix/StaticAsciiComponent';
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
      <div className="section-content-large section-left">
        <div className="w-full md:w-1/2">
          <div style={{ position: 'absolute', top: '10%', left: '5%' }}>
              <StaticAsciiComponent 
                src="https://i.imgur.com/63ToT82.png"
                width={200}
                height={200}
                scale={1}
                cellSize={16}
                float={true}
                floatAmount={120}
                floatSpeed={0.5}
                fontColor="#00FF41"
                letterSpacing={1}
                shiny={true} // Enable shiny effect
                glowColor="rgba(0, 255, 68, 0.8)"
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
        
        {/* Skills grid - each skill card hides when out of view */}
        {/* <div className="skills-grid">
          {skills.map((skill, index) => (
            <AnimatedElement 
              key={skill.id}
              animationType={skill.animation}
              animationDelay={getDelay(index)}
              onEnter={() => console.log(`${skill.id} entered viewport`)}
              hideWhenOutOfView={true}
            >
              <SkillCard 
                title={skill.title}
                description={skill.description}
                instances={skill.instances}
              />
            </AnimatedElement>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default TalentsSection;