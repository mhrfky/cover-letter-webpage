import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import ProjectCard from '../components/cards/ProjectCard';

const ProjectsSection = () => {
  // Matrix green theme colors
  const matrixGreen = '#00FF41';
  const matrixDarkGreen = '#003B00';
  const matrixLightGreen = '#00FF41';
  const matrixBgGreen = 'rgba(0, 77, 0, 0.2)';
  const matrixBorderGreen = 'rgba(0, 255, 65, 0.3)';

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
        repo: "https://github.com/mhrfky/mhrfky.github.io"
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
        repo: "https://github.com/mhrfky/outpace_decision_transformer"
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
        repo: "https://github.com/mhrfky/yt_downloader_react_ts_electron_vite"
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
        repo: "https://github.com/mhrfky/IDP"
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
        repo: "https://github.com/mhrfky/biip-parallel"
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
        repo: "https://github.com/mhrfky/boids-simulation-unity"
      },
      animation: "zoom-in"
    }
  ];

  // Check if there's an odd number of projects
  const hasOddNumberOfProjects = projects.length % 2 !== 0;

  return (
      <section id="projects-section" style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '5vh 0'
      }}>
        {/* Header Section with Introduction */}
        <div className="projects-header" style={{
          padding: '2vh 5vw',
          marginBottom: '6vh',
          position: 'relative'
        }}>
          <AnimatedElement animationType="fade">


            <div className="flex justify-center">
              <div className="section-header">
                <h2 className="section-title" style={{
                  textAlign: "center",
                  marginBottom: '4vh',
                  color: matrixGreen
                }}>Project Showcase</h2>
                <p className="section-subtitle" style={{
                  textAlign: "center",
                  lineHeight: "1.8",
                  marginBottom: "2vh",
                  color: '#e2e8f0'
                }}>
                  Below is a collection of <span style={{color: matrixGreen, fontWeight: "600"}}>personal projects and research</span> that
                  showcase my technical abilities and problem-solving approach. These projects span a wide range of
                  domains, from <span style={{color: matrixGreen, fontWeight: "600"}}>machine learning</span> and <span
                    style={{color: matrixGreen, fontWeight: "600"}}>computer vision</span> to <span
                    style={{color: matrixGreen, fontWeight: "600"}}>web development</span> and <span
                    style={{color: matrixGreen, fontWeight: "600"}}>high-performance computing</span>.
                </p>

                <p className="section-subtitle" style={{
                  textAlign: "center",
                  lineHeight: "1.8",
                  color: '#e2e8f0'
                }}>
                  Each project represents a unique challenge I've embraced, driven by <span
                    style={{color: matrixGreen, fontWeight: "600"}}>curiosity</span> and a desire to <span
                    style={{color: matrixGreen, fontWeight: "600"}}>expand my technical horizons</span>. They
                  demonstrate not only my coding abilities but also my approach to research, problem decomposition, and
                  delivering elegant solutions.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Visual separator with matrix theme */}
        <div className="projects-separator" style={{
          width: '10vw',
          height: '0.2vh',
          background: `linear-gradient(to right, rgba(0, 255, 65, 0), rgba(0, 255, 65, 0.7), rgba(0, 255, 65, 0))`,
          margin: '0 auto 5vh auto'
        }} />

        {/* Matrix-styled decorative element */}
        <div className="matrix-code-symbol" style={{
          textAlign: 'center',
          fontSize: '1.5rem',
          color: matrixGreen,
          marginBottom: '4vh',
          fontFamily: 'monospace'
        }}>
          &lt;/&gt;
        </div>

        {/* Projects grid layout with special handling for the last item if odd number */}
        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',  // Two columns by default
          gap: '5vh 4vw',  // Vertical and horizontal gap
          padding: '0 5vw',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Map all projects except the last one if odd */}
          {projects.slice(0, hasOddNumberOfProjects ? projects.length - 1 : projects.length).map((project, index) => (
              <AnimatedElement
                  key={project.id}
                  animationType={project.animation || (index % 2 === 0 ? "slide-left" : "slide-right")}
                  animationDelay={index % 3 === 0 ? "short" : index % 3 === 1 ? "medium" : "long"}
                  onEnter={() => console.log(`${project.id} entered viewport`)}
                  style={{
                    height: '100%',
                    display: 'flex'
                  }}
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
          ))}
        </div>

        {/* Center the last project if there's an odd number */}
        {hasOddNumberOfProjects && (
            <div className="centered-last-project" style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '5vh 5vw 0 5vw',
              boxSizing: 'border-box'
            }}>
              <AnimatedElement
                  key={projects[projects.length - 1].id}
                  animationType={projects[projects.length - 1].animation || "zoom-in"}
                  animationDelay="medium"
                  onEnter={() => console.log(`${projects[projects.length - 1].id} entered viewport`)}
                  style={{
                    width: '100%',
                    maxWidth: '50%',  // Make it narrower than the full width
                    display: 'flex'
                  }}
              >
                <ProjectCard
                    genre={projects[projects.length - 1].genre}
                    title={projects[projects.length - 1].title}
                    description={projects[projects.length - 1].description}
                    achievements={projects[projects.length - 1].achievements}
                    technologies={projects[projects.length - 1].technologies}
                    links={projects[projects.length - 1].links}
                    direction="left"  // Use left direction for consistency
                />
              </AnimatedElement>
            </div>
        )}

        {/* Matrix-styled bottom decorative element */}
        <div className="matrix-code-symbol" style={{
          textAlign: 'center',
          fontSize: '1rem',
          color: matrixGreen,
          margin: '5vh auto 0 auto',
          fontFamily: 'monospace',
          opacity: 0.7
        }}>
          [ End of Projects ]
        </div>
      </section>
  );
};

export default ProjectsSection;