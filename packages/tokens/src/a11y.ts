export const accessibility = {
  contrast: {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 },
    target: 'AAA' as const,
  },
  motion: {
    reducedMotion: {
      duration: '0ms',
      easing: 'linear',
    },
  },
  focus: {
    style: '2px solid #FF7B00',
    offset: '2px',
  },
  fontSize: {
    minBase: '16px',
    maxScale: 2.0,
    unit: 'rem' as const,
  },
} as const;
