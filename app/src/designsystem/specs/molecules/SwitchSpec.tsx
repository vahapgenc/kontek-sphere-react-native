// Växel — mirrors preview/switch.html.
// Usage (toggle list), states grid, settings-row layout, dos & don'ts.
// Demos use the real KSwitch component.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KSwitch } from '../../../components';
import { useTheme } from '../../../theme';

function Switch(props: Omit<React.ComponentProps<typeof KSwitch>, 'onValueChange'>) {
  const [value, setValue] = useState(props.value);
  return <KSwitch {...props} value={value} onValueChange={setValue} />;
}

export function SwitchSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Slår en inställning på/av <KText variant="bodySm" weight="700" color={c.ink2}>direkt</KText>.
      På-läget fylls med --green; ingen separat spara-bekräftelse.
    </KText>
  );

  return (
    <SpecCard title="Växel" intro={intro}>
      <SpecSection
        title="Usage"
        description="För att slå på eller av en inställning som träder i kraft direkt — ingen Spara-knapp behövs. 52×32px spår, vit knopp, Interaction-grön när påslagen. Behövs ett uttryckligt val som sparas senare, använd kryssruta."
        frame="col"
      >
        <SettingRow label="Skicka påminnelse innan utbetalning" on />
        <SettingRow label="Tillåt självrapportering av tid" on={false} />
        <SettingRow label="Visa nettobelopp i listan" on />
      </SpecSection>

      <SpecSection
        title="States"
        description="Av & på i default · fokus · inaktiverad. Övergången mellan lägena är 100ms."
        frame="center"
      >
        <StateCell label="Av" center>
          <Switch value={false} />
        </StateCell>
        <StateCell label="Av · fokus" center>
          <Switch value={false} />
        </StateCell>
        <StateCell label="Av · inaktiv" center>
          <KSwitch value={false} onValueChange={() => undefined} disabled />
        </StateCell>
        <StateCell label="På" center>
          <Switch value />
        </StateCell>
        <StateCell label="På · fokus" center>
          <Switch value />
        </StateCell>
        <StateCell label="På · inaktiv" center>
          <KSwitch value onValueChange={() => undefined} disabled />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="In a settings row"
        description="Placera reglaget till höger i raden med etikett och förklaring till vänster. Hela raden beskriver vad som ändras."
        frame="col"
      >
        <SettingRow
          label="Tvåstegsverifiering"
          desc="Kräver engångskod vid inloggning."
          on
        />
        <SettingRow
          label="Veckosammanfattning"
          desc="Ett mejl varje måndag med status."
          on={false}
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Use a switch for an instant on/off setting that applies immediately.',
          'Fill the on state with --green.',
          'Pair it with a clear, single-line label.',
        ]}
        donts={[
          'Use a switch where the change only takes effect after Save — use a checkbox.',
          'Require a separate confirm tap for a switch.',
          'Recolour the on state away from --green.',
        ]}
      />
    </SpecCard>
  );
}

function SettingRow({ label, desc, on }: { label: string; desc?: string; on: boolean }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.row}>
      <View style={styles.rowText}>
        <KText variant="body" weight="600" color={c.ink}>
          {label}
        </KText>
        {desc ? (
          <KText variant="caption" color={c.ink3} style={styles.rowDesc}>
            {desc}
          </KText>
        ) : null}
      </View>
      <Switch value={on} />
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    maxWidth: 460,
  },
  rowText: { flex: 1, gap: 2 },
  rowDesc: { marginTop: 2 },
});
