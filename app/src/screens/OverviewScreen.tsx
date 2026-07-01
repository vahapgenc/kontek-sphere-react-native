// Design System Overview — native port of design/Kontek Design System/Design System Overview.html.
// Header + intro panel + search toolbar + collapsible Atoms/Molecules/Organisms groups,
// each item expandable to a live component preview.
import React, { useMemo, useState } from 'react';
import { ScrollView, View, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../theme';
import {
  KText,
  KButton,
  KBadge,
  KCard,
  KPayHero,
  KAvatar,
  KIconTile,
  KIcon,
  type IconName,
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
  KBanner,
  KSnackbar,
  KInfoNote,
  KSkeleton,
  KSpinner,
  KAppBar,
  KTabBar,
  KFab,
  KBottomSheet,
  KDialog,
  KOptionCard,
  KImpactCard,
  KAttachment,
  KSuccess,
} from '../components';

type DemoItem = { name: string; subtitle: string; render: () => React.ReactNode };
type DemoGroup = { name: string; items: DemoItem[] };

export function OverviewScreen() {
  const theme = useTheme();
  const c = theme.colors;

  // interactive demo state
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState(true);
  const [radio, setRadio] = useState('a');
  const [on, setOn] = useState(true);
  const [seg, setSeg] = useState('week');
  const [field, setField] = useState('');
  const [sheet, setSheet] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [snack, setSnack] = useState(false);
  const [picked, setPicked] = useState(false);

  const groups = useMemo<DemoGroup[]>(
    () => buildGroups({
      c,
      checked, setChecked,
      radio, setRadio,
      on, setOn,
      seg, setSeg,
      field, setField,
      openSheet: () => setSheet(true),
      openDialog: () => setDialog(true),
      showSnack: () => setSnack(true),
      picked, pick: () => setPicked(true),
    }),
    [c, checked, radio, on, seg, field, picked],
  );

  // expand / collapse state
  const allKeys = useMemo(
    () => groups.flatMap((g) => g.items.map((i) => `${g.name}:${i.name}`)),
    [groups],
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const q = query.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({
      ...g,
      items: q ? g.items.filter((i) => i.name.toLowerCase().includes(q)) : g.items,
    }))
    .filter((g) => g.items.length > 0);

  const shownCount = filtered.reduce((n, g) => n + g.items.length, 0);

  const toggleItem = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  const toggleGroup = (name: string) =>
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });

  return (
    <>
      <ScrollView style={{ backgroundColor: c.canvas }} contentContainerStyle={styles.wrap}>
        {/* Header */}
        <KText variant="eyebrow" color={c.greenDeep}>
          Kontek
        </KText>
        <KText variant="h1" style={styles.title}>
          Design system — Mobile
        </KText>
        <KText variant="body" color={c.ink3} style={styles.lede}>
          En överblick av hela systemet, ordnat i atomer, molekyler och organismer. Tryck på
          en rubrik för att fälla ut specifikationen.
        </KText>

        {/* Intro panel */}
        <View style={styles.intro}>
          <IntroCard
            icon="building"
            title="Struktur"
            body="Systemet följer atomär design — små delar byggs ihop till större. Alla färger, typsnitt och avstånd kommer från en källa: colors_and_type.css."
          />
          <IntroCard
            icon="globe"
            title="Varför använda det"
            body="En gemensam källa gör att appen ser likadan ut på iPhone och Android. Tumvänligt med 48px tryckytor, 16px brödtext, och färger som bär mening."
          />
          <IntroCard
            icon="checkCirc"
            title="Så använder du det"
            body="Tryck på ett kort för att se komponenten live. Sök på namn nedan. Återanvänd token ur colors_and_type.css — hitta aldrig på egna färger."
          />
        </View>

        {/* Toolbar */}
        <View style={styles.toolbar}>
          <KSearchField value={query} onChangeText={setQuery} placeholder="Filtrera på namn…" />
          <View style={styles.toolbarBtns}>
            <KButton label="Fäll ut alla" variant="secondary" size="sm" onPress={() => setExpanded(new Set(allKeys))} />
            <KButton label="Fäll ihop alla" variant="secondary" size="sm" onPress={() => setExpanded(new Set())} />
          </View>
          <KText variant="caption" color={c.ink3}>
            Visar {shownCount} av {allKeys.length}
          </KText>
        </View>

        {/* Groups */}
        {filtered.map((g) => {
          const groupCollapsed = collapsedGroups.has(g.name);
          return (
            <View key={g.name} style={styles.group}>
              <Pressable style={styles.groupHead} onPress={() => toggleGroup(g.name)}>
                <KIcon name={groupCollapsed ? 'chevR' : 'chevD'} size={18} color={c.ink3} />
                <KText variant="caption" weight="700" color={c.ink2} style={styles.groupName}>
                  {g.name.toUpperCase()}
                </KText>
                <View style={[styles.countPill, { backgroundColor: c.greenSoft }]}>
                  <KText variant="micro" weight="600" color={c.greenDeep}>
                    {g.items.length}
                  </KText>
                </View>
              </Pressable>

              {!groupCollapsed &&
                g.items.map((item) => {
                  const key = `${g.name}:${item.name}`;
                  const open = expanded.has(key);
                  return (
                    <View
                      key={key}
                      style={[
                        styles.item,
                        { borderColor: open ? c.greenLine : c.line, backgroundColor: c.surface },
                      ]}
                    >
                      <Pressable style={styles.itemHead} onPress={() => toggleItem(key)}>
                        <KIcon name="chevR" size={18} color={open ? c.signature : c.ink3} />
                        <View style={styles.itemText}>
                          <KText variant="title" color={open ? c.signature : c.ink}>
                            {item.name}
                          </KText>
                          <KText variant="caption" color={c.ink3}>
                            {item.subtitle}
                          </KText>
                        </View>
                      </Pressable>
                      {open ? (
                        <View style={[styles.itemBody, { borderTopColor: c.line, backgroundColor: c.canvas }]}>
                          {item.render()}
                        </View>
                      ) : null}
                    </View>
                  );
                })}
            </View>
          );
        })}

        {shownCount === 0 ? (
          <KText variant="body" color={c.ink4} style={styles.empty}>
            Inga komponenter matchar ”{query}”.
          </KText>
        ) : null}
      </ScrollView>

      {/* Overlays driven from demos */}
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
      <KSnackbar
        visible={snack}
        message="Frånvaro borttagen"
        actionLabel="Ångra"
        onAction={() => setSnack(false)}
      />
    </>
  );
}

