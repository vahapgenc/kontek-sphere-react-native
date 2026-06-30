// Display-typografi — mirrors preview/type-display.html.
// The two largest grades: the display hero figure and the H1 large-title greeting,
// each with its spec line. Reads display/h1 presets from the theme.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';

export function TypeDisplaySpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      De största graderna — hjältetalet för lön och den stora hälsningen.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Ett display-element per vy</KText>,
      alltid i .tnum.
    </KText>
  );

  return (
    <SpecCard title="Display-typografi" intro={intro}>
      <SpecSection bare>
        <View style={styles.stack}>
          <View>
            <KText variant="display" color={c.ink}>Payroll, finally calm.</KText>
            <KText variant="micro" color={c.ink3} style={styles.spec}>
              Open Sans · Display · 36/1.04 · −0.02em · Bold
            </KText>
          </View>
          <View>
            <KText variant="h1" color={c.ink}>Good morning, Anna</KText>
            <KText variant="micro" color={c.ink3} style={styles.spec}>
              Open Sans · H1 · 28/1.1 · Bold — the screen large-title
            </KText>
          </View>
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Reserve display size for the hero pay figure and the big greeting.',
          'Set figures in .tnum so amounts align.',
          'Keep one display element per screen.',
        ]}
        donts={[
          'Use display size for body copy or repeated headings.',
          'Title Case the greeting.',
          'Stack two hero figures on a single screen.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  stack: { gap: 16 },
  spec: { marginTop: 6, letterSpacing: 0.44 },
});
