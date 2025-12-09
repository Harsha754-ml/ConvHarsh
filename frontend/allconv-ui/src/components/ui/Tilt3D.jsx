import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const Tilt3D = ({ children, className = '' }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { offsetWidth, offsetHeight, offsetLeft, offsetTop } = ref.current;

    const centerX = offsetLeft + offsetWidth / 2;
    const centerY = offsetTop + offsetHeight / 2;

    const mouseX = clientX - centerX;
    const mouseY = clientY - centerY;

    const rotateX = (mouseY / offsetHeight) * 30; // Max 30 deg tilt
    const rotateY = (mouseX / offsetWidth) * -30; // Max 30 deg tilt

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 10 }}
    >
      {children}
    </motion.div>
  );
};
