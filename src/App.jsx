import React, { useState } from 'react';
import IntroSection from './sections/IntroSection';
import TalentsSection from './sections/TalentsSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ConclusionSection from './sections/ConclusionSection';
import Navigation from './components/Navigation';
import ScrollToTop from './components/ScrollToTop';
import ScrollDebugger from './components/ScrollDebugger';
import AcademicJourney from './sections/AcademicJourney';
// Import styles - order matters, fixed.css must be last to override previous styles
import './styles/main.css';
import MatrixScene from './components/Matrix/MatrixScene';

const App = () => {
  const [showDebugger, setShowDebugger] = useState(false);

  // Add keyboard shortcut to toggle debugger
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'd' && e.ctrlKey) {
        setShowDebugger(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div >
        <section>

      {/* Main sections */}

      <IntroSection />

      {/*<TalentsSection />*/}

      <AcademicJourney />

        <section id="experience-section" style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>
                <MatrixScene/>
                <ExperienceSection/>
                <section/>
                <ProjectsSection/>

        </section>
            <ConclusionSection/>

            {/* Debugger - press Ctrl+D to toggle */}
            {showDebugger && <ScrollDebugger/>}
        </section>
    </div>
  );
};

export default App;