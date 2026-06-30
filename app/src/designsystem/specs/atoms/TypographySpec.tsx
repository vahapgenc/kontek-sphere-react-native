// Typografi — mirrors preview/typography.html.
// Open Sans showcase (Ag + weights + glyphs), about, font features, the type scale,
// and the code typeface note. Reads font tokens from src/tokens.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { fontFamily } from '../../../tokens';

const WEIGHTS: { name: string; num: string; weight: '400' | '500' | '600' | '700' }[] = [
  { name: 'Regular', num: 'Font weight: 400', weight: '400' },
  { name: 'Medium', num: 'Font weight: 500', weight: '500' },
  { name: 'Semibold', num: 'Font weight: 600', weight: '600' },
  { name: 'Bold', num: 'Font weight: 700', weight: '700' },
];

const FEATURES: { tag: string; desc: string }[] = [
  { tag: 'liga', desc: 'Standard Ligatures' },
  { tag: 'kern', desc: 'Kerning' },
  { tag: 'tnum', desc: 'Tabular Figures' },
  { tag: 'pnum', desc: 'Proportional Figures' },
  { tag: 'lnum', desc: 'Lining Figures' },
  { tag: 'onum', desc: 'Oldstyle Figures' },
  { tag: 'frac', desc: 'Fractions' },
  { tag: 'numr', desc: 'Numerators' },
  { tag: 'dnom', desc: 'Denominators' },
  { tag: 'sups', desc: 'Superscript' },
  { tag: 'subs', desc: 'Subscript' },
  { tag: 'sinf', desc: 'Scientific Inferiors' },
  { tag: 'ordn', desc: 'Ordinals' },
  { tag: 'case', desc: 'Case-Sensitive Forms' },
  { tag: 'zero', desc: 'Slashed Zero' },
  { tag: 'aalt', desc: 'Access All Alternates' },
];

interface ScaleStep {
  size: number;
  samp: string;
  spec: string;
}

const SCALE: ScaleStep[] = [
  { size: 34, samp: 'Display 3xl', spec: '36px · lh 56 · ls −0.022em' },
  { size: 24, samp: 'Headline 2xl', spec: '24px · lh 36 · ls −0.019em' },
  { size: 20, samp: 'Title xl', spec: '20px · lh 32 · ls −0.017em' },
  { size: 16, samp: 'Heading lg', spec: '16px · lh 24 · ls −0.011em' },
  { size: 14, samp: 'Body md', spec: '14px · lh 20 · ls −0.006em' },
  { size: 12, samp: 'Caption sm', spec: '12px · lh 20 · ls 0em' },
  { size: 11, samp: 'Helper xs', spec: '11px · lh 16 · ls 0.005em' },
];

const WEIGHT_COLS: ('400' | '500' | '600' | '700')[] = ['400', '500', '600', '700'];

