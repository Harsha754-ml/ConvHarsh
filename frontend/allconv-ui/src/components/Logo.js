import React from 'react';

const futuristicLogoStyles = `
  .logo-group {
    transform-origin: center;
    transition: transform 0.5s cubic-bezier(0.1, 0.7, 0.3, 1);
  }
  .logo-group:hover {
    transform: scale(1.1);
  }
  .logo-group:hover .orbit {
    animation-duration: 1s;
    stroke-opacity: 1;
  }
  .logo-group:hover .core-h {
    filter: drop-shadow(0 0 5px #00c6ff);
    stroke: #00c6ff;
  }
  .logo-group:hover .spark {
    stroke-opacity: 1;
    animation: spark-anim 1.5s ease-out infinite;
  }

  .orbit {
    fill: none;
    stroke-width: 2.5;
    stroke-opacity: 0.7;
    transition: all 0.5s ease;
  }
  
  #orbit1 {
    stroke: #00c6ff;
    animation: rotate 10s linear infinite;
    transform-origin: 50px 50px;
  }
  #orbit2 {
    stroke: #9333ea;
    animation: rotate-reverse 15s linear infinite;
    transform-origin: 50px 50px;
  }
  #orbit3 {
    stroke: #e0e0e0;
    animation: rotate 20s linear infinite;
    transform-origin: 50px 50px;
  }
  
  .core-h {
    font-family: 'Inter', sans-serif;
    font-size: 50px;
    font-weight: 700;
    fill: #ffffff;
    stroke: #e0e0e0;
    stroke-width: 1;
    text-anchor: middle;
    dominant-baseline: central;
    transition: all 0.3s ease;
  }

  .spark {
    fill: none;
    stroke-width: 3;
    stroke: #ffffff;
    stroke-opacity: 0;
    transition: stroke-opacity 0.5s;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes rotate-reverse {
    from { transform: rotate(0deg); }
    to { transform: rotate(-360deg); }
  }
  @keyframes spark-anim {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
  }
`;

const Logo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <style>{futuristicLogoStyles}</style>
    <defs>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g className="logo-group">
      <ellipse id="orbit1" cx="50" cy="50" rx="30" ry="45" />
      <ellipse id="orbit2" cx="50" cy="50" rx="45" ry="30" />
      <ellipse id="orbit3" cx="50" cy="50" rx="40" ry="40" strokeDasharray="5 5" />
      
      <text x="50" y="50" className="core-h">H</text>

      {/* Sparks for animation */}
      <path className="spark" d="M 20 20 L 25 25" />
      <path className="spark" d="M 80 80 L 75 75" />
      <path className="spark" d="M 20 80 L 25 75" />
      <path className="spark" d="M 80 20 L 75 25" />
    </g>
  </svg>
);

export default Logo;