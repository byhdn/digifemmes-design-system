export const cobranding = {
  dominant70: {
    dfLogoScale: 1,
    partnerLogoMaxScale: 0.43,
    dfPosition: 'left' as const,
    separatorType: 'line' as const,
    partnerColorAllowed: false,
    minSpacingPercent: 15,
  },
  dominant60: {
    dfLogoScale: 1,
    partnerLogoMaxScale: 0.67,
    dfPosition: 'left' as const,
    separatorType: 'text' as const,
    partnerColorAllowed: true,
    minSpacingPercent: 15,
  },
  allowedBackgrounds: ['#FFFFFF', '#12B8DF', '#FF7B00', '#000000'],
  rules: {
    namingOrder: 'DigiFemmes x [Partner]',
    faviconRule: 'digifemmes-only',
    socialProfileRule: 'digifemmes-only',
    requiresDateRange: true,
  },
} as const;
