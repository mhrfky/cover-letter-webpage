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
      description: "At Zeiss Meditec, I embraced challenges beyond my defined role, dedicating myself to transforming legacy systems while enhancing team productivity. From modernizing backend architecture to crafting elegant automation solutions, I consistently pursued excellence across the full development spectrum—proving that meaningful innovation often transcends conventional boundaries.",
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
      description: "At Siemens Yunex, I immersed myself in the DevOps ecosystem, cultivating expertise in cutting-edge infrastructure technologies while enhancing critical traffic management systems. This pivotal experience transformed my understanding of modern deployment architectures and the vital intersection between development and operations.",
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
      description: "My tenure at Ulak Haberlesme revealed the profound elegance and power of systems programming. Delving into C++'s intricate landscape, I discovered a boundless realm of optimization possibilities while crafting high-performance telecommunications infrastructure—an experience that fundamentally reshaped my approach to computational efficiency.",
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
      description: "Amadeus became my gateway to the transformative world of Machine Learning, where I explored the fascinating intersection of data science and business intelligence. This formative experience illuminated the vast potential of predictive analytics to extract meaningful patterns from complex datasets, forever expanding my technological horizons.",
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
      <section id="experience-section" style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {/* Header Section with Introduction */}
        <div className="experience-header" style={{
          padding: '2vh 5vw',
          marginBottom: '8vh', // Creates space between intro and job cards
          position: 'relative'
        }}>
          <AnimatedElement animationType="fade">
            <h2 className="section-title" style={{textAlign: "center", marginBottom: '4vh'}}>Professional Experience</h2>

            <div className="flex justify-center">
              <div className="section-header">
                <p className="section-subtitle" style={{
                  textAlign: "center",
                  lineHeight: "1.8",
                  marginBottom: "2vh"
                }}>
                  My professional journey reflects the same <span style={{ color: "#38bdf8", fontWeight: "600" }}>versatility and adaptability</span> evident in my academic background.
                  I've navigated diverse technical landscapes—from <span style={{ color: "#38bdf8", fontWeight: "600" }}>Backend Development</span> to
                  <span style={{ color: "#38bdf8", fontWeight: "600" }}> DevOps</span> and <span style={{ color: "#38bdf8", fontWeight: "600" }}>Data Analysis</span>—mastering
                  multiple programming paradigms along the way.
                </p>

                <p className="section-subtitle" style={{
                  textAlign: "center",
                  lineHeight: "1.8"
                }}>
                  While my core expertise lies in <span style={{ color: "#38bdf8", fontWeight: "600" }}>Backend Engineering</span> and
                  <span style={{ color: "#38bdf8", fontWeight: "600" }}> Machine Learning</span>, I embrace every technical challenge with enthusiasm and dedication.
                  This breadth of experience has equipped me with a holistic understanding of software ecosystems and the ability to
                  <span style={{ color: "#38bdf8", fontWeight: "600" }}> seamlessly adapt to any technological environment</span>.
                </p>
              </div>
            </div>
          </AnimatedElement>
        </div>



        {/* Job Timeline Section */}
        <div className="job-timeline" style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: '10vh'
        }}>

          {jobs.map((job, index) => (
              <div
                  key={job.id}
                  className={index % 2 === 0 ? "timeline-item-left" : "timeline-item-right"}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                    padding: '0 5vw',
                    marginBottom: '15vh', // Creates vertical space between job cards
                    position: 'relative',
                    zIndex: 1
                  }}
              >


                <AnimatedElement
                    animationType={job.animation}
                    animationDelay={index % 2 === 0 ? "short" : "medium"}
                    onEnter={() => console.log(`${job.id} entered viewport`)}
                    style={{
                      width: '100%',
                      maxWidth: '55vw' // Makes the job cards narrower horizontally
                    }}
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
        </div>
      </section>
  );
};

export default ExperienceSection;