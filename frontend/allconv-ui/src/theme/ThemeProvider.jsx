import React, { createContext, useContext, useState, useLayoutEffect } from 'react';
import { themes } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('neon'); // Default theme

  useLayoutEffect(() => {
    // Remove all other theme classes
    Object.values(themes).forEach(({ className }) => {
      document.body.classList.remove(className);
    });

    // Add the current theme class
    document.body.classList.add(themes[theme].className);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
