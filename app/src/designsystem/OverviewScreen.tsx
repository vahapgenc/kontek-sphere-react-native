// Native port of design/Kontek Design System/Design System Overview.html.
// Header + intro panel + search toolbar + collapsible Atoms/Molecules/Organisms groups,
// each item expandable to its full spec card. Driven by REGISTRY (mirrors ds-overview.js).
import React, { useMemo, useState, type ReactNode } from 'react';
import { ScrollView, View, StyleSheet, Pressable, useWindowDimensions } from 'react-native';
import { useTheme } from '../theme';
import { KText, KIcon, KSearchField, type IconName } from '../components';
import { REGISTRY, GROUP_ORDER, type DSEntry, type DSGroup } from './registry';

const INTRO_ROWS = [
  { t: 'Atoms', d: 'Färg, typografi, avstånd, ikoner — de minsta byggstenarna.' },
  { t: 'Molecules', d: 'Knappar, fält, listrader, brickor — atomer satta i funktion.' },
  { t: 'Organisms', d: 'Appfält, flikfält, ark, navigering — färdiga mönster.' },
];
const STEPS = [
  'Klicka på ett kort för att fälla ut hela specifikationen — intro, anatomi, varianter, tillstånd och gör & undvik.',
  'Sök på namn i fältet nedan för att hitta rätt del snabbt.',
  'Återanvänd token och klasser ur colors_and_type.css och mobile.css — hitta aldrig på egna färger.',
  'Följ varje dels gör & undvik så håller gränssnittet ihop.',
];

