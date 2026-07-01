// KListRow — a list row. Mirrors .ds-row (mobile.css §3) and k-ui.jsx <Row>.
// Leading media slot (40px tile / avatar), title + optional subtitle, trailing
// slot (value, chevron, switch, badge). Tappable when onPress is supplied; a
// chevron is shown automatically when pressable and no trailing slot is given.
// `dense` shrinks the row height and leading slot (mirrors the dense Row variant).
import React, { type ReactNode } from 'react';
import { Pressable, View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

export interface KListRowProps {
  title: string;
  subtitle?: string;
  /** Optional third, smaller muted line (e.g. "Registered June 5"). */
  meta?: string;
  leading?: ReactNode;
  /**
   * Render the leading node bare — no green-soft tile chrome behind it. Use for
   * media that supplies its own background (e.g. a circular KAvatar).
   */
  leadingBare?: boolean;
  trailing?: ReactNode;
  onPress?: () => void;
  dense?: boolean;
  testID?: string;
  style?: ViewStyle;
}

export function KListRow({
  title,
  subtitle,
  meta,
  leading,
  leadingBare,
  trailing,
  onPress,
  dense,
  testID,
  style,
}: KListRowProps) {
  const theme = useTheme();
  const minHeight = dense ? 52 : 60;
  const leadSize = dense ? 34 : 40;

  const content = (
    <>
      {leading ? (
        leadingBare ? (
          <View style={styles.leadBare}>{leading}</View>
        ) : (
          <View
            style={[
              styles.lead,
              {
                width: leadSize,
                height: leadSize,
                borderRadius: theme.radii.sm + 3,
                backgroundColor: theme.colors.greenSoft,
              },
            ]}
          >
            {leading}
          </View>
        )
      ) : null}
      <View style={styles.body}>
        <KText variant="title" weight="600" numberOfLines={1}>
          {title}
        </KText>
        {subtitle ? (
          <KText variant="bodySm" color={theme.colors.ink3} numberOfLines={1}>
            {subtitle}
          </KText>
        ) : null}
        {meta ? (
          <KText variant="caption" color={theme.colors.ink4} numberOfLines={1}>
            {meta}
          </KText>
        ) : null}
      </View>
      {trailing !== undefined ? (
        <View style={styles.trail}>{trailing}</View>
      ) : onPress ? (
        <KIcon name="chevR" size={20} color={theme.colors.ink4} />
      ) : null}
    </>
  );

  if (onPress) {
    return (
      <Pressable
        testID={testID}
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [
          styles.row,
          {
            minHeight,
            paddingHorizontal: theme.layout.screenGutter,
            backgroundColor: pressed ? theme.colors.surface2 : theme.colors.surface,
          },
          style,
        ]}
      >
        {content}
      </Pressable>
    );
  }

  return (
    <View
      testID={testID}
      style={[
        styles.row,
        {
          minHeight,
          paddingHorizontal: theme.layout.screenGutter,
          backgroundColor: theme.colors.surface,
        },
        style,
      ]}
    >
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    width: '100%',
  } as ViewStyle,
  lead: {
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  leadBare: { flexShrink: 0 },
  body: { flex: 1, minWidth: 0, gap: 2 },
  trail: {
    flexShrink: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
});
