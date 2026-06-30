// Bottenark — mirrors preview/bottom-sheet.html.
// Slides up over a dimmed scrim with a grab handle. Two patterns: a content sheet
// (title, copy, controls) and an action sheet (stacked choices, destructive in red).
// Demos open the real KBottomSheet via trigger buttons.
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon, KButton, KBottomSheet, type IconName } from '../../../components';
import { useTheme } from '../../../theme';

function ActionItem({ icon, label, danger, onPress }: { icon: IconName; label: string; danger?: boolean; onPress: () => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const tint = danger ? c.danger : c.ink;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.item,
        { borderRadius: theme.radii.input },
        pressed ? { backgroundColor: c.surface2 } : null,
      ]}
    >
      <KIcon name={icon} size={20} color={tint} strokeWidth={1.85} />
      <KText variant="body" weight="500" color={tint}>{label}</KText>
    </Pressable>
  );
}

export function BottomSheetSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [contentOpen, setContentOpen] = useState(false);
  const [actionOpen, setActionOpen] = useState(false);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Glider upp över en dimmad scrim med grepphandtag. Åtgärdsarket staplar
      helbredds-val — t.ex. Register-navet.
    </KText>
  );

  return (
    <SpecCard title="Bottenark" intro={intro}>
      <SpecSection
        title="Bottom sheet"
        description="Slides up from the bottom edge over a dimmed scrim — the mobile substitute for a popover or dropdown. A grab handle signals it's draggable. Two patterns: a content sheet (title, copy and any controls) and an action sheet (a stacked list of choices, with destructive actions in red)."
        frame="col"
      >
        <StateCell label="Content sheet">
          <KButton label="Öppna innehållsark" variant="secondary" onPress={() => setContentOpen(true)} />
        </StateCell>
        <StateCell label="Action sheet — destructive in red">
          <KButton label="Öppna åtgärdsark" variant="secondary" onPress={() => setActionOpen(true)} />
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" frame="default">
        <AnatomyList
          items={[
            { name: 'Top radius', value: '24px (r-sheet)' },
            { name: 'Grip', value: '40×5px, line colour' },
            { name: 'Scrim', value: 'ground @ 42%' },
            { name: 'Item', value: '≥48px tap, 16px label' },
            { name: 'Max height', value: '88% · scrolls' },
            { name: 'Safe area', value: 'pads --safe-bottom' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Slide the sheet over the --scrim with a grab handle and a 24px top radius.',
          "Use the action-sheet variant for the Register hub's stacked choices.",
          'Keep the sheet below the tab bar; semibold (600) titles.',
        ]}
        donts={[
          'Open a sheet with no scrim or no way to dismiss.',
          'Overfill it — a sheet is a focused choice, not a full screen.',
          'Bold (700) the sheet title; sheet headings are semibold.',
        ]}
      />

      <KBottomSheet
        visible={contentOpen}
        onClose={() => setContentOpen(false)}
        title="Lägg till modul"
        subtitle="Koppla på fler funktioner. De aktiveras direkt och faktureras per anställd."
      >
        <View style={styles.list}>
          <ActionItem icon="wallet" label="Pension & försäkring" onPress={() => setContentOpen(false)} />
          <ActionItem icon="plus" label="Reseräkningar" onPress={() => setContentOpen(false)} />
        </View>
        <View style={styles.cta}>
          <KButton label="Utforska alla" variant="primary" size="lg" block onPress={() => setContentOpen(false)} />
        </View>
      </KBottomSheet>

      <KBottomSheet
        visible={actionOpen}
        onClose={() => setActionOpen(false)}
        title="Körning"
        subtitle="Vad vill du göra med majkörningen?"
      >
        <View style={styles.list}>
          <ActionItem icon="arrowDown" label="Ladda ner underlag" onPress={() => setActionOpen(false)} />
          <ActionItem icon="edit" label="Redigera körning" onPress={() => setActionOpen(false)} />
          <ActionItem icon="trash" label="Avbryt körning" danger onPress={() => setActionOpen(false)} />
        </View>
      </KBottomSheet>
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  list: { gap: 4 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  cta: { marginTop: 14 },
});
