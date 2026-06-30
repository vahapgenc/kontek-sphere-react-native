// KSnackbar — transient bottom toast with an optional action (e.g. Optimistic undo).
// Dark forest surface, white text, mint action label. Presentational: parent controls
// `visible` and the dismiss timer.
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KSnackbarProps {
  visible: boolean;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  testID?: string;
}

export function KSnackbar({ visible, message, actionLabel, onAction, testID }: KSnackbarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: visible ? 1 : 0,
      duration: theme.duration.slow,
      useNativeDriver: true,
    }).start();
  }, [visible, anim, theme.duration.slow]);

  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="box-none"
      style={[
        styles.wrap,
        {
          bottom: insets.bottom + 16,
          opacity: anim,
          transform: [
            { translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [24, 0] }) },
          ],
        },
      ]}
    >
      <View
        testID={testID}
        style={[styles.bar, { backgroundColor: theme.colors.forest, borderRadius: theme.radii.card }]}
      >
        <KText variant="bodySm" color={theme.colors.onDark} style={styles.msg}>
          {message}
        </KText>
        {actionLabel ? (
          <Pressable
            testID={testID ? `${testID}-action` : undefined}
            onPress={onAction}
            hitSlop={8}
          >
            <KText variant="bodySm" weight="600" color={theme.colors.shellCta}>
              {actionLabel}
            </KText>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 16, right: 16, alignItems: 'center' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    width: '100%',
  },
  msg: { flex: 1 },
});
