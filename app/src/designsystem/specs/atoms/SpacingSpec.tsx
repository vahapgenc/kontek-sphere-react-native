// Avstånd — mirrors preview/spacing.html.
// The 4px-based spacing scale as a row of bars (token index + px), reading real values
// from src/tokens (spacing).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { spacing } from '../../../tokens';

// token label (the --sp-N index) → px value, pulled from the spacing token.
const UNITS: { n: number; px: number }[] = [
  { n: 1, px: spacing.sp1 },
  { n: 2, px: spacing.sp2 },
  { n: 3, px: spacing.sp3 },
  { n: 4, px: spacing.sp4 },
  { n: 5, px: spacing.sp5 },
  { n: 6, px: spacing.sp6 },
  { n: 8, px: spacing.sp8 },
  { n: 10, px: spacing.sp10 },
  { n: 12, px: spacing.sp12 },
  { n: 16, px: spacing.sp16 },
];

export function SpacingSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      4px-baserad skala för mellanrum och indrag.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>16px skärmmarginal</KText> på varje kant;
      låt luften bära lugnet.
    </KText>
  );

  return (
    <SpecCard title="Avstånd" intro={intro}>
      <SpecSection bare>
        <View style={styles.scale}>
          {UNITS.map((u) => (
            <View key={u.n} style={styles.unit}>
              <View style={[styles.bar, { height: u.px, backgroundColor: c.guide }]} />
              <KText variant="micro" weight="600" color={c.ink} style={styles.v}>{u.n}</KText>
              <KText variant="micro" color={c.ink3}>{u.px}</KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Use the 4px scale (--space-01…13 / --sp-*) for all gaps and padding.',
          'Keep the 16px screen gutter on every edge.',
          'Let whitespace carry the calm — roomy, never cramped.',
        ]}
        donts={[
          'Invent off-scale px values like 13 or 27.',
          'Tighten the gutter below 16px.',
          'Pack a screen densely to avoid scrolling.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  scale: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, flexWrap: 'wrap' },
  unit: { alignItems: 'center' },
  bar: { width: 30, borderRadius: 3 },
  v: { marginTop: 7 },
});
