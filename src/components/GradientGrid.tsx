import React, { useEffect, useState } from 'react';
import GradientSwatch from './GradientSwatch';
import { useGradient } from '../context/GradientContext';


const GradientGrid: React.FC = () => {
  const { gradients, generateNewGradient, navigateHistory } = useGradient();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Add keyboard event listeners for spacebar, left arrow, and right arrow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.code === 'Space') {
        e.preventDefault();
        generateNewGradient();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        // First update the current index, then navigate history
        const newIndex = Math.max(0, currentIndex - 1);
        setCurrentIndex(newIndex);
        navigateHistory(-1);
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        // First update the current index, then navigate history
        const newIndex = Math.min(gradients.length - 1, currentIndex + 1);
        setCurrentIndex(newIndex);
        navigateHistory(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewGradient, navigateHistory, gradients.length, currentIndex]);

  // If no gradients, show empty state
  if (gradients.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No gradients available. Generate some!</p>
      </div>
    );
  }

  // Display only the current gradient
  const currentGradient = gradients[currentIndex];

  return (
    <div className="h-full w-full">
      <div className="h-full w-full">
        {/* Remove the fullPage prop since it's not in the interface */}
        <GradientSwatch gradient={currentGradient} index={currentIndex} />
      </div>
      
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        {gradients.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-gray-800' : 'bg-gray-300'}`}
            onClick={() => {
              // When clicking a dot, update index and navigate history accordingly
              const diff = idx - currentIndex;
              setCurrentIndex(idx);
              if (diff !== 0) {
                navigateHistory(diff);
              }
            }}
            aria-label={`View gradient ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientGrid;