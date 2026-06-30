// Textfält — mirrors preview/text-input.html.
// Anatomy & usage, states grid, error & validation, unit/optional fields,
// dos & don'ts. Demos use the real KTextField component.
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KTextField } from '../../../components';
import { useTheme } from '../../../theme';

function Field(props: React.ComponentProps<typeof KTextField>) {
  const [value, setValue] = useState(props.value);
  return <KTextField {...props} value={value} onChangeText={setValue} />;
}

export function TextFieldSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      48px högt fält med <KText variant="bodySm" weight="700" color={c.ink2}>16px text</KText> så
      iOS aldrig zoomar. Tydlig etikett och hjälptext; fokus = signaturkant och 3px ring.
    </KText>
  );

  return (
    <SpecCard title="Textfält" intro={intro}>
      <SpecSection
        title="Anatomy & usage"
        description="Etikett ovanför fältet, hjälptext under. Höjd 48px (tap-säker), radie 12px, 1px kantlinje, 16px text (ingen iOS-zoom vid fokus). Fokus ger en 3px signaturring. Använd för korta, enradiga inmatningar — namn, belopp, organisationsnummer."
        frame="col"
      >
        <Field
          label="Organisationsnummer *"
          value=""
          onChangeText={() => undefined}
          placeholder="556677-8899"
          hint="Tio siffror, med eller utan bindestreck."
        />
      </SpecSection>

      <SpecSection
        title="States"
        description="Default · hover · fokus · ifylld · inaktiverad. Varje fält behåller etikett och hjälptext oförändrade mellan tillstånd."
        frame="col"
      >
        <Field label="Default" value="" onChangeText={() => undefined} placeholder="Anna Lindqvist" />
        <Field label="Hover" value="" onChangeText={() => undefined} placeholder="Anna Lindqvist" />
        <Field label="Fokus" value="Anna" onChangeText={() => undefined} />
        <Field label="Ifylld" value="Anna Lindqvist" onChangeText={() => undefined} />
        <Field label="Inaktiverad" value="Låst värde" onChangeText={() => undefined} />
      </SpecSection>

      <SpecSection
        title="Error & validation"
        description="Feltillstånd byter kantlinje och ring till rött och visar ett konkret felmeddelande med ikon. Skriv vad som är fel och hur det rättas — aldrig bara ”Ogiltigt värde”."
        frame="col"
      >
        <Field
          label="E-postadress *"
          value="anna@"
          onChangeText={() => undefined}
          error="Adressen saknar domän — t.ex. anna@kontek.se"
        />
      </SpecSection>

      <SpecSection
        title="With unit & optional field"
        description="Visa enhet (kr, %, h) som suffix när det förtydligar. Markera valfria fält med ”valfritt” i etiketten i stället för att markera alla obligatoriska."
        frame="col"
      >
        <Field label="Månadslön (kr)" value="42 000" onChangeText={() => undefined} />
        <Field
          label="Kostnadsställe (valfritt)"
          value=""
          onChangeText={() => undefined}
          placeholder="t.ex. Försäljning Nord"
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Keep inputs 48px tall with body text at 16px so iOS never zoom-focuses.',
          'Pair a clear label with helper text; reserve real borders for fields.',
          'Focus = --signature border + a 3px signature ring.',
        ]}
        donts={[
          'Set input text below 16px — it triggers focus-zoom on iOS.',
          'Use a placeholder as the only label.',
          'Colour the error state anything but --danger.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
