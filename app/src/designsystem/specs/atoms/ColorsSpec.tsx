// Färger — mirrors preview/colors.html.
// The full Kontek palette grouped by role (surface hierarchy, primary/secondary/neutral
// scales), each row a swatch + name + description + hex, reading real values from src/tokens.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

interface Swatch {
  bg: string;
  name: string;
  desc: string;
  hex: string;
  /** Render a check-rounded glyph inside the swatch (the Kontek-green icon tile). */
  glyph?: boolean;
}

const SURFACE: Swatch[] = [
  { bg: '#203B3C', name: 'Brand Signature — Navigation', desc: 'Nav bar + sidebar background', hex: '#203B3C' },
  { bg: '#053F22', name: 'Kontek Green — Icon background', desc: 'Icon tiles & avatars on light surfaces', hex: '#053F22', glyph: true },
  { bg: '#ECEFF3', name: 'Cloud — Canvas', desc: 'Default page background — softer than white for 8-hour workdays', hex: '#ECEFF3' },
  { bg: '#FFFFFF', name: 'Pure White — Elevated', desc: 'Data tables, input forms, modals, dropdowns', hex: '#FFFFFF' },
];

const PRIMARY: Swatch[] = [
  { bg: '#203B3C', name: 'Brand Signature', desc: 'Nav bar + sidebar background, primary CTAs, active tab text (12:1 AAA)', hex: '#203B3C' },
  { bg: '#395F61', name: 'The Guide', desc: 'Sub-menu items, inactive tabs (7.0:1 AAA)', hex: '#395F61' },
  { bg: '#B8C9CA', name: 'Muted Surface', desc: 'Card borders, matte accents, secondary text on dark', hex: '#B8C9CA' },
  { bg: '#122121', name: 'Deepest Ground', desc: 'Pressed/active button state', hex: '#122121' },
];

const SECONDARY: Swatch[] = [
  { bg: '#9DDFB5', name: 'Status Badge', desc: 'Secondary CTA fill · Status pill background · Nav bar resting text (8.0:1 AAA on Brand Signature)', hex: '#9DDFB5' },
  { bg: '#61BC8F', name: 'Interaction', desc: 'Toggle/checkbox fill · Secondary CTA pressed state — pair with Brand Signature border', hex: '#61BC8F' },
  { bg: '#E6F7ED', name: 'Celebration', desc: 'Row highlight for successfully processed payroll', hex: '#E6F7ED' },
];

const NEUTRAL: Swatch[] = [
  { bg: '#0F1112', name: 'Obsidian', desc: 'Body text, payroll numbers (18.9:1 AAA)', hex: '#0F1112' },
  { bg: '#445C5E', name: 'Charcoal Teal', desc: 'Table headers, subtitles (7.2:1 AAA)', hex: '#445C5E' },
  { bg: '#475669', name: 'Slate Grey', desc: 'Breadcrumbs, inactive icons (7.5:1 AAA)', hex: '#475669' },
  { bg: '#66777A', name: 'Soft Steel', desc: 'Search bar borders, disabled labels', hex: '#66777A' },
  { bg: '#A3B4B6', name: 'Silver Mist', desc: 'Disabled UI states (non-text, WCAG exempt)', hex: '#A3B4B6' },
  { bg: '#DDE5E6', name: 'Stone', desc: 'Table row dividers, panel borders', hex: '#DDE5E6' },
];

function SwatchRow({ item }: { item: Swatch }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View
      style={[
        styles.item,
        { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card },
        theme.shadows.sm,
      ]}
    >
      <View style={[styles.sw, { backgroundColor: item.bg }]}>
        {item.glyph ? <KIcon name="checkCirc" size={24} color="#fff" /> : null}
      </View>
      <View style={styles.txt}>
        <KText variant="title" weight="700" color={c.ink}>
          {item.name}
        </KText>
        <KText variant="bodySm" color={c.ink3} style={styles.desc}>
          {item.desc}
        </KText>
      </View>
      <View style={[styles.hex, { backgroundColor: c.surface2, borderRadius: theme.radii.sm }]}>
        <KText variant="caption" weight="600" color={c.ink2}>
          {item.hex}
        </KText>
      </View>
    </View>
  );
}

export function ColorsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Hela Kontek-paletten och vad varje färg är till för. Mest{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>gröntonat neutralt</KText>; grönt
      markerar positiva åtgärder och aktiva lägen, rött enbart för destruktivt.
    </KText>
  );

  const sections: { title: string; rows: Swatch[] }[] = [
    { title: 'Surface hierarchy', rows: SURFACE },
    { title: 'Primary scale — dark teal', rows: PRIMARY },
    { title: 'Secondary scale — Kontek green', rows: SECONDARY },
    { title: 'Neutral scale', rows: NEUTRAL },
  ];

  return (
    <SpecCard title="Färger" intro={intro}>
      {sections.map((s) => (
        <SpecSection key={s.title} title={s.title} bare>
          <View style={styles.list}>
            {s.rows.map((row) => (
              <SwatchRow key={row.name} item={row} />
            ))}
          </View>
        </SpecSection>
      ))}

      <DosDonts
        dos={[
          'Reach for the named token for each role — most surfaces stay a quiet, green-tinted neutral.',
          'Mark positive / go-ahead actions, active states, icons and progress with green.',
          'Sit avatars on --guide and keep every fill single-colour.',
        ]}
        donts={[
          'Use red for anything but destructive / irreversible actions.',
          'Invent a new hex — derive a missing shade with color-mix() from an existing token.',
          'Add decorative gradients or multi-colour avatar fills.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  list: { gap: 12 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    borderWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  sw: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(18,33,33,0.10)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: { flex: 1, minWidth: 0 },
  desc: { marginTop: 3, lineHeight: 20 },
  hex: { paddingVertical: 7, paddingHorizontal: 12 },
});
