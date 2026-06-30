// Flytande kort — mirrors preview/floating-card.html.
// One recipe for every card-like surface: the --sh-1 lift, 20px radius, transparent border.
// Demos use the real KCard with KIconTile + KListRow rows. Anatomy + dos & don'ts.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KCard, KIconTile, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function FloatingCardSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Ett recept för varje kortyta:{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--sh-1</KText>, 20px radie, transparent
      ram. Lyftet — inte en ram — gör separationen.
    </KText>
  );

  return (
    <SpecCard title="Flytande kort" intro={intro}>
      <SpecSection
        title="The floating card"
        description="Every card-like surface in the app — grouped lists, content cards, register options, notification items, approval cards, detail panels — uses one recipe. No visible border: the lift does the separation. Inside the card, rows are split by a hairline in --line-2, never a real border."
        frame="col"
      >
        <KCard padding={0} style={styles.card}>
          <View style={styles.head}>
            <KText variant="eyebrow" weight="600" color={c.greenDeep}>NÄSTA LÖN</KText>
            <KText variant="h2" weight="700" color={c.signature} style={styles.fig}>28 450 kr</KText>
          </View>
          <CardRow
            title="Ledighet"
            sub="2 dagar i juli"
            icon="calendar"
          />
          <View style={[styles.divider, { backgroundColor: c.line2 }]} />
          <CardRow
            title="Utlägg"
            sub="1 väntar på godkännande"
            icon="receipt"
          />
        </KCard>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Radius', value: '20px (--r-panel)' },
            { name: 'Border', value: '1px transparent' },
            { name: 'Shadow', value: '--sh-1 (2-layer)' },
            { name: 'Divider', value: '--line-2 hairline' },
            { name: 'Shadow ink', value: 'rgba(18,33,33, …)' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <KCard style={styles.exCardDo}>
                <KText variant="eyebrow" weight="700" color={c.greenDeep}>LÖN</KText>
                <KText variant="title" weight="700" color={c.signature} style={styles.exFig}>28 450 kr</KText>
              </KCard>
            ),
            caption: 'Transparent border + the soft --sh-1 lift, 20px radius.',
          },
          dont: {
            stage: (
              <View style={[styles.exCardDont, { borderColor: '#C9D2D3', backgroundColor: c.surface }]}>
                <KText variant="eyebrow" weight="700" color={c.greenDeep}>LÖN</KText>
                <KText variant="title" weight="700" color={c.signature} style={styles.exFig}>28 450 kr</KText>
              </View>
            ),
            caption: 'A visible 1px border, sharp radius and a hard drop shadow.',
          },
        }}
        dos={[
          'Reuse the exact --sh-1 recipe for every new card so the whole app stays consistent.',
          'Separate in-card rows with a --line-2 hairline pseudo-element.',
          'Keep the shadow colour a low-alpha deep ink, rgba(18,33,33, …).',
        ]}
        donts={[
          'Give cards a visible 1px border — the lift is what separates them.',
          'Mix radii: 20px is the card standard, full stop.',
          'Use a hard, dark or coloured drop shadow, or a real border for in-card dividers.',
        ]}
      />
    </SpecCard>
  );
}

function CardRow({ title, sub, icon }: { title: string; sub: string; icon: 'calendar' | 'receipt' }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.frow}>
      <KIconTile icon={icon} tone="soft" size={38} />
      <View style={styles.frowBody}>
        <KText variant="title" weight="600" color={c.ink}>{title}</KText>
        <KText variant="bodySm" color={c.ink3}>{sub}</KText>
      </View>
      <KIcon name="chevR" size={20} color={c.ink4} strokeWidth={2} />
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  card: { width: 300, maxWidth: '100%', overflow: 'hidden' },
  head: { paddingHorizontal: 20, paddingVertical: 18 },
  fig: { marginTop: 6, letterSpacing: -0.6 },
  frow: { flexDirection: 'row', alignItems: 'center', gap: 13, paddingHorizontal: 20, paddingVertical: 14 },
  frowBody: { flex: 1, minWidth: 0 },
  divider: { height: 1, marginLeft: 20 },
  exCardDo: { width: 150, padding: 16 },
  exFig: { marginTop: 4 },
  exCardDont: { width: 150, padding: 16, borderWidth: 1, borderRadius: 8 },
});
