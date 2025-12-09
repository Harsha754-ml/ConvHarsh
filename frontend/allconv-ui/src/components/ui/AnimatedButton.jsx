import React from 'react';
import { NeonPulse } from './NeonPulse';
import { RippleEffect } from './RippleEffect';

export const AnimatedButton = ({ children, className = '', neon = true, ripple = true, ...props }) => {
  const ButtonContent = (
    <span
      className={`relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
    >
      {children}
    </span>
  );

  const WithNeon = neon ? <NeonPulse>{ButtonContent}</NeonPulse> : ButtonContent;
  const WithRipple = ripple ? <RippleEffect {...props}>{WithNeon}</RippleEffect> : WithNeon;

  // If ripple is true, RippleEffect handles the <button> tag
  if (ripple) {
    return (
      <RippleEffect className={`relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`} {...props}>
        {neon ? <NeonPulse>{children}</NeonPulse> : children}
      </RippleEffect>
    );
  } else {
    // If no ripple, then the button is just a div with styles or plain button
    return (
      <button 
        className={`relative inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-300 ease-in-out transform hover:scale-105 ${className}`}
        {...props}
      >
        {neon ? <NeonPulse>{children}</NeonPulse> : children}
      </button>
    );
  }
};
