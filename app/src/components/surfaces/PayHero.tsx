// KPayHero — the pay / hero card (§3.4). Soft-mint treatment, never a dark fill.
// Dark forest text; eyebrow = greenDeep, subtitle = ink3, figure = display tnum.
import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KBadge } from '../data-display/Badge';

export interface KPayHeroLine {
  label: string;
  value: string;
  negative?: boolean;
}

export interface KPayHeroProps {
  eyebrow: string;
  amount: string;
  badge?: string;
  subtitle?: string;
  lines?: KPayHeroLine[];
  trailing?: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export function KPayHero({
  eyebrow,
  amount,
  badge,
  subtitle,
  lines,
  trailing,
  testID,
  style,
}: KPayHeroProps) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <LinearGradient
      colors={theme.gradients.mint}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.card,
        { borderRadius: theme.radii.panel, borderColor: c.mintLine },
        theme.shadows.mint,
        style,
      ]}
      testID={testID}
    >
      <View style={styles.headRow}>
        <KText variant="eyebrow" color={c.greenDeep}>
          {eyebrow}
        </KText>
        {badge ? <KBadge label={badge} tone="brand" /> : null}
      </View>

      <KText variant="display" color={c.signature} style={styles.amount}>
        {amount}
      </KText>
      {subtitle ? (
        <KText variant="bodySm" color={c.ink3}>
          {subtitle}
        </KText>
      ) : null}

      {lines && lines.length > 0 ? (
        <View style={[styles.lines, { borderTopColor: c.mintLine }]}>
          {lines.map((l) => (
            <View key={l.label} style={styles.lineRow}>
              <KText variant="bodySm" color={c.ink2}>
                {l.label}
              </KText>
              <KText variant="bodySm" weight="600" color={l.negative ? c.red : c.signature}>
                {l.value}
              </KText>
            </View>
          ))}
        </View>
      ) : null}

      {trailing}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: { padding: 22, borderWidth: 1, gap: 6 },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  amount: { marginTop: 4 },
  lines: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, gap: 8 },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
