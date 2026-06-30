// Kontek Sphere — composed theme object exposed via useTheme().
import {
  colors,
  gradients,
  textStyles,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  space,
  layout,
  radii,
  sizing,
  shadows,
  duration,
  easing,
} from '../tokens';

export const theme = {
  colors,
  gradients,
  text: textStyles,
  fontFamily,
  fontSize,
  fontWeight,
  spacing,
  space,
  layout,
  radii,
  sizing,
  shadows,
  duration,
  easing,
} as const;

export type Theme = typeof theme;
