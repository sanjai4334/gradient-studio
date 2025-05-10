import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateRandomGradient } from '../utils/gradientUtils';

interface GradientContextType {
  gradients: Gradient[];
  favorites: Gradient[];
  generateNewGradient: () => void;
  toggleLock: (id: string) => void;
  toggleFavorite: (id: string) => void;
  navigateHistory: (step: number) => void;
  currentHistoryIndex: number;
  showFavorites: boolean;
  setShowFavorites: (show: boolean) => void;
}

const GradientContext = createContext<GradientContextType | undefined>(undefined);

export const useGradient = () => {
  const context = useContext(GradientContext);
  if (!context) {
    throw new Error('useGradient must be used within a GradientProvider');
  }
  return context;
};

export const GradientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gradients, setGradients] = useState<Gradient[]>([]);
  const [history, setHistory] = useState<Gradient[][]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(-1);
  const [favorites, setFavorites] = useState<Gradient[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Initialize with saved favorites and generate initial gradients
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Generate initial set of gradients
    const initialGradients = Array.from({ length: 8 }, () => generateRandomGradient());
    setGradients(initialGradients);
    
    // Initialize history with initial gradients
    setHistory([initialGradients]);
    setCurrentHistoryIndex(0);
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);
  
  const generateNewGradient = useCallback(() => {
    const newGradients = gradients.map(gradient => 
      gradient.isLocked ? gradient : generateRandomGradient()
    );
    
    setGradients(newGradients);
    
    // Update history when generating new gradients
    // If we're not at the end of history, truncate the history
    const newHistory = history.slice(0, currentHistoryIndex + 1);
    newHistory.push(newGradients);
    
    // Keep only the last 20 history states
    if (newHistory.length > 20) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setCurrentHistoryIndex(newHistory.length - 1);
  }, [gradients, history, currentHistoryIndex]);
  
  const toggleLock = useCallback((id: string) => {
    setGradients(prev => prev.map(gradient => 
      gradient.id === id ? { ...gradient, isLocked: !gradient.isLocked } : gradient
    ));
  }, []);
  
  const toggleFavorite = useCallback((id: string) => {
    setGradients(prev => {
      const updatedGradients = prev.map(gradient => 
        gradient.id === id ? { ...gradient, isFavorite: !gradient.isFavorite } : gradient
      );
      
      // Update favorites list
      const gradientToToggle = updatedGradients.find(g => g.id === id);
      if (gradientToToggle) {
        if (gradientToToggle.isFavorite) {
          // Add to favorites if not already there
          setFavorites(prevFavs => 
            prevFavs.some(f => f.id === id) ? prevFavs : [...prevFavs, gradientToToggle]
          );
        } else {
          // Remove from favorites
          setFavorites(prevFavs => prevFavs.filter(f => f.id !== id));
        }
      }
      
      return updatedGradients;
    });
  }, []);
  
  const navigateHistory = useCallback((step: number) => {
    const newIndex = currentHistoryIndex + step;
    
    if (newIndex >= 0 && newIndex < history.length) {
      setCurrentHistoryIndex(newIndex);
      setGradients(history[newIndex]);
    }
  }, [currentHistoryIndex, history]);
  
  return (
    <GradientContext.Provider 
      value={{ 
        gradients, 
        favorites,
        generateNewGradient, 
        toggleLock, 
        toggleFavorite,
        navigateHistory,
        currentHistoryIndex,
        showFavorites,
        setShowFavorites
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};