// KCheckbox — 24x24 box with optional label. Mirrors .ds-checkbox + .ds-cbx.
// Unchecked: surface bg, 2px ink-3 border, radius 7. Checked: green fill +
// signature border + white check glyph. Disabled: surface-2 + silver border.
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  testID?: string;
}

export function KCheckbox({
  checked,
  onChange,
  label,
  disabled,
  testID,
}: KCheckboxProps) {
  const theme = useTheme();
  const c = theme.colors;

  const boxBg = disabled
    ? c.surface2
    : checked
      ? c.green
      : c.surface;
  const boxBorder = disabled
    ? c.silverMist
    : checked
      ? c.signature
      : c.ink3;

  return (
    <Pressable
      testID={testID}
      onPress={() => onChange(!checked)}
      disabled={disabled}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      style={styles.row}
    >
      <View style={[styles.box, { backgroundColor: boxBg, borderColor: boxBorder }]}>
        {checked ? (
          <Svg width={15} height={15} viewBox="0 0 24 24" fill="none">
            <Path
              d="m5 12 5 5 9-11"
              stroke="#FFFFFF"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
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
  box: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
