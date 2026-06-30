// KText — typed text primitive. Renders a design-system type preset.
// Mirrors the .ds-display / .ds-h1 / … / .ds-mono classes.
import React from 'react';
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { useTheme } from '../theme';
import type { TextVariant } from '../tokens';

export interface KTextProps extends TextProps {
  variant?: TextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  weight?: TextStyle['fontWeight'];
}

export function KText({
  variant = 'body',
  color,
  align,
  weight,
  style,
  ...rest
}: KTextProps) {
  const theme = useTheme();
  return (
    <RNText
      style={[
        theme.text[variant],
        color ? { color } : null,
        align ? { textAlign: align } : null,
        weight ? { fontWeight: weight } : null,
        style,
      ]}
      {...rest}
    />
  );
}
