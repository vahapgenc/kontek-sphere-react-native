// KIconTile — the leading icon tile (the .ds-row__lead pattern).
// brand = --tile-fill (Kontek Green) bg / white icon · soft = --chip-fill bg / --chip-ink icon.
// 40×40 tile, 11px radius, icon ~21px (matches .ds-row__lead svg width).
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KIcon, type IconName } from '../../icons/Icon';

const TILE_SIZE = 40;
const TILE_RADIUS = 11;
const ICON_SIZE = 21;

export interface KIconTileProps {
  icon: IconName;
  size?: number;
  tone?: 'brand' | 'soft';
  testID?: string;
  style?: ViewStyle;
}

export function KIconTile({
  icon,
  size = TILE_SIZE,
  tone = 'brand',
  testID,
  style,
}: KIconTileProps) {
  const theme = useTheme();
  const c = theme.colors;
  const bg = tone === 'soft' ? c.chipFill : c.tileFill;
  const ink = tone === 'soft' ? c.chipInk : c.tileInk;
  // Keep the icon proportional to the tile (21/40 of the box).
  const iconSize = Math.round((ICON_SIZE / TILE_SIZE) * size);

  return (
    <View
      testID={testID}
      style={[
        styles.tile,
        {
          width: size,
          height: size,
          borderRadius: TILE_RADIUS,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      <KIcon name={icon} size={iconSize} color={ink} />
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
