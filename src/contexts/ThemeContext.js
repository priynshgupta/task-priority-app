import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const LOCAL_STORAGE_KEY = 'taskManager.theme';

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage first
    const storedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTheme !== null) {
      return storedTheme === 'dark';
    }

    // If no stored preference, check user's system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, darkMode ? 'dark' : 'light');

    // Apply theme to body
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
