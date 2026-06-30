// KTextArea — multiline variant of the field. Mirrors .ds-field + .ds-textarea.
// Same field scaffold as KTextField; min height ~104, top-aligned text,
// 12x16 padding. Focused = signature border; error = danger border.
import React, { useState } from 'react';
import { View, TextInput, StyleSheet, type TextStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KTextAreaProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  minHeight?: number;
  testID?: string;
}

export function KTextArea({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  hint,
  minHeight = 104,
  testID,
}: KTextAreaProps) {
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
        multiline
        textAlignVertical="top"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[
          theme.text.body as TextStyle,
          styles.textarea,
          {
            minHeight,
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
  textarea: {
    width: '100%',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
});
