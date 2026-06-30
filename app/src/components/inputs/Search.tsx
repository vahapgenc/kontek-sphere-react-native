// KSearchField — search input with a leading search glyph and a trailing
// clear button when text is present. Mirrors .ds-search (.ds-input shell with
// 44px left/right padding, lead glyph at 14px, round clear button at right).
import React from 'react';
import {
  View,
  TextInput,
  Pressable,
  StyleSheet,
  type TextStyle,
} from 'react-native';
import Svg, { Path, Circle, Line } from 'react-native-svg';
import { useTheme } from '../../theme';

export interface KSearchFieldProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  testID?: string;
}

export function KSearchField({
  value,
  onChangeText,
  placeholder,
  testID,
}: KSearchFieldProps) {
  const theme = useTheme();
  const c = theme.colors;
  const hasText = value.length > 0;

  return (
    <View style={styles.search}>
      <View style={styles.lead} pointerEvents="none">
        <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <Circle cx={11} cy={11} r={7} stroke={c.ink3} strokeWidth={2} />
          <Path
            d="m20 20-3.5-3.5"
            stroke={c.ink3}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <TextInput
        testID={testID}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={c.ink4}
        style={[
          theme.text.body as TextStyle,
          styles.input,
          {
            height: theme.layout.controlH,
            borderRadius: theme.radii.input,
            backgroundColor: c.surface,
            borderColor: c.line,
            color: c.ink,
          },
        ]}
      />
      {hasText ? (
        <Pressable
          testID={testID ? `${testID}-clear` : undefined}
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel="Rensa"
          style={[styles.clear, { borderRadius: theme.radii.round }]}
        >
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
            <Line x1={6} y1={6} x2={18} y2={18} stroke={c.ink3} strokeWidth={2} strokeLinecap="round" />
            <Line x1={18} y1={6} x2={6} y2={18} stroke={c.ink3} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  lead: {
    position: 'absolute',
    left: 14,
    zIndex: 1,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    paddingLeft: 44,
    paddingRight: 44,
  },
  clear: {
    position: 'absolute',
    right: 6,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
