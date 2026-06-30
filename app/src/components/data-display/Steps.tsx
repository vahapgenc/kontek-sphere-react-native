// KSteps — stepper progress dots. Mirrors k-ui.jsx <Steps>. Renders `total` dots;
// the dot at `current` is a filled, wider pill in the brand signature color, dots
// up to and including current stay filled, and remaining dots use the line color.
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

export interface KStepsProps {
  total: number;
  current: number;
  testID?: string;
  style?: ViewStyle;
}

export function KSteps({ total, current, testID, style }: KStepsProps) {
  const theme = useTheme();

  return (
    <View
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: total - 1, now: current }}
      style={[styles.row, style]}
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        const filled = i <= current;
        return (
          <View
            key={i}
            style={{
              height: 5,
              borderRadius: 999,
              width: active ? 22 : 5,
              backgroundColor: filled ? theme.colors.signature : theme.colors.line,
            }}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  } as ViewStyle,
});
