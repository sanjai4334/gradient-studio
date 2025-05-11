import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import GradientGrid from './components/GradientGrid';
import { GradientProvider, useGradient } from './context/GradientContext';
import { ToastProvider } from './context/ToastContext';
import Onboarding from './components/Onboarding';

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if this is the first time the user is visiting
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setShowOnboarding(true);
      localStorage.setItem('hasVisitedBefore', 'true');
    }
  }, []);

  return (
    <GradientProvider>
      <ToastProvider>
        <AppContent showOnboarding={showOnboarding} setShowOnboarding={setShowOnboarding} />
      </ToastProvider>
    </GradientProvider>
  );
}

const AppContent: React.FC<{ showOnboarding: boolean; setShowOnboarding: React.Dispatch<React.SetStateAction<boolean>> }> = ({ showOnboarding, setShowOnboarding }) => {
  const { gradients } = useGradient();

  // Use the first gradient for the background
  const backgroundGradient = gradients.length > 0 ? gradients[0] : null;

  // Construct CSS gradient string
  const gradientStyle = backgroundGradient
    ? {
        background: `linear-gradient(${backgroundGradient.angle}deg, ${backgroundGradient.colors.join(', ')})`,
      }
    : {};

  return (
    <div className="min-h-screen flex flex-col justify-between" style={gradientStyle}>
      <main className="flex-grow flex items-center justify-center p-4 md:p-6 lg:p-8">
        <GradientGrid />
      </main>
      <Header />
      {showOnboarding && <Onboarding onClose={() => setShowOnboarding(false)} />}
    </div>
  );
};

export default App;
