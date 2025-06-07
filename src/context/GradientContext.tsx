import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateRandomGradient } from '../utils/gradientUtils';

import type { Gradient } from '../types/Gradient';

interface GradientContextType {
  gradient: Gradient | null;
  generateNewGradient: () => void;
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
  const [gradient, setGradient] = useState<Gradient | null>(null);

  // Initialize with a random gradient
  useEffect(() => {
    setGradient(generateRandomGradient());
  }, []);

  const generateNewGradient = useCallback(() => {
    setGradient(generateRandomGradient());
  }, []);

  return (
    <GradientContext.Provider
      value={{
        gradient,
        generateNewGradient,
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};
