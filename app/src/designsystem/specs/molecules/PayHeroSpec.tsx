// Lön-/hjältekort — mirrors preview/pay-hero.html.
// Soft-mint hero treatment, never a dark fill. Forest text, --green-deep eyebrow,
// tabular display figure. Demos use the real KPayHero. Anatomy + dos & don'ts.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KPayHero } from '../../../components';
import { useTheme } from '../../../theme';

export function PayHeroSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Löne- och hjältekort använder den{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>mjuka mint-behandlingen</KText>, aldrig
      en mörk fyllning. Mörk skogstext, talet i .tnum.
    </KText>
  );

  return (
    <SpecCard title="Lön-/hjältekort" intro={intro}>
      <SpecSection
        title="The pay / hero card"
        description="Pay heroes — the Home upcoming-pay, the Upcoming screen, the payslip detail — use the soft-mint treatment, never a dark fill. Dark forest text sits on a gentle mint gradient; the figure is .tnum at display size. Home uses a 24px top radius, detail panels 20px."
        frame="col"
      >
        <KPayHero
          eyebrow="NÄSTA LÖN"
          amount="28 450 kr"
          subtitle="Utbetalas 25 juni · Swedbank ·••• 8842"
          trailing={
            <View style={styles.pillRow}>
              <Pill label="Klar för utbetalning" />
              <Pill label="Inga avvikelser" />
            </View>
          }
          style={styles.home}
        />
        <KPayHero
          eyebrow="LÖNESPECIFIKATION · MAJ"
          amount="26 980 kr"
          subtitle="Betald 25 maj"
          style={styles.detail}
        />
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Fill', value: '--mint-grad (145°)' },
            { name: 'Text', value: '--signature (forest)' },
            { name: 'Eyebrow', value: '--green-deep' },
            { name: 'Subtitle', value: '--ink-3' },
            { name: 'Figure', value: '.tnum --t-display' },
            { name: 'Border', value: '--mint-line' },
            { name: 'Shadow', value: '--mint-shadow' },
            { name: 'Radius', value: '24 home · 20 detail' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <KPayHero eyebrow="NÄSTA LÖN" amount="28 450 kr" style={styles.exHero} />
            ),
            caption: 'Soft mint, forest text, tabular figure — calm and legible.',
          },
          dont: {
            stage: (
              <View style={[styles.darkHero, { backgroundColor: c.signature }]}>
                <KText variant="micro" weight="700" color={c.statusBadge}>NÄSTA LÖN</KText>
                <KText variant="h2" weight="700" color="#fff" style={styles.darkFig}>28 450 kr</KText>
              </View>
            ),
            caption: 'A dark forest fill makes the pay figure shout — too heavy for the hero.',
          },
        }}
        dos={[
          'Use --mint-grad for every pay/hero surface; pair forest text with a --green-deep eyebrow.',
          'Set the figure in .tnum so amounts align column to column.',
          'Make the Home hero sticky and let it dock into the frosted bar on scroll.',
        ]}
        donts={[
          'Fill the hero with dark forest or any solid brand colour.',
          'Use proportional figures for money — they jitter as digits change.',
          'Stack two heroes on one screen; there is one lead figure per view.',
        ]}
      />
    </SpecCard>
  );
}

function Pill({ label }: { label: string }): ReactNode {
  const theme = useTheme();
  return (
    <View style={[styles.pill, { borderRadius: theme.radii.pill }]}>
      <KText variant="micro" weight="600" color={theme.colors.greenDeep}>{label}</KText>
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  home: { width: 320, maxWidth: '100%', borderRadius: 24 },
  detail: { width: 280, maxWidth: '100%' },
  pillRow: { flexDirection: 'row', gap: 8, marginTop: 18, flexWrap: 'wrap' },
  pill: {
    backgroundColor: 'rgba(255,255,255,0.6)',
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  exHero: { width: 180 },
  darkHero: { width: 170, padding: 16, borderRadius: 18 },
  darkFig: { marginTop: 5 },
});