export function TypographySpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Kontek använder ett enda noga avstämt typsnitt på alla ytor — Open Sans i vikterna
      400/500/600/700. Sidan dokumenterar typfamiljen, hela skalan, vikterna och OpenType-funktioner,
      med tillgänglighet först.
    </KText>
  );

  return (
    <SpecCard title="Typografi" intro={intro}>
      <SpecSection title="Open Sans" frame="default">
        <View style={styles.agWrap}>
          <KText style={[styles.ag, { color: c.ink }]}>
            A
            <KText style={[styles.ag, { color: c.guide }]}>g</KText>
          </KText>
        </View>
        <View style={styles.weights}>
          {WEIGHTS.map((w) => (
            <View key={w.name} style={[styles.wrow, { borderTopColor: c.line }]}>
              <KText weight={w.weight} style={[styles.aa, { color: c.ink }]}>Aa</KText>
              <View style={styles.flex1}>
                <KText variant="bodySm" weight="600" color={c.ink}>{w.name}</KText>
                <KText variant="caption" color={c.ink3}>{w.num}</KText>
              </View>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection title="Glyphs" bare>
        <View style={styles.glyphs}>
          <KText style={[styles.glyphRow, { color: c.ink }]}>ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅÖÄ</KText>
          <KText style={[styles.glyphRow, { color: c.ink }]}>abcdefghijklmnopqrstuvwxyzæøåöä</KText>
          <KText style={[styles.glyphRow, { color: c.ink }]}>0123456789 !@#$%^&*()</KText>
        </View>
      </SpecSection>

      <SpecSection title="About Open Sans" bare>
        <View style={styles.about}>
          <KText variant="bodySm" color={c.ink2} style={styles.aboutP}>
            Open Sans is a humanist sans-serif typeface designed by Steve Matteson and commissioned
            by Google. It was drawn for excellent legibility across print, web and mobile interfaces,
            with an upright stress, open apertures and a neutral yet friendly tone — exactly the calm,
            software-grade register Kontek aims for.
          </KText>
          <KText variant="bodySm" color={c.ink2} style={styles.aboutP}>
            It carries a generous x-height and clearly differentiated letterforms, making dense payroll
            tables and long form labels easy to scan. The family ships in a continuous weight axis from
            Light to Extrabold plus matching italics, and includes tabular figures and fractions for
            financial data.
          </KText>
          <KText variant="bodySm" color={c.ink2} style={styles.aboutP}>
            Open Sans is released under the Apache License, Version 2.0, and is freely available via
            fonts.google.com/specimen/Open+Sans.
          </KText>
        </View>
      </SpecSection>

      <SpecSection title="Font features" frame="default">
        <View style={styles.features}>
          {FEATURES.map((f) => (
            <View key={f.tag} style={styles.feat}>
              <View style={[styles.tag, { backgroundColor: c.ground, borderRadius: theme.radii.sm }]}>
                <KText variant="caption" weight="600" color={c.onDark} style={styles.tagText}>{f.tag}</KText>
              </View>
              <KText variant="bodySm" color={c.ink}>{f.desc}</KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection title="Type scale" frame="col">
        {SCALE.map((step) => (
          <View key={step.samp} style={[styles.scaleBlock, { borderTopColor: c.line }]}>
            <KText variant="caption" weight="600" color={c.greenDeep} style={styles.scaleSpec}>{step.spec}</KText>
            <View style={styles.scaleGrid}>
              {WEIGHT_COLS.map((wc) => (
                <View key={wc} style={styles.scaleCell}>
                  <KText weight={wc} style={{ fontSize: step.size, color: c.ink, lineHeight: step.size * 1.25 }}>
                    {step.samp}
                  </KText>
                  <KText variant="caption" weight="600" color={c.ink} style={styles.scaleWname}>
                    {wc === '400' ? 'Regular' : wc === '500' ? 'Medium' : wc === '600' ? 'Semibold' : 'Bold'}
                  </KText>
                </View>
              ))}
            </View>
          </View>
        ))}
      </SpecSection>

      <SpecSection title="The code typeface" bare>
        <KText style={[styles.code, { fontFamily: fontFamily.mono, color: c.ink }]}>
          For code, pre-formatted text and user input contexts, Kontek uses the system monospace
          stack: SFMono-Regular, ui-monospace, JetBrains Mono, Menlo, monospace. This avoids loading
          an additional web font while ensuring a high-quality monospaced experience across platforms.
        </KText>
      </SpecSection>

      <DosDonts
        dos={[
          'Build hierarchy from size and weight in the one typeface — Open Sans, weights 400/500/600/700.',
          'Sentence case everywhere — a capital first letter, the rest lower-case (eyebrows and labels included).',
          'Give money and aligned figures .tnum (tabular figures).',
        ]}
        donts={[
          "Set any text in all-caps or Title Case — sentence case only (a person's initials are the one exception).",
          'Add a second typeface, or go below the scale — 11px is the floor, micro labels only.',
          'Set sheet / flow-step headings bold (700) — those are semibold (600).',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  agWrap: { flexBasis: 160, flexGrow: 1, alignItems: 'flex-start' },
  ag: { fontFamily: fontFamily.bold, fontSize: 120, lineHeight: 118, letterSpacing: -4 },
  weights: { flexBasis: 200, flexGrow: 1, gap: 0 },
  wrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  aa: { fontFamily: fontFamily.regular, fontSize: 30, width: 50 },
  flex1: { flex: 1 },
  glyphs: { gap: 8 },
  glyphRow: { fontFamily: fontFamily.regular, fontSize: 24, lineHeight: 34 },
  about: { gap: 14 },
  aboutP: { lineHeight: 24 },
  features: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 48, rowGap: 14 },
  feat: { flexDirection: 'row', alignItems: 'center', gap: 12, flexBasis: 200, flexGrow: 1 },
  tag: {
    minWidth: 52,
    height: 28,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: { letterSpacing: 0 },
  scaleBlock: { borderTopWidth: 1, paddingTop: 18, gap: 14 },
  scaleSpec: {},
  scaleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 24 },
  scaleCell: { flexBasis: 120, flexGrow: 1, minWidth: 110 },
  scaleWname: { marginTop: 10 },
  code: { fontSize: 13, lineHeight: 22 },
});
