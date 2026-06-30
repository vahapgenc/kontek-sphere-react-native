// KSelect — pressable field showing the selected value + chevron-down.
// Mirrors .ds-field + .ds-select (control-h 48, r-input 12, line border,
// right chevron). It does not open a dropdown itself — it only renders the
// control and reports onPress; the dropdown UI is wired up by the caller.
import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KSelectProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onPress: () => void;
  error?: string;
  disabled?: boolean;
  testID?: string;
}

export function KSelect({
  label,
  value,
  placeholder,
  onPress,
  error,
  disabled,
  testID,
}: KSelectProps) {
  const theme = useTheme();
  const c = theme.colors;

  const borderColor = error ? c.danger : c.line;
  const hasValue = value != null && value !== '';

  return (
    <View style={styles.field}>
      {label ? (
        <KText variant="caption" weight="600" color={c.ink2}>
          {label}
        </KText>
      ) : null}
      <Pressable
        testID={testID}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        style={[
          styles.control,
          {
            height: theme.layout.controlH,
            borderRadius: theme.radii.input,
            backgroundColor: disabled ? c.surface2 : c.surface,
            borderColor,
          },
        ]}
      >
        <KText
          variant="body"
          color={disabled ? c.silverMist : hasValue ? c.ink : c.ink4}
          style={styles.value}
          numberOfLines={1}
        >
          {hasValue ? value : (placeholder ?? '')}
        </KText>
        <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
          <Path
            d="m6 9 6 6 6-6"
            stroke={c.ink3}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
      {error ? (
        <KText variant="micro" color={c.danger}>
          {error}
        </KText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { width: '100%', gap: 4 },
  control: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 14,
  },
  value: { flex: 1 },
});
