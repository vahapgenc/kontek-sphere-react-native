// Dialog — mirrors preview/dialog.html.
// A centred modal for irreversible confirmations and blocking errors. Actions stack
// full-width with the primary on top; destructive confirms use the danger button.
// Demos open the real KDialog via trigger buttons.
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KButton, KDialog } from '../../../components';
import { useTheme } from '../../../theme';

export function DialogSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Centrerad modal för bekräftelser. Reservera den för{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>irreversibla</KText> steg;
      reversibla åtgärder använder optimistisk ångra.
    </KText>
  );

  return (
    <SpecCard title="Dialog" intro={intro}>
      <SpecSection
        title="Dialog"
        description="A centred modal for decisions that must happen before anything else — confirming an irreversible action or surfacing a blocking error. Actions stack full-width with the primary on top; short either/or choices may sit side by side. Destructive confirmations use the danger button."
        frame="col"
      >
        <StateCell label="Confirm — stacked actions">
          <KButton label="Godkänn utbetalning" variant="primary" onPress={() => setConfirmOpen(true)} />
        </StateCell>
        <StateCell label="Destructive — danger confirm">
          <KButton label="Avbryt körningen" variant="danger" onPress={() => setDestructiveOpen(true)} />
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" frame="default">
        <AnatomyList
          items={[
            { name: 'Width', value: 'max 360px, gutter margin' },
            { name: 'Radius', value: '24px (r-sheet)' },
            { name: 'Icon', value: '48px tonal circle' },
            { name: 'Title', value: '19px / 700' },
            { name: 'Actions', value: 'stacked (primary top) or --row' },
            { name: 'Scrim', value: 'ground @ 50%' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Reserve the dialog for irreversible or high-stakes confirmations.',
          'Use the --danger button + danger icon for destructive confirms.',
          'Stack actions full-width with the primary on top.',
        ]}
        donts={[
          'Pop a dialog to confirm a reversible action — use optimistic undo.',
          'Colour a destructive confirm green, or a safe one red.',
          'Offer more than two choices in a confirmation dialog.',
        ]}
      />

      <KDialog
        visible={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Godkänn utbetalning?"
        message="1,24 Mkr betalas ut till 32 anställda den 25 maj. Detta går inte att ångra efter kl. 12.00."
        primaryLabel="Godkänn & betala ut"
        onPrimary={() => setConfirmOpen(false)}
        secondaryLabel="Inte än"
        onSecondary={() => setConfirmOpen(false)}
      />

      <KDialog
        visible={destructiveOpen}
        onClose={() => setDestructiveOpen(false)}
        title="Avbryt körningen?"
        message="All inmatning för maj raderas. Det går inte att återställa."
        primaryLabel="Avbryt körning"
        onPrimary={() => setDestructiveOpen(false)}
        secondaryLabel="Behåll"
        onSecondary={() => setDestructiveOpen(false)}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
