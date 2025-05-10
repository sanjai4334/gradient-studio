import React from 'react';
import { Palette, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGradient } from '../context/GradientContext';

const Header: React.FC = () => {
  const { theme } = useTheme();
  const { generateNewGradient, setShowFavorites, showFavorites } = useGradient();

  return (
    <header className="py-4 px-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-md bg-white bg-opacity-10 backdrop-blur-md text-white">
      <div className="flex items-center gap-2">
        <Palette size={28} />
        <h1 className="text-2xl font-bold">Gradient Studio</h1>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-4">
        <button
          className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center gap-2 transition duration-200"
          onClick={() => setShowFavorites(!showFavorites)}
          aria-label={showFavorites ? "Show all gradients" : "Show favorites"}
        >
          <Star size={20} />
          {showFavorites ? "All Gradients" : "Favorites"}
        </button>

        {!showFavorites && (
          <>
            <button 
              className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-md flex items-center gap-2 transition duration-200"
              onClick={generateNewGradient}
              aria-label="Generate new gradient"
            >
              Generate New Gradient
              <kbd className="ml-2 px-2 py-0.5 bg-gray-800 bg-opacity-30 rounded text-xs">Space</kbd>
            </button>
            
            <div className="text-sm">
              <p>Press <kbd className="px-1.5 py-0.5 bg-gray-800 bg-opacity-30 rounded">←</kbd> / <kbd className="px-1.5 py-0.5 bg-gray-800 bg-opacity-30 rounded">→</kbd> to navigate history</p>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
