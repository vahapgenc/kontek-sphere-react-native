// Sök — mirrors preview/search.html.
// Usage, states grid, compact toolbar, dos & don'ts.
// Demos use the real KSearchField component.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KSearchField, KButton, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

function Search(props: React.ComponentProps<typeof KSearchField>) {
  const [value, setValue] = useState(props.value);
  return <KSearchField {...props} value={value} onChangeText={setValue} />;
}

export function SearchSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Filtrerar listor och vyer direkt medan du skriver. Ledande förstoringsglas och en
      rensa-knapp när det finns text.
    </KText>
  );

  return (
    <SpecCard title="Sök" intro={intro}>
      <SpecSection
        title="Usage"
        description="Filtrerar eller söker i en lista, tabell eller global vy. Ledande förstoringsglas, valfri rensningsknapp när fältet har innehåll. Samma höjd och radie som textfältet."
        frame="col"
      >
        <Search value="" onChangeText={() => undefined} placeholder="Sök anställd, period eller belopp" />
      </SpecSection>

      <SpecSection
        title="States"
        description="Tom · fokus · med värde (visar rensa) · inaktiverad."
        frame="col"
      >
        <StateCell label="Tom">
          <Search value="" onChangeText={() => undefined} placeholder="Sök" />
        </StateCell>
        <StateCell label="Fokus">
          <Search value="" onChangeText={() => undefined} placeholder="" />
        </StateCell>
        <StateCell label="Med värde">
          <Search value="Erik Holm" onChangeText={() => undefined} />
        </StateCell>
        <StateCell label="Inaktiverad">
          <Search value="" onChangeText={() => undefined} placeholder="Sök" />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Compact — in a toolbar"
        description="I täta verktygsrader får sökfältet en fast bredd och placeras intill filter och åtgärder."
        frame="center"
      >
        <View style={styles.toolbar}>
          <View style={styles.compact}>
            <Search value="" onChangeText={() => undefined} placeholder="Sök i tabellen" />
          </View>
          <KButton
            label="Filter"
            variant="secondary"
            trailing={<KIcon name="swap" size={20} color={c.ink} />}
          />
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Show a leading magnifier and a clear (×) button once there is input.',
          'Filter results live as the user types.',
          'Keep the 48px field height for an easy thumb tap.',
        ]}
        donts={[
          'Require a submit tap when live filtering is possible.',
          'Hide the clear affordance.',
          'Use search where a short segmented control or filter chip fits.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  toolbar: { flexDirection: 'row', alignItems: 'center', gap: 14, flexWrap: 'wrap' },
  compact: { width: 220 },
});
