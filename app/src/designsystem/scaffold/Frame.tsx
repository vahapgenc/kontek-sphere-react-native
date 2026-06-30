// Frame — mirrors preview/_card.css `.frame` (+ center/spread/col variants).
// A surface demo container with a hairline border.
import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export type FrameVariant = 'default' | 'center' | 'spread' | 'col';

export function Frame({
  variant = 'default',
  children,
  style,
}: {
  variant?: FrameVariant;
  children: ReactNode;
  style?: ViewStyle;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.frame,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.line,
          borderRadius: theme.radii.card,
        },
        variant === 'col' && styles.col,
        variant === 'center' && styles.center,
        variant === 'spread' && styles.spread,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderWidth: 1,
    padding: 24,
    flexDirection: 'row',
    gap: 26,
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  col: { flexDirection: 'column', gap: 18, flexWrap: 'nowrap' },
  center: { alignItems: 'center' },
  spread: { justifyContent: 'space-between' },
});
