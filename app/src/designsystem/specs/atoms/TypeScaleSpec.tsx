// Typskala — mirrors preview/type-scale.html.
// The mobile type-scale token table: token name · Aa sample · px/weight, reading real
// sizes from src/tokens (fontSize).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { fontFamily, fontSize } from '../../../tokens';

interface Row {
  tok: string;
  size: number;
  display?: boolean;
  weight: '400' | '600' | '700';
  sample: string;
  spec: string;
  color?: 'ink' | 'ink2' | 'ink3' | 'greenDeep';
  letterSpacing?: number;
}

const ROWS: Row[] = [
  { tok: 'display', size: 32, display: true, weight: '700', sample: 'Aa Open Sans', spec: '36 / 700', letterSpacing: -0.64 },
  { tok: 'h1', size: 27, display: true, weight: '700', sample: 'Aa Open Sans', spec: `${fontSize.h1} / 700`, letterSpacing: -0.54 },
  { tok: 'h2 · h3', size: 22, display: true, weight: '600', sample: 'Aa Open Sans', spec: `${fontSize.h2} · ${fontSize.h3}` },
  { tok: 'title', size: 17, weight: '600', sample: 'Aa Open Sans', spec: `${fontSize.title} / 600` },
  { tok: 'body', size: 16, weight: '400', sample: 'Aa Open Sans regular', spec: `${fontSize.body} / 400` },
  { tok: 'body-sm', size: 15, weight: '400', sample: 'Aa Open Sans small', spec: `${fontSize.bodySm} / 400`, color: 'ink2' },
  { tok: 'caption', size: 13, weight: '400', sample: 'Aa Open Sans caption', spec: `${fontSize.caption} / 400`, color: 'ink3' },
  { tok: 'eyebrow', size: 12, weight: '600', sample: 'Eyebrow', spec: `${fontSize.eyebrow} / 600`, color: 'greenDeep', letterSpacing: 0.96 },
];

export function TypeScaleSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const colorOf = (k?: Row['color']) =>
    k === 'ink2' ? c.ink2 : k === 'ink3' ? c.ink3 : k === 'greenDeep' ? c.greenDeep : c.ink;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Storleksstegen för text, finjusterade för telefon.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Brödtext på 16px</KText> så iOS aldrig
      zoomar ett fokuserat fält.
    </KText>
  );

  return (
    <SpecCard title="Typskala" intro={intro}>
      <SpecSection bare>
        <View style={styles.table}>
          {ROWS.map((r, i) => (
            <View
              key={r.tok}
              style={[styles.tr, { borderBottomColor: c.line }, i === ROWS.length - 1 && styles.last]}
            >
              <KText variant="caption" color={c.ink3} style={styles.tok}>{r.tok}</KText>
              <KText
                style={[
                  styles.samp,
                  {
                    fontFamily: r.weight === '700'
                      ? fontFamily.bold : r.weight === '600' ? fontFamily.semibold : fontFamily.regular,
                    fontSize: r.size,
                    color: colorOf(r.color),
                    letterSpacing: r.letterSpacing ?? 0,
                  },
                ]}
                weight={r.weight}
              >
                {r.sample}
              </KText>
              <KText variant="micro" color={c.ink3} style={styles.px}>{r.spec}</KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Pull every size from the mobile scale token (--t-display … --t-micro).',
          'Keep body at 16px so iOS never zoom-focuses a field.',
          'Reserve --t-micro (11px) for badges and tab labels only.',
        ]}
        donts={[
          'Hard-code px sizes outside the scale.',
          'Drop below 11px anywhere.',
          'Invent a size between steps — pick the nearest token.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  table: { width: '100%' },
  tr: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
  },
  last: { borderBottomWidth: 0 },
  tok: { width: 80 },
  samp: { flex: 1 },
  px: { width: 64, textAlign: 'right' },
});
