import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('intro-section');
  
  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently most visible in the viewport
      const sections = document.querySelectorAll('section');
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      
      let maxVisibility = 0;
      let mostVisibleSection = activeSection;
      
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        // Calculate how much of the section is visible in the viewport
        const sectionBottom = sectionTop + sectionHeight;
        const visibleTop = Math.max(sectionTop, scrollTop);
        const visibleBottom = Math.min(sectionBottom, scrollTop + viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        
        // Calculate the percentage of the section that is visible
        const visibilityPercentage = visibleHeight / sectionHeight;
        
        if (visibilityPercentage > maxVisibility) {
          maxVisibility = visibilityPercentage;
          mostVisibleSection = section.id;
        }
      });
      
      if (mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeSection]);
  
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  // Navigation configuration
  const navItems = [
    { id: 'intro-section', label: 'Intro' },
    { id: 'talents-section', label: 'Skills' },
    { id: 'experience-section', label: 'Experience' },
    { id: 'projects-section', label: 'Projects' },
    { id: 'conclusion-section', label: 'Contact' }
  ];
  
  return (
    <nav className="section-nav">
      <ul>
        {navItems.map((item) => (
          <li 
            key={item.id}
            className={activeSection === item.id ? 'active' : ''}
            onClick={() => scrollToSection(item.id)}
            title={item.label}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;