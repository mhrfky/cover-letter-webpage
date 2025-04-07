import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import SkillCard from '../components/cards/SkillCard';

const TalentsSection = () => {
  // Skill data
  const skills = [
    {
      id: 'fast-learner',
      title: "Fast Learner",
      description: "I can quickly adapt to new technologies and concepts, allowing me to be productive in diverse environments.",
      instances: [
        "Learned React in two weeks to build a client project",
        "Picked up Python and data visualization for a research project",
        "Mastered new frameworks and libraries as needed for projects"
      ],
      animation: "slide-left"
    },
    {
      id: 'adaptable',
      title: "Adaptable",
      description: "Comfortable working in changing environments and pivoting based on new requirements or constraints.",
      instances: [
        "Successfully navigated changing project requirements",
        "Worked across frontend and backend as needed",
        "Adjusted to different team workflows and methodologies"
      ],
      animation: "slide-right"
    },
    {
      id: 'self-development',
      title: "Self-Directed Learning",
      description: "I continuously seek out opportunities to improve my skills and knowledge in web development and beyond.",
      instances: [
        "Completed multiple online courses during free time",
        "Built personal projects to develop new skills",
        "Participate in tech communities and discussions"
      ],
      animation: "slide-left"
    },
    {
      id: 'ownership',
      title: "Ownership Mindset",
      description: "I take responsibility for my work and ensure projects are completed to a high standard.",
      instances: [
        "Led development of key features from concept to deployment",
        "Proactively identified and fixed issues before they affected users",
        "Documented processes to help future team members"
      ],
      animation: "tilt"
    },
    {
      id: 'quality',
      title: "Quality Focus",
      description: "I prioritize writing clean, maintainable code and delivering polished user experiences.",
      instances: [
        "Implemented comprehensive testing strategies",
        "Refactored legacy code to improve performance",
        "Made detailed code reviews to ensure high quality standards"
      ],
      animation: "bounce"
    }
  ];

  // Delay definitions based on index
  const getDelay = (index) => {
    const delays = ['short', 'medium', 'long'];
    return delays[index % 3];
  };
  
  return (
    <section id="talents-section">
      <div className="section-content">
        {/* Section intro - hide when out of view */}
        <AnimatedElement 
          animationType="zoom-in"
          hideWhenOutOfView={true}
        >
          <div className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
            <h2 className="section-title">Who am I?</h2>
            <p className="section-subtitle">
              I am a recent graduate from Technical University of Munich (TUM) with a Master's in Informatics 
              focusing around Machine Learning and a Bachelor's in Computer Science. I have a large variety 
              of talents and experiences. Kind of like Jack of All Trades, Master of None.
            </p>
          </div>
        </AnimatedElement>
        
        {/* Skills grid - each skill card hides when out of view */}
        <div className="skills-grid">
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
        </div>
      </div>
    </section>
  );
};

export default TalentsSection;