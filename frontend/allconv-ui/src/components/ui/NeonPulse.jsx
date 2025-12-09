import React from 'react';

export const NeonPulse = ({ children, className = '' }) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      <div className="absolute inset-0 rounded-full animate-pulse-neon pointer-events-none opacity-75"></div>
    </div>
  );
};
