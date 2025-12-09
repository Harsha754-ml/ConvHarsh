import React from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import AuroraBackground from './AuroraBackground';
import ParticleField from './ParticleField';
import NoiseOverlay from './NoiseOverlay';

const BackgroundController = () => {
  const { theme } = useTheme();

  // Conditionally render backgrounds based on the theme
  const renderBackground = () => {
    switch (theme) {
      case 'neon':
      case 'glass':
        return <AuroraBackground />;
      case 'dark':
      case 'amoled':
        return <ParticleField particleCount={150} />;
      case 'light':
      default:
        // Light theme has a simple background set in CSS, so nothing is rendered here.
        return null;
    }
  };

  return (
    <>
      {renderBackground()}
      {/* Noise overlay can be on all themes except maybe light for a cleaner look */}
      {theme !== 'light' && <NoiseOverlay />}
    </>
  );
};

export default BackgroundController;
