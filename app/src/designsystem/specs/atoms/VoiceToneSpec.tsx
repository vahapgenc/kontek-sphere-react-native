// Röst & ton — mirrors preview/voice-tone.html.
// Pure-documentation atom: how the product speaks + a verbs-over-nouns button row.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KButton } from '../../../components';
import { useTheme } from '../../../theme';

type Glyph = 'shield' | 'smile' | 'send' | 'columns';

interface Row {
  glyph: Glyph;
  title: string;
  desc: React.ReactNode;
}

function GlyphSvg({ glyph, color }: { glyph: Glyph; color: string }) {
  const p = {
    fill: 'none' as const,
    stroke: color,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      {glyph === 'shield' && (
        <>
          <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" {...p} />
          <Path d="m9 12 2 2 4-4" {...p} />
        </>
      )}
      {glyph === 'smile' && (
        <>
          <Circle cx={12} cy={12} r={9} {...p} />
          <Path d="M8 14s1.5 2 4 2 4-2 4-2" {...p} />
          <Path d="M9 9h.01M15 9h.01" {...p} />
        </>
      )}
      {glyph === 'send' && <Path d="M3 3l7 18 2.5-7.5L20 11 3 3Z" {...p} />}
      {glyph === 'columns' && <Path d="M4 9h16M4 15h16M10 3 8 21M16 3l-2 18" {...p} />}
    </Svg>
  );
}

export function VoiceToneSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const rows: Row[] = [
    {
      glyph: 'shield',
      title: 'Reassure, then specify',
      desc: '”Lönekörningen är klar för granskning · 32 anställda · inga avvikelser.”',
    },
    {
      glyph: 'smile',
      title: 'Personal, never corporate',
      desc: '”God morgon, Anna.” — a greeting, not a system message.',
    },
    {
      glyph: 'send',
      title: 'Verbs on buttons',
      desc: (
        <KText variant="caption" color={c.ink3} style={styles.desc}>
          An action you take, not a feature name:{' '}
          <KText variant="caption" weight="500" color={c.ink2}>Granska &amp; godkänn</KText>,{' '}
          <KText variant="caption" weight="500" color={c.ink2}>Ny körning</KText>.
        </KText>
      ),
    },
    {
      glyph: 'columns',
      title: 'Concrete numbers',
      desc: 'No hype, no exclamation. Amounts are exact and tabular.',
    },
  ];

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Svenska först, varmt men professionellt, tilltalar dig direkt.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Inled med lugn</KText>, ge sedan
      konkreta tal. Verb på knappar, aldrig substantiv.
    </KText>
  );

  return (
    <SpecCard title="Röst &amp; ton" intro={intro}>
      <SpecSection
        title="How the product speaks"
        description="Swedish-first, warm but professional, addressing the user directly (du / dig). Lead with reassurance, then the specifics. The implicit promise on every screen: your payroll is handled — here is the one thing that needs you."
        frame="col"
      >
        <View style={styles.princip}>
          {rows.map((r, i, arr) => (
            <View
              key={r.title}
              style={[
                styles.prow,
                { borderBottomColor: c.line2 },
                i === arr.length - 1 && styles.prowLast,
              ]}
            >
              <View style={[styles.ic, { backgroundColor: c.greenSoft }]}>
                <GlyphSvg glyph={r.glyph} color={c.greenDeep} />
              </View>
              <View style={styles.flex1}>
                <KText variant="title" weight="600" color={c.ink}>
                  {r.title}
                </KText>
                {typeof r.desc === 'string' ? (
                  <KText variant="caption" color={c.ink3} style={styles.desc}>
                    {r.desc}
                  </KText>
                ) : (
                  r.desc
                )}
              </View>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="Verbs over nouns"
        description="Buttons name the action the user takes."
      >
        <View style={styles.btnrow}>
          <KButton label="Granska & godkänn" variant="primary" />
          <KButton label="Visa detaljer" variant="secondary" />
          <KButton label="Ny körning" variant="secondaryCta" />
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          "Write Swedish, second person (du / dig), sentence case — never all-caps (a person's initials excepted).",
          'Lead with reassurance, then give concrete, tabular specifics.',
          'Put a verb on every button — the action, not the feature name.',
        ]}
        donts={[
          'Use emoji, exclamation hype, all-caps or Title Case.',
          'Label buttons with nouns or feature names.',
          'Sound corporate or system-generated — speak to the person.',
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
  flex1: { flex: 1, minWidth: 0 },
  desc: { marginTop: 2, lineHeight: 19 },
  btnrow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
});
