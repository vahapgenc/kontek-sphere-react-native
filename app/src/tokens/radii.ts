// Kontek Sphere — corner radius tokens. Derived from colors_and_type.css.

export const radii = {
  button: 12,
  input: 12,
  card: 16,
  panel: 20,
  sheet: 24,
  pill: 999,
  sm: 8,
  // Gaia radius primitives
  default: 4,
  round: 999,
} as const;

export type RadiusToken = keyof typeof radii;
