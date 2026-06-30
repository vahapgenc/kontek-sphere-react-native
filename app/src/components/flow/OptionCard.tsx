// KOptionCard — selectable choice card (radio). Mirrors OptionCard in k-flow.jsx.
// Layout: icon chip · title (+ optional badge) + description · radio indicator.
// Selected = signature border + green-soft tinted shell + filled signature radio.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KBadge } from '../data-display/Badge';

export interface KOptionCardProps {
  /** Optional leading icon node — rendered inside the icon chip. */
  icon?: ReactNode;
  title: string;
  description?: string;
  selected?: boolean;
  onPress: () => void;
  /** Optional badge label shown next to the title. */
  badge?: string;
  testID?: string;
}

export function KOptionCard({
  icon,
  title,
  description,
  selected,
  onPress,
  badge,
  testID,
}: KOptionCardProps) {
  const theme = useTheme();
  const c = theme.colors;

  const shell: ViewStyle = {
    backgroundColor: selected ? c.greenSoft : c.surface,
    borderRadius: theme.radii.panel,
    borderWidth: selected ? 2 : 1,
    borderColor: selected ? c.signature : 'transparent',
    ...theme.shadows.sm,
  };

  return (
    <Pressable
      testID={testID}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        shell,
        pressed ? styles.pressed : null,
      ]}
    >
      {icon ? (
        <View
          style={[
            styles.iconChip,
            {
              borderRadius: theme.radii.input,
              backgroundColor: selected ? c.signature : c.greenSoft,
            },
          ]}
        >
          {icon}
        </View>
      ) : null}

      <View style={styles.body}>
        <View style={styles.titleRow}>
          <KText variant="title" weight="600" color={c.ink} style={styles.title}>
            {title}
          </KText>
          {badge ? <KBadge label={badge} tone="neutral" /> : null}
        </View>
        {description ? (
          <KText variant="bodySm" color={c.ink3} style={styles.desc}>
            {description}
          </KText>
        ) : null}
      </View>

      <View
        style={[
          styles.radio,
          {
            borderColor: selected ? 'transparent' : c.ink3,
            borderWidth: selected ? 0 : 2,
            backgroundColor: selected ? c.signature : 'transparent',
          },
        ]}
      >
        {selected ? (
          <KText variant="micro" weight="700" color={c.onDark}>
            ✓
          </KText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 15,
  },
  pressed: { opacity: 0.95, transform: [{ scale: 0.99 }] },
  iconChip: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flexShrink: 1 },
  desc: { marginTop: 2 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
