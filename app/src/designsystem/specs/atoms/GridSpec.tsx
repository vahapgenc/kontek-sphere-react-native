// Rutnät — mirrors preview/grid.html.
// A 12-column layout grid (16px gutter), common column spans, and a breakpoint table.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';

const GUTTER = 16;

function TwelveCol() {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.grid12}>
      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
        <View
          key={n}
          style={[styles.col, { backgroundColor: c.greenSoft, borderColor: c.greenLine, borderRadius: theme.radii.sm }]}
        >
          <KText variant="micro" weight="600" color={c.greenDeep}>{n}</KText>
        </View>
      ))}
    </View>
  );
}

function Blk({ span, label, bg, ink }: { span: number; label: string; bg: string; ink: string }) {
  const theme = useTheme();
  // 12-col flex emulation: flexGrow proportional to span, equal gutters.
  return (
    <View style={[styles.blk, { flexGrow: span, flexBasis: 0, backgroundColor: bg, borderRadius: theme.radii.sm }]}>
      <KText variant="caption" weight="600" color={ink}>{label}</KText>
    </View>
  );
}

interface BpRow {
  win: string;
  width: string;
  cols: string;
  margin: string;
  gutter: string;
}

const BP: BpRow[] = [
  { win: 'Liten desktop', width: '1024–1280px', cols: '12', margin: '24px', gutter: '24px' },
  { win: 'Standard', width: '1280–1440px', cols: '12', margin: '32px', gutter: '24px' },
  { win: 'Stor', width: '1440–1920px', cols: '12', margin: '40px', gutter: '24px' },
  { win: 'Bred', width: '> 1920px', cols: '12', margin: 'auto', gutter: '24px · max 1680px' },
];

export function GridSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      12-kolumners layoutrutnät med 16px mellanrum. Gruppera element med{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>flex/grid och gap</KText>, aldrig lösa
      marginaler.
    </KText>
  );

  return (
    <SpecCard title="Rutnät" intro={intro}>
      <SpecSection
        title="12-column grid"
        description="Allt innehåll vilar på ett 12-kolumners rutnät. Tolv kolumner delar jämnt i 2, 3, 4 och 6 — vilket täcker de flesta uppställningar. Standardränna 16px; marginalerna växer med fönsterbredden."
        frame="default"
      >
        <TwelveCol />
      </SpecSection>

      <SpecSection
        title="Common layouts"
        description="Spann uttrycks i kolumner. Sidopanel + innehåll (3 / 9), tre kort (4 + 4 + 4) eller halvor (6 / 6)."
        frame="col"
      >
        <View style={styles.layout}>
          <Blk span={3} label="3" bg={c.signature} ink="#fff" />
          <Blk span={9} label="9" bg={c.surface2} ink={c.ink2} />
        </View>
        <View style={styles.layout}>
          <Blk span={4} label="4" bg={c.surface2} ink={c.ink2} />
          <Blk span={4} label="4" bg={c.surface2} ink={c.ink2} />
          <Blk span={4} label="4" bg={c.surface2} ink={c.ink2} />
        </View>
        <View style={styles.layout}>
          <Blk span={6} label="6" bg={c.greenSoft} ink={c.greenDeep} />
          <Blk span={6} label="6" bg={c.greenSoft} ink={c.greenDeep} />
        </View>
      </SpecSection>

      <SpecSection
        title="Breakpoints"
        description="Kontek Next är en desktop-applikation. Kolumnantalet är alltid 12; marginal och ränna växer med fönstret. Innehållsytan ligger till höger om sidonavigeringen (280px). Över 1920px centreras innehållet i en maxbredd."
        frame="default"
      >
        <View style={styles.bpTable}>
          <View style={[styles.bpRow, styles.bpHead, { borderBottomColor: c.line2 }]}>
            {['Fönster', 'Bredd', 'Kol.', 'Marginal', 'Ränna'].map((h) => (
              <KText key={h} variant="micro" weight="700" color={c.ink3} style={styles.bpCell}>{h}</KText>
            ))}
          </View>
          {BP.map((r, i) => (
            <View key={r.win} style={[styles.bpRow, { borderBottomColor: c.line2 }, i === BP.length - 1 && styles.bpLast]}>
              <KText variant="caption" weight="600" color={c.ink} style={styles.bpCell}>{r.win}</KText>
              <KText variant="caption" color={c.ink2} style={styles.bpCell}>{r.width}</KText>
              <KText variant="caption" color={c.ink2} style={styles.bpCell}>{r.cols}</KText>
              <KText variant="caption" color={c.ink2} style={styles.bpCell}>{r.margin}</KText>
              <KText variant="caption" color={c.ink2} style={styles.bpCell}>{r.gutter}</KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Lay out with the 16px gutter and keep the screen gutter on every edge.',
          'Group rows of elements with display:flex/grid + gap.',
          'Let columns collapse to a single column on the narrowest phones.',
        ]}
        donts={[
          'Space siblings with per-element margins — use gap.',
          'Crowd content edge-to-edge; keep the 16px screen gutter.',
          'Mix gutter widths within one screen.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  grid12: { flexDirection: 'row', flexWrap: 'wrap', gap: GUTTER, width: '100%' },
  col: {
    height: 56,
    flexGrow: 1,
    flexBasis: '12%',
    minWidth: 40,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  layout: { flexDirection: 'row', gap: GUTTER, width: '100%' },
  blk: { height: 56, alignItems: 'center', justifyContent: 'center' },
  bpTable: { width: '100%' },
  bpRow: { flexDirection: 'row', paddingVertical: 11, borderBottomWidth: 1, gap: 8 },
  bpHead: {},
  bpLast: { borderBottomWidth: 0 },
  bpCell: { flex: 1 },
});
