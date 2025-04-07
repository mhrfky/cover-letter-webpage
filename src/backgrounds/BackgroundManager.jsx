// BackgroundManager.jsx
import React from 'react';
import FarLayer from './FarLayer';
import MidLayer from './MidLayer';

const BackgroundManager = ({ config }) => {
  return (
    <div className="background-container" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
      <FarLayer config={config.farLayer} />
      <MidLayer config={config.midLayer} />
      {/* NearLayer will be added in Phase 3 */}
    </div>
  );
};

export default BackgroundManager;