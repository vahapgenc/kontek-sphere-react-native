// KBanner — an inline, in-flow alert block. Mirrors .ds-banner (mobile.css §6).
// Tone drives the *-soft background, the status ink text color, and a 20%-alpha
// border in the same ink. An optional leading slot accepts a tone-colored icon.
import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type BannerTone = 'ok' | 'warn' | 'info' | 'danger';

export interface KBannerProps {
  tone: BannerTone;
  message: string;
  title?: string;
  leading?: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export function KBanner({ tone, title, message, leading, testID, style }: KBannerProps) {
  const theme = useTheme();
  const { bg, ink, border } = toneColors(tone, theme);

  return (
    <View
      testID={testID}
      accessibilityRole="alert"
      style={[
        styles.banner,
        { backgroundColor: bg, borderColor: border, borderRadius: theme.radii.card },
        style,
      ]}
    >
      {leading ? <View style={styles.icon}>{leading}</View> : null}
      <View style={styles.body}>
        {title ? (
          <KText variant="bodySm" weight="600" color={ink}>
            {title}
          </KText>
        ) : null}
        <KText variant="bodySm" color={ink} style={title ? styles.spaced : undefined}>
          {message}
        </KText>
      </View>
    </View>
  );
}

function toneColors(tone: BannerTone, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (tone) {
    case 'ok':
      return { bg: c.okSoft, ink: c.okText, border: withAlpha(c.okText, 0.2) };
    case 'warn':
      return { bg: c.warnSoft, ink: c.warnText, border: withAlpha(c.warnText, 0.2) };
    case 'danger':
      return { bg: c.dangerSoft, ink: c.dangerText, border: withAlpha(c.dangerText, 0.2) };
    case 'info':
    default:
      return { bg: c.infoSoft, ink: c.infoText, border: withAlpha(c.infoText, 0.18) };
  }
}

// Approximates the CSS color-mix(... N%, transparent) border tint.
function withAlpha(hex: string, alpha: number) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
  } as ViewStyle,
  icon: { flexShrink: 0, marginTop: 1 },
  body: { flex: 1, minWidth: 0 },
  spaced: { marginTop: 2, opacity: 0.92 },
});
