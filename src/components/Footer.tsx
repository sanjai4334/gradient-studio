import React from 'react';
import { Heart, Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <footer className="py-3 px-6 text-center bg-white bg-opacity-10 backdrop-blur-md text-white">
      <div className="flex flex-col md:flex-row justify-between items-center gap-3">
        <p className="text-sm flex items-center gap-1">
          Made with <Heart size={16} className="text-red-500" /> by Gradient Studio
        </p>
        <div className="flex items-center gap-4">
          <a 
            href="#" 
            className="text-sm flex items-center gap-1 hover:underline"
            aria-label="View documentation"
          >
            Documentation
          </a>
          <a 
            href="#" 
            className="text-sm flex items-center gap-1 hover:underline"
            aria-label="View GitHub repository"
          >
            <Github size={16} /> GitHub
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
