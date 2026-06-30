// KSpinner — wraps RN ActivityIndicator with the brand color. Mirrors .ds-spinner
// (mobile.css §8): sizes sm/md/lg and an on-dark variant that uses the shell CTA tint.
import React from 'react';
import { ActivityIndicator, View, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface KSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  onDark?: boolean;
  testID?: string;
  style?: ViewStyle;
}

export function KSpinner({ size = 'md', onDark, testID, style }: KSpinnerProps) {
  const theme = useTheme();
  // ActivityIndicator only supports 'small' (~20) and 'large' (~36); md maps to small.
  const indicatorSize = size === 'lg' ? 'large' : 'small';
  const color = onDark ? theme.colors.shellCta : theme.colors.greenDeep;

  return (
    <View testID={testID} style={style}>
      <ActivityIndicator size={indicatorSize} color={color} />
    </View>
  );
}
