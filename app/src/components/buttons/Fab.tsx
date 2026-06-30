// KFab — floating action button. Mirrors .ds-fab: a 56px circular mint button
// (--shell-cta) carrying the brand glow (cta shadow). Press = scale 0.95.
// The icon is supplied as a ReactNode slot (no icon set imported here).
import React, { type ReactNode } from 'react';
import { Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface KFabProps {
  icon: ReactNode;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

const FAB_SIZE = 56;

export function KFab({ icon, onPress, testID, accessibilityLabel }: KFabProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? 'Skapa'}
      style={({ pressed }) => [
        styles.fab,
        {
          backgroundColor: c.shellCta,
          borderRadius: theme.radii.pill,
          ...theme.shadows.cta,
        },
        pressed ? styles.pressed : null,
      ]}
    >
      {icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  fab: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  pressed: {
    transform: [{ scale: 0.95 }],
  },
});
