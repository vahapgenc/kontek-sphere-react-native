// KPayHero — the pay / hero card (§3.4). Soft-mint rounded card at rest; when
// `docked` (the Home sticky-on-scroll state) it becomes a frosted, full-bleed,
// square bar with a bottom hairline — mirroring the prototype's sticky hero.
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
  /** Docked (scrolled) state: frosted full-bleed bar instead of the mint card. */
  docked?: boolean;
  /** Horizontal screen gutter to cancel when docked (full-bleed). Default 16. */
  gutter?: number;
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
  docked,
  gutter = 16,
  testID,
  style,
}: KPayHeroProps) {
  const theme = useTheme();
  const c = theme.colors;

  const inner = (
    <>
      <View style={styles.headRow}>
        <KText variant="eyebrow" weight="600" color={c.greenDeep} style={styles.eyebrow}>
          {eyebrow}
        </KText>
        {badge ? <KBadge label={badge} tone="brand" dot /> : null}
      </View>

      <KText variant="display" color={c.signature} style={styles.amount}>
        {amount}
      </KText>
      {subtitle ? <KText variant="bodySm" color={c.ink3} style={styles.subtitle}>{subtitle}</KText> : null}

      {lines && lines.length > 0 ? (
        <View style={[styles.lines, { borderTopColor: c.mintLine }]}>
          {lines.map((l) => (
            <View key={l.label} style={styles.lineRow}>
              <KText variant="bodySm" color={c.ink2}>{l.label}</KText>
              <KText variant="bodySm" weight="600" color={l.negative ? c.red : c.signature}>
                {l.value}
              </KText>
            </View>
          ))}
        </View>
      ) : null}

      {trailing}
    </>
  );

  if (docked) {
    return (
      <View
        testID={testID}
        style={[
          styles.docked,
          {
            // Opaque (RN can't backdrop-blur) so scrolling content can't bleed through.
            backgroundColor: c.frostSolid,
            borderBottomColor: c.frostLine,
            marginHorizontal: -gutter,
            paddingHorizontal: gutter,
          },
          style,
        ]}
      >
        {inner}
      </View>
    );
  }

  return (
    <LinearGradient
      colors={theme.gradients.mint}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, { borderRadius: theme.radii.panel, borderColor: c.mintLine }, theme.shadows.mint, style]}
      testID={testID}
    >
      {inner}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Rest padding: roomier top to match the original (eyebrow sits lower from the
  // card edge). Spacing below comes from explicit margins (no flex gap).
  card: { paddingTop: 26, paddingBottom: 22, paddingHorizontal: 22, borderWidth: 1 },
  docked: { paddingTop: 12, paddingBottom: 14, borderBottomWidth: StyleSheet.hairlineWidth },
  headRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  // Prototype eyebrow letter-spacing ~0.08em (≈0.96px at 12px).
  eyebrow: { letterSpacing: 0.96 },
  // Prototype: amount marginTop 10 (display, weight 700, lineHeight ~1.04).
  amount: { marginTop: 10 },
  subtitle: { marginTop: 2 },
  lines: { marginTop: 14, paddingTop: 14, borderTopWidth: 1, gap: 8 },
  lineRow: { flexDirection: 'row', justifyContent: 'space-between' },
});
