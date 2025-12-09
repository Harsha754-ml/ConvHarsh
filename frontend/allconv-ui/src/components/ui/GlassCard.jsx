import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <motion.div
      className={`glass-card bg-bg-card backdrop-blur-xl border border-border-color rounded-xl shadow-lg relative overflow-hidden ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
