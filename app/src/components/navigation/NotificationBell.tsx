// KNotificationBell — the bell action that rides the RIGHT side of the large app
// bar on every root tab screen (Home, Pay, Calendar, Profile). Mirrors the
// prototype's `notifBell` (.ds-appbar__action): a 48×48 tap target with an ink-3
// count badge. It is intentionally NOT shown on flow screens (absence/expense) or
// detail screens — those use a compact back bar with no bell.
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KIcon } from '../../icons/Icon';
import { KText } from '../Text';

export interface KNotificationBellProps {
  /** Unread notification count; the badge is hidden when 0/undefined. */
  count?: number;
  onPress?: () => void;
  testID?: string;
  accessibilityLabel?: string;
}

export function KNotificationBell({
  count,
  onPress,
  testID,
  accessibilityLabel = 'Notifications',
}: KNotificationBellProps) {
  const c = useTheme().colors;
  const showBadge = typeof count === 'number' && count > 0;
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={styles.bell}
    >
      <KIcon name="bell" color={c.ink2} />
      {showBadge ? (
        <View style={[styles.badge, { backgroundColor: c.ink3, borderColor: c.canvas }]}>
          <KText variant="micro" weight="700" color={c.onDark} style={styles.badgeText}>
            {count! > 9 ? '9+' : String(count)}
          </KText>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bell: { width: 48, height: 48, alignItems: 'center', justifyContent: 'center' },
  badge: {
    position: 'absolute',
    top: 6,
    right: 6,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { lineHeight: 14 },
});
