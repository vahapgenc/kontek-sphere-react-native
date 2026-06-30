// Storlekar — mirrors preview/sizing.html.
// The size scale (square per step) and a semantic-sizes map showing where each step is
// used. Reads real values from src/tokens (sizing).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KIcon } from '../../../components';
import { useTheme } from '../../../theme';
import { sizing } from '../../../tokens';

const SCALE: number[] = [
  sizing.s16,
  sizing.s20,
  sizing.s24,
  sizing.s32,
  sizing.s40,
  sizing.s48,
  sizing.s64,
  sizing.s80,
];

function ScaleSquare({ px }: { px: number }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.su}>
      <View style={[styles.sq, { width: px, height: px, backgroundColor: c.greenSoft, borderColor: c.greenLine }]} />
      <KText variant="micro" weight="600" color={c.ink} style={styles.sqN}>{px}</KText>
      <KText variant="micro" color={c.ink3}>size-{px}</KText>
    </View>
  );
}

export function SizingSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Token-talet är pixelvärdet. Skalan styr bredd och höjd på element;{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>allt interaktivt är minst 48px</KText>.
    </KText>
  );

  return (
    <SpecCard title="Storlekar" intro={intro}>
      <SpecSection
        title="Size scale"
        description="Token-talet motsvarar pixelvärdet. Skalan styr bredd och höjd på element — ikoner, kontroller, avatarer — så att allt landar på samma rytm som spacing-skalan (4px-bas)."
        frame="default"
      >
        <View style={styles.scale}>
          {SCALE.map((px) => (
            <ScaleSquare key={px} px={px} />
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="Semantic sizes"
        description="Var skalsteget används i gränssnittet. Kontroller och inmatningar är 48px; minsta klickyta för pekdon är 48px; ikoner sitter på 20–24px."
        frame="col"
      >
        <MapRow tok="20px" use="Ikon i text och knappar">
          <KIcon name="user" size={20} color={c.signature} strokeWidth={1.75} />
        </MapRow>
        <MapRow tok="24px" use="Ikon i app-bar / tab-bar / fristående">
          <KIcon name="user" size={24} color={c.signature} strokeWidth={1.75} />
        </MapRow>
        <MapRow tok="40px" use="Avatar / ledande ikonruta i listrader">
          <View style={[styles.avatar40, { backgroundColor: c.guide }]}>
            <KText variant="bodySm" weight="600" color="#fff">AL</KText>
          </View>
        </MapRow>
        <MapRow tok="48px" use="Knapp · textfält · select · minsta klickyta">
          <View style={[styles.btn48, { backgroundColor: c.signature, borderRadius: theme.radii.button }]}>
            <KText variant="body" weight="600" color="#fff">Knapp</KText>
          </View>
        </MapRow>
        <MapRow tok="56px" use="FAB · stor primär CTA (--lg)">
          <View style={[styles.fab56, { backgroundColor: c.shellCta }]}>
            <KIcon name="plus" size={24} color={c.shellCtaInk} strokeWidth={2.1} />
          </View>
        </MapRow>
        <MapRow tok="64px" use="Avatar i profilvy">
          <View style={[styles.avatar64, { backgroundColor: c.guide }]}>
            <KText variant="h3" weight="600" color="#fff">AL</KText>
          </View>
        </MapRow>
      </SpecSection>

      <DosDonts
        dos={[
          'Size controls from the height tokens — 48 default, 56 prominent, 40 dense.',
          'Keep every interactive element at least 48px (--tap-min).',
          'Pick widths and heights from the sizing scale.',
        ]}
        donts={[
          'Ship a borderline tap target under 48px.',
          'Choose off-scale dimensions.',
          'Shrink a dense row below the 40px floor.',
        ]}
      />
    </SpecCard>
  );
}

function MapRow({ tok, use, children }: { tok: string; use: string; children: React.ReactNode }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={[styles.mrow, { borderBottomColor: c.line2 }]}>
      <View style={styles.demo}>{children}</View>
      <KText variant="caption" weight="600" color={c.ink} style={styles.mtok}>{tok}</KText>
      <KText variant="caption" color={c.ink3} style={styles.muse}>{use}</KText>
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  scale: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-end', gap: 22, width: '100%' },
  su: { alignItems: 'center' },
  sq: { borderWidth: 1.5, borderRadius: 4 },
  sqN: { marginTop: 9 },
  mrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 13,
    borderBottomWidth: 1,
    width: '100%',
  },
  demo: { width: 80, alignItems: 'flex-start', justifyContent: 'center' },
  mtok: { width: 60 },
  muse: { flex: 1 },
  avatar40: { width: 40, height: 40, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  avatar64: { width: 64, height: 64, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
  btn48: { height: 48, paddingHorizontal: 24, alignItems: 'center', justifyContent: 'center' },
  fab56: { width: 56, height: 56, borderRadius: 999, alignItems: 'center', justifyContent: 'center' },
});
