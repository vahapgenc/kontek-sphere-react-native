// Optimistisk ångra — mirrors preview/optimistic-undo.html.
// Every approval is optimistic: the item leaves the list at once and a dark snackbar
// offers Ångra (Undo), which restores it to its original position. Demo uses the real
// KOptimisticUndo with a live Godkänn / Ångra toggle.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KButton, KOptimisticUndo } from '../../../components';
import { useTheme } from '../../../theme';

export function OptimisticUndoSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [acted, setActed] = useState(false);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Varje godkännande är{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>optimistiskt</KText>: posten
      lämnar listan direkt och en mörk snackbar erbjuder Ångra.
    </KText>
  );

  return (
    <SpecCard title="Optimistisk ångra" intro={intro}>
      <SpecSection
        title="Approvals with optimistic undo"
        description="Managers approve or reject single items — or approve all. Every action is optimistic: the item leaves the list immediately and a dark snackbar appears with an Undo that restores it to its original position. Snackbars auto-dismiss (3s; 5s when they carry an action) and carry a tone glyph."
        frame="col"
      >
        <StateCell label="Live — tryck Godkänn, sedan Ångra i snackbaren">
          <View style={styles.demo}>
            <KOptimisticUndo
              initials="ML"
              name="Maria Lund"
              detail="Utlägg · 480 kr"
              actedDetail="Godkänd"
              statusLabel="Granska"
              statusTone="info"
              acted={acted}
              snackbarMessage="Utlägg godkänt"
              undoLabel="Ångra"
              onUndo={() => setActed(false)}
            />
            <KButton
              label={acted ? 'Återställ rad' : 'Godkänn'}
              variant={acted ? 'secondary' : 'approve'}
              onPress={() => setActed((v) => !v)}
            />
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Three states"
        description="1 · Pending — manager taps Godkänn. 2 · Optimistic — row leaves the list at once, no spinner. 3 · Reversible — Ångra restores it to its exact position; auto-dismiss 5s."
        frame="col"
      >
        <StateCell label="1 · Pending">
          <KOptimisticUndo
            initials="ML"
            name="Maria Lund"
            detail="Utlägg · 480 kr"
            statusLabel="Granska"
            statusTone="info"
            acted={false}
          />
        </StateCell>
        <StateCell label="2 · Optimistic — row gone (faded, struck, green check)">
          <KOptimisticUndo
            initials="ML"
            name="Maria Lund"
            detail="Utlägg · 480 kr"
            actedDetail="Godkänd"
            acted
          />
        </StateCell>
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Apply the mutation immediately and confirm with a snackbar — never block on a spinner.',
          'Offer Ångra that restores the item to its original position.',
          'Auto-dismiss after 3s, or 5s when the snackbar carries an action; carry a tone glyph (check / ×).',
        ]}
        donts={[
          'Pop a confirmation dialog for a reversible approve/reject.',
          'Stack multiple snackbars — replace the previous one.',
          'Use a destructive (red) treatment for approve — green is go.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  demo: { width: '100%', gap: 14 },
});
