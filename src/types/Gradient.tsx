export interface Gradient {
  id: string;
  name: string;
  type: 'linear' | 'radial';
  colors: string[];
  angle: number;
  isLocked: boolean;
  isFavorite: boolean;
  timestamp: number;
}