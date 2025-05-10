import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  
  const themes = [
    { name: 'sunset', label: 'Sunset', colors: ['from-orange-500', 'to-pink-500'] },
    { name: 'ocean', label: 'Ocean', colors: ['from-blue-500', 'to-cyan-500'] },
    { name: 'neon', label: 'Neon', colors: ['from-purple-500', 'to-pink-500'] },
  ];
  
  return (
    <>
      <button 
        aria-label="Change theme"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-800 text-white shadow-lg hover:bg-gray-700 transition-colors z-20"
      >
        <Palette size={20} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Choose Theme</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Close theme selector"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {themes.map((themeOption) => (
                <button
                  key={themeOption.name}
                  onClick={() => {
                    setTheme(themeOption.name);
                    setIsOpen(false);
                  }}
                  className={`p-4 rounded-lg transition-all ${
                    theme === themeOption.name 
                      ? 'ring-2 ring-offset-2 ring-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-10 h-10 rounded-md bg-gradient-to-r ${themeOption.colors.join(' ')}`}
                      aria-hidden="true"
                    />
                    <span className="font-medium">{themeOption.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ThemeSwitcher;