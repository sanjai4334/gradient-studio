import React, { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

interface ToastPosition {
  x: number;
  y: number;
}

interface ToastItem {
  id: string;
  message: string;
  position: ToastPosition;
}

interface ToastContextType {
  showToast: (message: string, position: ToastPosition) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  
  const showToast = (message: string, position: ToastPosition) => {
    const id = `toast-${Date.now()}`;
    setToasts(prev => [...prev, { id, message, position }]);
  };
  
  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          message={toast.message}
          position={toast.position}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};