import React, { Children } from 'react';
import { motion } from 'framer-motion';

export const FadeSlideIn = ({ children, delay = 0, stagger = 0.1, className = '' }) => {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * stagger }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};
