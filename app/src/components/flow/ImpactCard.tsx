// KImpactCard — pay-impact preview card. Mirrors ImpactCard in k-flow.jsx.
// Header strip ("How your upcoming pay is affected") + line items + optional total +
// a footer note about the payday. Positive values use ink; negative values a red-pink.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KImpactLine {
  label: string;
  value: string;
  negative?: boolean;
}

export interface KImpactCardProps {
  /** Optional headline total, e.g. "−1 240 kr". */
  amount?: string;
  lines: KImpactLine[];
  /** Payday label shown in the footer note. */
  payday?: string;
  /** Optional leading icon node for the header strip. */
  icon?: ReactNode;
  testID?: string;
}

export function KImpactCard({
  amount,
  lines,
  payday,
  icon,
  testID,
}: KImpactCardProps) {
  const theme = useTheme();
  const c = theme.colors;
  // The design's negative red-pink: danger ink on the danger-soft family.
  const negativeInk = c.red;

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: c.surface,
          borderRadius: theme.radii.panel,
          ...theme.shadows.sm,
        },
      ]}
    >
      <View style={[styles.headerStrip, { backgroundColor: c.greenSoft, borderBottomColor: c.line2 }]}>
        {icon ? <View style={styles.headerIcon}>{icon}</View> : null}
        <KText variant="bodySm" weight="700" color={c.greenDeep}>
          How your upcoming pay is affected
        </KText>
      </View>

      <View style={styles.lines}>
        {lines.map((line, i) => (
          <View
            key={`${line.label}_${i}`}
            style={[
              styles.lineRow,
              i < lines.length - 1
                ? { borderBottomWidth: 1, borderBottomColor: c.line2 }
                : null,
            ]}
          >
            <KText variant="bodySm" color={c.ink2} style={styles.lineLabel}>
              {line.label}
            </KText>
            <KText
              variant="bodySm"
              weight="700"
              color={line.negative ? negativeInk : c.ink}
            >
              {line.value}
            </KText>
          </View>
        ))}

        {amount !== undefined ? (
          <View style={[styles.totalRow, { borderTopColor: c.line }]}>
            <KText variant="bodySm" weight="700" color={c.ink} style={styles.lineLabel}>
              Estimated change
            </KText>
            <KText variant="h3" weight="700" color={c.ink}>
              {amount}
            </KText>
          </View>
        ) : null}
      </View>

      {payday ? (
        <View style={[styles.footer, { backgroundColor: c.surface2, borderTopColor: c.line2 }]}>
          <KText variant="caption" color={c.ink3}>
            Affects the pay paid on {payday}. Amounts are preliminary until pay is finalised.
          </KText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { overflow: 'hidden' },
  headerStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerIcon: { alignItems: 'center', justifyContent: 'center' },
  lines: { padding: 16 },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 7,
  },
  lineLabel: { flex: 1, minWidth: 0 },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 2,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
});
