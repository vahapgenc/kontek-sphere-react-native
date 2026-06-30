// KSegmentedControl — pill of options. Mirrors .ds-segmented.
// Track: surface-2 bg, 1px line border, r-input radius, 4px inner padding.
// Each seg is 40 tall, flex 1, radius 9. Active seg = surface bg + shadow-xs +
// ink text (semibold); inactive = ink-3 text (medium).
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface SegmentOption {
  label: string;
  value: string;
}

export interface KSegmentedControlProps {
  options: SegmentOption[];
  value: string;
  onChange: (value: string) => void;
  testID?: string;
}

export function KSegmentedControl({
  options,
  value,
  onChange,
  testID,
}: KSegmentedControlProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <View
      testID={testID}
      style={[
        styles.track,
        {
          backgroundColor: c.surface2,
          borderColor: c.line,
          borderRadius: theme.radii.input,
        },
      ]}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            testID={testID ? `${testID}-${opt.value}` : undefined}
            onPress={() => onChange(opt.value)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[
              styles.seg,
              active
                ? [styles.segActive, theme.shadows.xs, { backgroundColor: c.surface }]
                : null,
            ]}
          >
            <KText
              variant="bodySm"
              weight={active ? '600' : '500'}
              color={active ? c.ink : c.ink3}
              numberOfLines={1}
            >
              {opt.label}
            </KText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    width: '100%',
    padding: 4,
    gap: 3,
    borderWidth: 1,
  },
  seg: {
    flex: 1,
    height: 40,
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 7,
  },
  segActive: {},
});
