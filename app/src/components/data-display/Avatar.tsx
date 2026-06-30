// KAvatar — mirrors the .ds-avatar spec in colors_and_type.css.
// Sizes xs/sm/md/lg/xl · initials on --avatar-fill (The Guide) · optional image · tone variants ·
// optional presence dot (online/away/offline/busy) ringed against the host surface.
import React from 'react';
import { View, Image, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Tone = 'default' | 'soft' | 'forest' | 'muted';
type Presence = 'online' | 'away' | 'offline' | 'busy';

export interface KAvatarProps {
  initials?: string;
  source?: { uri: string };
  size?: Size;
  tone?: Tone;
  presence?: Presence;
  testID?: string;
  style?: ViewStyle;
}

// box / font-size per the .ds-avatar size modifiers.
const SIZE_MAP: Record<Size, { box: number; font: number }> = {
  xs: { box: 24, font: 9.5 },
  sm: { box: 32, font: 12 },
  md: { box: 40, font: 14 },
  lg: { box: 48, font: 16 },
  xl: { box: 64, font: 22 },
};

// The away dot uses a literal #C98A2B in the CSS (no token); the rest map to theme colors.
const AWAY = '#C98A2B';

export function KAvatar({
  initials,
  source,
  size = 'md',
  tone = 'default',
  presence,
  testID,
  style,
}: KAvatarProps) {
  const theme = useTheme();
  const { box, font } = SIZE_MAP[size];
  const { bg, ink } = toneColors(tone, theme);

  return (
    <View testID={testID} style={[{ width: box, height: box }, style]}>
      <View
        style={[
          styles.avatar,
          { width: box, height: box, borderRadius: box / 2, backgroundColor: bg },
        ]}
      >
        {source ? (
          <Image source={source} style={styles.image} resizeMode="cover" />
        ) : (
          <KText
            variant="title"
            weight="600"
            color={ink}
            style={{ fontSize: font, lineHeight: font, letterSpacing: font * 0.01 }}
          >
            {initials ?? ''}
          </KText>
        )}
      </View>
      {presence ? (
        <View
          style={[
            styles.presence,
            {
              width: Math.max(box * 0.3, 8),
              height: Math.max(box * 0.3, 8),
              borderRadius: 999,
              borderColor: theme.colors.surface,
              backgroundColor: presenceColor(presence, theme),
            },
          ]}
        />
      ) : null}
    </View>
  );
}

function toneColors(tone: Tone, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (tone) {
    case 'soft':
      return { bg: c.greenSoft, ink: c.greenDeep };
    case 'forest':
      return { bg: c.kontekGreen, ink: c.onDark };
    case 'muted':
      return { bg: c.surface2, ink: c.ink3 };
    case 'default':
    default:
      return { bg: c.avatarFill, ink: c.onDark };
  }
}

function presenceColor(presence: Presence, theme: ReturnType<typeof useTheme>) {
  const c = theme.colors;
  switch (presence) {
    case 'online':
      return c.green;
    case 'away':
      return AWAY;
    case 'busy':
      return c.danger;
    case 'offline':
    default:
      return c.silverMist;
  }
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  presence: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    borderWidth: 2,
  },
});
