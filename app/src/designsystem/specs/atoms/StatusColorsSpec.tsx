// Statusfärger — mirrors preview/colors-status.html.
// Four feedback tones (success / warning / error / information), each a text-colour +
// soft-bg PAIR with an icon swatch, reading real values from src/tokens.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KIcon, type IconName } from '../../../components';
import { useTheme } from '../../../theme';

interface Status {
  name: string;
  desc: string;
  icon: IconName;
  bg: string;
  text: string;
}

const STATUSES: Status[] = [
  { name: 'Success', desc: 'Confirmation banners, "klar" states', icon: 'checkCirc', bg: '#E6F7ED', text: '#053F22' },
  { name: 'Warning', desc: 'Needs attention, pending approval', icon: 'warn', bg: '#FEF4E7', text: '#7A4A0E' },
  { name: 'Error', desc: 'Validation failures, avvikelser', icon: 'warn', bg: '#FDEEED', text: '#9C3232' },
  { name: 'Information', desc: 'Neutral notices, in-progress states', icon: 'info', bg: '#EBF2FB', text: '#1A5298' },
];

function StatusRow({ item }: { item: Status }) {
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
        <KIcon name={item.icon} size={26} color={item.text} strokeWidth={2.2} />
      </View>
      <View style={styles.txt}>
        <KText variant="title" weight="700" color={c.ink}>
          {item.name}
        </KText>
        <KText variant="bodySm" color={c.ink3} style={styles.desc}>
          {item.desc}
        </KText>
      </View>
      <View style={styles.hexpair}>
        <View style={styles.hexrow}>
          <KText variant="micro" weight="600" color={c.ink4}>Text</KText>
          <View style={[styles.hex, { backgroundColor: c.surface2, borderRadius: theme.radii.sm }]}>
            <KText variant="caption" weight="600" color={c.ink2}>{item.text}</KText>
          </View>
        </View>
        <View style={styles.hexrow}>
          <KText variant="micro" weight="600" color={c.ink4}>Bg</KText>
          <View style={[styles.hex, { backgroundColor: c.surface2, borderRadius: theme.radii.sm }]}>
            <KText variant="caption" weight="600" color={c.ink2}>{item.bg}</KText>
          </View>
        </View>
      </View>
    </View>
  );
}

export function StatusColorsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Fyra återkopplingstoner — info, lyckat, varning, fel — alltid som ett{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>par av textfärg och mjuk bakgrund</KText>.
    </KText>
  );

  return (
    <SpecCard title="Statusfärger" intro={intro}>
      <SpecSection
        title="Semantic — status"
        description="Four feedback states, each a text/icon colour paired with a soft alert background. Reserved for notifications, banners and inline validation — kept separate from the brand scales."
        bare
      >
        <View style={styles.list}>
          {STATUSES.map((s) => (
            <StatusRow key={s.name} item={s} />
          ))}
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Carry every status as a text-colour + soft-bg pair — never one without the other.',
          'Map meaning consistently: ok approved/paid, info awaiting, warn action-required, danger rejected/error.',
          'Keep status backgrounds soft and matte.',
        ]}
        donts={[
          'Use danger (red) for save or approve — green is go.',
          'Put a count inside a status pill — counts are circles, statuses are pills.',
          'Pair a status text colour with the wrong soft background.',
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
  hexpair: { gap: 6, alignItems: 'flex-end' },
  hexrow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  hex: { paddingVertical: 5, paddingHorizontal: 10 },
});
