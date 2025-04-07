// uiConfig.js
import NarrativeCard from '../components/cards/NarrativeCard';
import ProjectCard from '../components/cards/ProjectCard';
import JobCard from '../components/cards/JobCard';
import SkillCard from '../components/cards/SkillCard';
import academicConfig from './academicConfig';
import talentsConfig from './talentsConfig';
import exportUIConfig from './utils';

const TOTAL_HEIGHT = 10000; // Total scrollable height in pixels

const academicConfigAbs = exportUIConfig(academicConfig, 3000, 5000);

// Add animation types to all elements
const addAnimationTypes = (elements) => {
  return elements.map(element => {
    // If the element already has animation settings, leave them intact
    if (element.animationType) {
      return element;
    }

    // Default animation settings based on component type or position
    let animationType = 'fade';
    let animationDuration = 'normal';
    let animationEasing = 'smooth';
    
    // Set animation type based on component or id pattern
    if (element.component === NarrativeCard) {
      if (element.position.y < 0) {
        animationType = 'slide-top';
      } else if (element.position.y > 0) {
        animationType = 'slide-bottom'; 
      } else {
        animationType = 'zoom-in';
      }
    } 
    else if (element.component === ProjectCard) {
      if (element.position.x < 0) {
        animationType = 'slide-left';
      } else {
        animationType = 'slide-right';
      }
    }
    else if (element.component === SkillCard) {
      // Pick special animations for specific skill cards
      if (element.id.includes('fast-learner')) {
        animationType = 'zoom-in';
      } else if (element.id.includes('adaptable')) {
        animationType = 'flip-y';
      } else if (element.id.includes('self-development')) {
        animationType = 'rotate';
      } else if (element.id.includes('ownership')) {
        animationType = 'tilt';
      } else if (element.id.includes('quality')) {
        animationType = 'bounce';
      } else {
        animationType = 'swing';
      }
    }
    else if (element.component === JobCard) {
      animationType = 'expand';
    }
    
    // If it's a conclusion or summary card, use a special animation
    if (element.id.includes('conclusion') || element.id.includes('summary')) {
      animationType = 'spiral';
      animationDuration = 'slow';
      animationEasing = 'bounce';
    }
    
    return {
      ...element,
      animationType,
      animationDuration,
      animationEasing
    };
  });
};

