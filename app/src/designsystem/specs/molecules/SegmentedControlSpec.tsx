// Segmentkontroll — mirrors preview/segmented-control.html.
// Usage, states, with-icons, anatomy, dos & don'ts.
// Demos use the real KSegmentedControl component.
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KSegmentedControl } from '../../../components';
import { useTheme } from '../../../theme';

export function SegmentedControlSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [range, setRange] = useState('manad');
  const [view, setView] = useState('lista');

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Växlar mellan <KText variant="bodySm" weight="700" color={c.ink2}>2–3 likvärdiga vyer</KText>;
      aktivt segment får den vita upphöjda chippen. Växlar en vy, utlöser inte en åtgärd.
    </KText>
  );

  return (
    <SpecCard title="Segmentkontroll" intro={intro}>
      <SpecSection
        title="Usage"
        description="Växlar mellan 2–4 likvärdiga vyer eller lägen inom samma yta — ett alternativ är alltid valt. Det aktiva segmentet får vit yta och mjuk skugga. Vid fler eller längre alternativ, använd flikar eller en dropdown."
        frame="col"
      >
        <KSegmentedControl
          value={range}
          onChange={setRange}
          options={[
            { label: 'Månad', value: 'manad' },
            { label: 'Kvartal', value: 'kvartal' },
            { label: 'År', value: 'ar' },
          ]}
        />
      </SpecSection>

      <SpecSection
        title="States"
        description="Aktivt · inaktivt (vilande) · hover · inaktiverat segment."
        frame="col"
      >
        <KSegmentedControl
          value="aktiv"
          onChange={() => undefined}
          options={[
            { label: 'Aktiv', value: 'aktiv' },
            { label: 'Vilande', value: 'vilande' },
            { label: 'Hover', value: 'hover' },
            { label: 'Inaktiv', value: 'inaktiv' },
          ]}
        />
      </SpecSection>

      <SpecSection
        title="With icons"
        description="Ikon + etikett när lägena är visuella (lista vs. rutnät). Håll etiketterna korta så att bredden blir jämn."
        frame="center"
      >
        <KSegmentedControl
          value={view}
          onChange={setView}
          options={[
            { label: 'Lista', value: 'lista' },
            { label: 'Rutnät', value: 'rutnat' },
          ]}
        />
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Höjd', value: '40px segment · 48px hölje' },
            { name: 'Radie', value: '12px hölje · 9px segment' },
            { name: 'Hölje', value: 'Inset-yta + 1px kant' },
            { name: 'Aktiv', value: 'Vit yta + shadow-xs' },
            { name: 'Etikett', value: '13px / 600 aktiv' },
          ]}
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Use it for 2–3 short, equal views; the active segment gets the white raised chip.',
          'Keep labels one or two words.',
          'Switch instantly — no Apply step.',
        ]}
        donts={[
          'Pack in 4+ segments or long labels — use a select.',
          "Use it for actions; it switches a view, it doesn't trigger one.",
          'Leave no segment selected.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
