// Dev-only component gallery — renders the design-system components for
// side-by-side comparison against design/Kontek Design System/preview/*.html.
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { KText, KButton, KBadge, KCard } from '../components';

export function GalleryScreen() {
  const theme = useTheme();
  return (
    <ScrollView
      style={{ backgroundColor: theme.colors.canvas }}
      contentContainerStyle={styles.content}
    >
      <KText variant="h1">Component gallery</KText>

      <Section title="Typography">
        <KText variant="display">Display 36</KText>
        <KText variant="h2">Heading 2</KText>
        <KText variant="title">Title 17</KText>
        <KText variant="body">Body 16 — default UI text.</KText>
        <KText variant="caption">Caption 13 — helper text.</KText>
        <KText variant="eyebrow">EYEBROW</KText>
      </Section>

      <Section title="Buttons">
        <KButton label="Primary" variant="primary" block />
        <KButton label="Secondary" variant="secondary" block />
        <KButton label="Approve" variant="approve" block />
        <KButton label="Secondary CTA" variant="secondaryCta" block />
        <KButton label="Ghost" variant="ghost" block />
        <KButton label="Danger" variant="danger" block />
        <KButton label="Disabled" variant="primary" block disabled />
      </Section>

      <Section title="Badges">
        <View style={styles.row}>
          <KBadge label="Godkänd" tone="ok" />
          <KBadge label="Väntar" tone="info" />
          <KBadge label="Åtgärda" tone="warn" />
          <KBadge label="Nekad" tone="danger" />
          <KBadge label="Neutral" tone="neutral" />
        </View>
      </Section>

      <Section title="Card">
        <KCard>
          <KText variant="title">Floating card</KText>
          <KText variant="bodySm">The lift does the separation — no border.</KText>
        </KCard>
      </Section>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <KText variant="eyebrow">{title}</KText>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, gap: 24, paddingBottom: 64 },
  section: { gap: 12 },
  sectionBody: { gap: 12 },
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
});
