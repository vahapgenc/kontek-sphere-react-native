// Kontek Sphere — motion tokens. Derived from colors_and_type.css (Gaia scales).
// Durations in ms; easing as cubic-bezier control points (use with Easing.bezier).

export const duration = {
  instant: 50,
  fast: 100,
  moderate: 150,
  slow: 250,
  slower: 400,
} as const;

export const easing = {
  standard: [0.2, 0, 0.38, 0.9],
  entrance: [0, 0, 0.38, 0.9],
  exit: [0.2, 0, 1, 0.9],
} as const;

export type DurationToken = keyof typeof duration;
