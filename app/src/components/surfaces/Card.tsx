// KCard — the floating card (§3.1): no visible border, the lift does the separation.
// Pairs --r-panel radius with the floating-card shadow.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface KCardProps {
  children: ReactNode;
  padding?: number;
  onPress?: () => void;
  testID?: string;
  style?: ViewStyle;
}

export function KCard({ children, padding, onPress, testID, style }: KCardProps) {
  const theme = useTheme();
  const cardStyle: ViewStyle = {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.panel,
    padding: padding ?? theme.spacing.sp4,
    ...theme.shadows.floatingCard,
  };

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        style={({ pressed }) => [cardStyle, pressed ? styles.pressed : null, style]}
      >
        {children}
      </Pressable>
    );
  }
  return (
    <View testID={testID} style={[cardStyle, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.97 },
});
