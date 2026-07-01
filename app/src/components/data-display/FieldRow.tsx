// KFieldRow — a label-over-value detail row. Mirrors the field rows used in the
// prototype's EmploymentDetailsScreen (k-misc.jsx): a small muted label (ink-3)
// sitting ABOVE a bold value. This is distinct from KListRow, which renders a
// bold title with a muted subtitle BELOW it (value-over-subtitle, the wrong order
// for read-only detail fields). Used inside a KCard, one row per field.
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KFieldRowProps {
  label: string;
  value: string;
  testID?: string;
  style?: ViewStyle;
}

export function KFieldRow({ label, value, testID, style }: KFieldRowProps) {
  const theme = useTheme();
  return (
    <View testID={testID} style={[styles.row, style]}>
      <KText variant="caption" color={theme.colors.ink3}>
        {label}
      </KText>
      <KText variant="body" weight="600" color={theme.colors.ink}>
        {value}
      </KText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: 12,
    gap: 2,
  } as ViewStyle,
});
