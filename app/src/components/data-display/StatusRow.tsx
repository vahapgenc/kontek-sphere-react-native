// KStatusRow — pairs a label with a status. Built on the .ds-row layout: a label
// on the left and a status on the right, conveyed either as a tone-colored dot +
// status text, or as a caller-supplied badge in the trailing slot (pass a KBadge).
// When a tone is given, the dot uses the matching status accent color.
import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type StatusTone = 'ok' | 'warn' | 'info' | 'danger' | 'neutral';

export interface KStatusRowProps {
  label: string;
  // Text shown next to the tone dot. Ignored when `trailing` is provided.
  status?: string;
  tone?: StatusTone;
  // A custom trailing node (e.g. a <KBadge />) replacing the dot + status text.
  trailing?: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export function KStatusRow({
  label,
  status,
  tone = 'neutral',
  trailing,
  testID,
  style,
}: KStatusRowProps) {
  const theme = useTheme();
  const dot = dotColor(tone, theme);

  return (
    <View
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={status ? `${label}: ${status}` : label}
      style={[
        styles.row,
        { minHeight: 48, paddingHorizontal: theme.layout.screenGutter },
        style,
      ]}
    >
      <KText variant="body" color={theme.colors.ink} style={styles.label} numberOfLines={1}>
        {label}
      </KText>
      {trailing !== undefined ? (
        <View style={styles.trail}>{trailing}</View>
      ) : (
        <View style={styles.trail}>
          <View style={[styles.dot, { backgroundColor: dot }]} />
          {status ? (
            <KText variant="bodySm" weight="600" color={theme.colors.ink2}>
              {status}
            </KText>
          ) : null}
        </View>
      )}
    </View>
  );
}

function dotColor(tone: StatusTone, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (tone) {
    case 'ok':
      return c.okAccent;
    case 'warn':
      return c.warn;
    case 'info':
      return c.info;
    case 'danger':
      return c.danger;
    case 'neutral':
    default:
      return c.silverMist;
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
    width: '100%',
  } as ViewStyle,
  label: { flex: 1, minWidth: 0 },
  trail: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: { width: 8, height: 8, borderRadius: 999 },
});
