import React from 'react';
import AnimatedElement from '../components/AnimatedElement';
import JobCard from '../components/cards/JobCard';
import JobCardNoBoundary from '../components/cards/JobCardNoBoundary';

const ExperienceSection = () => {
  // Job data
  const jobs = [
    {
      id: 'job1',
      company: "Zeiss Meditec",
      role: "SOFTWARE ENGINEER (PART-TIME)",
      location: "Munich, Germany",
      period: "Feb 2023 - Jul 2024",
      description: "Worked on software development and optimization for medical technology applications.",
      responsibilities: [
        "Implemented and documented Java 9 Modularization and GraalVM, providing module independence",
        "Automated external module integration into Maven, and optimized Maven build pipeline, reducing build time by 54%",
        "Developed Python-based visual log analysis tool with Asciidoctor for improved debugging efficiency",
        "Implemented seamless integration between DICOM visualization tools and Spring code with .ini files",
        "Designed and implemented service discovery mechanism using .ini files for dynamic service configuration",
        "Created PowerShell scripts for automated environment setup and configuration management",
        "Implemented parallel data transfer system over LAN with real-time progress tracking"
      ],
      technologies: ["Java", "GraalVM", "Maven", "Python", "Asciidoctor", "Spring", "PowerShell"],
      animation: "expand"
    },
    {
      id: 'job2',
      company: "Siemens Yunex",
      role: "SOFTWARE ENGINEER (PART-TIME)",
      location: "Munich, Germany",
      period: "Jan 2022 - Jun 2022",
      description: "Focused on monitoring solutions and CI/CD pipeline improvements for traffic management systems.",
      responsibilities: [
        "Developed real-time road monitoring dashboards using Grafana and LogQL",
        "Improved monitoring of 5 aspects of traffic management",
        "Optimized CI/CD pipeline and containerization process for RPM Builder"
      ],
      technologies: ["Grafana", "LogQL", "CI/CD", "RPM Builder", "Containerization"],
      animation: "expand"
    },
    {
      id: 'job3',
      company: "Ulak Haberlesme",
      role: "C++ DEVELOPER",
      location: "Istanbul, Turkey",
      period: "Jul 2020 - Sep 2020",
      description: "Developed high-performance network optimization tools for telecommunications.",
      responsibilities: [
        "Developed network performance optimization tools using C++ and DPDK",
        "Implemented high-performance circular and linear buffer management system",
        "Created TCP/UDP package generation and management system with DPDK framework"
      ],
      technologies: ["C++", "DPDK", "Network Programming", "Buffer Management", "TCP/UDP"],
      animation: "expand"
    },
    {
      id: 'job4',
      company: "Amadeus",
      role: "DATA ANALYST",
      location: "Istanbul, Turkey",
      period: "Jul 2019 - Sep 2019",
      description: "Enhanced data retrieval systems and built predictive models for flight information analysis.",
      responsibilities: [
        "Enhanced existing REST API by adding efficient SQL queries for data retrieval using Java SpringBoot and PL-SQL",
        "Implemented cross-repository data retrieval system integrating multiple data sources for comprehensive flight information",
        "Built predictive machine learning models using clustering and regression methods for customer flight pattern analysis",
        "Optimized model performance through feature selection techniques, achieving 85% accuracy in pattern forecasting"
      ],
      technologies: ["Java", "SpringBoot", "PL-SQL", "REST API", "Machine Learning", "Clustering", "Regression"],
      animation: "expand"
    }
  ];
  
  return (
    <section id="experience-section">
      {/* <div className="section-content section-left section-large"> */}
        {/* TODO centralize the title */}
        <AnimatedElement animationType="fade"> 
          <h2 className="section-title">Professional Experience</h2>
        </AnimatedElement>
        
        {jobs.map((job, index) => (
          <div className={index % 2 === 0 ? "section-content section-left section-large" : "section-content section-right section-large"}>

          <AnimatedElement 
            key={job.id}
            animationType={job.animation}
            animationDelay={index % 2 === 0 ? "short" : "medium"}
            onEnter={() => console.log(`${job.id} entered viewport`)}
          >
            <JobCardNoBoundary   
              company={job.company}
              role={job.role}
              period={job.period}
              description={job.description}
              responsibilities={job.responsibilities}
              technologies={job.technologies}
              direction={index % 2 === 0 ? "left" : "right"}
            />
          </AnimatedElement>
          </div>
        ))}
      {/* </div> */}
    </section>
  );
};

export default ExperienceSection;