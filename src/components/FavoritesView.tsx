import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import GradientSwatch from './GradientSwatch';
import { useGradient } from '../context/GradientContext';

const FavoritesView: React.FC = () => {
  const { favorites, showFavorites, setShowFavorites } = useGradient();
  const [selectedGradient, setSelectedGradient] = useState<Gradient | null>(null);

  const backgroundStyle = selectedGradient
    ? selectedGradient.type === 'linear'
      ? { background: `linear-gradient(${selectedGradient.angle}deg, ${selectedGradient.colors.join(', ')})` }
      : { background: `radial-gradient(circle, ${selectedGradient.colors.join(', ')})` }
    : {};

  return (
    <div className="min-h-screen w-full text-white" style={backgroundStyle}>
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setShowFavorites(false)}
          className="p-2 hover:bg-gray-700 rounded-full transition-colors text-white"
          aria-label="Back to all gradients"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Favorite Gradients</h2>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12 text-white">
          <p className="text-white text-lg">No favorite gradients yet.</p>
          <p className="text-white mt-2">
            Click the star icon on any gradient to add it to your favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((gradient, index) => (
            <GradientSwatch
              key={gradient.id}
              gradient={gradient}
              index={index}
              fullPage={false}
              selected={selectedGradient?.id === gradient.id}
              onSelect={() => setSelectedGradient(gradient)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
