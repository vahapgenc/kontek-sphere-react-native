// KSkeleton — a shimmer/placeholder block. Mirrors .ds-skeleton (mobile.css §8).
// Uses the surface-2 fill; the CSS sweep shimmer is approximated in RN with a
// looping opacity pulse (and frozen when reduce-motion is on).
import React, { useEffect, useRef } from 'react';
import { Animated, AccessibilityInfo, StyleSheet, type DimensionValue } from 'react-native';
import { useTheme } from '../../theme';

export interface KSkeletonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  radius?: number;
  testID?: string;
}

export function KSkeleton({ width = '100%', height = 13, radius, testID }: KSkeletonProps) {
  const theme = useTheme();
  const opacity = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    let cancelled = false;
    AccessibilityInfo.isReduceMotionEnabled().then((reduce) => {
      if (cancelled || reduce) return;
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.6,
            duration: 700,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    });
    return () => {
      cancelled = true;
    };
  }, [opacity]);

  return (
    <Animated.View
      testID={testID}
      accessibilityRole="none"
      style={[
        styles.base,
        {
          width,
          height,
          borderRadius: radius ?? theme.radii.sm,
          backgroundColor: theme.colors.surface2,
          opacity,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  base: { overflow: 'hidden' },
});
