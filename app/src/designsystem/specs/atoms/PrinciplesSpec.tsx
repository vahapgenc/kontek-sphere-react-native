// Principer — mirrors preview/guides.html.
// Pure-documentation atom: the four foundational principles, each with a green icon tile.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';

type Glyph = 'check' | 'palette' | 'pulse' | 'meaning';

interface Principle {
  glyph: Glyph;
  title: string;
  desc: string;
}

const PRINCIPLES: Principle[] = [
  {
    glyph: 'check',
    title: 'En primär åtgärd per vy',
    desc: 'Endast en knapp bär huvudhandlingen. Stödåtgärder är sekundära, ghost eller transparenta.',
  },
  {
    glyph: 'palette',
    title: 'Färgdisciplin',
    desc: 'Grönt är accent: ikoner, aktiva lägen, godkänn/spara. Rött enbart för destruktivt. Ytor är gröntonat neutrala.',
  },
  {
    glyph: 'pulse',
    title: 'Återhållsam rörelse',
    desc: '120–320ms, mjuk easing. Hover = lyft, navrad = tonfade. Ingen studs, ingen oändlig loop på innehåll.',
  },
  {
    glyph: 'meaning',
    title: 'Mening före utfyllnad',
    desc: 'Konkreta siffror och raka verb. Inga påhittade mått, ingen dekorativ data.',
  },
];

function PrincipleIcon({ glyph, color }: { glyph: Glyph; color: string }) {
  const p = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      {glyph === 'check' && (
        <>
          <Path d="M9 11l3 3L22 4" {...p} />
          <Path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" {...p} />
        </>
      )}
      {glyph === 'palette' && (
        <>
          <Circle cx={13.5} cy={6.5} r={2.5} {...p} />
          <Circle cx={19} cy={17} r={2.5} {...p} />
          <Circle cx={6} cy={12} r={3} {...p} />
        </>
      )}
      {glyph === 'pulse' && <Path d="M3 12h4l3 8 4-16 3 8h4" {...p} />}
      {glyph === 'meaning' && (
        <>
          <Path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" {...p} />
          <Path d="M9 20h6" {...p} />
          <Path d="M12 4v16" {...p} />
        </>
      )}
    </Svg>
  );
}

export function PrinciplesSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Grunden bakom alla mönster: lugnt, kompetent och lätt mänskligt.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Ett tydligt nästa steg per vy</KText>{' '}
      — allt annat ska kännas omhändertaget.
    </KText>
  );

  return (
    <SpecCard title="Principer" intro={intro}>
      <SpecSection
        title="The four principles"
        description="Fyra hållningar som varje skärm vilar på."
        frame="col"
      >
        <View style={styles.princip}>
          {PRINCIPLES.map((pr, i, arr) => (
            <View
              key={pr.title}
              style={[
                styles.prow,
                { borderBottomColor: c.line2 },
                i === arr.length - 1 && styles.prowLast,
              ]}
            >
              <View style={[styles.ic, { backgroundColor: c.greenSoft }]}>
                <PrincipleIcon glyph={pr.glyph} color={c.greenDeep} />
              </View>
              <View style={styles.flex1}>
                <KText variant="bodySm" weight="600" color={c.ink}>
                  {pr.title}
                </KText>
                <KText variant="caption" color={c.ink3} style={styles.desc}>
                  {pr.desc}
                </KText>
              </View>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Keep one clear primary action per screen; everything else secondary or ghost.',
          'Reassure first, then give the specifics.',
          'Let whitespace carry the calm.',
        ]}
        donts={[
          'Compete two primary actions on one screen.',
          'Pad a screen with filler — an empty section is a calm reassurance card, not dummy content.',
          'Bury the one thing that needs the user under chrome.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  princip: { width: '100%' },
  prow: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    alignItems: 'flex-start',
  },
  prowLast: { borderBottomWidth: 0 },
  ic: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  flex1: { flex: 1 },
  desc: { marginTop: 2, lineHeight: 19 },
});
