// SpecIntro — mirrors _guidance.css `.dg-intro` (green Swedish lead box).
// Pass plain text, or KText children with bold spans for emphasis.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../../components';

export function SpecIntro({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: theme.colors.greenSoft,
          borderColor: theme.colors.greenLine,
          borderRadius: theme.radii.card,
        },
      ]}
    >
      {typeof children === 'string' ? (
        <KText variant="bodySm" color={theme.colors.ink2} style={styles.text}>
          {children}
        </KText>
      ) : (
        children
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: { borderWidth: 1, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 30 },
  text: { lineHeight: 24 },
});
