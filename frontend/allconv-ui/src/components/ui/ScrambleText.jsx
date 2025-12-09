import React, { useState, useEffect, useRef, useCallback } from 'react';

const chars = '!<>-_\\/[]{}—=+*^?#________';

export const ScrambleText = ({ text, revealSpeed = 70, scrambleSpeed = 100, scrambleDuration = 1500, delay = 0, className = '' }) => {
  const [scrambledText, setScrambledText] = useState(text);
  const resolveRef = useRef(null);
  const scrambleRef = useRef(null);
  const elementRef = useRef(null);
  const originalTextRef = useRef(text); // Store original text

  const scramble = useCallback(() => {
    let frame = 0;
    let counter = 0;
    let resolveCounter = 0;
    const originalLength = originalTextRef.current.length; // Use original text's length
    const queue = [];

    // Initialize queue with target characters
    for (let i = 0; i < originalLength; i++) {
      const char = originalTextRef.current[i];
      queue.push({ from: char, to: char, start: delay + i * revealSpeed, end: delay + i * revealSpeed + scrambleDuration });
    }

    const update = () => {
      let output = '';
      let complete = 0;

      for (let i = 0; i < originalLength; i++) {
        let { from, to, start, end } = queue[i];
        
        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          queue[i].from = chars[Math.floor(Math.random() * chars.length)];
          output += queue[i].from;
        } else {
          output += from;
        }
      }

      setScrambledText(output);
      
      if (complete === originalLength) {
        cancelAnimationFrame(scrambleRef.current);
      } else {
        frame++;
        scrambleRef.current = requestAnimationFrame(update);
      }
    };
    
    // Clear previous animation if exists
    if (scrambleRef.current) {
        cancelAnimationFrame(scrambleRef.current);
    }
    scrambleRef.current = requestAnimationFrame(update);

  }, [delay, revealSpeed, scrambleDuration]);


  useEffect(() => {
    originalTextRef.current = text; // Update original text ref when text prop changes
    scramble();

    return () => {
      if (scrambleRef.current) {
        cancelAnimationFrame(scrambleRef.current);
      }
    };
  }, [text, scramble]);

  const handleMouseEnter = () => {
    // Optional: retrigger scramble on hover if desired
    // scramble();
  };

  return (
    <span ref={elementRef} className={`inline-block ${className}`} onMouseEnter={handleMouseEnter}>
      {scrambledText}
    </span>
  );
};
