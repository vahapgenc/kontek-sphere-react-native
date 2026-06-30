// KSectionLabel — an eyebrow-style section header with an optional right action.
// Mirrors k-ui.jsx <SectionLabel> (the .ds-list__header pattern): an uppercase
// caption label on the left and an optional signature-colored text action on the right.
import React from 'react';
import { Pressable, View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KSectionLabelProps {
  children: string;
  action?: string;
  onAction?: () => void;
  testID?: string;
  style?: ViewStyle;
}

export function KSectionLabel({
  children,
  action,
  onAction,
  testID,
  style,
}: KSectionLabelProps) {
  const theme = useTheme();

  return (
    <View style={[styles.row, style]}>
      <KText variant="caption" weight="600" color={theme.colors.ink3} style={styles.label}>
        {children.toUpperCase()}
      </KText>
      {action ? (
        <Pressable testID={testID} onPress={onAction} accessibilityRole="button">
          <KText variant="bodySm" weight="600" color={theme.colors.signature}>
            {action}
          </KText>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    marginBottom: 10,
  } as ViewStyle,
  label: { letterSpacing: 0.5 },
});
