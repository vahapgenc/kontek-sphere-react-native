// Kontek Sphere — typography tokens. Derived from colors_and_type.css.
// Font: Open Sans (UI + display). Loaded via @expo-google-fonts/open-sans.
import type { TextStyle } from 'react-native';
import { colors } from './colors';

// Font-family names match the @expo-google-fonts/open-sans exports.
export const fontFamily = {
  regular: 'OpenSans_400Regular',
  medium: 'OpenSans_500Medium',
  semibold: 'OpenSans_600SemiBold',
  bold: 'OpenSans_700Bold',
  mono: 'JetBrainsMono_400Regular',
} as const;

// Type scale (px) — mobile-first.
export const fontSize = {
  display: 36,
  h1: 28,
  h2: 22,
  h3: 19,
  title: 17,
  body: 16,
  bodySm: 15,
  caption: 13,
  eyebrow: 12,
  micro: 11,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Composed text-style presets — RN equivalents of the .ds-* type classes.
// lineHeight converted from CSS unitless multiplier to absolute px.
// letterSpacing converted from em to px at the preset's font size.
export const textStyles = {
  display: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.display,
    lineHeight: Math.round(fontSize.display * 1.04),
    letterSpacing: -0.72,
    color: colors.ink,
  },
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: fontSize.h1,
    lineHeight: Math.round(fontSize.h1 * 1.08),
    letterSpacing: -0.56,
    color: colors.ink,
  },
  h2: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.h2,
    lineHeight: Math.round(fontSize.h2 * 1.14),
    letterSpacing: -0.22,
    color: colors.ink,
  },
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.h3,
    lineHeight: Math.round(fontSize.h3 * 1.25),
    letterSpacing: -0.19,
    color: colors.ink,
  },
  title: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.title,
    lineHeight: Math.round(fontSize.title * 1.3),
    color: colors.ink,
  },
  body: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.body,
    lineHeight: Math.round(fontSize.body * 1.55),
    color: colors.ink2,
  },
  bodySm: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.bodySm,
    lineHeight: Math.round(fontSize.bodySm * 1.5),
    color: colors.ink2,
  },
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.caption,
    lineHeight: Math.round(fontSize.caption * 1.45),
    color: colors.ink3,
  },
  eyebrow: {
    fontFamily: fontFamily.semibold,
    fontSize: fontSize.eyebrow,
    lineHeight: fontSize.eyebrow,
    letterSpacing: 0.12,
    color: colors.ink4,
  },
  micro: {
    fontFamily: fontFamily.regular,
    fontSize: fontSize.micro,
    lineHeight: Math.round(fontSize.micro * 1.4),
    color: colors.ink3,
  },
  mono: {
    fontFamily: fontFamily.mono,
    fontSize: fontSize.bodySm,
    letterSpacing: -0.15,
    color: colors.ink,
  },
} satisfies Record<string, TextStyle>;

export type TextVariant = keyof typeof textStyles;
