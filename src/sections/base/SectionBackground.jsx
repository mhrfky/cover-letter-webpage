/**
 * SectionBackground - Manages backgrounds for a section
 * Handles background operations and rendering
 */
class SectionBackground {
    /**
     * Creates a new section background manager
     * @param {Array} backgrounds - Initial array of background objects
     */
    constructor(backgrounds = []) {
      this.backgrounds = backgrounds;
    }
  
    /**
     * Add a background
     * @param {Object} background - Background object
     */
    add(background) {
      this.backgrounds.push(background);
    }
  
    /**
     * Remove a background by its index
     * @param {number} index - Index of the background to remove
     */
    remove(index) {
      if (index >= 0 && index < this.backgrounds.length) {
        this.backgrounds.splice(index, 1);
      }
    }

    /**
     * Get all backgrounds
     * @returns {Array} Array of all backgrounds
     */
    getAll() {
      return this.backgrounds;
    }
  
    /**
     * Render all backgrounds
     * @param {Object} params - Render parameters
     * @param {boolean} params.isActive - Whether the section is active
     * @param {number} params.scrollPosition - Current scroll position
     * @param {number} params.sectionProgress - Progress through the section (0-1)
     * @returns {Array} Array of virtual elements
     */
    render({ isActive, scrollPosition, sectionProgress }) {
      // Sort backgrounds by depth (ascending)
      const sortedBackgrounds = [...this.backgrounds].sort((a, b) => {
        const depthA = a.depth || (a.props && a.props.depth) || 0;
        const depthB = b.depth || (b.props && b.props.depth) || 0;
        return depthA - depthB;
      });
      
      return sortedBackgrounds.map((bg, index) => {
        const BackgroundComponent = bg.component;
        
        // Combine all props: background's own props + render params
        const combinedProps = {
          ...(bg.props || {}),
          isActive,
          scrollPosition,
          sectionProgress,
        };
        
        return <BackgroundComponent key={index} {...combinedProps} />;
      });
    }
  }
  
  export default SectionBackground;