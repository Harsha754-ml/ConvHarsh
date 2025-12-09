import React, { useState, useEffect } from 'react';

const GlitchText = ({ text, className = '' }) => {
  const [glitchedText, setGlitchedText] = useState(text);

  useEffect(() => {
    // Basic CSS classes for glitch effect
    // Tailwind classes would be defined in tailwind.config.js for animation
    const glitchClass = 'animate-[scramble_0.2s_infinite_alternate] relative before:absolute before:content-[attr(data-text)] before:left-[2px] before:text-red-500 after:absolute after:content-[attr(data-text)] after:left-[-2px] after:text-blue-500';
    setGlitchedText(
      <span className={`${glitchClass}`} data-text={text}>
        {text}
      </span>
    );
  }, [text]);

  return <span className={className}>{glitchedText}</span>;
};

export default GlitchText;
