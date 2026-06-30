// KProductCard — content card (product-card §MOLECULES). A rounded icon header tile
// over a soft-mint fill, a semibold title, a muted description, and an optional meta
// row (e.g. "Öppna ›") or price. The whole card may be pressable. Floating-card lift,
// --r-card radius.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

export interface KProductCardProps {
  title: string;
  description?: string;
  // Icon shown in the header tile. Pass any node, or omit and KProductCard renders
  // nothing in the tile (the tile itself is hidden when there is no icon).
  icon?: ReactNode;
  // Convenience label rendered below the body — e.g. a price/figure. Bold, signature ink.
  price?: string;
  // Optional action affordance shown as a meta row (label + chevron), green-deep ink.
  actionLabel?: string;
  onPress?: () => void;
  testID?: string;
  style?: ViewStyle;
}

export function KProductCard({
  title,
  description,
  icon,
  price,
  actionLabel,
  onPress,
  testID,
  style,
}: KProductCardProps) {
  const theme = useTheme();
  const c = theme.colors;

  const cardStyle: ViewStyle = {
    backgroundColor: c.surface,
    borderRadius: theme.radii.card,
    padding: theme.spacing.sp5,
    ...theme.shadows.floatingCard,
  };

  const body = (
    <>
      {icon ? (
        <View style={[styles.iconTile, { backgroundColor: c.greenSoft, borderRadius: theme.radii.sm }]}>
          {icon}
        </View>
      ) : null}

      <KText variant="title" weight="600" color={c.ink} style={styles.title}>
        {title}
      </KText>

      {description ? (
        <KText variant="caption" color={c.ink3} style={styles.desc}>
          {description}
        </KText>
      ) : null}

      {price ? (
        <KText variant="title" weight="700" color={c.signature} style={styles.price}>
          {price}
        </KText>
      ) : null}

      {actionLabel ? (
        <View style={styles.meta}>
          <KText variant="eyebrow" weight="600" color={c.greenDeep}>
            {actionLabel}
          </KText>
          <KIcon name="chevR" size={14} color={c.greenDeep} strokeWidth={2.2} />
        </View>
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [cardStyle, pressed ? styles.pressed : null, style]}
      >
        {body}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[cardStyle, style]}>
      {body}
    </View>
  );
}

const styles = StyleSheet.create({
  iconTile: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  title: { marginTop: 14 },
  desc: { marginTop: 4 },
  price: { marginTop: 8 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 14,
  },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.97 },
});
