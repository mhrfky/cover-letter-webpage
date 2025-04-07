// src/config/talentsConfig.js
import SkillCard from '../components/cards/SkillCard';

// Define the talent card data
export const talentCardsData = [
  {
    id: 'fast-learner',
    title: "Fast Learner",
    description: "I quickly grasp new concepts and technologies, allowing me to adapt to changing requirements and contribute effectively in diverse technical environments.",
    instances: [
      "Consistently learn and implement new technologies within tight timeframes",
      "Self-taught in multiple programming languages and frameworks",
      "Approach unfamiliar challenges with confidence and resourcefulness"
    ],
    color: '#2d46b9',
    logo: "🚀",
  },
  {
    id: 'adaptable',
    title: "Adaptable",
    description: "I thrive in dynamic environments and easily adjust to new tools, methodologies, and team structures to meet evolving project needs.",
    instances: [
      "Switch between different technologies and frameworks as projects require",
      "Remain productive during organizational changes and shifting priorities",
      "Comfortable working across the full development stack when needed"
    ],
    color: '#4a6fc4',
    logo: "🔄",
  },
  {
    id: 'self-development',
    title: "Thirst for Self-Development",
    description: "I actively pursue opportunities to enhance my skills and knowledge, believing that continuous improvement is essential for professional growth.",
    instances: [
      "Dedicate personal time to learning emerging technologies and best practices",
      "Seek out challenging projects that push my technical boundaries",
      "Stay current with industry trends through continuous education"
    ],
    color: '#3a5bbf',
    logo: "📈",
  },
  {
    id: 'ownership',
    title: "Ownership Mentality",
    description: "I take full responsibility for my work, ensuring that commitments are met with high-quality deliverables regardless of obstacles encountered.",
    instances: [
      "Willingly put in extra effort when projects require it",
      "Proactively identify and address potential issues before they impact deadlines",
      "Maintain high standards even under pressure"
    ],
    color: '#5375cf',
    logo: "🔐",
  },
  {
    id: 'quality-focus',
    title: "Quality-Focused",
    description: "I believe in getting things right the first time, paying careful attention to details while maintaining sight of the bigger picture.",
    instances: [
      "Create robust, maintainable code that stands the test of time",
      "Balance perfectionism with practical delivery requirements",
      "Take pride in producing work that exceeds expectations"
    ],
    color: '#6680d9',
    logo: "✨",
  }
];


// talentsConfig.js - with animation types
const talentsConfig = [
    {
      id: 'fast-learner-card',
      props: {
        title: "Fast Learner",
        description: "I adapt quickly to new technologies and techniques. My educational journey illustrates this: from mastering programming fundamentals to specialized machine learning in just a few years.",
        instances: [
          "Learned Three.js and WebGL for a 3D visualization project in under a week",
          "Went from basic Python to advanced AI implementations in one semester",
          "Rapidly picked up new database tech to optimize a backend service"
        ]
      },
      animationType: 'zoom-in',
      animationDuration: 'fast',
      animationEasing: 'bounce'
    },
    {
      id: 'adaptable-card',
      props: {
        title: "Adaptable",
        description: "I thrive in dynamic environments and adjust easily to changing requirements or constraints. This flexibility helps me stay effective even when project parameters shift.",
        instances: [
          "Pivoted a machine learning project when initial approach didn't yield expected results",
          "Quickly adjusted to remote collaboration tools and workflows during the pandemic",
          "Successfully integrated with teams using different development methodologies"
        ]
      },
      animationType: 'flip-y',
      animationDuration: 'normal',
      animationEasing: 'elastic'
    },
    {
      id: 'self-development-card',
      props: {
        title: "Continuous Self-Development",
        description: "I actively seek opportunities to expand my knowledge and skills. Learning isn't just part of my job—it's a personal passion that extends beyond work hours.",
        instances: [
          "Built side projects exploring emerging technologies like AR and blockchain",
          "Completed online courses on system design and cloud architecture",
          "Participate in competitive programming challenges to sharpen algorithm skills"
        ]
      },
      animationType: 'rotate',
      animationDuration: 'normal',
      animationEasing: 'smooth'
    },
    {
      id: 'ownership-card',
      props: {
        title: "Ownership Mindset",
        description: "I take responsibility for my work from concept to completion, anticipating problems and proactively addressing issues before they affect project timelines.",
        instances: [
          "Led a student team project, ensuring all components were integrated properly",
          "Identified and fixed a critical security vulnerability before deployment",
          "Documented complex processes to ensure knowledge wasn't siloed"
        ]
      },
      animationType: 'tilt',
      animationDuration: 'normal',
      animationEasing: 'bounce'
    },
    {
      id: 'quality-card',
      props: {
        title: "Quality Focus",
        description: "I prioritize building robust, well-tested solutions rather than quick fixes. I believe that investing in quality up front saves time and frustration in the long run.",
        instances: [
          "Implemented comprehensive test coverage for a critical data processing system",
          "Refactored legacy code to improve maintainability and reduce technical debt",
          "Developed detailed documentation to ensure system longevity"
        ]
      },
      animationType: 'bounce',
      animationDuration: 'normal',
      animationEasing: 'bounce'
    }
  ];
  
  export default talentsConfig;
  