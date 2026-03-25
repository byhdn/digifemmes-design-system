export const darkTheme = {
  color: {
    surface: {
      default: '#0F1117',
      subtle: '#161822',
      muted: '#1E2030',
      elevated: '#252840',
      inverse: '#FAFAFA',
    },
    text: {
      default: '#F0F0F5',
      subtle: '#A0A3B5',
      muted: '#5F6380',
      inverse: '#0F1117',
      brand: '#3DD4F5',
      link: '#3DD4F5',
    },
    brand: {
      primary: '#FF9A33',
      secondary: '#3DD4F5',
      accent: '#FFD54F',
    },
    border: {
      default: '#2A2D42',
      subtle: '#1E2030',
      strong: '#3D4160',
      brand: '#FF9A33',
    },
    feedback: {
      success: '#2DD4A0',
      warning: '#FFD54F',
      error: '#FF6B6B',
      info: '#3DD4F5',
    },
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.3)',
    md: '0 4px 12px rgba(0,0,0,0.4)',
    lg: '0 12px 32px rgba(0,0,0,0.5)',
  },
} as const;
