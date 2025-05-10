/**
 * Lists of adjectives and nouns for random gradient name generation
 */
const adjectives = [
  'Cosmic', 'Vibrant', 'Electric', 'Mystic', 'Serene', 
  'Dreamy', 'Bold', 'Subtle', 'Radiant', 'Ethereal',
  'Glowing', 'Tranquil', 'Dynamic', 'Vivid', 'Hazy',
  'Luminous', 'Crisp', 'Neon', 'Pastel', 'Rich',
  'Soft', 'Deep', 'Fresh', 'Bright', 'Gentle'
];

const nouns = [
  'Sunset', 'Ocean', 'Aurora', 'Horizon', 'Nebula',
  'Wave', 'Bloom', 'Dusk', 'Dawn', 'Flame',
  'Mist', 'Breeze', 'Sky', 'Galaxy', 'Forest',
  'Shadow', 'Mirage', 'Glow', 'Prism', 'Cascade',
  'Aura', 'Haze', 'Cloud', 'Dream', 'Spark'
];

/**
 * Generate a random gradient name using an adjective-noun pair
 */
export const generateRandomName = (): string => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adjective} ${noun}`;
};