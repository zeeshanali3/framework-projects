import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

// Create the context
export const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Create theme with current mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          ...(mode === 'light'
            ? {
                // Light mode palette
                primary: {
                  main: '#4C49ED',
                },
                secondary: {
                  main: '#FF6347',
                },
                background: {
                  default: '#f5f7fa',
                  paper: '#ffffff',
                },
              }
            : {
                // Dark mode palette
                primary: {
                  main: '#6C63FF',
                },
                secondary: {
                  main: '#FF8571',
                },
                background: {
                  default: '#121212',
                  paper: '#1E1E2F',
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode],
  );

  // Toggle theme function
  const toggleThemeMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Context value
  const contextValue = {
    mode,
    setMode,
    toggleThemeMode,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}; 