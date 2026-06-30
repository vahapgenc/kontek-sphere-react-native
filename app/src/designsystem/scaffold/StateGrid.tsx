// StateCell — mirrors preview/_card.css `.state` + `.lbl`.
// A labelled demo slot (default / hover / pressed / focus / disabled / error).
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../../components';

export function StateCell({
  label,
  center,
  children,
}: {
  label: string;
  center?: boolean;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={[styles.state, center && styles.center]}>
      {children}
      <KText variant="micro" color={theme.colors.ink3}>
        {label}
      </KText>
    </View>
  );
}

const styles = StyleSheet.create({
  state: { flexDirection: 'column', alignItems: 'flex-start', gap: 10 },
  center: { alignItems: 'center' },
});
