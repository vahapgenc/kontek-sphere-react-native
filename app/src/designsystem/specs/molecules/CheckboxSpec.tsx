// Kryssruta — mirrors preview/checkbox.html.
// Usage, states grid, "markera alla"-group, dos & don'ts.
// Demos use the real KCheckbox component.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KCheckbox } from '../../../components';
import { useTheme } from '../../../theme';

function Check(props: Omit<React.ComponentProps<typeof KCheckbox>, 'onChange'> & { onChange?: (v: boolean) => void }) {
  const [checked, setChecked] = useState(props.checked);
  return (
    <KCheckbox
      {...props}
      checked={checked}
      onChange={(v) => {
        setChecked(v);
        props.onChange?.(v);
      }}
    />
  );
}

export function CheckboxSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Välj noll, en eller flera. Fyllning i{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--green</KText> med signaturkant; hela
      raden är tryckbar på minst 48px.
    </KText>
  );

  return (
    <SpecCard title="Kryssruta" intro={intro}>
      <SpecSection
        title="Usage"
        description="För att välja noll, en eller flera oberoende alternativ. 24px ruta, radie 7px. Ikryssad fylls med Interaction-grön och Brand-Signature-kant. Använd radioknappar i stället när bara ett alternativ får väljas."
        frame="col"
      >
        <Check checked label="Skicka lönebesked via e-post" />
        <Check checked={false} label="Inkludera semesterersättning" />
        <Check checked label="Bokför automatiskt efter godkännande" />
      </SpecSection>

      <SpecSection
        title="States"
        description="Oikryssad & ikryssad i default · hover · fokus · inaktiverad, samt obestämt (för ”markera alla” när bara vissa är valda)."
        frame="center"
      >
        <StateCell label="Av" center>
          <Check checked={false} />
        </StateCell>
        <StateCell label="Av · hover" center>
          <Check checked={false} />
        </StateCell>
        <StateCell label="Av · fokus" center>
          <Check checked={false} />
        </StateCell>
        <StateCell label="På" center>
          <Check checked />
        </StateCell>
        <StateCell label="På · fokus" center>
          <Check checked />
        </StateCell>
        <StateCell label="Inaktiv av" center>
          <KCheckbox checked={false} onChange={() => undefined} disabled />
        </StateCell>
        <StateCell label="Inaktiv på" center>
          <KCheckbox checked onChange={() => undefined} disabled />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Grupp med ”markera alla”"
        description="En överordnad kryssruta styr gruppen och visar obestämt läge när bara vissa underval är ikryssade."
        frame="col"
      >
        <Check checked={false} label="Alla anställda (2 av 3 valda)" />
        <View style={styles.group}>
          <Check checked label="Erik Holm" />
          <Check checked label="Sara Nilsson" />
          <Check checked={false} label="Johan Lund" />
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Use a checkbox when zero, one or several options can be selected.',
          'Fill with --green paired with a --signature border.',
          'Keep the whole label tappable at ≥ 48px.',
        ]}
        donts={[
          'Use a checkbox for mutually-exclusive choices — that is a radio.',
          'Recolour the check fill away from --green.',
          'Make only the tiny box tappable.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  group: { paddingLeft: 28, gap: 6 },
});