function IntroCard({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  const theme = useTheme();
  return (
    <KCard style={styles.introCard}>
      <View style={[styles.introIc, { backgroundColor: theme.colors.greenSoft }]}>
        <KIcon name={icon} size={20} color={theme.colors.greenDeep} />
      </View>
      <KText variant="h3">{title}</KText>
      <KText variant="bodySm" color={theme.colors.ink2}>
        {body}
      </KText>
    </KCard>
  );
}

// ---- demo content ----------------------------------------------------------

type DemoCtx = {
  c: ReturnType<typeof useTheme>['colors'];
  checked: boolean; setChecked: (v: boolean) => void;
  radio: string; setRadio: (v: string) => void;
  on: boolean; setOn: (v: boolean) => void;
  seg: string; setSeg: (v: string) => void;
  field: string; setField: (v: string) => void;
  openSheet: () => void;
  openDialog: () => void;
  showSnack: () => void;
  picked: boolean; pick: () => void;
};

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.demoRow}>{children}</View>;
}
function Stack({ children }: { children: React.ReactNode }) {
  return <View style={styles.demoStack}>{children}</View>;
}

function buildGroups(ctx: DemoCtx): DemoGroup[] {
  const { c } = ctx;
  const swatches: { key: string; value: string }[] = [
    { key: 'signature', value: c.signature },
    { key: 'green', value: c.green },
    { key: 'statusBadge', value: c.statusBadge },
    { key: 'kontekGreen', value: c.kontekGreen },
    { key: 'ok', value: c.ok },
    { key: 'warn', value: c.warn },
    { key: 'danger', value: c.danger },
    { key: 'info', value: c.info },
    { key: 'ink', value: c.ink },
    { key: 'canvas', value: c.canvas },
  ];

  return [
    {
      name: 'Atoms',
      items: [
        {
          name: 'Colors',
          subtitle: 'Brand + status swatches',
          render: () => (
            <Row>
              {swatches.map((s) => (
                <View key={s.key} style={styles.swatchWrap}>
                  <View style={[styles.swatch, { backgroundColor: s.value, borderColor: c.line }]} />
                  <KText variant="micro" color={c.ink3}>{s.key}</KText>
                </View>
              ))}
            </Row>
          ),
        },
        {
          name: 'Typography',
          subtitle: 'Display → micro scale',
          render: () => (
            <Stack>
              <KText variant="display">Display 36</KText>
              <KText variant="h1">Heading 1</KText>
              <KText variant="h2">Heading 2</KText>
              <KText variant="title">Title 17</KText>
              <KText variant="body">Body 16</KText>
              <KText variant="caption">Caption 13</KText>
              <KText variant="eyebrow">EYEBROW 12</KText>
            </Stack>
          ),
        },
        {
          name: 'Spacing',
          subtitle: '4px base scale',
          render: () => (
            <Stack>
              {[4, 8, 12, 16, 24, 32].map((w) => (
                <View key={w} style={styles.spaceRow}>
                  <View style={{ width: w, height: 12, backgroundColor: c.green, borderRadius: 2 }} />
                  <KText variant="micro" color={c.ink3}>{w}px</KText>
                </View>
              ))}
            </Stack>
          ),
        },
        {
          name: 'Corner radius',
          subtitle: 'sm → sheet → pill',
          render: () => (
            <Row>
              {[8, 12, 16, 20, 24].map((r) => (
                <View key={r} style={[styles.radiusBox, { borderRadius: r, backgroundColor: c.surface2, borderColor: c.line }]}>
                  <KText variant="micro" color={c.ink3}>{r}</KText>
                </View>
              ))}
            </Row>
          ),
        },
        {
          name: 'Icons',
          subtitle: 'Stroke icon set',
          render: () => (
            <Row>
              {(['home', 'payslip', 'calendar', 'receipt', 'bell', 'user', 'check', 'plus', 'clock', 'wallet', 'plane', 'heart'] as IconName[]).map((n) => (
                <KIcon key={n} name={n} />
              ))}
            </Row>
          ),
        },
      ],
    },
    {
      name: 'Molecules',
      items: [
        { name: 'Buttons', subtitle: '7 variants · 3 sizes', render: () => (
          <Stack>
            <KButton label="Primary" variant="primary" block />
            <KButton label="Secondary" variant="secondary" block />
            <KButton label="Approve" variant="approve" block />
            <KButton label="Secondary CTA" variant="secondaryCta" block />
            <KButton label="Danger" variant="danger" block />
          </Stack>
        ) },
        { name: 'Badges', subtitle: 'Status pills', render: () => (
          <Row>
            <KBadge label="Godkänd" tone="ok" />
            <KBadge label="Väntar" tone="info" />
            <KBadge label="Åtgärda" tone="warn" />
            <KBadge label="Nekad" tone="danger" />
          </Row>
        ) },
        { name: 'Avatar', subtitle: 'Initials · presence', render: () => (
          <Row>
            <KAvatar initials="SL" size="lg" />
            <KAvatar initials="AB" size="lg" tone="forest" presence="online" />
            <KAvatar initials="MK" size="lg" tone="soft" />
          </Row>
        ) },
        { name: 'Icon tiles & chips', subtitle: 'Brand / soft', render: () => (
          <Row>
            <KIconTile icon="receipt" tone="brand" />
            <KIconTile icon="calendar" tone="soft" />
            <KIconTile icon="wallet" tone="brand" />
          </Row>
        ) },
        { name: 'Floating action button', subtitle: 'Mint FAB', render: () => (
          <KFab icon={<KIcon name="plus" color="#122121" />} onPress={ctx.showSnack} />
        ) },
        { name: 'Text input', subtitle: 'Label · hint · error', render: () => (
          <KTextField label="E-post" value={ctx.field} onChangeText={ctx.setField} placeholder="namn@företag.se" />
        ) },
        { name: 'Text area', subtitle: 'Multiline', render: () => (
          <KTextArea label="Anteckning" value={ctx.field} onChangeText={ctx.setField} placeholder="Skriv här…" />
        ) },
        { name: 'Search', subtitle: 'Leading glyph + clear', render: () => (
          <KSearchField value={ctx.field} onChangeText={ctx.setField} placeholder="Sök" />
        ) },
        { name: 'Select', subtitle: 'Field + chevron', render: () => (
          <KSelect label="Kategori" placeholder="Välj kategori" onPress={() => {}} />
        ) },
        { name: 'Checkbox', subtitle: 'Green fill checked', render: () => (
          <KCheckbox checked={ctx.checked} onChange={ctx.setChecked} label="Jag godkänner" />
        ) },
        { name: 'Radio button', subtitle: 'Single select', render: () => (
          <Stack>
            <KRadio selected={ctx.radio === 'a'} onChange={() => ctx.setRadio('a')} label="Alt A" />
            <KRadio selected={ctx.radio === 'b'} onChange={() => ctx.setRadio('b')} label="Alt B" />
          </Stack>
        ) },
        { name: 'Switch', subtitle: '52×32 track', render: () => (
          <KSwitch value={ctx.on} onValueChange={ctx.setOn} />
        ) },
        { name: 'Segmented control', subtitle: 'Active = white seg', render: () => (
          <KSegmentedControl
            options={[{ label: 'Vecka', value: 'week' }, { label: 'Månad', value: 'month' }]}
            value={ctx.seg}
            onChange={ctx.setSeg}
          />
        ) },
        { name: 'List rows', subtitle: 'Inset grouped card', render: () => (
          <KListCard header="Mina registreringar">
            <KListRow title="Stämpel" subtitle="Mån 30 jun · 08:00–16:30" leading={<KIconTile icon="clock" tone="brand" />} trailing={<KBadge label="Godkänd" tone="ok" />} />
            <KListRow title="Utlägg" subtitle="Lunch · 240 kr" leading={<KIconTile icon="receipt" tone="brand" />} trailing={<KBadge label="Åtgärda" tone="warn" />} onPress={() => {}} />
          </KListCard>
        ) },
        { name: 'Floating card', subtitle: 'No border, lift', render: () => (
          <KCard>
            <KText variant="title">Floating card</KText>
            <KText variant="bodySm">Lyftet skapar separationen.</KText>
          </KCard>
        ) },
        { name: 'Pay / hero card', subtitle: 'Soft-mint hero', render: () => (
          <KPayHero
            eyebrow="KOMMANDE LÖN · 25 JUNI"
            amount="24 380 kr"
            badge="Preliminär"
            lines={[{ label: 'Grundlön', value: '26 000 kr' }, { label: 'Skatt', value: '−4 200 kr', negative: true }]}
          />
        ) },
        { name: 'Loading', subtitle: 'Skeleton + spinner', render: () => (
          <Row>
            <KSkeleton width={120} height={16} />
            <KSkeleton width={80} height={16} />
            <KSpinner />
          </Row>
        ) },
        { name: 'Feedback — banner, snackbar, toast', subtitle: 'Inline + transient', render: () => (
          <Stack>
            <KBanner tone="info" title="Info" message="Din lön betalas ut 25 juni." />
            <KBanner tone="danger" message="Intyg saknas — ladda upp." />
            <KButton label="Visa snackbar (ångra)" variant="secondary" block onPress={ctx.showSnack} />
          </Stack>
        ) },
      ],
    },
    {
      name: 'Organisms',
      items: [
        { name: 'App bar', subtitle: 'Compact + large title', render: () => (
          <Stack>
            <KAppBar title="Notiser" onBack={() => {}} />
            <KAppBar title="Hem" large />
          </Stack>
        ) },
        { name: 'Bottom tab bar', subtitle: '5 tabs + badge', render: () => (
          <KTabBar
            activeKey="home"
            onSelect={() => {}}
            items={[
              { key: 'home', label: 'Hem', icon: <KIcon name="home" /> },
              { key: 'payslip', label: 'Lön', icon: <KIcon name="payslip" /> },
              { key: 'bell', label: 'Notiser', icon: <KIcon name="bell" />, badge: 3 },
              { key: 'user', label: 'Profil', icon: <KIcon name="user" /> },
            ]}
          />
        ) },
        { name: 'Status row', subtitle: 'Label + status', render: () => (
          <Stack>
            <KStatusRow label="Semesterdagar kvar" status="18 dagar" tone="ok" />
            <KSteps total={4} current={2} />
          </Stack>
        ) },
        { name: 'Bottom sheet', subtitle: 'Modal + scrim', render: () => (
          <KButton label="Öppna bottom sheet" variant="secondary" block onPress={ctx.openSheet} />
        ) },
        { name: 'Dialog', subtitle: 'Centered modal', render: () => (
          <KButton label="Öppna dialog" variant="secondary" block onPress={ctx.openDialog} />
        ) },
        { name: 'Info note', subtitle: 'Callout', render: () => (
          <KInfoNote tone="warn" title="Varför behövs detta?">
            <KText variant="bodySm">Sjukperioder över 7 dagar kräver läkarintyg.</KText>
          </KInfoNote>
        ) },
        { name: 'Option card', subtitle: 'Flow selector', render: () => (
          <KOptionCard icon={<KIcon name="heart" />} title="Sjukfrånvaro" description="Anmäl sjukdom" selected onPress={() => {}} />
        ) },
        { name: 'Impact card', subtitle: 'Pay impact', render: () => (
          <KImpactCard
            amount="−1 240 kr"
            lines={[{ label: 'Bruttoavdrag', value: '−1 600 kr', negative: true }, { label: 'Skatteeffekt', value: '+360 kr' }]}
            payday="Utbetalas 25 juni"
          />
        ) },
        { name: 'Attachment', subtitle: 'File upload', render: () => (
          <KAttachment label="Läkarintyg" hint="PDF eller bild" value={ctx.picked ? { name: 'intyg.pdf' } : undefined} onPick={ctx.pick} />
        ) },
        { name: 'Success', subtitle: 'Confirmation view', render: () => (
          <KSuccess title="Skickat för attest" lines={[{ icon: 'bell', text: 'Din chef får en notis.' }]} status="approved" />
        ) },
      ],
    },
  ];
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 96 },
  title: { marginTop: 12 },
  lede: { marginTop: 12, marginBottom: 8 },
  intro: { gap: 12, marginTop: 24 },
  introCard: { gap: 8 },
  introIc: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  toolbar: { marginTop: 28, gap: 12 },
  toolbarBtns: { flexDirection: 'row', gap: 8 },
  group: { marginTop: 24 },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 10 },
  groupName: { letterSpacing: 1 },
  countPill: { paddingHorizontal: 9, paddingVertical: 2, borderRadius: 999 },
  item: { borderWidth: 1, borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  itemText: { flex: 1, gap: 2 },
  itemBody: { borderTopWidth: 1, padding: 18, gap: 12 },
  empty: { marginTop: 32 },
  demoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, alignItems: 'center' },
  demoStack: { gap: 12 },
  swatchWrap: { alignItems: 'center', gap: 4, width: 64 },
  swatch: { width: 56, height: 40, borderRadius: 8, borderWidth: 1 },
  spaceRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radiusBox: { width: 52, height: 52, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
});
