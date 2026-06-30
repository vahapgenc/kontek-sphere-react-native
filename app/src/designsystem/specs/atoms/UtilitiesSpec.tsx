// Hjälpklasser — mirrors preview/utilities.html.
// Pure-documentation atom: the utility-class table, each row with a live demo box.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';

export function UtilitiesSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const box = (children: ReactNode, extra?: object) => (
    <View
      style={[
        styles.box,
        { backgroundColor: c.surface2, borderColor: c.line, borderRadius: theme.radii.sm },
        extra,
      ]}
    >
      {children}
    </View>
  );

  interface UtilRow {
    cls: string;
    demo: ReactNode;
    desc: string;
  }

  const rows: UtilRow[] = [
    {
      cls: '.u-truncate',
      demo: box(
        <KText variant="caption" color={c.ink2} numberOfLines={1}>
          Norrström Industrier AB · majkörning 2025
        </KText>,
        { width: 200 },
      ),
      desc: 'Klipper en rad text med ellips.',
    },
    {
      cls: '.u-clamp-2',
      demo: box(
        <KText variant="caption" color={c.ink2} numberOfLines={2}>
          En längre beskrivning som tillåts ta två rader innan den klipps av med ellips på
          slutet.
        </KText>,
        { width: 200 },
      ),
      desc: 'Begränsar till två rader.',
    },
    {
      cls: '.u-tabular',
      demo: box(
        <KText variant="caption" color={c.ink2} style={styles.tabular}>
          1 240 506,00 kr
        </KText>,
      ),
      desc: 'Siffror med fast bredd — för belopp i tabeller.',
    },
    {
      cls: '.u-between',
      demo: box(
        <View style={styles.between}>
          <KText variant="caption" color={c.ink2}>
            Netto
          </KText>
          <KText variant="caption" weight="700" color={c.ink}>
            38 200 kr
          </KText>
        </View>,
      ),
      desc: 'Flex med innehåll i var sin ände.',
    },
    {
      cls: '.u-center',
      demo: box(
        <KText variant="caption" color={c.ink4}>
          Centrerat
        </KText>,
        { height: 44, alignItems: 'center', justifyContent: 'center' },
      ),
      desc: 'Centrerar i båda led.',
    },
    {
      cls: '.u-round',
      demo: (
        <View style={[styles.round, { backgroundColor: c.guide }]}>
          <KText variant="caption" weight="600" color="#fff">
            AL
          </KText>
        </View>
      ),
      desc: 'Full radie — cirklar och pillerformer.',
    },
    {
      cls: '.u-elevate',
      demo: (
        <View
          style={[
            styles.box,
            theme.shadows.md,
            { backgroundColor: c.surface, borderRadius: theme.radii.sm },
          ]}
        >
          <KText variant="caption" color={c.ink2}>
            Upphöjd yta
          </KText>
        </View>
      ),
      desc: 'Lägger på shadow-md (hover/raised).',
    },
    {
      cls: '.u-divider',
      demo: (
        <View style={{ width: 200 }}>
          <View style={[styles.divider, { backgroundColor: c.line }]} />
        </View>
      ),
      desc: 'Hårfin avdelare i Stone-färg.',
    },
    {
      cls: '.u-visually-hidden',
      demo: (
        <KText variant="caption" color={c.ink4} style={styles.italic}>
          döljs visuellt
        </KText>
      ),
      desc: 'Gömd för ögat, kvar för skärmläsare.',
    },
  ];

  return (
    <SpecCard
      title="Hjälpklasser"
      intro="Enkla, komponerbara hjälpklasser. Komponera dem i stället för att grena en komponent för att styla om."
    >
      <SpecSection
        title="Utility classes"
        description="Enkla, enskilt syftande klasser som komponeras ihop — i stället för att skapa nya varianter. Prefix u- skiljer dem från komponent- och typografiklasser."
        frame="col"
      >
        <View style={styles.table}>
          {rows.map((r, i, arr) => (
            <View
              key={r.cls}
              style={[
                styles.trow,
                { borderBottomColor: c.line2 },
                i === arr.length - 1 && styles.trowLast,
              ]}
            >
              <KText variant="caption" color={c.greenDeep} style={styles.cls}>
                {r.cls}
              </KText>
              <View style={styles.demo}>{r.demo}</View>
              <KText variant="caption" color={c.ink3} style={styles.descCol}>
                {r.desc}
              </KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Compose single-purpose utilities rather than forking a component to restyle it.',
          'Use .u-tabular / .tnum for money and aligned figures.',
          'Reach for a utility before writing one-off CSS.',
        ]}
        donts={[
          'Override component internals with utilities.',
          "Recreate a utility's effect with an inline style.",
          'Stack many utilities where a component variant belongs.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  table: { width: '100%' },
  trow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  trowLast: { borderBottomWidth: 0 },
  cls: { width: 150 },
  demo: { flexBasis: 210, flexGrow: 0 },
  descCol: { flex: 1, minWidth: 140 },
  box: {
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  tabular: { fontVariant: ['tabular-nums'] },
  between: { flexDirection: 'row', justifyContent: 'space-between', minWidth: 160 },
  round: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: { height: 1, width: '100%' },
  italic: { fontStyle: 'italic' },
});