// Combine all UI elements and add animation types
const allElements = addAnimationTypes([
  // Intro Section
  {
    id: 'intro',
    name: 'Introduction',
    triggerStart: 0,
    triggerEnd: 1200,
    position: { x: 0, y: -50, z: 10 },
    component: NarrativeCard,
    props: {
      title: "Hi, I'm Mahir Efe Kaya",
      description: "I have noticed that traditional cover letters might come as stale and generic. So, I decided to create a more lighthearted cover letter to share my journey in a fun way. I hope you enjoy it!",
      gif: "/placeholder-intro.gif",
      caption: "Scroll down to begin the journey"
    },
    onEnter: () => console.log('Intro section entered'),
    onExit: () => console.log('Intro section exited'),
    animationType: 'fade', // Custom animation override
    animationDuration: 'slow',
    animationEasing: 'smooth'
  },
  
  // Talents section
  // Intro to talents
  {
    id: 'talents-intro',
    name: 'Talents Introduction',
    triggerStart: 1300,
    triggerEnd: 2800,
    position: { x: 0, y: 0, z: 10 },
    component: SkillCard,
    props: {
      title: "Who am I?",
      description: "I am a recent graduate from Technical University of Munich (TUM) with a Master's in Informatics focusing around Machine Learning and a Bachelor's in Computer Science. I have large variety of talents and experiences. Kind of like Jack of All Trades, Master of None.",
      instances: []
    },
    onEnter: () => console.log('Talents intro entered'),
    onExit: () => console.log('Talents intro exited'),
    animationType: 'zoom-in',
    animationDuration: 'normal',
    animationEasing: 'smooth'
  },
  
  // Individual talent cards - staggered appearance
  {
    id: 'fast-learner-card',
    name: 'Fast Learner',
    triggerStart: 1500,
    triggerEnd: 2800,
    position: { x: -200, y: -150, z: 10 },
    component: SkillCard,
    props: talentsConfig[0].props,
    onEnter: () => console.log('Fast learner card entered'),
    onExit: () => console.log('Fast learner card exited'),
    animationType: 'slide-left',
    animationDuration: 'normal',
    animationEasing: 'bounce',
    animationDelay: 'short'
  },
  {
    id: 'adaptable-card',
    name: 'Adaptable',
    triggerStart: 1700,
    triggerEnd: 2800,
    position: { x: 200, y: -100, z: 10 },
    component: SkillCard,
    props: talentsConfig[1].props,
    onEnter: () => console.log('Adaptable card entered'),
    onExit: () => console.log('Adaptable card exited'),
    animationType: 'slide-right',
    animationDuration: 'normal',
    animationEasing: 'bounce',
    animationDelay: 'medium'
  },
  {
    id: 'self-development-card',
    name: 'Self Development',
    triggerStart: 1900,
    triggerEnd: 2800,
    position: { x: -150, y: 100, z: 10 },
    component: SkillCard,
    props: talentsConfig[2].props,
    onEnter: () => console.log('Self development card entered'),
    onExit: () => console.log('Self development card exited'),
    animationType: 'slide-left',
    animationDuration: 'normal',
    animationEasing: 'bounce',
    animationDelay: 'long'
  },
  {
    id: 'ownership-card',
    name: 'Ownership',
    triggerStart: 2100,
    triggerEnd: 2800,
    position: { x: 250, y: 50, z: 10 },
    component: SkillCard,
    props: talentsConfig[3].props,
    onEnter: () => console.log('Ownership card entered'),
    onExit: () => console.log('Ownership card exited'),
    animationType: 'slide-right',
    animationDuration: 'normal',
    animationEasing: 'bounce',
    animationDelay: 'short'
  },
  {
    id: 'quality-card',
    name: 'Quality Focus',
    triggerStart: 2300,
    triggerEnd: 2800,
    position: { x: 0, y: 200, z: 10 },
    component: SkillCard,
    props: talentsConfig[4].props,
    onEnter: () => console.log('Quality card entered'),
    onExit: () => console.log('Quality card exited'),
    animationType: 'slide-bottom',
    animationDuration: 'normal',
    animationEasing: 'bounce',
    animationDelay: 'medium'
  },
  
  // Academic section
  ...academicConfigAbs,
  
  // Professional Experience
  {
    id: 'job-experience',
    name: 'Professional Experience',
    triggerStart: 5200,
    triggerEnd: 6800,
    position: { x: -200, y: 50, z: 10 },
    component: JobCard,
    props: {
      company: "Tech Company Inc.",
      role: "Frontend Developer",
      period: "Jan 2022 - Present",
      description: "Working on cutting-edge web applications with focus on user experience and performance optimization.",
      responsibilities: [
        "Developing responsive UI components",
        "Implementing state management solutions",
        "Collaborating with design and backend teams",
        "Optimizing application performance"
      ],
      technologies: ["React", "TypeScript", "Redux", "GraphQL", "Styled Components"]
    },
    onEnter: () => console.log('Job experience section entered'),
    onExit: () => console.log('Job experience section exited'),
    animationType: 'tilt',
    animationDuration: 'slow',
    animationEasing: 'elastic'
  },
  
  // Project Showcase
  {
    id: 'project-1',
    name: 'Project Showcase 1',
    triggerStart: 6600,
    triggerEnd: 8200,
    position: { x: 200, y: 0, z: 10 },
    component: ProjectCard,
    props: {
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
        demo: "https://example.com/demo",
        repo: "https://github.com/yourusername/project"
      }
    },
    onEnter: () => console.log('Project 1 section entered'),
    onExit: () => console.log('Project 1 section exited'),
    animationType: 'flip-y',
    animationDuration: 'normal',
    animationEasing: 'smooth'
  },
  
  // Conclusion
  {
    id: 'conclusion',
    name: 'Conclusion',
    triggerStart: 8000,
    triggerEnd: TOTAL_HEIGHT,
    position: { x: 0, y: 0, z: 10 },
    component: NarrativeCard,
    props: {
      title: "Let's Connect",
      description: "Thank you for exploring my interactive portfolio. I'm always open to discussing new opportunities and collaborations.",
      gif: "/placeholder-conclusion.gif",
      caption: "Reach out via email or social media"
    },
    onEnter: () => console.log('Conclusion section entered'),
    onExit: () => console.log('Conclusion section exited'),
    animationType: 'bounce',
    animationDuration: 'slow',
    animationEasing: 'elastic'
  }
]);

// Direct definition of UI config
export const uiConfig = {
  totalHeight: TOTAL_HEIGHT,
  elements: allElements
};
