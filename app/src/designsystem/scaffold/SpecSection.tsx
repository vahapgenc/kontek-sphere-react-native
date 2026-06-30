// SpecSection — mirrors preview/_card.css `.sec` (h2 + p + .frame).
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../../components';
import { Frame, type FrameVariant } from './Frame';

export function SpecSection({
  title,
  description,
  frame = 'default',
  bare,
  children,
}: {
  title?: string;
  description?: string;
  frame?: FrameVariant;
  /** When true, render children directly without the Frame wrapper. */
  bare?: boolean;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={styles.sec}>
      {title ? (
        <KText variant="title" weight="600" style={styles.h2}>
          {title}
        </KText>
      ) : null}
      {description ? (
        <KText variant="caption" color={theme.colors.ink3} style={styles.p}>
          {description}
        </KText>
      ) : null}
      {bare ? children : <Frame variant={frame}>{children}</Frame>}
    </View>
  );
}

const styles = StyleSheet.create({
  sec: { marginBottom: 34 },
  h2: { marginBottom: 4 },
  p: { marginBottom: 16, lineHeight: 20 },
});
