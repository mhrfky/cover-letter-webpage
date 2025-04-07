import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import ProjectCard from '../components/cards/ProjectCard';

const ProjectsSection = () => {
  // Project data
  const projects = [
    {
      id: 'project1',
      genre: "Web Development",
      title: "Interactive Portfolio",
      description: "A scroll-based interactive portfolio website that showcases projects and skills with dynamic background elements and engaging UI components.",
      achievements: [
        "Implemented parallax scrolling with React",
        "Created custom animation system",
        "Optimized performance for smooth scrolling experience"
      ],
      technologies: ["React", "Three.js", "CSS Animations", "Context API"],
      links: {
        repo: "https://github.com/yourusername/project"
      },
      animation: "flip-y"
    },
    {
      id: 'masters-thesis',
      genre: "Machine Learning / Reinforcement Learning",
      title: "Decision Transformer Curriculum Generation",
      description: "Applied Decision Transformer to generate trajectories and sample intermediate goals for RL agents in MuJoCo environments.",
      achievements: [
        "Achieved 50% to 200% speed increase in point mazes for agents reaching the goal",
        "Enhanced model stability with trajectory similarity metrics",
        "Mitigated feedback loops in return-to-go losses",
        "Experimented with classifiers and distance predictor algorithms"
      ],
      technologies: ["Python", "PyTorch", "MuJoCo", "Decision Transformers", "Reinforcement Learning"],
      links: {
        repo: "https://github.com/mhrfky/decision-transformer"
      },
      animation: "slide-up"
    },
    {
      id: 'youtube-extension',
      genre: "Web & Desktop Development",
      title: "YouTube Video Segment Extraction Suite",
      description: "A comprehensive solution for extracting and managing video segments from YouTube, implemented as both a browser extension and desktop application.",
      achievements: [
        "Architected separate solutions with React & TypeScript frontend",
        "Enabled video segment extraction via browser extension and Electron app",
        "Developed scalable Flask backend API with SQLite database",
        "Implemented efficient data management and request handling"
      ],
      technologies: ["React", "TypeScript", "Flask", "SQLite", "Electron", "Browser Extension API"],
      links: {
        repo: "https://github.com/mhrfky/youtube-extractor"
      },
      animation: "slide-right"
    },
    {
      id: 'eye-tracking',
      genre: "Data Analysis / Computer Vision",
      title: "Eye-Tracking Analysis Pipeline",
      description: "A comprehensive pipeline for PupilCore eye-tracker to generate diagrams & heatmaps on changing features of the driver.",
      achievements: [
        "Developed visualization tools for eye-tracking data",
        "Implemented various tag recognition algorithms",
        "Achieved 70% accuracy in low-visibility cases",
        "Applied degree of freedom reduction methods for improved performance"
      ],
      technologies: ["Python", "Computer Vision", "Data Visualization", "PupilCore"],
      links: {
        repo: "https://github.com/mhrfky/eye-tracking-pipeline"
      },
      animation: "fade"
    },
    {
      id: 'autonomous-driving',
      genre: "Computer Vision / Machine Learning",
      title: "Simulation-Based Autonomous Driving in Crowded City",
      description: "A comprehensive implementation of autonomous driving systems for navigating crowded urban environments in simulation.",
      achievements: [
        "Developed computer vision solutions using OpenCV for traffic scenarios",
        "Implemented R-CNN architecture for decision-making processes",
        "Created pipeline for generating semantic segmentation data",
        "Increased training data by 200% through experience generation"
      ],
      technologies: ["Python", "PyTorch", "OpenCV", "R-CNN", "Semantic Segmentation"],
      links: {
        repo: "https://github.com/mhrfky/autonomous-driving"
      },
      animation: "slide-left"
    },
    {
      id: 'bachelors-thesis',
      genre: "High Performance Computing",
      title: "Parallelization of Finding Maximum Edge Bicliques",
      description: "Implementation of parallel algorithms for finding maximum edge bicliques in bipartite networks using C++ and OpenMP.",
      achievements: [
        "Achieved 100% speedup with 16 threads using Task-Queue model",
        "Documented sub-optimal algorithms for reference",
        "Optimized memory usage for large graph processing",
        "Implemented parallel graph traversal algorithms"
      ],
      technologies: ["C++", "OpenMP", "Parallel Computing", "Graph Algorithms"],
      links: {
        repo: "https://github.com/mhrfky/max-edge-biclique"
      },
      animation: "flip-x"
    },
    {
      id: 'boids-simulation',
      genre: "Game Development / Simulation",
      title: "Boids Simulation",
      description: "A flocking behavior simulation that demonstrates emergent behavior through simple rules, optimized using Unity's Entity Component System.",
      achievements: [
        "Developed simulation using Unity's ECS and Job System",
        "Achieved 500% speedup through DOTS over traditional OOP",
        "Implemented realistic flocking behaviors",
        "Optimized for large numbers of entities"
      ],
      technologies: ["Unity", "C#", "ECS", "DOTS", "Job System"],
      links: {
        repo: "https://github.com/mhrfky/boids-simulation"
      },
      animation: "zoom-in"
    }
  ];
  
  return (
    <section id="projects-section">
      <div className="section-content">
        <AnimatedElement animationType="fade">
          <h2 className="section-title">Project Showcase</h2>
        </AnimatedElement>


        
        
          {projects.map((project, index) => (
            <section id="projects-section">
              <div className="section-content"> 
                <AnimatedElement 
                  key={project.id}
                  animationType={project.animation || (index % 2 === 0 ? "slide-left" : "slide-right")}
                  animationDelay={index % 3 === 0 ? "short" : index % 3 === 1 ? "medium" : "long"}
                  onEnter={() => console.log(`${project.id} entered viewport`)}
                >
                  <ProjectCard 
                    genre={project.genre}
                    title={project.title}
                    description={project.description}
                    achievements={project.achievements}
                    technologies={project.technologies}
                    links={project.links}
                    direction={index % 2 === 0 ? "left" : "right"}
                  />
                </AnimatedElement>
              </div>
            </section>
          ))}
          
        </div>
    </section>
  );
};

export default ProjectsSection;