// KSummaryRow — a review/confirm line: a muted label on the left and a bold,
// right-aligned value on the right, with a hairline divider unless it is the
// last row. Mirrors SummaryRow in k-absence.jsx (reused by the expense +
// absence confirm steps). The optional `tone` tints the value (ok / warn /
// danger); default value colour is --ink.
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type SummaryRowTone = 'ok' | 'warn' | 'danger';

export interface KSummaryRowProps {
  label: string;
  value: string;
  /** Tints the value. Omit for the default ink colour. */
  tone?: SummaryRowTone;
  /** Last row in a group — drops the bottom divider. */
  last?: boolean;
  testID?: string;
}

export function KSummaryRow({ label, value, tone, last, testID }: KSummaryRowProps) {
  const theme = useTheme();
  const c = theme.colors;
  const valueColor =
    tone === 'ok' ? c.ok : tone === 'warn' ? c.warn : tone === 'danger' ? c.danger : c.ink;

  return (
    <View
      testID={testID}
      style={[
        styles.row,
        last ? null : { borderBottomWidth: 1, borderBottomColor: c.line2 },
      ]}
    >
      <KText variant="bodySm" color={c.ink3} style={styles.label}>
        {label}
      </KText>
      <KText variant="bodySm" weight="700" color={valueColor} align="right" style={styles.value}>
        {value}
      </KText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 12,
  } as ViewStyle,
  label: { flexShrink: 0 },
  value: { flex: 1, minWidth: 0 },
});
