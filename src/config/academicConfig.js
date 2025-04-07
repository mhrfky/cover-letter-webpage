// src/config/academicConfig.js
import NarrativeCard from '../components/cards/NarrativeCard';
import ProjectCard from '../components/cards/ProjectCard';

// Define the academic card data
export const academicCardsData = [
  {
    id: 'highschool-journey',
    stage: 'highschool',
    title: "High School Journey",
    description: "My path to tech began with intense preparation in high school. To secure a spot at Bogazici University—Turkey's premier IT program that accepts only the top 1000 students nationally—required extraordinary focus. Starting at rank 4999 in the preliminary exam (thanks to my literature skills), I doubled down on technical subjects and climbed to rank 573 in the decisive second exam. This early challenge taught me that persistence and targeted effort can overcome seemingly insurmountable odds.",
    position: 'left',
    color: '#3c78d8',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "Me during high school exam prep"
  },
  {
    id: 'bogazici-experience',
    stage: 'bachelor',
    title: "Bogazici University Experience",
    description: "At Bogazici, the rigorous pace continued, but now I was immersed in subjects that genuinely captivated me. The program's comprehensive curriculum exposed me to theoretical computer science, sophisticated data structures, hardware systems architecture, network protocols, and the foundations of machine learning. What began as required coursework evolved into intellectual curiosity—I found myself exploring tangential concepts simply for the joy of understanding. This intrinsic motivation carried me to graduation with honors (3.0/4.0).",
    achievements: [
      "Theoretical Computer Science",
      "Data Structures & Algorithms",
      "Hardware Systems",
      "Embedded Systems",
      "Networks",
      "Machine Learning Fundamentals",
      "Natural Language Processing"
    ],
    position: 'left',
    color: '#4285f4',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "My brain after each CS lecture"
  },
  {
    id: 'bachelor-thesis',
    stage: 'bachelor-thesis',
    title: "Bachelor's Thesis",
    description: "My bachelor's thesis became a personal obsession: optimizing integer programming solutions through parallelization in C++. I dove deep into thread management, synchronization mechanisms, and memory optimization techniques. The project offered the perfect blend of theoretical challenges and practical implementation—watching algorithms that previously took minutes execute in seconds after optimization provided tangible proof of what thoughtful engineering could achieve. This experience cemented my appreciation for performance-focused development.",
    position: 'right',
    color: '#5e97f6',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "Excited about code optimization"
  },
  {
    id: 'tum-masters',
    stage: 'master',
    title: "TUM Master's Program",
    description: "At Technical University of Munich, I built upon my foundation while pursuing specialized knowledge in emerging technologies. My coursework focused on deep learning architectures, advanced machine learning techniques, reinforcement learning theory, and computer vision systems. The international environment at TUM exposed me to diverse approaches to problem-solving and expanded my perspective beyond pure technical implementation to consider broader implications of technological solutions.",
    achievements: [
      "Deep Learning",
      "Advanced Machine Learning",
      "Reinforcement Learning",
      "C++ Programming",
      "Computer Vision"
    ],
    position: 'left',
    color: '#0f9d58',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "Deep learning concepts"
  },
  {
    id: 'master-thesis',
    stage: 'master-thesis',
    title: "Master's Thesis Research",
    description: "My master's research examined how decision transformers could improve curriculum learning for reinforcement learning agents navigating complex environments. This wasn't just an academic exercise—it was a journey through the cutting edge of AI. I designed and implemented countless training configurations, developed custom loss functions, created specialized preprocessing pipelines, and analyzed the effects of various hyperparameter combinations. After months of experimentation and refinement, I achieved a 50-200% improvement in agent performance across target environments.",
    position: 'right',
    color: '#33a853',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "Adding 'just one more' feature to my thesis"
  },
  {
    id: 'academic-summary',
    stage: 'summary',
    title: "Academic Journey Summary",
    description: "This academic journey—from competitive exams to specialized AI research—has equipped me with both theoretical depth and practical implementation skills across multiple domains. More importantly, it cultivated an approach to learning that combines methodical analysis with creative problem-solving. The breadth of my education allows me to connect concepts across disciplines, while the depth of my specialized work ensures I can dive into complex challenges with confidence.",
    position: 'center',
    color: '#fbbc04',
    gif: "/placeholder-academic.gif", // Replace with actual path when available
    caption: "My poor laptop by the end of my academic journey"
  }
];

