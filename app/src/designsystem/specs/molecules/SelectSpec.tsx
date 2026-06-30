// Rullgardin — mirrors preview/select.html.
// Usage, states grid, open-menu mock, dos & don'ts.
// The control demos use the real KSelect component.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KSelect } from '../../../components';
import { useTheme } from '../../../theme';

const noop = () => undefined;

export function SelectSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Väljer ett alternativ ur en längre lista. För{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>2–3 likvärdiga val</KText> är en
      segmentkontroll snabbare.
    </KText>
  );

  return (
    <SpecCard title="Rullgardin" intro={intro}>
      <SpecSection
        title="Usage"
        description="Väljer ett värde ur en längre eller dynamisk lista. Samma skal som textfältet, med en nedåtpil till höger. Vid fler än ~6 alternativ används dropdown framför radioknappar."
        frame="col"
      >
        <KSelect label="Löneperiod" value="Maj 2025" onPress={noop} />
      </SpecSection>

      <SpecSection
        title="States"
        description="Default · hover · fokus · inaktiverad · fel — samma logik som textfältet."
        frame="col"
      >
        <StateCell label="Default">
          <KSelect placeholder="Välj konto" onPress={noop} />
        </StateCell>
        <StateCell label="Hover">
          <KSelect placeholder="Välj konto" onPress={noop} />
        </StateCell>
        <StateCell label="Fokus">
          <KSelect value="1930 · Företagskonto" onPress={noop} />
        </StateCell>
        <StateCell label="Inaktiverad">
          <KSelect value="Låst" onPress={noop} disabled />
        </StateCell>
        <StateCell label="Fel">
          <KSelect placeholder="Välj konto" onPress={noop} error=" " />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Open menu"
        description="Vid öppning visas alternativen i en flytande panel med menyskugga. Valt alternativ markeras med grön bock och svag grön ton; hovrat alternativ får en neutral ton."
      >
        <View
          style={[
            styles.menu,
            { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.input },
            theme.shadows.md,
          ]}
        >
          <MenuOption label="Maj 2025" selected />
          <MenuOption label="April 2025" />
          <MenuOption label="Mars 2025" />
          <MenuOption label="Februari 2025" />
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Use a select when there are more than a handful of mutually-exclusive options.',
          'Keep the 48px height and 16px text in line with other fields.',
          'Default to the most common choice where one exists.',
        ]}
        donts={[
          'Use a select for 2–3 options — a segmented control is faster.',
          'Hide a required choice with no default and no prompt.',
          'Restyle the native chevron away.',
        ]}
      />
    </SpecCard>
  );
}

function MenuOption({ label, selected }: { label: string; selected?: boolean }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View
      style={[
        styles.opt,
        { borderRadius: theme.radii.sm },
        selected && { backgroundColor: c.greenSoft },
      ]}
    >
      <KText variant="bodySm" weight={selected ? '600' : '400'} color={c.ink}>
        {label}
      </KText>
      {selected ? (
        <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
          <Path
            d="M20 6 9 17l-5-5"
            stroke={c.greenDeep}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  menu: { width: 240, borderWidth: 1, padding: 6, gap: 2 },
  opt: {
    height: 38,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
