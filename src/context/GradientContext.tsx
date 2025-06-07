import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateRandomGradient } from '../utils/gradientUtils';

import type { Gradient } from '../types/Gradient';

interface GradientContextType {
  gradients: Gradient[];
  generateNewGradient: () => void;
  toggleLock: (id: string) => void;
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

  // Initialize and generate initial gradients
  useEffect(() => {
    const initialGradients = Array.from({ length: 8 }, () => generateRandomGradient());
    setGradients(initialGradients);
  }, []);

  const generateNewGradient = useCallback(() => {
    setGradients(prevGradients => {
      // Find the index of the first unlocked gradient
      const indexToUpdate = prevGradients.findIndex(gradient => !gradient.isLocked);
      if (indexToUpdate === -1) {
        // If all are locked, return previous gradients unchanged
        return prevGradients;
      }

      // Generate a new gradient for only the selected index
      const newGradient = generateRandomGradient();

      const newGradients = prevGradients.map((gradient, idx) =>
        idx === indexToUpdate ? newGradient : gradient
      );

      return newGradients;
    });
  }, []);

  const toggleLock = useCallback((id: string) => {
    setGradients(prev => prev.map(gradient =>
      gradient.id === id ? { ...gradient, isLocked: !gradient.isLocked } : gradient
    ));
  }, []);

  return (
    <GradientContext.Provider
      value={{
        gradients,
        generateNewGradient,
        toggleLock,
      }}
    >
      {children}
    </GradientContext.Provider>
  );
};
