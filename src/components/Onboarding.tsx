import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Keyboard, Monitor, Download, Star } from 'lucide-react';

interface OnboardingProps {
  onClose: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: "Welcome to Gradient Studio",
      icon: <Monitor size={40} />,
      description: "Generate beautiful color gradients for your next design project.",
      tip: "Press spacebar anytime to generate a new gradient."
    },
    {
      title: "Navigate Your History",
      icon: <Keyboard size={40} />,
      description: "Use the left and right arrow keys to browse through your recently generated gradients.",
      tip: "Your last 20 gradients are automatically saved."
    },
    {
      title: "Save and Export",
      icon: <Download size={40} />,
      description: "Copy the CSS code directly or download gradients as PNG files.",
      tip: "Hover over any gradient to see the available actions."
    }
  ];
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const step = steps[currentStep];
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-500">
              {currentStep + 1}/{steps.length}
            </span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close onboarding"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="text-center py-6">
          <div className="flex justify-center mb-4 text-blue-500">
            {step.icon}
          </div>
          <h2 className="text-2xl font-bold mb-2">{step.title}</h2>
          <p className="text-gray-600 mb-4">{step.description}</p>
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-blue-700 text-sm"><strong>Tip:</strong> {step.tip}</p>
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className={`flex items-center gap-1 px-4 py-2 rounded-md transition-colors ${
              currentStep === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            disabled={currentStep === 0}
            aria-label="Previous step"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            aria-label={currentStep === steps.length - 1 ? "Finish onboarding" : "Next step"}
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;