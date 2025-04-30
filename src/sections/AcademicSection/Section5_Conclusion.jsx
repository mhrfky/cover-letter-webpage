// src/sections/SummarySection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import NarrativeCard from '../../components/cards/NarrativeCard';

const SummarySection = () => {
  return (
    <section className="section-large section-center" id="summary-section">
      <div className="section-content">
        <div className="section-header">

          <AnimatedElement
              animationType="zoom-in"
              animationDuration="fast"
              animationEasing="bounce"
          >

            <h2 className="section-title">Academic Journey Summary</h2>
          </AnimatedElement>
          <AnimatedElement
              animationType="slide-left"
              animationDuration="slow"
              animationEasing="bounce"
              delay="long"

          >
            <p className="section-subtitle">
              This academic journey—from competitive exams to specialized AI research—has
              equipped me with both theoretical depth and practical implementation skills
              across multiple domains. More importantly, it cultivated an approach to learning
              that combines methodical analysis with creative problem-solving. The breadth
              of my education allows me to connect concepts across disciplines, while the
              depth of my specialized work ensures I can dive into complex challenges with confidence.
            </p>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;