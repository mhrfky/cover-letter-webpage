import React, { useState } from 'react';
import AnimatedElement from '../components/AnimatedElement';
import NarrativeCard from '../components/cards/NarrativeCard';
import AsciiArtCard from "../components/AsciiArtCard.jsx";

const ConclusionSection = () => {
    // State to track which social media is being hovered
    const [activeIcon, setActiveIcon] = useState(null);

    // Social media data with descriptions
    const socialLinks = [
        {
            id: 'github',
            filePath: '/github.txt',
            color: '#00ffff',
            fontSize: '4px',
            caption: "GitHub",
            description: "Check out my code repositories and open-source contributions",
            link: "https://github.com/mhrfky"
        },
        {
            id: 'linkedin',
            filePath: '/linkedin.txt',
            color: '#00aaff',
            fontSize: '10px',
            caption: "LinkedIn",
            description: "Connect with me professionally and see my work experience",
            link: "https://linkedin.com/in/magpy"
        },
        {
            id: 'gmail',
            filePath: '/gmail.txt',
            color: '#ff0000',
            fontSize: '10px',
            caption: "Email",
            description: "Contact me directly at your.email@gmail.com",
            link: "mailto:mhrfky@gmail.com"
        }
    ];

    return (
        <section id="conclusion-section" style={{
            padding: '10vh 5vw',
            width: '100%',
            boxSizing: 'border-box'
        }}>
            <AnimatedElement
                animationType="fade"
                animationDuration="slow"
                onEnter={() => console.log('Conclusion section entered')}
            >
                <div className="connect-card" style={{
                    background: 'rgba(0, 77, 0, 0.5)',
                    borderRadius: '1.5vw',
                    boxShadow: '0 0 3vw rgba(0, 255, 65, 0.2)',
                    padding: '4vh 3vw',
                    border: '1px solid rgba(0, 255, 65, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    {/* Matrix code rain effect in background */}
                    <div className="matrix-background" style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        opacity: 0.05,
                        zIndex: 0,
                        overflow: 'hidden',
                        pointerEvents: 'none'
                    }}>
                        {Array.from({ length: 30 }).map((_, i) => (
                            <div key={i} style={{
                                position: 'absolute',
                                color: '#00FF41',
                                fontFamily: 'monospace',
                                fontSize: '1rem',
                                left: `${Math.random() * 100}%`,
                                top: 0,
                                opacity: Math.random() * 0.8 + 0.2,
                                animation: `matrixRain ${Math.random() * 15 + 5}s linear infinite`,
                                animationDelay: `${Math.random() * 5}s`
                            }}>
                                {Array.from({ length: 20 }).map((_, j) => (
                                    <div key={j} style={{ marginBottom: '0.5rem' }}>
                                        {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <style>
                        {`
                          @keyframes matrixRain {
                            0% { transform: translateY(-100%); }
                            100% { transform: translateY(100vh); }
                          }
                          .social-icon-container {
                            transition: all 0.3s ease;
                          }
                          .social-icon-container:hover {
                            transform: translateY(-10px);
                          }
                          .speech-bubble {
                            position: absolute;
                            background: rgba(0, 255, 65, 0.1);
                            border: 1px solid rgba(0, 255, 65, 0.3);
                            border-radius: 10px;
                            padding: 12px 15px;
                            top: -80px;
                            left: 50%;
                            transform: translateX(-50%);
                            width: max-content;
                            max-width: 200px;
                            opacity: 0;
                            transition: opacity 0.3s ease, transform 0.3s ease;
                            color: #00FF41;
                            font-size: 0.9rem;
                            text-align: center;
                            pointer-events: none;
                            box-shadow: 0 0 15px rgba(0, 255, 65, 0.2);
                          }
                          .speech-bubble:after {
                            content: '';
                            position: absolute;
                            bottom: -10px;
                            left: 50%;
                            transform: translateX(-50%);
                            border-width: 10px 10px 0;
                            border-style: solid;
                            border-color: rgba(0, 255, 65, 0.3) transparent transparent transparent;
                          }
                          .social-icon-container:hover .speech-bubble {
                            opacity: 1;
                            transform: translateX(-50%) translateY(-5px);
                          }
                          /* Critical style for ASCII art preservation */
                          .ascii-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            width: 100%;
                            height: 100%;
                          }
                          .ascii-container pre {
                            white-space: pre !important;
                            text-align: left !important;
                            display: block !important;
                          }
                        `}
                    </style>

                    <h2 style={{
                        fontSize: '2.5rem',
                        color: '#00FF41',
                        textAlign: 'center',
                        marginBottom: '5vh',
                        fontWeight: 'bold',
                        textShadow: '0 0 10px rgba(0, 255, 65, 0.5)',
                        zIndex: 1
                    }}>Let's Connect</h2>

                    <p style={{
                        fontSize: '1.1rem',
                        color: '#e0e0e0',
                        textAlign: 'center',
                        marginBottom: '5vh',
                        maxWidth: '70%',
                        lineHeight: '1.6',
                        zIndex: 1
                    }}>
                        I'm always open to discussing new projects, creative ideas or opportunities to be part of your vision.
                        Feel free to reach out through any of the channels below.
                    </p>

                    <div className="social-links" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '5vw',
                        width: '100%',
                        zIndex: 1
                    }}>
                        {socialLinks.map(social => (
                            <a
                                key={social.id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="social-icon-container"
                                style={{
                                    textDecoration: 'none',
                                    position: 'relative',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    cursor: 'pointer'
                                }}
                                onMouseEnter={() => setActiveIcon(social.id)}
                                onMouseLeave={() => setActiveIcon(null)}
                            >
                                <div className="speech-bubble">
                                    {social.description}
                                </div>

                                <div style={{
                                    width: '240px',
                                    height: '240px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginBottom: '1vh',
                                    padding: '10px',
                                    borderRadius: '15px',
                                    background: 'rgba(0, 40, 0, 0.6)',
                                    border: `1px solid ${social.color}40`,
                                    boxShadow: activeIcon === social.id ? `0 0 20px ${social.color}80` : 'none',
                                    transition: 'all 0.3s ease',
                                    overflow: 'hidden'
                                }}>
                                    <div className="ascii-container">
                                        {/* Do NOT apply any text alignment or position to AsciiArtCard */}
                                        <AsciiArtCard
                                            title=""
                                            description=""
                                            textFilePath={social.filePath}
                                            color={social.color}
                                            textColor={social.color}
                                            fontSize={social.fontSize}
                                            style={{
                                                width: 'auto',
                                                height: 'auto'
                                            }}
                                        />
                                    </div>
                                </div>

                                <span style={{
                                    fontSize: '1rem',
                                    color: social.color,
                                    fontWeight: '600',
                                    textAlign: 'center'
                                }}>
                                    {social.caption}
                                </span>
                            </a>
                        ))}
                    </div>

                    <div className="connect-footer" style={{
                        marginTop: '6vh',
                        textAlign: 'center',
                        color: '#00FF41',
                        fontFamily: 'monospace',
                        opacity: 0.7,
                        fontSize: '0.9rem',
                        zIndex: 1
                    }}>
                        [ Terminal session will remain open. Ready for new connections. ]
                    </div>
                </div>
            </AnimatedElement>
        </section>
    );
};

export default ConclusionSection;