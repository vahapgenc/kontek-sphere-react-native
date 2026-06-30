// KTabBar — presentational 58px bottom tab bar. Mirrors .ds-tabbar / .ds-tab.
// Selection is carried by COLOR ALONE (signature + bolder); resting tabs use
// guide ink. A count badge rides the icon: a green circle with a white number,
// capped at 9+, ringed in surface so it reads against the icon (.ds-tab__badge).
// Presentational only — not yet wired to React Navigation.
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KTabBarItem {
  key: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
}

export interface KTabBarCenterAction {
  icon: React.ReactNode;
  onPress: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

export interface KTabBarProps {
  items: KTabBarItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  /** Raised center action (the register FAB) inserted in the middle of the bar. */
  centerAction?: KTabBarCenterAction;
  testID?: string;
}

export function KTabBar({ items, activeKey, onSelect, centerAction, testID }: KTabBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const c = theme.colors;

  const renderTab = (item: KTabBarItem) => {
    const active = item.key === activeKey;
    const tint = active ? c.signature : c.guide;
    return (
      <Pressable
        key={item.key}
        testID={testID ? `${testID}-${item.key}` : undefined}
        onPress={() => onSelect(item.key)}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={item.label}
        style={[styles.tab, { minHeight: theme.layout.tabbarH }]}
      >
        <View style={styles.iconWrap}>
          {item.icon}
          {item.badge && item.badge > 0 ? (
            <View style={[styles.badge, { backgroundColor: c.green, borderColor: c.surface, borderRadius: theme.radii.pill }]}>
              <KText variant="micro" weight="700" color={c.onDark} style={styles.badgeText}>
                {item.badge > 9 ? '9+' : String(item.badge)}
              </KText>
            </View>
          ) : null}
        </View>
        <KText variant="micro" weight={active ? '700' : '600'} color={tint} numberOfLines={1} style={styles.label}>
          {item.label}
        </KText>
      </Pressable>
    );
  };

  // With a center action, split the tabs evenly around the raised FAB.
  const mid = Math.ceil(items.length / 2);
  const left = centerAction ? items.slice(0, mid) : items;
  const right = centerAction ? items.slice(mid) : [];

  return (
    <View
      testID={testID}
      style={[styles.bar, { backgroundColor: c.surface, borderTopColor: c.line2, paddingBottom: insets.bottom }]}
    >
      {left.map(renderTab)}
      {centerAction ? (
        <View style={styles.fabSlot}>
          <Pressable
            testID={centerAction.testID}
            onPress={centerAction.onPress}
            accessibilityRole="button"
            accessibilityLabel={centerAction.accessibilityLabel ?? 'Registrera'}
            style={({ pressed }) => [
              styles.fab,
              { backgroundColor: c.shellCta },
              theme.shadows.cta,
              pressed ? styles.fabPressed : null,
            ]}
          >
            {centerAction.icon}
          </Pressable>
        </View>
      ) : null}
      {right.map(renderTab)}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'stretch',
    borderTopWidth: StyleSheet.hairlineWidth,
  } as ViewStyle,
  tab: {
    flex: 1,
    minWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  iconWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -11,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    lineHeight: 14,
  },
  label: {
    maxWidth: '100%',
  },
  fabSlot: {
    width: 64,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginTop: -18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabPressed: { transform: [{ scale: 0.95 }] },
});
