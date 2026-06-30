// KTextField — labelled text input. Mirrors .ds-field + .ds-input.
// Field scaffold: optional label, the input shell (control-h 48, r-input 12,
// surface bg, line border), then optional hint or error line.
// Focused = signature border; error = danger border.
import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  type KeyboardTypeOptions,
  type TextStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KTextFieldProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  testID?: string;
}

export function KTextField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  secureTextEntry,
  keyboardType,
  testID,
}: KTextFieldProps) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const c = theme.colors;

  const borderColor = error ? c.danger : focused ? c.signature : c.line;

  return (
    <View style={styles.field}>
      {label ? (
        <KText variant="caption" weight="600" color={c.ink2}>
          {label}
        </KText>
      ) : null}
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={c.ink4}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          theme.text.body as TextStyle,
          styles.input,
          {
            height: theme.layout.controlH,
            borderRadius: theme.radii.input,
            backgroundColor: c.surface,
            borderColor,
            color: c.ink,
          },
        ]}
      />
      {error ? (
        <KText variant="micro" color={c.danger}>
          {error}
        </KText>
      ) : hint ? (
        <KText variant="micro" color={c.ink3}>
          {hint}
        </KText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: { width: '100%', gap: 4 },
  input: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 16,
  },
});
