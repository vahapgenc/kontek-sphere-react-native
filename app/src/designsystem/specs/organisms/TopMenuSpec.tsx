// Toppmeny (desktop) — mirrors preview/nav-item.html.
// Desktop horizontal top navigation: an 80px (64px compact) Kontek-green bar with a
// logo, nav items (mint resting, white bold active with a mint underline) and a right
// cluster. Demos use the real KTopMenu in full and compact modes.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon, KTopMenu, type KTopMenuItem } from '../../../components';
import { useTheme } from '../../../theme';

const ITEMS: KTopMenuItem[] = [
  { key: 'oversikt', label: 'Översikt' },
  { key: 'lon', label: 'Lön' },
  { key: 'tid', label: 'Tid' },
  { key: 'rapporter', label: 'Rapporter' },
  { key: 'anstallda', label: 'Anställda' },
];

export function TopMenuSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [fullActive, setFullActive] = useState('oversikt');
  const [compactActive, setCompactActive] = useState('lon');

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Den vägvisande ytan på{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>desktop</KText> — en vågrät
      meny högst upp i vyn istället för en sidopanel. Logotyp till vänster,
      navigeringsflikar i mitten och ett högerkluster med ikonknappar, företagsväljare
      och konto.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>80px hög</KText> i fullt läge,{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>64px</KText> i kompakt läge.
    </KText>
  );

  const logo = <KText variant="title" weight="700" color={c.onDark}>Kontek</KText>;
  const trailing = (
    <>
      <KIcon name="bell" size={21} color={c.statusBadge} strokeWidth={1.85} />
      <KIcon name="user" size={22} color={c.onDark} strokeWidth={1.75} />
    </>
  );

  return (
    <SpecCard title="Toppmeny (desktop)" intro={intro}>
      <SpecSection
        title="Full mode · 80px"
        description="Active tab in white bold with a 3px mint underline and a faint white tint. Resting tabs in mint; hover adds a faint white tint. On the phone, navigate with the bottom tab bar instead."
        frame="col"
      >
        <StateCell label="Full — 80px bar">
          <KTopMenu
            items={ITEMS}
            activeKey={fullActive}
            onSelect={setFullActive}
            leading={logo}
            trailing={trailing}
          />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Compact mode · 64px"
        description="Same structure, lower bar and smaller logo — for dense workspaces and on scroll."
        frame="col"
      >
        <StateCell label="Compact — 64px bar">
          <KTopMenu
            items={ITEMS}
            activeKey={compactActive}
            onSelect={setCompactActive}
            compact
            leading={logo}
            trailing={trailing}
          />
        </StateCell>
      </SpecSection>

      <SpecSection title="Dimensions & tokens" frame="default">
        <AnatomyList
          items={[
            { name: 'Bar', value: '80px (64px kompakt) · --kontek-green #053F22' },
            { name: 'Logotyp', value: '30px hög (26px kompakt), 28px vänstermarginal' },
            { name: 'Flik', value: 'padding 0 16px · 15px/500 (14px kompakt)' },
            { name: 'Vilande flik', value: '--status-badge #9DDFB5' },
            { name: 'Aktiv flik', value: '#ffffff / 700 · ton rgba(255,255,255,.15) · 3px understreck' },
            { name: 'Hover', value: 'rgba(255,255,255,0.06)' },
            { name: 'Högerkluster', value: 'padding 0 22px · gap 18px' },
            { name: 'Ikonknappar', value: '40×40px' },
            { name: 'Företagspill', value: '42px hög · padding 0 14px · radie 10px' },
            { name: 'Notisbricka', value: '--ok-soft #E6F7ED bg · --ok-text #053F22 · 12px/600' },
            { name: 'Panel', value: 'min 248px · radie 14px · rad 11px 20px · --elev-menu' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Use this horizontal top menu on the desktop web app (80px bar).',
          'Keep it visually consistent with the dark forest sidebar of the desktop kit.',
          'On the phone, navigate with the bottom tab bar instead.',
        ]}
        donts={[
          'Ship this top menu on a phone — it is desktop chrome.',
          'Diverge its brand colours from the desktop system.',
          'Duplicate it alongside a bottom tab bar on the same screen.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
