// Radioknapp — mirrors preview/radio.html.
// Usage (single-select group), states grid, selection-card layout, dos & don'ts.
// Demos use the real KRadio component.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KRadio } from '../../../components';
import { useTheme } from '../../../theme';

const PERIODS = ['Månadsvis utbetalning', 'Varannan vecka', 'Veckovis'];

export function RadioSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [period, setPeriod] = useState(PERIODS[0]);
  const [method, setMethod] = useState('auto');

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Välj <KText variant="bodySm" weight="700" color={c.ink2}>exakt ett</KText> alternativ.
      Förvälj ett vettigt standardval; vid många val, byt till en rullgardin.
    </KText>
  );

  return (
    <SpecCard title="Radioknapp" intro={intro}>
      <SpecSection
        title="Usage"
        description="För att välja exakt ett alternativ ur en kort, ömsesidigt uteslutande lista. 24px cirkel med grön punkt och Brand-Signature-kant vid val. Har listan fler än 5–6 alternativ — använd en dropdown."
        frame="col"
      >
        {PERIODS.map((p) => (
          <KRadio key={p} selected={period === p} onChange={() => setPeriod(p)} label={p} />
        ))}
      </SpecSection>

      <SpecSection
        title="States"
        description="Ovald & vald i default · hover · fokus · inaktiverad · fel."
        frame="center"
      >
        <StateCell label="Ovald" center>
          <KRadio selected={false} onChange={() => undefined} />
        </StateCell>
        <StateCell label="Hover" center>
          <KRadio selected={false} onChange={() => undefined} />
        </StateCell>
        <StateCell label="Fokus" center>
          <KRadio selected={false} onChange={() => undefined} />
        </StateCell>
        <StateCell label="Vald" center>
          <KRadio selected onChange={() => undefined} />
        </StateCell>
        <StateCell label="Vald · fokus" center>
          <KRadio selected onChange={() => undefined} />
        </StateCell>
        <StateCell label="Inaktiv ovald" center>
          <KRadio selected={false} onChange={() => undefined} disabled />
        </StateCell>
        <StateCell label="Inaktiv vald" center>
          <KRadio selected onChange={() => undefined} disabled />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="As a selection card"
        description="För tyngre beslut kan radioknappen bäddas in i ett kort med beskrivning. Hela kortet är klickbart; det valda kortet får signaturkant och svag grön ton."
      >
        <SelectionCard
          selected={method === 'auto'}
          onPress={() => setMethod('auto')}
          title="Automatisk bokföring"
          desc="Vi bokför körningen direkt efter godkännande."
        />
        <SelectionCard
          selected={method === 'manual'}
          onPress={() => setMethod('manual')}
          title="Manuell bokföring"
          desc="Du exporterar och bokför själv i ditt system."
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Use a radio when exactly one option must be chosen.',
          'Pre-select a sensible default.',
          'Keep the full row tappable at ≥ 48px.',
        ]}
        donts={[
          'Use radios where several selections are valid — that is a checkbox.',
          'List more than ~5 options — switch to a select.',
          'Leave a required group with no default.',
        ]}
      />
    </SpecCard>
  );
}

function SelectionCard({
  selected,
  onPress,
  title,
  desc,
}: {
  selected: boolean;
  onPress: () => void;
  title: string;
  desc: string;
}) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View
      style={[
        styles.card,
        {
          borderRadius: theme.radii.card,
          backgroundColor: selected ? c.greenSoft : c.surface,
          borderColor: selected ? c.signature : c.line,
          borderWidth: selected ? 1.5 : 1,
        },
      ]}
    >
      <KRadio selected={selected} onChange={onPress} />
      <View style={styles.cardText}>
        <KText variant="body" weight="600" color={c.ink}>
          {title}
        </KText>
        <KText variant="caption" color={c.ink3} style={styles.cardDesc}>
          {desc}
        </KText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    flexBasis: 260,
    flexGrow: 1,
  },
  cardText: { flex: 1, marginTop: 1 },
  cardDesc: { marginTop: 3, lineHeight: 19 },
});
