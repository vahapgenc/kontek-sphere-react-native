// Knappar — mirrors preview/buttons.html.
// Type variants, mobile block/large/sm shapes, primary states, non-primary states,
// with icons, action group and destructive layout, anatomy, dos & don'ts.
// Demos use the real KButton component.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KButton, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function ButtonsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Knappen bär vyns viktigaste åtgärd. Fyra typer bygger hierarki —{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>en primär per vy</KText>, resten
      trappas ner. Skriv ett verb på knappen, aldrig ett substantiv.
    </KText>
  );

  return (
    <SpecCard title="Knappar" intro={intro}>
      <SpecSection
        title="Type variants"
        description="Four types establish hierarchy — primary (one per view, the main CTA), secondary (support actions), ghost (low-priority), transparent (minimal / inline). Height 48px (tap-safe on iOS & Android) · radius 12px · 8px gap."
      >
        <KButton label="Spara faktura" variant="primary" />
        <KButton label="Avbryt" variant="secondary" />
        <KButton label="Förhandsgranska" variant="ghost" />
        <KButton label="Läs mer" variant="transparent" />
      </SpecSection>

      <SpecSection
        title="Mobile shapes — block & large"
        description="On a phone the main action is a full-width block button; --lg (56px) is the prominent sticky-bottom CTA. --sm (40px) is for compact controls inside dense rows."
        frame="col"
      >
        <KButton label="Granska & godkänn" variant="primary" size="lg" block />
        <KButton label="Visa detaljer" variant="secondary" block />
        <View style={styles.smRow}>
          <KButton label="Filtrera" variant="ghost" size="sm" />
          <KButton label="Sortera" variant="secondary" size="sm" />
        </View>
      </SpecSection>

      <SpecSection
        title="States — primary"
        description="Default · hover (pointer) · pressed (active) · focus (keyboard) · disabled (action unavailable)."
      >
        <StateCell label="Default" center>
          <KButton label="Skicka" variant="primary" />
        </StateCell>
        <StateCell label="Hover" center>
          <KButton label="Skicka" variant="primary" />
        </StateCell>
        <StateCell label="Pressed" center>
          <KButton label="Skicka" variant="primary" />
        </StateCell>
        <StateCell label="Focus" center>
          <KButton label="Skicka" variant="primary" />
        </StateCell>
        <StateCell label="Disabled" center>
          <KButton label="Skicka" variant="primary" disabled />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="States — secondary · ghost · transparent"
        description="Default · hover · disabled for the non-primary types. Disabled stays visible to show the action exists but is unavailable."
      >
        <StateCell label="Secondary" center>
          <KButton label="Exportera" variant="secondary" />
        </StateCell>
        <StateCell label="Hover" center>
          <KButton label="Exportera" variant="secondary" />
        </StateCell>
        <StateCell label="Disabled" center>
          <KButton label="Exportera" variant="secondary" disabled />
        </StateCell>
        <StateCell label="Ghost" center>
          <KButton label="Detaljer" variant="ghost" />
        </StateCell>
        <StateCell label="Hover" center>
          <KButton label="Detaljer" variant="ghost" />
        </StateCell>
        <StateCell label="Disabled" center>
          <KButton label="Detaljer" variant="ghost" disabled />
        </StateCell>
        <StateCell label="Transparent" center>
          <KButton label="Ångra" variant="transparent" />
        </StateCell>
        <StateCell label="Hover" center>
          <KButton label="Ångra" variant="transparent" />
        </StateCell>
        <StateCell label="Disabled" center>
          <KButton label="Ångra" variant="transparent" disabled />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="With icons — leading · trailing"
        description="Leading icon for action context (download, add); trailing icon for direction or disclosure (dropdown, external link)."
      >
        <KButton
          label="Ladda ner dokument"
          variant="primary"
          leading={<KIcon name="arrowDown" size={20} color={c.onDark} />}
        />
        <KButton
          label="Öppna rapport"
          variant="secondary"
          trailing={<KIcon name="external" size={20} color={c.ink} />}
        />
        <KButton
          label="Importera data"
          variant="secondary"
          leading={<KIcon name="upload" size={20} color={c.ink} />}
        />
        <KButton
          label="Filter"
          variant="transparent"
          trailing={<KIcon name="swap" size={20} color={c.action} />}
        />
        <KButton
          label="Tillbaka"
          variant="transparent"
          leading={<KIcon name="arrowR" size={20} color={c.action} />}
        />
      </SpecSection>

      <SpecSection
        title="Action group — confirm / cancel"
        description="Dialog and modal footers: primary on the right for the main confirmation, secondary for cancel. One primary per dialog, right-aligned."
        frame="spread"
      >
        <KButton label="Avbryt" variant="secondary" />
        <KButton label="Godkänn utbetalning" variant="primary" />
      </SpecSection>

      <SpecSection
        title="Destructive action"
        description="Destructive actions use the ghost or transparent type to avoid over-emphasising risky operations. Never place “Ta bort” immediately beside “Spara” — separate it spatially or behind a confirmation dialog."
        frame="spread"
      >
        <KButton
          label="Ta bort post"
          variant="danger"
          leading={<KIcon name="trash" size={20} color={c.danger} />}
        />
        <View style={styles.smRow}>
          <KButton label="Spara ändringar" variant="primary" />
          <KButton label="Behåll post" variant="secondary" />
        </View>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Height', value: '48px (sm 40 · lg 56)' },
            { name: 'Radius', value: '12px (r-button)' },
            { name: 'Padding', value: '24px (0 icon-only)' },
            { name: 'Gap', value: '8px' },
            { name: 'Icon', value: '20px' },
            { name: 'Label', value: '16px / 600' },
            { name: 'Tap target', value: '≥ 48px' },
            { name: 'Press', value: 'scale 0.97' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: <KButton label="Godkänn utbetalning" variant="approve" />,
            caption: 'Green carries the positive, go-ahead action.',
          },
          dont: {
            stage: (
              <View style={[styles.redBtn, { backgroundColor: c.red, borderRadius: theme.radii.button }]}>
                <KText variant="body" weight="600" color="#fff">
                  Godkänn utbetalning
                </KText>
              </View>
            ),
            caption: 'Red on approve reads as destructive — never do this.',
          },
        }}
        dos={[
          'Keep one clear primary action per screen; make it a full-width --block on the phone.',
          'Put a verb on the label — the action, not the feature name.',
          'Use --approve (green) for save/approve, --danger only for destructive.',
        ]}
        donts={[
          'Use red for save or approve.',
          'Show two primary buttons competing on one screen.',
          'Place “Ta bort” right beside “Spara” — separate it or gate it behind a confirm.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  smRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap' },
  redBtn: {
    height: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
