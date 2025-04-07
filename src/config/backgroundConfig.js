// backgroundConfig.js
export const backgroundConfig = {
    farLayer: {
      backgrounds: [
        {
          id: 'intro-bg',
          type: 'gradient',
          value: 'linear-gradient(to bottom, #2c3e50, #4ca1af)',
          startAt: 0,
          endAt: 0.2
        },
        {
          id: 'academic-bg',
          type: 'gradient',
          value: 'linear-gradient(to bottom, #4ca1af, #c4e0e5)',
          startAt: 0.2,
          endAt: 0.4
        },
        {
          id: 'projects-bg',
          type: 'gradient',
          value: 'linear-gradient(to bottom, #c4e0e5, #f9d423)',
          startAt: 0.4,
          endAt: 0.6
        },
        {
          id: 'professional-bg',
          type: 'gradient',
          value: 'linear-gradient(to bottom, #f9d423, #ff4e50)',
          startAt: 0.6,
          endAt: 0.8
        },
        {
          id: 'conclusion-bg',
          type: 'gradient',
          value: 'linear-gradient(to bottom, #ff4e50, #2c3e50)',
          startAt: 0.8,
          endAt: 1.0
        }
      ]
    },
    midLayer: {
      elements: [
        // Intro section elements
        {
          id: 'circle-1',
          type: 'shape',
          startAt: 0,
          endAt: 0.25,
          position: { x: 25, y: 30 },
          size: { width: 150, height: 150 },
          color: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '50%',
          parallaxFactor: 1.2,
          direction: { x: 0.2, y: 1 },
          animation: {
            type: 'fade',
            fadeIn: true
          }
        },
        {
          id: 'square-1',
          type: 'shape',
          startAt: 0.05,
          endAt: 0.3,
          position: { x: 80, y: 70 },
          size: { width: 120, height: 120 },
          color: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          parallaxFactor: 0.8,
          direction: { x: -0.3, y: 0.7 },
          animation: {
            type: 'rotate',
            startAngle: 0,
            endAngle: 45
          }
        },
        
        // Academic section elements
        {
          id: 'academic-shape-1',
          type: 'shape',
          startAt: 0.15,
          endAt: 0.4,
          position: { x: 15, y: 60 },
          size: { width: 200, height: 100 },
          color: 'rgba(76, 161, 175, 0.2)',
          borderRadius: '50px',
          parallaxFactor: 1.5,
          direction: { x: 0.5, y: 0.5 },
          animation: {
            type: 'scale',
            startScale: 0.7,
            endScale: 1.2
          }
        },
        {
          id: 'academic-text',
          type: 'text',
          startAt: 0.2,
          endAt: 0.45,
          position: { x: 70, y: 20 },
          content: 'Learning',
          color: 'rgba(255, 255, 255, 0.15)',
          fontSize: '5rem',
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
          parallaxFactor: 0.7,
          direction: { x: -0.2, y: 0.8 },
          animation: {
            type: 'fade',
            fadeIn: true
          }
        },
        
        // Projects section elements
        {
          id: 'project-shape-1',
          type: 'shape',
          startAt: 0.35,
          endAt: 0.6,
          position: { x: 85, y: 40 },
          size: { width: 180, height: 180 },
          color: 'rgba(249, 212, 35, 0.15)',
          borderRadius: '20px',
          parallaxFactor: 1.2,
          direction: { x: -0.4, y: 0.6 },
          animation: {
            type: 'rotate',
            startAngle: -20,
            endAngle: 20
          }
        },
        {
          id: 'project-shape-2',
          type: 'shape',
          startAt: 0.4,
          endAt: 0.65,
          position: { x: 30, y: 70 },
          size: { width: 100, height: 100 },
          color: 'rgba(249, 212, 35, 0.25)',
          borderRadius: '50%',
          parallaxFactor: 0.9,
          direction: { x: 0.3, y: 0.7 },
          animation: {
            type: 'scale',
            startScale: 1,
            endScale: 1.5
          }
        },
        
        // Professional section elements
        {
          id: 'professional-text',
          type: 'text',
          startAt: 0.55,
          endAt: 0.8,
          position: { x: 60, y: 30 },
          content: 'Experience',
          color: 'rgba(255, 255, 255, 0.2)',
          fontSize: '4.5rem',
          fontWeight: 'bold',
          textShadow: '0 0 15px rgba(0, 0, 0, 0.3)',
          parallaxFactor: 1.1,
          direction: { x: 0.1, y: 0.9 },
          animation: {
            type: 'fade',
            fadeIn: true
          }
        },
        {
          id: 'professional-shape',
          type: 'shape',
          startAt: 0.6,
          endAt: 0.85,
          position: { x: 20, y: 50 },
          size: { width: 250, height: 150 },
          color: 'rgba(255, 78, 80, 0.15)',
          borderRadius: '30px',
          parallaxFactor: 1.3,
          direction: { x: 0.4, y: 0.6 },
          animation: {
            type: 'scale',
            startScale: 0.8,
            endScale: 1.2
          }
        },
        
        // Conclusion section elements
        {
          id: 'conclusion-shape-1',
          type: 'shape',
          startAt: 0.75,
          endAt: 1,
          position: { x: 70, y: 60 },
          size: { width: 200, height: 200 },
          color: 'rgba(44, 62, 80, 0.2)',
          borderRadius: '50%',
          parallaxFactor: 1,
          direction: { x: -0.2, y: 0.8 },
          animation: {
            type: 'fade',
            fadeIn: true
          }
        },
        {
          id: 'conclusion-shape-2',
          type: 'shape',
          startAt: 0.8,
          endAt: 1,
          position: { x: 30, y: 30 },
          size: { width: 150, height: 150 },
          color: 'rgba(255, 78, 80, 0.15)',
          borderRadius: '10px',
          parallaxFactor: 1.4,
          direction: { x: 0.3, y: 0.7 },
          animation: {
            type: 'rotate',
            startAngle: 0,
            endAngle: 90
          }
        }
      ]
    },
    nearLayer: {
      scenes: [
        {
          id: 'intro-scene',
          type: 'geometric',
          startAt: 0,
          endAt: 0.25,
          color: 0x4ca1af,
          wireframe: true,
          count: 15,
          camera: {
            x: 0,
            y: 0,
            z: 6
          }
        },
        {
          id: 'academic-scene',
          type: 'particles',
          startAt: 0.2,
          endAt: 0.45,
          color: 0xc4e0e5,
          particleSize: 0.08,
          count: 2000,
          camera: {
            x: 0,
            y: 0,
            z: 5
          }
        },
        {
          id: 'projects-scene',
          type: 'geometric',
          startAt: 0.4,
          endAt: 0.65,
          color: 0xf9d423,
          wireframe: false,
          count: 20,
          camera: {
            x: 1,
            y: 1,
            z: 7
          }
        },
        {
          id: 'professional-scene',
          type: 'particles',
          startAt: 0.6,
          endAt: 0.85,
          color: 0xff4e50,
          particleSize: 0.06,
          count: 1500,
          camera: {
            x: -1,
            y: 0,
            z: 6
          }
        },
        {
          id: 'conclusion-scene',
          type: 'text',
          startAt: 0.8,
          endAt: 1.0,
          color: 0x2c3e50,
          camera: {
            x: 0,
            y: 0,
            z: 5
          }
        }
      ]
    }
  };