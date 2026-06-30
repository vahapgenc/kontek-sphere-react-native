// SpecCard — the page wrapper for one design-system entry.
// Mirrors a preview/*.html body: optional dg-h1 title + green intro, then sections.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../../components';
import { SpecIntro } from './SpecIntro';

export function SpecCard({
  title,
  intro,
  children,
}: {
  title?: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View>
      {title ? (
        // dg-h1: display family, regular weight, h1 size.
        <KText
          variant="h1"
          weight="400"
          color={theme.colors.ink}
          style={styles.title}
        >
          {title}
        </KText>
      ) : null}
      {intro ? <SpecIntro>{intro}</SpecIntro> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  title: { marginBottom: 12, lineHeight: 30, letterSpacing: -0.28 },
});
