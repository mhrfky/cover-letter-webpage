// src/components/cards/TextContentCard.js
import React, { useState, useEffect } from 'react';

const TextContentCard = ({
                             title,
                             description,
                             color = '#4285f4',
                             textFilePath,
                             textColor = '#333333',
                             fontFamily = 'Arial, sans-serif',
                             fontSize = '14px',
                             position = 'center'
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
                    setTextContent('Error loading text content.');
                });
        }
    }, [textFilePath]);

    // Set position styles
    const getPositionStyle = () => {
        switch (position) {
            case 'left':
                return { marginRight: 'auto', marginLeft: '0' };
            case 'right':
                return { marginLeft: 'auto', marginRight: '0' };
            case 'center':
            default:
                return { marginLeft: 'auto', marginRight: 'auto' };
        }
    };

    return (
        <div
            className="text-content-card card"
            style={{
                borderLeft: `4px solid ${color}`,
                ...getPositionStyle()
            }}
        >


            {textContent && (
                <div
                    className="text-content"
                    style={{
                        color: textColor,
                        fontFamily: fontFamily,
                        fontSize: fontSize,
                        whiteSpace: 'pre-wrap', // Preserves text formatting
                        padding: '0px',
                        backgroundColor: '#f9f9f9',
                        borderRadius: '4px',
                        maxHeight: '500px',
                        overflow: 'auto'
                    }}
                >
                    {textContent}
                </div>
            )}
        </div>
    );
};

export default TextContentCard;