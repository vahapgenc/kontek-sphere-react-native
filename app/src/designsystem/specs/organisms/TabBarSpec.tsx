// Flikfält — mirrors preview/tab-bar.html.
// Primary mobile navigation: four core areas plus a raised center action. Selection
// is carried by COLOUR ALONE — no pill. A count badge rides the icon. Demo uses the
// real KTabBar showing an active tab and a badge.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon, KTabBar, type KTabBarItem } from '../../../components';
import { useTheme } from '../../../theme';

const ITEMS: KTabBarItem[] = [
  { key: 'home', label: 'Hem', icon: <KIcon name="home" size={24} strokeWidth={1.9} />, badge: 2 },
  { key: 'pay', label: 'Lön', icon: <KIcon name="payslip" size={24} strokeWidth={1.9} /> },
  { key: 'notif', label: 'Notiser', icon: <KIcon name="bell" size={24} strokeWidth={1.9} />, badge: 3 },
  { key: 'profile', label: 'Profil', icon: <KIcon name="user" size={24} strokeWidth={1.9} /> },
];

export function TabBarSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [active, setActive] = useState('home');

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Primär navigation, upp till fem platser med en upphöjd skapa-knapp i mitten.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>
        Aktiv flik markeras med färg
      </KText>{' '}
      — inget piller.
    </KText>
  );

  return (
    <SpecCard title="Flikfält" intro={intro}>
      <SpecSection
        title="Bottom tab bar"
        description="The primary mobile navigation — four core areas plus a raised center action, permanently in thumb reach. It replaces side navigation on phones. Selection is carried by colour alone — no pill, underline, or fill on the active tab. Identical on iPhone and Android; the bar honours the home-indicator safe area."
        frame="col"
      >
        <StateCell label="Light — resting (active = Hem, badges on Hem + Notiser)">
          <View style={[styles.phone, { borderColor: c.line, borderRadius: theme.radii.panel }]}>
            <View style={styles.bodyArea}>
              <KText variant="eyebrow" weight="600" color={c.greenDeep}>MÅNDAG 25 MAJ</KText>
              <KText variant="h2" weight="700" color={c.ink} style={styles.h}>Hem</KText>
              <KText variant="bodySm" color={c.ink3} style={styles.lh}>
                Active tab in Brand Signature. Count badges flag what needs you.
              </KText>
            </View>
            <KTabBar items={ITEMS} activeKey={active} onSelect={setActive} />
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" frame="default">
        <AnatomyList
          items={[
            { name: 'Bar height', value: '59px + safe-area inset' },
            { name: 'Slots', value: '4 tabs + 1 center action (max 5)' },
            { name: 'Icon', value: '24px, 1.9 stroke' },
            { name: 'Label', value: '11px / 600, always shown' },
            { name: 'Active', value: 'Signature #203B3C — color only' },
            { name: 'Inactive', value: 'Slate #475669' },
            { name: 'Center "+"', value: '56px circle, −24px raised' },
            { name: 'Center rest / open', value: 'Mint #9DDFB5 → Green #61BC8F' },
            { name: 'Badge', value: '18px circle, green, white count (9+)' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Carry selection by colour alone — active = --signature.',
          'Swap slots 2 & 4 by role (employee: Pay+Calendar; manager: Me+Employees).',
          'Put count badges on the icon as a green circle with a white number.',
        ]}
        donts={[
          'Add a pill, underline or fill to mark the active tab.',
          'Exceed five slots or treat the centre + as a tab.',
          'Put a count on the label instead of the icon.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  lh: { lineHeight: 22 },
  h: { marginTop: 4, marginBottom: 4 },
  phone: {
    width: 340,
    maxWidth: '100%',
    borderWidth: 1,
    overflow: 'hidden',
  },
  bodyArea: { paddingVertical: 18, paddingHorizontal: 16, minHeight: 150 },
});
