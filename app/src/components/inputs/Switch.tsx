// KSwitch — custom 52x32 track with a 28px knob. Mirrors .ds-switch + .ds-swt.
// Off: silver-mist track. On: green track + knob translated 20px to the right.
// Built custom (not RN Switch) to match the 52x32 + green spec exactly.
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

export interface KSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled?: boolean;
  testID?: string;
}

export function KSwitch({ value, onValueChange, disabled, testID }: KSwitchProps) {
  const theme = useTheme();
  const c = theme.colors;

  const trackBg = disabled ? c.surface2 : value ? c.green : c.silverMist;

  return (
    <Pressable
      testID={testID}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      style={[styles.track, { backgroundColor: trackBg, borderRadius: theme.radii.round }]}
    >
      <View
        style={[
          styles.knob,
          theme.shadows.sm,
          { transform: [{ translateX: value ? 20 : 0 }] },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 52,
    height: 32,
    justifyContent: 'center',
  },
  knob: {
    position: 'absolute',
    top: 2,
    left: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
});