export function OverviewScreen() {
  const theme = useTheme();
  const c = theme.colors;
  const { width } = useWindowDimensions();
  const wide = width >= 760;

  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [collapsedGroups, setCollapsedGroups] = useState<Set<DSGroup>>(new Set());

  const keyOf = (e: DSEntry) => `${e.group}:${e.name}`;
  const q = query.trim().toLowerCase();

  const byGroup = useMemo(() => {
    const map = new Map<DSGroup, DSEntry[]>();
    for (const g of GROUP_ORDER) map.set(g, []);
    for (const e of REGISTRY) {
      if (q && !(`${e.name} ${e.sub}`.toLowerCase().includes(q))) continue;
      map.get(e.group)!.push(e);
    }
    return map;
  }, [q]);

  const shownCount = GROUP_ORDER.reduce((n, g) => n + byGroup.get(g)!.length, 0);
  const allKeys = REGISTRY.map(keyOf);

  const toggleItem = (k: string) =>
    setExpanded((p) => {
      const n = new Set(p);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  const toggleGroup = (g: DSGroup) =>
    setCollapsedGroups((p) => {
      const n = new Set(p);
      n.has(g) ? n.delete(g) : n.add(g);
      return n;
    });

  // The three intro columns.
  const col1 = (
    <IntroCol wide={wide}>
      <IntroIcon icon="building" />
      <KText variant="h3">Struktur</KText>
      <KText variant="bodySm" color={c.ink2}>
        Systemet följer atomär design — små delar byggs ihop till större. Alla färger, typsnitt
        och avstånd kommer från en enda källa: colors_and_type.css och mobile.css.
      </KText>
      <View style={styles.introRows}>
        {INTRO_ROWS.map((r) => (
          <View key={r.t} style={[styles.irow, { backgroundColor: c.canvas, borderRadius: theme.radii.card }]}>
            <View style={[styles.irowIc, { backgroundColor: c.kontekGreen }]}>
              <KIcon name="approvals" size={18} color="#fff" />
            </View>
            <View style={styles.flex1}>
              <KText variant="caption" weight="600">{r.t}</KText>
              <KText variant="caption" color={c.ink3}>{r.d}</KText>
            </View>
          </View>
        ))}
      </View>
    </IntroCol>
  );
  const col2 = (
    <IntroCol wide={wide}>
      <IntroIcon icon="globe" />
      <KText variant="h3">Varför använda det</KText>
      <KText variant="bodySm" color={c.ink2}>
        En gemensam källa gör att appen ser likadan ut på iPhone och Android — ett varumärke,
        inte två. Allt är tumvänligt med 48px tryckytor, brödtext på 16px så iOS aldrig zoomar,
        och färgerna bär mening: grönt godkänner och sparar, rött bara för det oåterkalleliga.
        Resultatet är en lugn känsla av att lönen är omhändertagen.
      </KText>
    </IntroCol>
  );
  const col3 = (
    <IntroCol wide={wide}>
      <IntroIcon icon="checkCirc" />
      <KText variant="h3">Så använder du det</KText>
      <View style={styles.ol}>
        {STEPS.map((s, i) => (
          <View key={i} style={styles.olItem}>
            <KText variant="bodySm" weight="700" color={c.greenDeep}>{i + 1}.</KText>
            <KText variant="bodySm" color={c.ink2} style={styles.flex1}>{s}</KText>
          </View>
        ))}
      </View>
    </IntroCol>
  );

  return (
    <ScrollView style={{ backgroundColor: c.canvas }} contentContainerStyle={styles.scroll}>
      <View style={styles.inner}>
        {/* Header */}
        <KText variant="caption" weight="600" color={c.greenDeep} style={styles.eyebrow}>Kontek</KText>
        <KText
          variant="h1"
          weight="700"
          color={c.ink}
          style={[styles.title, { fontSize: wide ? 52 : 38, lineHeight: wide ? 54 : 42 }]}
        >
          Design system — Mobile
        </KText>
        <KText variant="body" color={c.ink3} style={[styles.lede, { fontSize: wide ? 18 : 16 }]}>
          En överblick av hela systemet, ordnat i atomer, molekyler och organismer. Klicka på en
          rubrik för att fälla ut hela specifikationen — eller fäll ihop för att få överblick.
        </KText>

        {/* Intro panel — one surface, three columns divided by hairlines */}
        <View style={[styles.introPanel, { backgroundColor: c.surface, borderRadius: theme.radii.panel }, theme.shadows.floatingCard]}>
          {wide ? (
            <View style={styles.introRow}>
              {col1}
              <View style={[styles.vDivider, { backgroundColor: c.line2 }]} />
              {col2}
              <View style={[styles.vDivider, { backgroundColor: c.line2 }]} />
              {col3}
            </View>
          ) : (
            <View>
              {col1}
              <View style={[styles.hDivider, { backgroundColor: c.line2 }]} />
              {col2}
              <View style={[styles.hDivider, { backgroundColor: c.line2 }]} />
              {col3}
            </View>
          )}
        </View>

        {/* Toolbar */}
        <View style={styles.toolbar}>
          <KSearchField value={query} onChangeText={setQuery} placeholder="Filtrera på namn…" testID="ds_filter" />
          <View style={styles.toolbarBtns}>
            <ToolbarBtn label="Fäll ut alla" onPress={() => setExpanded(new Set(allKeys))} />
            <ToolbarBtn label="Fäll ihop alla" onPress={() => setExpanded(new Set())} />
            <KText variant="caption" color={c.ink3} style={styles.tcount}>
              {q ? `${shownCount} av ${REGISTRY.length}` : `${REGISTRY.length} delar · alla med riktlinjer`}
            </KText>
          </View>
        </View>

        {/* Groups */}
        {GROUP_ORDER.map((g) => {
          const items = byGroup.get(g)!;
          if (items.length === 0) return null;
          const groupCollapsed = collapsedGroups.has(g) && !q;
          return (
            <View key={g} style={styles.group}>
              <Pressable style={styles.groupHead} onPress={() => toggleGroup(g)}>
                <KIcon name={groupCollapsed ? 'chevR' : 'chevD'} size={18} color={c.ink3} />
                <KText variant="caption" weight="700" color={c.ink2} style={styles.groupName}>{g}</KText>
                <View style={[styles.countPill, { backgroundColor: c.greenSoft }]}>
                  <KText variant="micro" weight="600" color={c.greenDeep}>{items.length}</KText>
                </View>
              </Pressable>

              {!groupCollapsed &&
                items.map((e) => {
                  const k = keyOf(e);
                  const open = expanded.has(k);
                  return (
                    <View key={k} style={[styles.item, { borderColor: open ? c.greenLine : c.line, backgroundColor: c.surface }]}>
                      <Pressable testID={`ds_item_${e.file}`} style={styles.itemHead} onPress={() => toggleItem(k)}>
                        <View style={open ? styles.chevOpen : undefined}>
                          <KIcon name="chevR" size={18} color={open ? c.signature : c.ink3} />
                        </View>
                        <View style={styles.flex1}>
                          <KText variant="title" color={open ? c.signature : c.ink}>{e.name}</KText>
                          <KText variant="caption" color={c.ink3}>{e.sub}</KText>
                        </View>
                      </Pressable>
                      {open ? (
                        <View style={[styles.itemBody, { borderTopColor: c.line, backgroundColor: c.canvas }]}>
                          {e.render()}
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
      </View>
    </ScrollView>
  );
}

function IntroCol({ wide, children }: { wide: boolean; children: ReactNode }) {
  return <View style={[styles.introCol, { padding: wide ? 30 : 24 }]}>{children}</View>;
}

function IntroIcon({ icon }: { icon: IconName }) {
  const theme = useTheme();
  return (
    <View style={[styles.introIc, { backgroundColor: theme.colors.greenSoft }]}>
      <KIcon name={icon} size={20} color={theme.colors.greenDeep} />
    </View>
  );
}

function ToolbarBtn({ label, onPress }: { label: string; onPress: () => void }) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.tbtn, { borderColor: theme.colors.line, backgroundColor: theme.colors.surface, borderRadius: theme.radii.button }]}
    >
      <KText variant="bodySm" weight="600" color={theme.colors.ink2}>{label}</KText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20, paddingTop: 48, paddingBottom: 96, alignItems: 'center' },
  inner: { width: '100%', maxWidth: 1080 },
  eyebrow: { letterSpacing: 0.3 },
  title: { marginTop: 14, letterSpacing: -1 },
  lede: { marginTop: 16, marginBottom: 8, maxWidth: 620, lineHeight: 28 },
  introPanel: { marginTop: 32, overflow: 'hidden' },
  introRow: { flexDirection: 'row', alignItems: 'stretch' },
  introCol: { flex: 1, gap: 10 },
  introIc: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  vDivider: { width: 1 },
  hDivider: { height: 1 },
  introRows: { gap: 10, marginTop: 8 },
  irow: { flexDirection: 'row', gap: 13, alignItems: 'flex-start', padding: 12 },
  irowIc: { width: 34, height: 34, borderRadius: 9, alignItems: 'center', justifyContent: 'center' },
  ol: { gap: 11, marginTop: 4 },
  olItem: { flexDirection: 'row', gap: 8 },
  toolbar: { marginTop: 36, gap: 12 },
  toolbarBtns: { flexDirection: 'row', gap: 8, alignItems: 'center', flexWrap: 'wrap' },
  tbtn: { height: 44, paddingHorizontal: 16, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  tcount: { marginLeft: 'auto' },
  group: { marginTop: 28 },
  groupHead: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 12 },
  groupName: { letterSpacing: 1.2 },
  countPill: { paddingHorizontal: 9, paddingVertical: 2, borderRadius: 999 },
  item: { borderWidth: 1, borderRadius: 14, overflow: 'hidden', marginBottom: 12 },
  itemHead: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 18 },
  chevOpen: { transform: [{ rotate: '90deg' }] },
  itemBody: { borderTopWidth: 1, padding: 18 },
  empty: { marginTop: 32 },
  flex1: { flex: 1 },
});
