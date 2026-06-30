// Illustrationer — mirrors preview/illustrations.html.
// Pure-documentation atom: style principles, placeholder formats, and a swatch row.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Rect, Circle, Path } from 'react-native-svg';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';

interface Principle {
  label: string;
  text: string;
}

const PRINCIPLES: Principle[] = [
  { label: 'Palett', text: 'Sval och avtonad — bygg på systemets gröna toner.' },
  { label: 'Form', text: 'Geometrisk, ren linjeföring i samma 1,75px-stil som ikonerna.' },
  { label: 'Yta', text: 'Matt och platt. Inga gradienter, skuggor eller fotorealism.' },
  { label: 'Roll', text: 'Tomlägen, onboarding och bekräftelser — inte utfyllnad.' },
];

interface Tile {
  cap: string;
  size: string;
  glyph: 'spot' | 'empty' | 'onboarding';
}

const TILES: Tile[] = [
  { cap: 'Spot', size: '120×120', glyph: 'spot' },
  { cap: 'Tomläge', size: '240×180', glyph: 'empty' },
  { cap: 'Onboarding', size: '320×240', glyph: 'onboarding' },
];

function TileGlyph({ glyph, color }: { glyph: Tile['glyph']; color: string }) {
  const p = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <Svg width={30} height={30} viewBox="0 0 24 24" opacity={0.7}>
      {glyph === 'spot' && (
        <>
          <Rect width={18} height={18} x={3} y={3} rx={2} {...p} />
          <Circle cx={9} cy={9} r={2} {...p} />
          <Path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" {...p} />
        </>
      )}
      {glyph === 'empty' && (
        <>
          <Path d="M5 3a2 2 0 0 0-2 2" {...p} />
          <Path d="M19 3a2 2 0 0 1 2 2" {...p} />
          <Path d="M21 19a2 2 0 0 1-2 2" {...p} />
          <Path d="M5 21a2 2 0 0 1-2-2" {...p} />
          <Path d="M9 3h1M9 21h1M14 3h1M14 21h1M3 9v1M21 9v1M3 14v1M21 14v1" {...p} />
        </>
      )}
      {glyph === 'onboarding' && (
        <>
          <Path d="M12 2v4" {...p} />
          <Path d="m16.2 7.8 2.9-2.9" {...p} />
          <Path d="M18 12h4" {...p} />
          <Path d="m16.2 16.2 2.9 2.9" {...p} />
          <Path d="M12 18v4" {...p} />
          <Path d="m4.9 19.1 2.9-2.9" {...p} />
          <Path d="M2 12h4" {...p} />
          <Path d="m4.9 4.9 2.9 2.9" {...p} />
        </>
      )}
    </Svg>
  );
}

export function IllustrationsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const swatches = [c.signature, c.guide, c.green, c.greenSoft, c.mutedSurface];

  return (
    <SpecCard
      title="Illustrationer"
      intro="Sparsam, geometrisk och matt stil ur varumärkespaletten. Konst förankrar ett tomt läge — sedan träder den åt sidan."
    >
      <SpecSection
        title="Style"
        description="Fyra hållningar definierar stilen — i samma geometriska, matta uttryck som ikonerna."
        frame="col"
      >
        <View style={styles.princip}>
          {PRINCIPLES.map((pr, i, arr) => (
            <View
              key={pr.label}
              style={[
                styles.prow,
                { borderBottomColor: c.line2 },
                i === arr.length - 1 && styles.prowLast,
              ]}
            >
              <KText variant="caption" weight="600" color={c.ink} style={styles.pLabel}>
                {pr.label}
              </KText>
              <KText variant="caption" color={c.ink2} style={styles.flex1}>
                {pr.text}
              </KText>
            </View>
          ))}
        </View>
        <View style={styles.sw}>
          {swatches.map((bg, i) => (
            <View key={i} style={[styles.swatch, { backgroundColor: bg }]} />
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="Formats & placements"
        description="Tre återkommande format. Riktiga tillgångar (SVG) läggs in här när de finns — platshållarna nedan visar storlek och proportion."
        bare
      >
        <View style={styles.tiles}>
          {TILES.map((t) => (
            <View
              key={t.cap}
              style={[styles.tile, { backgroundColor: c.greenSoft, borderColor: c.greenLine }]}
            >
              <TileGlyph glyph={t.glyph} color={c.greenDeep} />
              <KText variant="caption" weight="600" color={c.greenDeep}>
                {t.cap}
              </KText>
              <KText variant="micro" color={c.ink3}>
                {t.size}
              </KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection bare>
        <View style={[styles.note, { backgroundColor: c.surface2, borderRadius: theme.radii.sm }]}>
          <KText variant="caption" color={c.ink3} style={styles.noteText}>
            Inga slutgiltiga illustrationer levererades. Lägg riktiga SVG-tillgångar i{' '}
            <KText variant="caption" weight="600" color={c.ink}>assets/illustrations/</KText>{' '}
            och ersätt platshållarna ovan — håll dem inom paletten och den matta, geometriska stilen.
          </KText>
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Keep illustration sparse, geometric and matte.',
          'Draw from the brand palette only.',
          'Use art to anchor an empty state, then get out of the way.',
        ]}
        donts={[
          'Use glossy gradients or rainbow fills.',
          'Crowd a screen with decorative art — content first.',
          'Mix illustration styles within one flow.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  princip: { width: '100%' },
  prow: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 11,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  prowLast: { borderBottomWidth: 0 },
  pLabel: { minWidth: 90 },
  flex1: { flex: 1 },
  sw: { flexDirection: 'row', gap: 8, marginTop: 4 },
  swatch: { width: 26, height: 26, borderRadius: 6 },
  tiles: { flexDirection: 'row', gap: 16, flexWrap: 'wrap' },
  tile: {
    flexGrow: 1,
    flexBasis: 120,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderRadius: 14,
    aspectRatio: 4 / 3,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  note: { paddingVertical: 13, paddingHorizontal: 15 },
  noteText: { lineHeight: 21 },
});
