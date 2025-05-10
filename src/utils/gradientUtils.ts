import { generateRandomName } from './nameUtils';

/**
 * Generate a random HSL color
 */
export const generateRandomHSLColor = (): string => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 30) + 70; // 70-100%
  const l = Math.floor(Math.random() * 30) + 35; // 35-65%
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Generate a complementary HSL color based on the given color
 */
export const generateComplementaryHSLColor = (baseColor: string): string => {
  // Extract h, s, l values
  const matches = baseColor.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!matches) return generateRandomHSLColor();
  
  const h = (parseInt(matches[1]) + 180) % 360; // Opposite hue
  const s = parseInt(matches[2]);
  const l = parseInt(matches[3]);
  
  return `hsl(${h}, ${s}%, ${l}%)`;
};

/**
 * Generate a complete random gradient
 */
export const generateRandomGradient = (): Gradient => {
  const id = Math.random().toString(36).substring(2, 9);
  const type = 'linear'; // Always linear gradient
  const angle = Math.floor(Math.random() * 360);
  
  // Generate color pairs that look good together
  const firstColor = generateRandomHSLColor();
  let secondColor;
  
  // 50% chance to use complementary color, 50% chance to use random color
  if (Math.random() > 0.5) {
    secondColor = generateComplementaryHSLColor(firstColor);
  } else {
    secondColor = generateRandomHSLColor();
  }
  
  return {
    id,
    name: generateRandomName(),
    type,
    colors: [firstColor, secondColor],
    angle,
    isLocked: false,
    isFavorite: false,
    timestamp: Date.now()
  };
};
