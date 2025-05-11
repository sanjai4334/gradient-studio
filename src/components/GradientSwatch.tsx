import React, { useState, useRef } from 'react';
import { Copy, Download, Star } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useGradient } from '../context/GradientContext';
import { checkContrast } from '../utils/colorUtils';
import { exportAsPng } from '../utils/exportUtils';

interface GradientSwatchProps {
  gradient: Gradient;
  index: number;
  fullPage?: boolean;
  selected?: boolean;
  onSelect?: () => void;
  invisibleUntilHover?: boolean;
}

const GradientSwatch: React.FC<GradientSwatchProps> = ({ gradient, index, fullPage = false, selected = false, onSelect, invisibleUntilHover = false }) => {
  const { showToast } = useToast();
  // const { favorites, toggleFavorite } = useGradient();
  const swatchRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDownloadOverlay, setShowDownloadOverlay] = useState(false);
  
  const { type, colors, angle, name, id } = gradient;
  
  const gradientStyle = type === 'linear' 
    ? { background: `linear-gradient(${angle}deg, ${colors.join(', ')})` }
    : { background: `radial-gradient(circle, ${colors.join(', ')})` };
    
  const hasPoorContrast = !checkContrast(colors[0], colors[1]);
  
  // const isFavorite = favorites.some(fav => fav.id === id);
  
  const handleCopyCSS = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const cssValue = type === 'linear' 
      ? `background: linear-gradient(${angle}deg, ${colors.join(', ')});`
      : `background: radial-gradient(circle, ${colors.join(', ')});`;
      
    navigator.clipboard.writeText(cssValue);
    showToast("CSS copied to clipboard!", { x: e.clientX, y: e.clientY });
  };
  
  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDownloadOverlay(true);
    // Wait for overlay to render
    await new Promise(resolve => setTimeout(resolve, 100));
    if (swatchRef.current) {
      await exportAsPng(swatchRef.current, name);
      showToast("PNG downloaded!", { x: e.clientX, y: e.clientY });
    }
    setShowDownloadOverlay(false);
  };

  // const handleToggleFavorite = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   toggleFavorite(id);
  //   showToast(isFavorite ? "Removed from favorites" : "Added to favorites", { x: e.clientX, y: e.clientY });
  // };

  if (fullPage) {
    return (
      <div 
        className="relative h-full w-full flex flex-col items-center justify-center"
        style={gradientStyle}
      >
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/20 backdrop-blur-md p-3 rounded-lg">
          <div className="text-white drop-shadow-md text-center">
            <h2 className="text-2xl font-bold">{name}</h2>
            <p>Type: {type}</p>
            <p>Angle: {angle}°</p>
            <p>Colors: {colors.join(', ')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={swatchRef}
      className={`relative rounded-lg overflow-hidden transition-transform duration-200 w-64 h-64 mx-auto cursor-pointer
        ${selected ? '' : 'bg-transparent shadow-none'}
        ${isHovered ? 'bg-white bg-opacity-10 shadow-lg' : 'bg-transparent shadow-none'}
        ${invisibleUntilHover ? 'opacity-0 hover:opacity-100' : ''}
      `}
      style={gradientStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        if (onSelect) onSelect();
      }}
    >
      {showDownloadOverlay && (
        <div style={{ position: 'absolute', bottom: 10, right: 10, color: 'white', opacity: 0.5, textShadow: '0 0 5px black', fontWeight: 'bold', fontSize: 16, textAlign: 'right', zIndex: 10 }}>
          <div>{name}</div>
          <div>{type === 'linear' ? `Linear ${angle}°` : 'Radial'}</div>
          {type === 'linear' && (
            <>
              <div>{colors[0]}</div>
              <div>{colors[1]}</div>
            </>
          )}
        </div>
      )}
      <div className={`absolute bottom-2 right-2 text-white drop-shadow-md text-right p-1 transition-opacity duration-200 ${invisibleUntilHover ? (isHovered ? 'opacity-100' : 'opacity-0') : ''}`}>
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-sm opacity-80">
          {type === 'linear' ? `Linear ${angle}°` : 'Radial'}
        </p>
        {type === 'linear' && (
          <>
            <div>{colors[0]}</div>
            <div>{colors[1]}</div>
          </>
        )}
      </div>
      
      <div className="absolute top-2 right-2 flex flex-col gap-2">
        {/* <button
          className="p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-all"
          onClick={handleToggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star size={18} className={isFavorite ? "text-yellow-400" : "text-white"} />
        </button> */}
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
    </div>
  );
};

export default GradientSwatch;
