import React, { useState } from 'react';
import { useTheme } from '../../theme/ThemeProvider';
import { themeNames, themes } from '../../theme/themes';
import { motion, AnimatePresence } from 'framer-motion';

// Icons for the themes
const SunIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>;
const MoonIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const SparkleIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L14.39 8.61L21 9.24L16.2 14.27L17.6 21L12 17.27L6.4 21L7.8 14.27L3 9.24L9.61 8.61L12 2z"></path></svg>;

const themeIcons = {
  light: <SunIcon />,
  dark: <MoonIcon />,
  neon: <SparkleIcon />,
  glass: <SparkleIcon />,
  amoled: <MoonIcon />,
};


export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-bg-card border border-border-color text-primary"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {themeIcons[theme]}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-36 rounded-lg bg-bg-card border border-border-color shadow-lg p-1"
          >
            {themeNames.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setTheme(name);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-1.5 text-sm rounded-md flex items-center gap-2 ${
                  theme === name ? 'bg-accent text-white' : 'hover:bg-border-color'
                }`}
              >
                {themeIcons[name]}
                {themes[name].name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
