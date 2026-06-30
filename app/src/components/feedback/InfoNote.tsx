// KInfoNote — a callout note. Mirrors k-flow.jsx <InfoNote>, which is the .ds-banner
// organism reused for inline guidance. Defaults to the info tone; warn gives the amber
// callout. Optional leading icon slot, optional title, and free-form children content.
import React, { type ReactNode } from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type InfoNoteTone = 'info' | 'warn' | 'ok' | 'danger';

export interface KInfoNoteProps {
  tone?: InfoNoteTone;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

export function KInfoNote({
  tone = 'info',
  title,
  children,
  icon,
  testID,
  style,
}: KInfoNoteProps) {
  const theme = useTheme();
  const { bg, ink, border } = toneColors(tone, theme);

  return (
    <View
      testID={testID}
      accessibilityRole="alert"
      style={[
        styles.note,
        { backgroundColor: bg, borderColor: border, borderRadius: theme.radii.card },
        style,
      ]}
    >
      {icon ? <View style={styles.icon}>{icon}</View> : null}
      <View style={styles.body}>
        {title ? (
          <KText variant="bodySm" weight="600" color={ink} style={styles.title}>
            {title}
          </KText>
        ) : null}
        {typeof children === 'string' ? (
          <KText variant="bodySm" color={ink} style={styles.text}>
            {children}
          </KText>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

function toneColors(tone: InfoNoteTone, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (tone) {
    case 'warn':
      return { bg: c.warnSoft, ink: c.warnText, border: withAlpha(c.warnText, 0.2) };
    case 'ok':
      return { bg: c.okSoft, ink: c.okText, border: withAlpha(c.okText, 0.2) };
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
  note: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
  } as ViewStyle,
  icon: { flexShrink: 0, marginTop: 1 },
  body: { flex: 1, minWidth: 0 },
  title: { marginBottom: 2 },
  text: { opacity: 0.92 },
});
