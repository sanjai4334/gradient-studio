import React, { useEffect, useRef } from 'react';
import { Copy, Download } from 'lucide-react';
import { useGradient } from '../context/GradientContext';


import { useToast } from '../context/ToastContext';
import { exportAsPng } from '../utils/exportUtils';

const GradientGrid: React.FC = () => {
  const { gradients, generateNewGradient /*, favorites, toggleFavorite */ } = useGradient();
  const { showToast } = useToast();
  // Removed unused showDownloadOverlay state
  const gradientRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  // Add keyboard event listeners for spacebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input field
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      
      if (e.code === 'Space') {
        e.preventDefault();
        generateNewGradient();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generateNewGradient]);

  if (gradients.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">No gradients available. Generate some!</p>
      </div>
    );
  }

  const currentGradient = gradients[0];
  const { type, colors, angle, name } = currentGradient;

  const gradientCss = type === 'linear' 
    ? `linear-gradient(${angle}deg, ${colors.join(', ')})`
    : `radial-gradient(circle, ${colors.join(', ')})`;

  // const isFavorite = favorites.some(fav => fav.id === id);

  const handleCopyCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    const cssValue = `background: ${gradientCss};`;
    navigator.clipboard.writeText(cssValue);
    showToast("CSS copied to clipboard!", { x: e.clientX, y: e.clientY });
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (exportRef.current) {
      try {
        // Removed showDownloadOverlay logic
        await new Promise(resolve => setTimeout(resolve, 100));
        await exportAsPng(exportRef.current, name);
        showToast("PNG downloaded!", { x: e.clientX, y: e.clientY });
      } catch (error) {
        showToast("Error downloading PNG", { x: e.clientX, y: e.clientY });
      }
    }
  };

  // const handleToggleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   toggleFavorite(id);
  //   showToast(isFavorite ? "Removed from favorites" : "Added to favorites", { x: e.clientX, y: e.clientY });
  // };

  return (
    <div className="relative h-full w-full">
      <div
        ref={gradientRef}
        className="h-full w-full relative"
        style={{ background: gradientCss }}
      >
        {/* Visible gradient preview */}
      </div>

      {/* Hidden export container for download */}
      <div
        ref={exportRef}
        style={{ 
          position: 'absolute', 
          top: '-9999px', 
          left: '-9999px', 
          width: '400px', 
          height: '400px', 
          background: gradientCss, 
          color: 'white', 
          padding: '20px', 
          boxSizing: 'border-box',
          fontWeight: 'bold',
          fontSize: '18px',
          textAlign: 'right',
          userSelect: 'none',
          zIndex: 1000,
        }}
      >
        <div>{name}</div>
        <div>{type === 'linear' ? `Linear ${angle}°` : 'Radial'}</div>
        {type === 'linear' && (
          <>
            <div>{colors[0]}</div>
            <div>{colors[1]}</div>
          </>
        )}
      </div>

      {/* Gradient info displayed together on top left */}
      <div className="fixed top-4 left-4 text-white drop-shadow-md select-none pointer-events-none max-w-xs">
        <div className="font-bold text-lg">{name}</div>
        <div className="text-sm">{type === 'linear' ? `Linear ${angle}°` : 'Radial'}</div>
        {type === 'linear' && (
          <>
            <div>{colors[0]}</div>
            <div>{colors[1]}</div>
          </>
        )}
      </div>

      {/* Buttons fixed on top right */}
      <div className="fixed top-4 right-4 flex flex-col gap-2 z-30">
        <button
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          onClick={handleCopyCSS}
          aria-label="Copy CSS"
        >
          <Copy size={18} className="text-white" />
        </button>
        <button
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          onClick={handleDownload}
          aria-label="Download PNG"
        >
          <Download size={18} className="text-white" />
        </button>
      </div>

      {/* Removed pagination dots above footer */}
    </div>
  );
};

export default GradientGrid;
