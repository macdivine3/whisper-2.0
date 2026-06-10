// src/constants/theme.ts
// Whisper Design System — Warm Parchment + Forest Green
// Single source of truth for ALL visual styling across the app

export const Colors = {
  // Backgrounds
  bg: {
    primary: '#F9F6F0',      // Lighter, cleaner warm parchment
    secondary: '#F5F0E6',    // Slightly deeper parchment — card insets
    card: '#FFFFFF',         // Pure white for cards to pop against the parchment
    modal: '#F9F6F0',        // Modal backgrounds
  },


  // Primary Theme Colors (Forest Green)
  green: {
    primary: '#2D5016',      // Main brand green (buttons, icons, primary text)
    secondary: '#4A7231',    // Lighter green (secondary buttons, subtle icons)
    muted: '#8B9D77',        // Muted green (inactive states, borders)
    faint: '#E8EFE5',        // Very faint green (pill backgrounds, highlights)
  },

  // Typography
  text: {
    primary: '#2C1810',      // Deep warm brown/black (main headers)
    secondary: '#5C4A42',    // Medium brown (body text, subtitles)
    muted: '#8C7A72',        // Light brown (captions, placeholders)
    inverse: '#FFFFFF',      // White text on dark buttons
  },

  // Borders & Accents
  border: {
    default: '#E8DCC8',      // Soft warm beige border
    soft: '#F0E6D5',         // Very soft border for subtle separators
  },

  // Functional
  danger: '#C0392B',
  warning: '#D4891A',
  success: '#2D5016',
  white: '#FFFFFF',
  transparent: 'transparent',

  // Moods (Pastel System)
  mood: {
    grateful: '#B05555',     // Soft red
    hopeful: '#C9851A',      // Soft orange
    peaceful: '#2D5016',     // Soft green
    anxious: '#7B5EA7',      // Soft purple
    drained: '#4A7C9E',      // Soft blue
    overwhelmed: '#7A6951',  // Soft gray/brown
  },

  // Mood Pill Backgrounds (15% opacity equivalents of the base colors)
  moodBg: {
    grateful: '#FBE8E5',
    hopeful: '#FCF2DC',
    peaceful: '#E6F0EC',
    anxious: '#F2EBFA',
    drained: '#E6EFF4',
    overwhelmed: '#F0EDEA',
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
