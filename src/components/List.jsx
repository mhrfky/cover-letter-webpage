// src/components/List.js
import React from 'react';

const List = ({ 
  items, 
  title, 
  iconType = 'bullet', 
  itemClassName = '' 
}) => {
  // Determine icon type
  const getIcon = (index) => {
    switch (iconType) {
      case 'number':
        return `${index + 1}.`;
      case 'academic':
        return '🎓';
      case 'check':
        return '✓';
      case 'star':
        return '★';
      case 'arrow':
        return '→';
      case 'bullet':
      default:
        return '•';
    }
  };

  return (
    <div className="list-component">
      {title && (
        <h3 className="list-title text-xl font-semibold mb-4">{title}</h3>
      )}
      <ul className="list-none pl-0">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`mb-3 flex items-start ${itemClassName}`}
          >
            <span className="mr-2 flex-shrink-0">{getIcon(index)}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;