// Corner radius — mirrors preview/radii.html.
// One box per radius token (sm / button·input / card / panel / sheet / pill), reading
// real values from src/tokens (radii).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { radii } from '../../../tokens';

interface Item {
  name: string;
  val: string;
  radius: number;
  /** sheet = top corners only; pill = narrower box. */
  variant?: 'sheet' | 'pill';
}

const ITEMS: Item[] = [
  { name: 'sm', val: `${radii.sm}px`, radius: radii.sm },
  { name: 'button · input', val: `${radii.button}px`, radius: radii.button },
  { name: 'card', val: `${radii.card}px`, radius: radii.card },
  { name: 'panel', val: `${radii.panel}px`, radius: radii.panel },
  { name: 'sheet', val: `${radii.sheet}px top`, radius: radii.sheet, variant: 'sheet' },
  { name: 'pill', val: '999px', radius: radii.pill, variant: 'pill' },
];

export function RadiiSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Mjuka, aldrig skarpa hörn.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>12</KText> knapp/fält,{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>16</KText> kort,{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>20</KText> panel (standardkort),{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>24</KText> ark.
    </KText>
  );

  return (
    <SpecCard title="Corner radius" intro={intro}>
      <SpecSection bare>
        <View style={styles.row}>
          {ITEMS.map((it) => (
            <View key={it.name} style={styles.item}>
              <View
                style={[
                  styles.box,
                  {
                    backgroundColor: c.greenSoft,
                    borderColor: c.greenLine,
                    width: it.variant === 'pill' ? 64 : 88,
                  },
                  it.variant === 'sheet'
                    ? { borderTopLeftRadius: it.radius, borderTopRightRadius: it.radius }
                    : { borderRadius: it.radius },
                ]}
              />
              <KText variant="micro" weight="600" color={c.ink} style={styles.name}>{it.name}</KText>
              <KText variant="micro" color={c.ink3}>{it.val}</KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Use the radius tokens — 12 button/input, 16 card, 20 panel (the default card), 24 sheet.',
          'Keep corners gentle and consistent across a surface type.',
          'Use the pill radius (999) for chips, switches and avatars.',
        ]}
        donts={[
          'Mix radii on the same surface type.',
          'Go sharp (square) corners — the brand is gentle, never sharp.',
          'Over-round a card into a near-pill.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end' },
  item: { alignItems: 'center' },
  box: { height: 64, borderWidth: 1.5 },
  name: { marginTop: 8 },
});
