// KAppBar — compact 56px top bar (frosted in the spec; an opaque canvas wash here).
// Mirrors .ds-appbar / .ds-appbar__bar / .ds-appbar__title, plus the
// .ds-appbar__large large-title variant (eyebrow + h1 block).
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KAppBarProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  large?: boolean;
  testID?: string;
}

export function KAppBar({ title, onBack, right, large, testID }: KAppBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const c = theme.colors;

  // Title is centered when there is nothing leading; left-aligned once a back
  // button claims the leading slot (mirrors .ds-appbar--leading).
  const leading = !!onBack;

  return (
    <View
      testID={testID}
      style={[
        styles.bar,
        {
          paddingTop: insets.top,
          backgroundColor: c.frostBg,
          borderBottomColor: c.line2,
        },
      ]}
    >
      <View style={[styles.row, { height: theme.layout.appbarH, paddingHorizontal: theme.space.s03 }]}>
        {onBack ? (
          <Pressable
            testID={testID ? `${testID}-back` : undefined}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Tillbaka"
            hitSlop={8}
            style={({ pressed }) => [
              styles.action,
              { width: theme.layout.tapMin, height: theme.layout.tapMin, borderRadius: theme.radii.pill },
              pressed ? { backgroundColor: c.surface2 } : null,
            ]}
          >
            <KText variant="h3" color={c.ink2}>{'‹'}</KText>
          </Pressable>
        ) : (
          <View style={{ width: theme.space.s03 }} />
        )}

        <KText
          variant="title"
          weight="600"
          numberOfLines={1}
          align={leading ? 'left' : 'center'}
          style={styles.title}
        >
          {title}
        </KText>

        <View style={styles.rightSlot}>{right}</View>
      </View>

      {large ? (
        <View style={[styles.large, { paddingHorizontal: theme.layout.screenGutter, paddingBottom: theme.space.s05 }]}>
          <KText variant="eyebrow" weight="600" color={c.greenDeep} style={styles.eyebrow}>
            {title.toUpperCase()}
          </KText>
          <KText variant="h1" weight="700">{title}</KText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  } as ViewStyle,
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    flex: 1,
    minWidth: 0,
  },
  action: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightSlot: {
    minWidth: 48,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  large: {
    paddingTop: 4,
  },
  eyebrow: {
    marginBottom: 6,
  },
});
