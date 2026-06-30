// Återkoppling — mirrors preview/feedback-mobile.html.
// Banner for in-flow status (four tones), snackbar/toast for transient confirmation.
// Banners use the real KBanner inline; the transient snackbar is shown via a trigger
// button + useState using the real KSnackbar. Anatomy + dos & don'ts.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KBanner, KSnackbar, KButton, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function FeedbackSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [snackVisible, setSnackVisible] = useState(false);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Banner för status i flödet, snackbar för övergående bekräftelse med en åtgärd, toast för en
      snabb kvittens.
    </KText>
  );

  return (
    <SpecCard title="Återkoppling" intro={intro}>
      <SpecSection
        title="Banner — inline status"
        description="An in-flow block that explains the state of the screen. Four tones map to the semantic colours: info, ok, warn, danger. Leading icon, a short title, optional detail and an optional dismiss. Persistent — it stays until the condition clears or the user closes it."
        frame="col"
      >
        <KBanner
          tone="info"
          title="Time är inte kopplat till Lön"
          message="Koppla Time så fylls tidrapporterna i automatiskt."
          leading={<KIcon name="info" size={20} color={c.infoText} strokeWidth={1.9} />}
        />
        <KBanner
          tone="ok"
          title="Majkörningen är godkänd"
          message="Utbetalning sker 25 maj till 32 anställda."
          leading={<KIcon name="checkCirc" size={20} color={c.okText} strokeWidth={1.9} />}
        />
        <KBanner
          tone="warn"
          title="3 tidrapporter saknar attest"
          message="Sista dag för majkörningen är 23 maj."
          leading={<KIcon name="warn" size={20} color={c.warnText} strokeWidth={1.9} />}
        />
        <KBanner
          tone="danger"
          title="Utbetalningen misslyckades"
          message="Kontonumret för Erik Holm kunde inte verifieras."
          leading={<KIcon name="close" size={20} color={c.dangerText} strokeWidth={1.9} />}
        />
      </SpecSection>

      <SpecSection
        title="Snackbar & toast — transient"
        description="Brief, self-dismissing confirmations that float near the bottom. A snackbar carries text and at most one action (e.g. Ångra); neither blocks the UI. Tap the button to trigger one."
        frame="col"
      >
        <KButton
          label={snackVisible ? 'Snackbar visas…' : 'Visa snackbar'}
          variant="secondary"
          onPress={() => setSnackVisible(true)}
        />
        <KSnackbar
          visible={snackVisible}
          message="Tidrapport för Erik Holm godkänd"
          actionLabel="Ångra"
          onAction={() => setSnackVisible(false)}
        />
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Banner', value: 'semantic soft bg + tinted border' },
            { name: 'Snackbar', value: 'Deepest-Ground pill · mint action' },
            { name: 'Toast', value: 'pill, 18px confirming icon' },
            { name: 'Action', value: 'max one per snackbar' },
            { name: 'Persistence', value: 'banner stays · toast auto-hides' },
          ]}
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Use a banner for in-flow status, a snackbar for transient confirmation with one action, a toast for a quick ack.',
          'Make optimistic mutations reversible with an Undo snackbar.',
          'Auto-dismiss snackbars (3s; 5s with an action) and carry a tone glyph.',
        ]}
        donts={[
          'Stack multiple snackbars — replace the previous one.',
          'Put more than one action in a snackbar.',
          'Use a transient toast for an error that needs the user to act — use a banner.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
});
