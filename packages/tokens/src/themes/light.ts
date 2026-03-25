export const lightTheme = {
  color: {
    surface: {
      default: '#FFFFFF',
      subtle: '#FAFAFA',
      muted: '#F5F5F5',
      elevated: '#FFFFFF',
      inverse: '#212121',
    },
    text: {
      default: '#212121',
      subtle: '#757575',
      muted: '#BDBDBD',
      inverse: '#FFFFFF',
      brand: '#12B8DF',
      link: '#0EA7CA',
    },
    brand: {
      primary: '#FF7B00',
      secondary: '#12B8DF',
      accent: '#FFC107',
    },
    border: {
      default: '#EEEEEE',
      subtle: '#F5F5F5',
      strong: '#BDBDBD',
      brand: '#FF7B00',
    },
    feedback: {
      success: '#009578',
      warning: '#FFC107',
      error: '#DC2626',
      info: '#12B8DF',
    },
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.08)',
    md: '0 4px 12px rgba(0,0,0,0.08)',
    lg: '0 12px 32px rgba(0,0,0,0.1)',
  },
} as const;
