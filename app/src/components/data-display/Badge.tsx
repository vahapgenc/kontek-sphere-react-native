// KBadge — status pill. Mirrors the badge tones (ok/warn/info/danger/neutral/brand).
// Status pills carry meaning via the *-soft background + status text color.
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type BadgeTone = 'ok' | 'warn' | 'info' | 'danger' | 'neutral' | 'brand';

export interface KBadgeProps {
  label: string;
  tone?: BadgeTone;
  /** Show a leading status dot before the label (mirrors the prototype pills). */
  dot?: boolean;
  testID?: string;
  style?: ViewStyle;
}

export function KBadge({ label, tone = 'info', dot, testID, style }: KBadgeProps) {
  const theme = useTheme();
  const { bg, ink } = toneColors(tone, theme);
  return (
    <View
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={`Status: ${label}`}
      style={[styles.pill, { backgroundColor: bg, borderRadius: theme.radii.pill }, style]}
    >
      {dot ? <View style={[styles.dot, { backgroundColor: ink }]} /> : null}
      <KText variant="micro" weight="600" color={ink}>
        {label}
      </KText>
    </View>
  );
}

function toneColors(tone: BadgeTone, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (tone) {
    case 'ok':
      return { bg: c.okSoft, ink: c.ok };
    case 'warn':
      return { bg: c.warnSoft, ink: c.warn };
    case 'info':
      return { bg: c.infoSoft, ink: c.info };
    case 'danger':
      return { bg: c.dangerSoft, ink: c.danger };
    case 'brand':
      return { bg: c.greenSoft, ink: c.greenDeep };
    case 'neutral':
    default:
      return { bg: c.surface2, ink: c.ink3 };
  }
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  dot: { width: 6, height: 6, borderRadius: 3 },
});

