// src/components/cards/AsciiArtCard.js
import React, { useState, useEffect } from 'react';

const AsciiArtCard = ({
                          title,
                          description,
                          color = '#4285f4',
                          textFilePath,
                          textColor = '#333333',
                          fontSize = '14px',
                          position = 'left',
                          style = {},
                          showBorder = false // Added a prop to control border visibility
                      }) => {
    const [textContent, setTextContent] = useState('');

    // Fetch text file content
    useEffect(() => {
        if (textFilePath) {
            fetch(textFilePath)
                .then(response => response.text())
                .then(text => {
                    setTextContent(text);
                })
                .catch(error => {
                    console.error('Error loading text file:', error);
                    setTextContent('Error loading ASCII art.');
                });
        }
    }, [textFilePath]);

    // Calculate alignment based on position prop
    const getAlignment = () => {
        switch (position) {
            case 'right':
                return 'right';
            case 'center':
                return 'center';
            case 'left':
            default:
                return 'left';
        }
    };

    const textAlign = getAlignment();

    // Combine default styles with any passed-in styles
    const containerStyles = {
        textAlign,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: textAlign === 'left' ? 'flex-start' :
            textAlign === 'right' ? 'flex-end' : 'center',
        ...style
    };

    return (
        <div className="ascii-art-wrapper" style={containerStyles}>
            {title && <h2 style={{textAlign}}>{title}</h2>}
            {description && <p style={{textAlign}}>{description}</p>}

            <div style={{
                // Only show borders if showBorder is true
                borderLeft: showBorder && color && textAlign !== 'right' ? `4px solid ${color}` : 'none',
                borderRight: showBorder && color && textAlign === 'right' ? `4px solid ${color}` : 'none',
                paddingLeft: showBorder && color && textAlign !== 'right' ? '10px' : '0',
                paddingRight: showBorder && color && textAlign === 'right' ? '10px' : '0',
                width: '100%',
                display: 'flex',
                justifyContent: textAlign === 'left' ? 'flex-start' :
                    textAlign === 'right' ? 'flex-end' : 'center'
            }}>
                <pre
                    style={{
                        color: textColor,
                        fontFamily: 'monospace',
                        fontSize: fontSize,
                        whiteSpace: 'pre',
                        lineHeight: '1',
                        margin: '0',
                        padding: '0',
                        textAlign,
                        display: 'inline-block'
                    }}
                >
                    {textContent}
                </pre>
            </div>
        </div>
    );
};

export default AsciiArtCard;