// KRadio — 24x24 circle with optional label. Mirrors .ds-radio + .ds-rdo.
// Unchecked: surface bg, 2px ink-3 border. Selected: signature border +
// 12x12 green inner dot. Disabled: surface-2 + silver border.
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KRadioProps {
  selected: boolean;
  onChange: (selected: boolean) => void;
  label?: string;
  disabled?: boolean;
  testID?: string;
}

export function KRadio({
  selected,
  onChange,
  label,
  disabled,
  testID,
}: KRadioProps) {
  const theme = useTheme();
  const c = theme.colors;

  const ringBg = disabled ? c.surface2 : c.surface;
  const ringBorder = disabled
    ? c.silverMist
    : selected
      ? c.signature
      : c.ink3;

  return (
    <Pressable
      testID={testID}
      onPress={() => onChange(!selected)}
      disabled={disabled}
      accessibilityRole="radio"
      accessibilityState={{ selected, disabled }}
      style={styles.row}
    >
      <View style={[styles.ring, { backgroundColor: ringBg, borderColor: ringBorder }]}>
        {selected ? (
          <View style={[styles.dot, { backgroundColor: disabled ? c.silverMist : c.green }]} />
        ) : null}
      </View>
      {label ? (
        <KText variant="body" color={disabled ? c.silverMist : c.ink}>
          {label}
        </KText>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
