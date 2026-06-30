// KTopMenu — desktop horizontal top navigation bar (nav-item §ORGANISMS). An 80px
// (64px compact) Kontek-green bar with a row of nav items: resting items in mint
// (--status-badge), the active item in bold white over a faint white wash with a 3px
// mint underline. Presentational — the host wires selection.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KTopMenuItem {
  key: string;
  label: string;
  icon?: ReactNode;
}

export interface KTopMenuProps {
  items: KTopMenuItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  // Renders the lower 64px bar instead of the 80px default.
  compact?: boolean;
  // Optional leading slot (e.g. a logo) and trailing slot (e.g. the right cluster).
  leading?: ReactNode;
  trailing?: ReactNode;
  testID?: string;
  style?: ViewStyle;
}

const BAR_H = 80;
const BAR_H_COMPACT = 64;
const UNDERLINE_H = 3;

export function KTopMenu({
  items,
  activeKey,
  onSelect,
  compact,
  leading,
  trailing,
  testID,
  style,
}: KTopMenuProps) {
  const theme = useTheme();
  const c = theme.colors;
  const height = compact ? BAR_H_COMPACT : BAR_H;

  return (
    <View
      testID={testID}
      style={[styles.bar, { height, backgroundColor: c.kontekGreen, borderRadius: theme.radii.card }, style]}
    >
      {leading ? <View style={styles.logo}>{leading}</View> : null}

      <View style={styles.nav}>
        {items.map((item) => {
          const active = item.key === activeKey;
          const tint = active ? c.onDark : c.statusBadge;
          return (
            <Pressable
              key={item.key}
              testID={testID ? `${testID}-${item.key}` : undefined}
              onPress={() => onSelect(item.key)}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}
              accessibilityLabel={item.label}
              style={({ pressed }) => [
                styles.item,
                active ? { backgroundColor: c.shellHover } : null,
                pressed && !active ? { backgroundColor: c.shellHover } : null,
              ]}
            >
              {item.icon ? <View style={styles.itemIcon}>{item.icon}</View> : null}
              <KText
                variant={compact ? 'caption' : 'bodySm'}
                weight={active ? '700' : '500'}
                color={tint}
                numberOfLines={1}
              >
                {item.label}
              </KText>
              {active ? (
                <View style={[styles.underline, { backgroundColor: c.statusBadge }]} />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {trailing ? <View style={styles.right}>{trailing}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'stretch',
  } as ViewStyle,
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 28,
    paddingRight: 14,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  item: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 16,
  },
  itemIcon: { alignItems: 'center', justifyContent: 'center' },
  underline: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    height: UNDERLINE_H,
    borderTopLeftRadius: UNDERLINE_H,
    borderTopRightRadius: UNDERLINE_H,
  },
  right: {
    marginLeft: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingHorizontal: 22,
  },
});
