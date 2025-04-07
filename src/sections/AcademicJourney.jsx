// src/pages/AcademicJourney.js
import React from 'react';
import IntroSection from './AcademicSection/Section0_Intro';
import HighSchoolSection from './AcademicSection/Section1_Highschool';
import BogaziciSection from './AcademicSection/Section2_Bogazici';
import TUMSection from './AcademicSection/Section3_TUM';
import ThesisSection from './AcademicSection/Section4_MsThesis';
import SummarySection from './AcademicSection/Section5_Conclusion';

const AcademicJourney = () => {
  return (
    <div className="academic-journey">
      {/* Section Navigation Dots */}
      <nav className="section-nav">
        <ul>
          <li className="active" onClick={() => document.getElementById('intro-section').scrollIntoView({ behavior: 'smooth' })}></li>
          <li onClick={() => document.getElementById('highschool-section').scrollIntoView({ behavior: 'smooth' })}></li>
          <li onClick={() => document.getElementById('bogazici-section').scrollIntoView({ behavior: 'smooth' })}></li>
          <li onClick={() => document.getElementById('tum-section').scrollIntoView({ behavior: 'smooth' })}></li>
          <li onClick={() => document.getElementById('thesis-section').scrollIntoView({ behavior: 'smooth' })}></li>
          <li onClick={() => document.getElementById('summary-section').scrollIntoView({ behavior: 'smooth' })}></li>
        </ul>
      </nav>
      
      {/* Introduction Section */}
      <IntroSection />
      
      {/* High School Section */}
      <HighSchoolSection />
      
      {/* Bogazici University Section */}
      <BogaziciSection />
      
      {/* TUM Section */}
      <TUMSection />
      
      {/* Thesis Section */}
      {/* <ThesisSection /> */}
      
      {/* Summary Section */}
      <SummarySection />
      
      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
};

export default AcademicJourney;