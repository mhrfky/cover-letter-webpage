// src/sections/ThesisSection.js
import React from 'react';
import AnimatedElement from '../../components/AnimatedElement';
import TextContent from '../../components/TextContent';
import Graph from '../../components/Graph';

const ThesisSection = () => {

  return (
    <section id="thesis-section">
      <div className="section-content">
        {/* Thesis Title */}
        <AnimatedElement 
          animationType="slide-top"
          animationDuration="normal"
          animationEasing="smooth"
          className="mb-12"
        >
          <TextContent
            title="Master's Thesis Research"
            content="Improving Curriculum Learning for Reinforcement Learning Agents Using Decision Transformers"
            align="center"
            fontSize="large"
            maxWidth="800px"
          />
        </AnimatedElement>
        
        {/* Thesis Content */}
        <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
          {/* Left column */}
          <div className="w-full md:w-1/2">
            <AnimatedElement 
              animationType="fade"
              animationDuration="normal"
              animationEasing="smooth"
            >
              <TextContent
                content="My master's research examined how decision transformers could improve curriculum learning for reinforcement learning agents navigating complex environments. This wasn't just an academic exercise—it was a journey through the cutting edge of AI. I designed and implemented countless training configurations, developed custom loss functions, created specialized preprocessing pipelines, and analyzed the effects of various hyperparameter combinations."
                align="left"
                maxWidth="100%"
              />
            </AnimatedElement>
          </div>
          
          {/* Right column */}
          <div className="w-full md:w-1/2">
            <AnimatedElement 
              animationType="fade"
              animationDuration="normal"
              animationEasing="smooth"
              animationDelay="short"
            >
              <TextContent
                content="After months of experimentation and refinement, I achieved a 50-200% improvement in agent performance across target environments. This research not only advanced the field but also solidified my expertise in reinforcement learning systems and transformer architectures."
                align="left"
                maxWidth="100%"
              />
            </AnimatedElement>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ThesisSection;