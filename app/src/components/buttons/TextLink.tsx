// KTextLink — an inline underlined text link (opt-out actions like "I don't have
// a certificate yet" / "I don't have a receipt right now"). Mirrors the prototype's
// bare <button> with textDecoration:underline — left-aligned, ink-3, semibold,
// 3px underline offset. NOT a filled/outlined button.
import React from 'react';
import { Pressable, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KTextLinkProps {
  label: string;
  onPress?: () => void;
  /** Text size — 'bodySm' (default, absence) or 'caption' (expense). */
  size?: 'bodySm' | 'caption';
  color?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

export function KTextLink({ label, onPress, size = 'bodySm', color, style, testID }: KTextLinkProps) {
  const c = useTheme().colors;
  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="link"
      hitSlop={6}
      style={({ pressed }) => [styles.wrap, pressed ? styles.pressed : null, style]}
    >
      <KText
        variant={size}
        weight="600"
        color={color ?? c.ink3}
        style={styles.text}
      >
        {label}
      </KText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Left-aligned, small padding — matches the prototype's padding: "2px 4px".
  wrap: { alignSelf: 'flex-start', paddingVertical: 2, paddingHorizontal: 4 },
  pressed: { opacity: 0.6 },
  text: { textDecorationLine: 'underline' },
});
