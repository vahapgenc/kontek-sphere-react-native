// Textområde — mirrors preview/text-area.html.
// Anatomy & usage, states grid, error & validation, dos & don'ts.
// Demos use the real KTextArea component.
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KTextArea } from '../../../components';
import { useTheme } from '../../../theme';

function Area(props: React.ComponentProps<typeof KTextArea>) {
  const [value, setValue] = useState(props.value);
  return <KTextArea {...props} value={value} onChangeText={setValue} />;
}

export function TextAreaSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Flerradig fritext som växer vertikalt. Samma 12px radie och 16px text som övriga fält.
    </KText>
  );

  return (
    <SpecCard title="Textområde" intro={intro}>
      <SpecSection
        title="Anatomy & usage"
        description="För flerradig fritext — meddelanden, noteringar, kommentarer. Minsta höjd 92px, vertikalt omskalningsbar. Samma kantlinje, radie och fokusring som textfältet. Visa teckenräknare när det finns en gräns."
        frame="col"
      >
        <Area
          label="Notering till lönekörning (valfritt)"
          value=""
          onChangeText={() => undefined}
          placeholder="Skriv en kort notering som syns för den som godkänner…"
          hint="Syns för granskaren.   0 / 280"
        />
      </SpecSection>

      <SpecSection
        title="States"
        description="Default · hover · fokus · ifylld · inaktiverad."
        frame="col"
      >
        <StateCell label="Default">
          <Area value="" onChangeText={() => undefined} placeholder="Lägg till en notering…" />
        </StateCell>
        <StateCell label="Hover">
          <Area value="" onChangeText={() => undefined} placeholder="Lägg till en notering…" />
        </StateCell>
        <StateCell label="Fokus">
          <Area value="Utbetalning tidigarelagd till den 23 maj." onChangeText={() => undefined} />
        </StateCell>
        <StateCell label="Inaktiverad">
          <Area value="Körningen är låst för redigering." onChangeText={() => undefined} />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Error & validation"
        description="Rött tillstånd med konkret felmeddelande. Behåll teckenräknaren synlig så att gränsen är tydlig."
        frame="col"
      >
        <Area
          label="Motivering *"
          value="Avbryter körningen."
          onChangeText={() => undefined}
          error="Ange minst 30 tecken så att beslutet kan följas upp."
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Let the textarea grow vertically; start at a comfortable min-height.',
          'Keep the 12px radius and 16px body text to match inputs.',
          'Pair with helper text for length or format guidance.',
        ]}
        donts={[
          'Lock it to one line — use an input for short single-line text.',
          'Allow horizontal resize.',
          'Drop the label on a multi-line field.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
