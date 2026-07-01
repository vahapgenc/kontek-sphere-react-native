// KCard — the standard content card (.ds-mcard): surface fill, a 1px hairline
// border, r-card (16px) radius, subtle shadow-sm, and space-05 (16px) padding.
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
    borderWidth: 1,
    borderColor: theme.colors.line,
    borderRadius: theme.radii.card,
    padding: padding ?? theme.spacing.sp4,
    ...theme.shadows.sm,
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
