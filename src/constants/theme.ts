// src/constants/theme.ts
// Whisper Design System — Warm Parchment + Forest Green
// Single source of truth for ALL visual styling across the app

export const Colors = {
  // Backgrounds
  bg: {
    primary: '#FDFBF7',      // New Canvas Background
    secondary: '#F5F3EE',    // New Border/Background color
    card: '#FFFFFF',         // Pure white for cards
    modal: '#FDFBF7',
  },

  // Primary Theme Colors (Olive System)
  green: {
    primary: '#3A4434',      // Olive Dark (Main brand & text)
    secondary: '#596F52',    // Olive Deep (CTA & Active)
    muted: '#70756B',        // Sage Mid
    faint: '#F5F3EE',        // Pill Background
  },

  // Typography
  text: {
    primary: '#3A4434',      // Olive Dark
    secondary: '#70756B',    // Sage Mid
    muted: '#8D8E89',        // Gray Muted
    inverse: '#FFFFFF',      // White text on dark buttons
  },

  // Borders & Accents
  border: {
    default: '#F5F3EE',      // New Border color
    soft: '#FDFBF7',
  },

  // Functional
  danger: '#C0392B',
  warning: '#D4891A',
  success: '#3A4434',
  white: '#FFFFFF',
  transparent: 'transparent',

  // Moods (Tints from Design)
  mood: {
    grateful: '#3A4434',     // tintGreen
    hopeful: '#855B27',      // tintAmber
    peaceful: '#34534A',     // tintTeal
    anxious: '#7C4E3D',      // tintTerra
    drained: '#42445E',      // tintSlate
    overwhelmed: '#534E48',  // tintCharcoal
  },

  // Mood Pill Backgrounds (Pastels from Design)
  moodBg: {
    grateful: '#E4E9DC',     // moodGreen
    hopeful: '#FCECD3',      // moodApricot
    peaceful: '#DCE6E2',     // moodMint
    anxious: '#F5DDD3',      // moodRose
    drained: '#E5E4EC',      // moodLavender
    overwhelmed: '#E9E6E1',  // moodBrown
  }
} as const;

export const Typography = {
  fonts: {
    serif: 'NotoSerif',
    sans: 'Inter',
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 24,
    xxl: 28,
    xxxl: 34,
  },
  weights: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  }
};

export const Spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 9999,
  circle: 9999,
};

export const Shadows = {
  sm: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  md: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  float: {
    shadowColor: '#2C1810',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
  }
};

export const CommonStyles = {
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border.default,
    ...Shadows.sm,
  },
  smallCaps: {
    fontFamily: Typography.fonts.sans,
    fontSize: Typography.sizes.xs,
    fontWeight: Typography.weights.bold,
    letterSpacing: 1.2,
    textTransform: 'uppercase' as const,
  }
};
