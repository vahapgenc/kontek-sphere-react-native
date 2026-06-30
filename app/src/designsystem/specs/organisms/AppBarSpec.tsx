// Appfält — mirrors preview/app-bar.html.
// Top chrome in two forms: large-title on root tabs, compact with a back chevron
// on pushed screens. Transparent at rest, frosts in on scroll. Demos use the real KAppBar.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon, KAppBar } from '../../../components';
import { useTheme } from '../../../theme';

export function AppBarSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Toppchrome i två former: stor rubrik på rotflikar, kompakt med bakåtpil på
      inskjutna skärmar.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>
        Transparent i vila
      </KText>
      , frostar in vid skroll.
    </KText>
  );

  return (
    <SpecCard title="Appfält" intro={intro}>
      <SpecSection
        title="App bar"
        description="The sticky top chrome of every screen. Three forms share one component: large-title (eyebrow + 28px title), compact (centred title with leading + trailing actions) and a dark variant for forest surfaces. Translucent with a blur so content scrolls under it. Action targets are a full 48px."
        frame="col"
      >
        <StateCell label="Large-title — standard screen header">
          <View style={[styles.bar, { borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KAppBar
              title="God morgon, Anna"
              large
              right={<KIcon name="bell" size={22} color={c.ink2} />}
            />
            <View style={[styles.row, { borderTopColor: c.line2 }]}>
              <View style={[styles.tile, { backgroundColor: c.greenSoft }]}>
                <KIcon name="wallet" size={20} color={c.greenDeep} />
              </View>
              <View style={styles.flex1}>
                <KText variant="bodySm" weight="600" color={c.ink}>Lön</KText>
                <KText variant="caption" color={c.ink3}>1 körning väntar</KText>
              </View>
            </View>
          </View>
        </StateCell>

        <StateCell label="Compact — detail screen">
          <View style={[styles.bar, { borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KAppBar
              title="Lönekörning · Maj"
              onBack={() => {}}
              right={<KIcon name="info" size={22} color={c.ink2} />}
            />
            <View style={styles.pad}>
              <KText variant="bodySm" color={c.ink3} style={styles.lh}>
                Centred title with a leading back action and a trailing overflow.
                Used on detail screens pushed onto the stack.
              </KText>
            </View>
          </View>
        </StateCell>

        <StateCell label="Med bakåtpil — inskjuten skärm">
          <View style={[styles.bar, { borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KAppBar title="Profil" onBack={() => {}} />
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" frame="default">
        <AnatomyList
          items={[
            { name: 'Bar height', value: '56px' },
            { name: 'Title', value: '28px / 700 (large) · 17px / 600 (compact)' },
            { name: 'Eyebrow', value: '12px / 600 uppercase' },
            { name: 'Action', value: '48px tap · 24px icon' },
            { name: 'Surface', value: '82% canvas + blur(12px)' },
            { name: 'Safe area', value: 'respects --safe-top' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Use the large-title bar on root tabs, the compact back-chevron bar on pushed screens.',
          'Put the notifications bell in the right slot with a count badge.',
          'Keep it transparent at rest and frost it in on scroll.',
        ]}
        donts={[
          'Give the resting bar a solid fill or a divider.',
          'Crowd more than two actions into the bar.',
          'Title Case the screen title.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  flex1: { flex: 1, minWidth: 0 },
  lh: { lineHeight: 22 },
  bar: {
    width: 300,
    maxWidth: '100%',
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tile: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pad: { paddingVertical: 14, paddingHorizontal: 16 },
});
