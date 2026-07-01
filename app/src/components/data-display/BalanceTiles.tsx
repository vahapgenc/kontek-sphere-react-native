// KBalanceTiles — the soft-mint balance stat tiles grid. Faithful port of
// k-misc.jsx <BalanceTiles>: a 3-column grid of tappable tiles, each on the mint
// gradient (145deg #F0FAF4 → #DBEFE3) with a hairline mint border and the sh-1
// lift. Each tile shows a big signature-colored value + a green-deep unit on the
// same baseline, then a muted (ink-3) label pinned to the bottom.
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type BalanceTileTone = 'brand' | 'info' | 'neutral';

export interface BalanceTile {
  id: string;
  label: string;
  value: number | string;
  unit: string;
  tone?: BalanceTileTone;
  icon?: string;
}

export interface KBalanceTilesProps {
  balances: BalanceTile[];
  onOpen?: (id: string) => void;
  testID?: string;
}

export function KBalanceTiles({ balances, onOpen, testID }: KBalanceTilesProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <View testID={testID} style={styles.grid}>
      {balances.map((b) => (
        <Pressable
          key={b.id}
          testID={`pay_balanceTile_${b.id}`}
          onPress={onOpen ? () => onOpen(b.id) : undefined}
          disabled={!onOpen}
          accessibilityRole={onOpen ? 'button' : undefined}
          accessibilityLabel={`${b.value} ${b.unit} — ${b.label}`}
          style={({ pressed }) => [styles.tileWrap, pressed && onOpen ? styles.pressed : null]}
        >
          <LinearGradient
            colors={theme.gradients.mint}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.tile, { borderRadius: theme.radii.panel, borderColor: c.mintLine }, theme.shadows.sm]}
          >
            <View style={styles.valueRow}>
              <KText variant="h1" weight="700" color={c.signature} style={styles.value}>
                {String(b.value)}
              </KText>
              <KText variant="caption" weight="600" color={c.greenDeep}>
                {b.unit}
              </KText>
            </View>
            <KText variant="caption" color={c.ink3} style={styles.label}>
              {b.label}
            </KText>
          </LinearGradient>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  // Prototype: repeat(3, 1fr) with gap 10.
  grid: { flexDirection: 'row', gap: 10 },
  tileWrap: { flex: 1 },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.97 },
  // Prototype: padding "16px 13px 14px", minHeight 112, column layout.
  tile: {
    borderWidth: 1,
    paddingTop: 16,
    paddingHorizontal: 13,
    paddingBottom: 14,
    minHeight: 112,
    flexDirection: 'column',
  } as ViewStyle,
  // Prototype: value + unit share a baseline with a 3px gap; value lineHeight 1.
  valueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  // Prototype value lineHeight is 1 (== the h1 font size, 28px).
  value: { lineHeight: 28 },
  // Prototype: label pinned to the bottom (marginTop auto) with paddingTop 12.
  label: { marginTop: 'auto', paddingTop: 12, lineHeight: 17 },
});