// Academic journey configuration with normalized trigger points (0-100 scale) and animation types
export const academicConfig = [
    // Intro to academic journey
    {
      id: 'academic-intro',
      name: 'Academic Journey Introduction',
      triggerStart: 0.20,
      triggerEnd: 0.40,
      position: { x: 0, y: -400, z: 10 },
      component: NarrativeCard,
      props: {
        title: "My Academic Journey",
        description: "I've studied a lot, real a lot. From the competitive entrance exams to Turkey's best IT program to my specialized AI research at TUM, my academic journey has been intense but rewarding. These experiences have shaped not just what I know, but how I approach problems and continuous learning.",
        gif: "/placeholder-academic.gif", // Replace with actual path
        caption: "The educational path that shaped me"
      },
      onEnter: () => console.log('Academic intro entered'),
      onExit: () => console.log('Academic intro exited'),
      animationType: 'zoom-in',
      animationDuration: 'normal',
      animationEasing: 'smooth'
    },
    
    // High school journey
    {
      id: 'highschool-card',
      name: 'High School Journey',
      triggerStart: 0.32,
      triggerEnd: 0.52,
      position: { x: -600, y: 100, z: 10 },
      component: NarrativeCard,
      props: academicCardsData[0],
      onEnter: () => console.log('High school card entered'),
      onExit: () => console.log('High school card exited'),
      animationType: 'slide-left',
      animationDuration: 'normal',
      animationEasing: 'smooth'
    },
    
    // Bachelor experience
    {
      id: 'bachelor-card',
      name: 'Bachelor Experience',
      triggerStart: 0.41,
      triggerEnd: 0.56,
      position: { x: 600, y: -50, z: 10 },
      component: ProjectCard,
      props: {
        ...academicCardsData[1],
        genre: "Bachelor's Degree",
        technologies: academicCardsData[1].achievements
      },
      onEnter: () => console.log('Bachelor card entered'),
      onExit: () => console.log('Bachelor card exited'),
      animationType: 'slide-right',
      animationDuration: 'normal',
      animationEasing: 'smooth',
      animationDelay: 'short'
    },
    
    // Bachelor thesis
    {
      id: 'bachelor-thesis-card',
      name: 'Bachelor Thesis',
      triggerStart: 0.54,
      triggerEnd: 0.64,
      position: { x: -200, y: 50, z: 10 },
      component: NarrativeCard,
      props: academicCardsData[2],
      onEnter: () => console.log('Bachelor thesis card entered'),
      onExit: () => console.log('Bachelor thesis card exited'),
      animationType: 'rotate',
      animationDuration: 'normal',
      animationEasing: 'bounce'
    },
    
    // Master's program
    {
      id: 'masters-card',
      name: 'Masters Program',
      triggerStart: 0.64,
      triggerEnd: 0.75,
      position: { x: -500, y: 100, z: 10 },
      component: ProjectCard,
      props: {
        ...academicCardsData[3],
        genre: "Master's Degree",
        technologies: academicCardsData[3].achievements
      },
      onEnter: () => console.log('Masters card entered'),
      onExit: () => console.log('Masters card exited'),
      animationType: 'tilt',
      animationDuration: 'normal',
      animationEasing: 'smooth'
    },
    
    // Master's thesis
    {
      id: 'master-thesis-card',
      name: 'Master Thesis',
      triggerStart: 0.63,
      triggerEnd: 0.75,
      position: { x: 450, y: 150, z: 10 },
      component: NarrativeCard,
      props: academicCardsData[4],
      onEnter: () => console.log('Master thesis card entered'),
      onExit: () => console.log('Master thesis card exited'),
      animationType: 'flip-y',
      animationDuration: 'slow',
      animationEasing: 'elastic'
    },
    
    // Academic summary
    {
      id: 'academic-summary-card',
      name: 'Academic Summary',
      triggerStart: 0.75,
      triggerEnd: 0.86,
      position: { x: 0, y: 0, z: 10 },
      component: NarrativeCard,
      props: academicCardsData[5],
      onEnter: () => console.log('Academic summary card entered'),
      onExit: () => console.log('Academic summary card exited'),
      animationType: 'spiral',
      animationDuration: 'slow',
      animationEasing: 'bounce'
    },
  ];

export default academicConfig;


