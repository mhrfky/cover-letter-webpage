import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import NarrativeCard from '../components/cards/NarrativeCard';

const ConclusionSection = () => {
  return (
    <section id="conclusion-section">
      <AnimatedElement 
        animationType="spiral" 
        animationDuration="slow"
        onEnter={() => console.log('Conclusion section entered')}
      >
        <NarrativeCard 
          title="Let's Connect"
          description="Thank you for exploring my interactive portfolio. I'm always open to discussing new opportunities and collaborations."
          gif="/placeholder-conclusion.gif"
          caption="Reach out via email or social media"
        />
      </AnimatedElement>
    </section>
  );
};

export default ConclusionSection;