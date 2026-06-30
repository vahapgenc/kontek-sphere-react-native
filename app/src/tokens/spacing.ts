// Kontek Sphere — spacing tokens (4px base)
// Derived from colors_and_type.css. Two scales exist in the source:
//  - the `--sp-N` mobile scale (primary, use this)
//  - the `--space-NN` Gaia primitive scale (kept for parity)

export const spacing = {
  sp1: 4,
  sp2: 8,
  sp3: 12,
  sp4: 16,
  sp5: 20,
  sp6: 24,
  sp8: 32,
  sp10: 40,
  sp12: 48,
  sp16: 64,
} as const;

// Gaia primitive scale (space-00 … space-13)
export const space = {
  s00: 0,
  s01: 2,
  s02: 4,
  s03: 8,
  s04: 12,
  s05: 16,
  s06: 24,
  s07: 32,
  s08: 40,
  s09: 48,
  s10: 64,
  s11: 80,
  s12: 96,
  s13: 160,
} as const;

// Layout / touch constants
export const layout = {
  tapMin: 48,
  controlH: 48,
  controlHLg: 56,
  controlHSm: 40,
  screenGutter: 16,
  screenGutterLg: 20,
  appbarH: 56,
  tabbarH: 58,
  sidebarW: 280,
} as const;

export type SpacingToken = keyof typeof spacing;
