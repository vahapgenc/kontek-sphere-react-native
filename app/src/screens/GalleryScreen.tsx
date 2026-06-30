// Dev-only component gallery — renders the design-system components for
// side-by-side comparison against design/Kontek Design System/preview/*.html.
import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import {
  KText,
  KButton,
  KBadge,
  KCard,
  KAvatar,
  KIconTile,
  KIcon,
  KTextField,
  KTextArea,
  KSearchField,
  KSelect,
  KCheckbox,
  KRadio,
  KSwitch,
  KSegmentedControl,
  KListCard,
  KListRow,
  KStatusRow,
  KSteps,
  KSectionLabel,
  KBanner,
  KInfoNote,
  KSkeleton,
  KSpinner,
  KBottomSheet,
  KDialog,
  KOptionCard,
  KImpactCard,
  KAttachment,
} from '../components';

export function GalleryScreen() {
  const theme = useTheme();
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('a');
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState('week');
  const [sheet, setSheet] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [picked, setPicked] = useState(false);

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

      <Section title="Icons">
        <View style={styles.row}>
          {(['home', 'payslip', 'calendar', 'receipt', 'bell', 'user', 'check', 'plus'] as const).map(
            (n) => (
              <KIcon key={n} name={n} />
            ),
          )}
        </View>
      </Section>

      <Section title="Buttons">
        <KButton label="Primary" variant="primary" block />
        <KButton label="Secondary" variant="secondary" block />
        <KButton label="Approve" variant="approve" block />
        <KButton label="Secondary CTA" variant="secondaryCta" block />
        <KButton label="Ghost" variant="ghost" block />
        <KButton label="Danger" variant="danger" block />
        <KButton label="With icon" variant="primary" block leading={<KIcon name="plus" size={20} color="#fff" />} />
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

      <Section title="Avatar & icon tile">
        <View style={styles.row}>
          <KAvatar initials="SL" size="lg" />
          <KAvatar initials="AB" size="lg" tone="forest" presence="online" />
          <KAvatar initials="MK" size="lg" tone="soft" />
          <KIconTile icon="receipt" tone="brand" />
          <KIconTile icon="calendar" tone="soft" />
        </View>
      </Section>

      <Section title="Inputs">
        <KTextField label="E-post" value={text} onChangeText={setText} placeholder="namn@företag.se" />
        <KTextArea label="Anteckning" value={text} onChangeText={setText} placeholder="Skriv här…" />
        <KSearchField value={search} onChangeText={setSearch} placeholder="Sök" />
        <KSelect label="Kategori" placeholder="Välj kategori" onPress={() => {}} />
        <View style={styles.row}>
          <KCheckbox checked={checked} onChange={setChecked} label="Jag godkänner" />
        </View>
        <View style={styles.row}>
          <KRadio selected={radio === 'a'} onChange={() => setRadio('a')} label="Alt A" />
          <KRadio selected={radio === 'b'} onChange={() => setRadio('b')} label="Alt B" />
        </View>
        <View style={styles.row}>
          <KSwitch value={on} onValueChange={setOn} />
        </View>
        <KSegmentedControl
          options={[
            { label: 'Vecka', value: 'week' },
            { label: 'Månad', value: 'month' },
          ]}
          value={seg}
          onChange={setSeg}
        />
      </Section>

      <Section title="List & status">
        <KListCard header="Mina registreringar">
          <KListRow
            title="Stämpel"
            subtitle="Mån 30 jun · 08:00–16:30"
            leading={<KIconTile icon="clock" tone="brand" />}
            trailing={<KBadge label="Godkänd" tone="ok" />}
          />
          <KListRow
            title="Utlägg saknar kvitto"
            subtitle="Lunch · 240 kr"
            leading={<KIconTile icon="receipt" tone="brand" />}
            trailing={<KBadge label="Åtgärda" tone="warn" />}
            onPress={() => {}}
          />
        </KListCard>
        <KStatusRow label="Semesterdagar kvar" status="18 dagar" tone="ok" />
        <KSteps total={4} current={2} />
        <KSectionLabel action="Visa alla" onAction={() => {}}>
          ATT GÖRA
        </KSectionLabel>
      </Section>

      <Section title="Feedback">
        <KBanner tone="info" title="Info" message="Din lön betalas ut 25 juni." />
        <KBanner tone="danger" message="Intyg saknas — ladda upp." />
        <KInfoNote tone="warn" title="Varför behövs detta?">
          <KText variant="bodySm">Sjukperioder över 7 dagar kräver läkarintyg.</KText>
        </KInfoNote>
        <View style={styles.row}>
          <KSkeleton width={120} height={16} />
          <KSpinner />
        </View>
      </Section>

      <Section title="Flow primitives">
        <KOptionCard
          icon={<KIcon name="heart" />}
          title="Sjukfrånvaro"
          description="Anmäl sjukdom"
          selected
          onPress={() => {}}
        />
        <KImpactCard
          amount="−1 240 kr"
          lines={[
            { label: 'Bruttoavdrag', value: '−1 600 kr', negative: true },
            { label: 'Skatteeffekt', value: '+360 kr' },
          ]}
          payday="Utbetalas 25 juni"
        />
        <KAttachment
          label="Läkarintyg"
          hint="PDF eller bild"
          value={picked ? { name: 'intyg.pdf' } : undefined}
          onPick={() => setPicked(true)}
        />
      </Section>

      <Section title="Overlays">
        <KButton label="Öppna bottom sheet" variant="secondary" block onPress={() => setSheet(true)} />
        <KButton label="Öppna dialog" variant="secondary" block onPress={() => setDialog(true)} />
      </Section>

      <KBottomSheet visible={sheet} onClose={() => setSheet(false)} title="Snabbåtgärder" subtitle="Vad vill du registrera?">
        <KListRow title="Frånvaro" leading={<KIconTile icon="calendar" tone="brand" />} onPress={() => setSheet(false)} />
        <KListRow title="Utlägg" leading={<KIconTile icon="receipt" tone="brand" />} onPress={() => setSheet(false)} />
      </KBottomSheet>

      <KDialog
        visible={dialog}
        onClose={() => setDialog(false)}
        title="Logga ut?"
        message="Du loggas ut från appen."
        primaryLabel="Logga ut"
        onPrimary={() => setDialog(false)}
        secondaryLabel="Avbryt"
        onSecondary={() => setDialog(false)}
      />
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
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, alignItems: 'center' },
});
