// KOverlayFab — the raised register FAB rendered ON TOP of a full-height overlay
// (the register hub, or an open flow) so it stays fully visible instead of being
// clipped by the overlay. It straddles the overlay's bottom edge, lining up with
// the tab bar's own center FAB. `active` (hub open) tints it --green, otherwise
// --status-badge (mirrors the tab bar FAB). Place it as the LAST child of an
// overlay whose bottom sits at the tab bar top.
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KIcon, type IconName } from '../../icons/Icon';

export interface KOverlayFabProps {
  icon: IconName;
  onPress: () => void;
  /** Hub-open state — green when true, status-badge mint otherwise. */
  active?: boolean;
  accessibilityLabel?: string;
  testID?: string;
}

export function KOverlayFab({ icon, onPress, active, accessibilityLabel, testID }: KOverlayFabProps) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.row} pointerEvents="box-none">
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? 'Registrera'}
        onPress={onPress}
        style={({ pressed }) => [
          styles.fab,
          { backgroundColor: active ? c.green : c.statusBadge },
          theme.shadows.cta,
          pressed ? styles.pressed : null,
        ]}
      >
        <KIcon name={icon} size={26} color={c.shellCtaInk} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // Centered, straddling the overlay's bottom edge (= tab bar top).
  row: { position: 'absolute', left: 0, right: 0, bottom: -28, alignItems: 'center' },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: { transform: [{ scale: 0.95 }] },
});
