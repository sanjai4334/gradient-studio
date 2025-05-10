import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string;
  position: { x: number; y: number };
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, position, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Adjust position to make sure toast is visible on screen
  let { x, y } = position;
  
  // Get viewport dimensions
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  
  // Ensure toast will be at least 20px from edges
  const toastWidth = 240; // Approximate width
  const toastHeight = 48; // Approximate height
  
  x = Math.min(Math.max(20, x - toastWidth / 2), viewportWidth - toastWidth - 20);
  y = Math.min(Math.max(20, y - toastHeight - 10), viewportHeight - toastHeight - 20);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for fade out animation before removing toast
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div 
      className={`fixed px-4 py-2 bg-gray-800 text-white rounded-md shadow-lg flex items-center gap-2 transition-opacity duration-300 z-50 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ left: `${x}px`, top: `${y}px` }}
      role="alert"
    >
      <Check size={16} className="text-green-400" />
      <span>{message}</span>
      <button 
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 p-1 hover:bg-gray-700 rounded-full"
        aria-label="Close notification"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;