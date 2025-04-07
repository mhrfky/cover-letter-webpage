function exportUIConfig(config, startPoint, endPoint) {
    const range = endPoint - startPoint;
    
    return config.map(element => {
      const absoluteStart = Math.floor(startPoint + (element.triggerStart * range));
      const absoluteEnd = Math.floor(startPoint + (element.triggerEnd * range));
      
      return {
        ...element,
        triggerStart: absoluteStart,
        triggerEnd: absoluteEnd
      };
    });
  }
  
  export default exportUIConfig;