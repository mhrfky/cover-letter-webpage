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
        <section>
            <MatrixScene/>


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

      

        </section>
    </div>
  );
};

export default AcademicJourney;