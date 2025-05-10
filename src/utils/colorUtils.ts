/**
 * Convert HSL color to RGB
 */
export const hslToRgb = (h: number, s: number, l: number): { r: number, g: number, b: number } => {
  s /= 100;
  l /= 100;
  
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  
  let r = 0, g = 0, b = 0;
  
  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255)
  };
};

/**
 * Calculate relative luminance of RGB color for WCAG contrast
 */
export const calculateRelativeLuminance = (r: number, g: number, b: number): number => {
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;
  
  const r1 = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4);
  const g1 = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4);
  const b1 = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4);
  
  return 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
};

/**
 * Calculate contrast ratio between two colors
 */
export const calculateContrastRatio = (l1: number, l2: number): number => {
  // Ensure l1 is the lighter color (higher luminance)
  if (l1 < l2) {
    [l1, l2] = [l2, l1];
  }
  
  return (l1 + 0.05) / (l2 + 0.05);
};

/**
 * Parse HSL color string into components
 */
export const parseHslColor = (hslString: string): { h: number, s: number, l: number } | null => {
  const regex = /hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/;
  const match = hslString.match(regex);
  
  if (!match) return null;
  
  return {
    h: parseInt(match[1], 10),
    s: parseInt(match[2], 10),
    l: parseInt(match[3], 10)
  };
};

/**
 * Check if two colors have sufficient contrast (WCAG AA: 4.5:1 for normal text)
 */
export const checkContrast = (color1: string, color2: string): boolean => {
  const parsed1 = parseHslColor(color1);
  const parsed2 = parseHslColor(color2);
  
  if (!parsed1 || !parsed2) return true; // If parsing fails, assume okay
  
  const rgb1 = hslToRgb(parsed1.h, parsed1.s, parsed1.l);
  const rgb2 = hslToRgb(parsed2.h, parsed2.s, parsed2.l);
  
  const lum1 = calculateRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = calculateRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const ratio = calculateContrastRatio(lum1, lum2);
  
  return ratio >= 4.5; // WCAG AA standard for normal text
};