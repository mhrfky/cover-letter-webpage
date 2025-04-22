/**
 * Abstract SubSection class - Base class for section subsections
 * Provides basic structure that can be extended by concrete implementations
 */
class SubSection {
    /**
     * Creates a new subsection
     * @param {Object} config - Configuration for the subsection
     * @param {string} config.id - Unique ID for the subsection
     */
    constructor({ id }) {
      this.id = id;
      
      // Enforce abstract class pattern
      if (this.constructor === SubSection) {
        throw new Error("SubSection is an abstract class and cannot be instantiated directly");
      }
    }
  
    /**
     * Render this subsection (must be implemented by subclasses)
     * @param {Object} params - Render parameters from parent section
     * @returns {JSX.Element} React element for this subsection
     */
    render(params) {
      throw new Error("Method 'render' must be implemented by subclass");
    }
  }
  
  export default SubSection;