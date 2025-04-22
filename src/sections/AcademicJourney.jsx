// src/pages/AcademicJourney.js
import React from 'react';
import IntroSection from './AcademicSection/Section0_Intro';
import HighSchoolSection from './AcademicSection/Section1_Highschool';
import BogaziciSection from './AcademicSection/Section2_Bogazici';
import TUMSection from './AcademicSection/Section3_TUM';
import ThesisSection from './AcademicSection/Section4_MsThesis';
import SummarySection from './AcademicSection/Section5_Conclusion';
import MatrixScene from '../components/Matrix/MatrixScene';

const AcademicJourney = () => {
  return (
    <div className="app">
      {/* Section Navigation Dots */}

      <MatrixScene
        assetScale={1.0}
        showDebug={false}
        intensity={1.2}
        speed={1.2}
        showAsset={true}  // Set to true if you want to show the asset
        containerStyle={{
          height: '100%',
          position: 'absolute',  // Make matrix scene an absolute background
          top: 0,
          left: 0,
          width: '100%',
          background : 'transparent'
        }}
      />
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