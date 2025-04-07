// src/types.js

/**
 * @typedef {Object} Position
 * @property {number} x - X position relative to center
 * @property {number} y - Y position relative to center
 * @property {number} z - Z-index for layering
 */

/**
 * @typedef {Object} EventConfig
 * @property {string} id - Unique identifier for the event
 * @property {string} name - Display name for the event
 * @property {number} triggerStart - Scroll percentage (0-1) or absolute position to start showing the element
 * @property {number} triggerEnd - Scroll percentage (0-1) or absolute position to stop showing the element
 * @property {Position} position - Position information for the element
 * @property {string} [type] - Type of element (e.g., 'ui', 'background')
 * @property {Function} component - React component to render
 * @property {Object} props - Props to pass to the component
 * @property {Function} [onEnter] - Callback when element enters viewport
 * @property {Function} [onExit] - Callback when element exits viewport
 */

export {};