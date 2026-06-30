// Kontek Sphere — elevation tokens.
// CSS box-shadows are multi-layer; RN supports a single layer (iOS) + elevation (Android).
// These are faithful single-layer approximations of the source shadows.
import type { ViewStyle } from 'react-native';

const shadowInk = '#122121';

export const shadows = {
  xs: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 5,
  },
  lg: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 12,
  },
  cta: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  // The floating card (§3.1) — the default card lift.
  floatingCard: {
    shadowColor: shadowInk,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  // Mint hero card (§3.4).
  mint: {
    shadowColor: '#203B3C',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.26,
    shadowRadius: 28,
    elevation: 10,
  },
} satisfies Record<string, ViewStyle>;

export type ShadowToken = keyof typeof shadows;
