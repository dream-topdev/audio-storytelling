import { useState, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { lightTheme, darkTheme } from '../constants/theme';

export const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [isDarkMode, setIsDarkMode] = useState(prefersDarkMode);

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setIsDarkMode(savedMode === 'dark');
    } else {
      setIsDarkMode(prefersDarkMode);
    }
  }, [prefersDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('themeMode', !isDarkMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return { theme, isDarkMode, toggleTheme };
}; 