import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeName = 'sunset' | 'ocean' | 'neon';

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeName>('sunset');
  
  // Initialize theme from localStorage or use default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeName | null;
    if (savedTheme && ['sunset', 'ocean', 'neon'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Update UI colors based on theme
    const root = document.documentElement;
    
    if (theme === 'sunset') {
      root.style.setProperty('--primary-color', '#f97316');
      root.style.setProperty('--secondary-color', '#ec4899');
    } else if (theme === 'ocean') {
      root.style.setProperty('--primary-color', '#3b82f6');
      root.style.setProperty('--secondary-color', '#06b6d4');
    } else if (theme === 'neon') {
      root.style.setProperty('--primary-color', '#8b5cf6');
      root.style.setProperty('--secondary-color', '#ec4899');
    }
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};