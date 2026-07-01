// KButton — mobile button. Mirrors .ds-btn and its variants/sizes.
// Variants: primary · secondary · ghost · transparent · approve · secondaryCta · danger
// Sizes: md (48) · lg (56) · sm (40). `block` = full width. Press = scale 0.97.
import React from 'react';
import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'transparent'
  | 'approve'
  | 'secondaryCta'
  | 'danger';
type Size = 'md' | 'lg' | 'sm';

export interface KButtonProps extends Omit<PressableProps, 'style'> {
  label: string;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  disabled?: boolean;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
  testID?: string;
}

export function KButton({
  label,
  variant = 'primary',
  size = 'md',
  block,
  disabled,
  leading,
  trailing,
  testID,
  ...rest
}: KButtonProps) {
  const theme = useTheme();
  const height =
    size === 'lg'
      ? theme.layout.controlHLg
      : size === 'sm'
        ? theme.layout.controlHSm
        : theme.layout.controlH;

  const fills = resolveColors(variant, theme, disabled);

  return (
    <Pressable
      testID={testID}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.base,
        {
          height,
          borderRadius: theme.radii.button,
          backgroundColor: pressed && fills.pressedBg ? fills.pressedBg : fills.bg,
          borderColor: fills.border,
          paddingHorizontal: variant === 'transparent' ? theme.space.s03 : theme.space.s06,
        },
        block ? styles.block : null,
        pressed && !disabled ? styles.pressed : null,
      ]}
      {...rest}
    >
      {leading ? <View style={styles.icon}>{leading}</View> : null}
      <KText
        variant={size === 'lg' ? 'title' : 'body'}
        weight="600"
        color={fills.ink}
      >
        {label}
      </KText>
      {trailing ? <View style={styles.icon}>{trailing}</View> : null}
    </Pressable>
  );
}

function resolveColors(
  variant: Variant,
  theme: ReturnType<typeof useTheme>,
  disabled?: boolean,
) {
  const c = theme.colors;
  if (disabled) {
    const ghostish = variant === 'ghost' || variant === 'transparent' || variant === 'danger';
    return {
      bg: ghostish ? 'transparent' : c.actionDisabled,
      pressedBg: undefined as string | undefined,
      border: variant === 'secondary' ? c.line : 'transparent',
      ink: c.actionDisabledInk,
    };
  }
  switch (variant) {
    case 'primary':
      return { bg: c.action, pressedBg: c.actionPress, border: 'transparent', ink: c.onDark };
    case 'secondary':
      return { bg: c.surface, pressedBg: c.surface2, border: c.line, ink: c.ink };
    case 'ghost':
      return { bg: 'transparent', pressedBg: c.surface2, border: 'transparent', ink: c.ink };
    case 'transparent':
      return { bg: 'transparent', pressedBg: c.greenSoft, border: 'transparent', ink: c.action };
    case 'approve':
      return { bg: c.green, pressedBg: '#4FA77B', border: 'transparent', ink: c.ground };
    case 'secondaryCta':
      return { bg: c.action2, pressedBg: c.action2Hi, border: 'transparent', ink: c.kontekGreen };
    case 'danger':
      return { bg: 'transparent', pressedBg: c.dangerSoft, border: c.danger, ink: c.danger };
  }
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
  } as ViewStyle,
  block: { width: '100%' },
  pressed: { transform: [{ scale: 0.97 }] },
  icon: { alignItems: 'center', justifyContent: 'center' },
});
