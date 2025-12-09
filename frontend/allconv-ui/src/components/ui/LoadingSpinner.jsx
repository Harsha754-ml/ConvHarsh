import React from 'react';

export const LoadingSpinner = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative flex h-8 w-8">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
        <span className="relative inline-flex rounded-full h-8 w-8 bg-accent"></span>
      </div>
    </div>
  );
};
