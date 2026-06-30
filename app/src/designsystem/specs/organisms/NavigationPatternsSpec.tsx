// Navigationsmönster — mirrors preview/navigation-patterns.html.
// Documentation: the bottom tab bar with a raised center action is the standard;
// a drawer is reserved only for rare secondary destinations. Small diagrams describe
// each pattern with a "when to use" note.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KIcon, type IconName } from '../../../components';
import { useTheme } from '../../../theme';

interface PatternProps {
  title: string;
  tabs: { icon: IconName; label: string; active?: boolean; fab?: boolean }[];
  when: string;
  whenLead: string;
}

function PhonePattern({ title, tabs, when, whenLead }: PatternProps) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.opt}>
      <View style={[styles.phone, { borderColor: c.line, borderRadius: theme.radii.card }]}>
        <View style={styles.fill}>
          <KText variant="h3" weight="700" color={c.ink}>{title}</KText>
          <View style={[styles.bigCard, { backgroundColor: c.signature, borderRadius: theme.radii.card }]} />
          <View style={[styles.ln, { backgroundColor: c.surface, borderColor: c.line2, width: '90%' }]} />
          <View style={[styles.ln, { backgroundColor: c.surface, borderColor: c.line2, width: '70%' }]} />
        </View>
        <View style={[styles.tb, { backgroundColor: c.surface, borderTopColor: c.line }]}>
          {tabs.map((t, i) =>
            t.fab ? (
              <View key={i} style={styles.tab}>
                <View style={[styles.fab, { backgroundColor: c.shellCta }]}>
                  <KIcon name="plus" size={24} color={c.shellCtaInk} strokeWidth={2.2} />
                </View>
              </View>
            ) : (
              <View key={i} style={styles.tab}>
                <KIcon name={t.icon} size={22} color={t.active ? c.signature : c.ink3} strokeWidth={1.85} />
                <KText variant="micro" weight={t.active ? '600' : '400'} color={t.active ? c.signature : c.ink3}>
                  {t.label}
                </KText>
              </View>
            ),
          )}
        </View>
      </View>
      <KText variant="caption" color={c.ink3} style={styles.when}>
        <KText variant="caption" weight="600" color={c.ink2}>{whenLead}</KText>
        {' '}
        {when}
      </KText>
    </View>
  );
}

function DrawerPattern() {
  const theme = useTheme();
  const c = theme.colors;
  const rows: { icon: IconName; label: string }[] = [
    { icon: 'building', label: 'Inställningar' },
    { icon: 'help', label: 'Hjälp & support' },
    { icon: 'swap', label: 'Byt företag' },
    { icon: 'logOut', label: 'Logga ut' },
  ];
  return (
    <View style={styles.opt}>
      <View style={[styles.phone, { borderColor: c.line, borderRadius: theme.radii.card, overflow: 'hidden' }]}>
        <View style={styles.fill}>
          <KText variant="h3" weight="700" color={c.ink}>Mer</KText>
        </View>
        <View style={[styles.scrim, { backgroundColor: c.scrim }]} />
        <View style={[styles.drawer, { backgroundColor: c.surface, borderRightColor: c.line, ...theme.shadows.md }]}>
          {rows.map((r) => (
            <View key={r.label} style={styles.dnav}>
              <KIcon name={r.icon} size={18} color={c.ink2} strokeWidth={1.85} />
              <KText variant="bodySm" color={c.ink2}>{r.label}</KText>
            </View>
          ))}
        </View>
      </View>
      <KText variant="caption" color={c.ink3} style={styles.when}>
        <KText variant="caption" weight="600" color={c.ink2}>Drawer — secondary only.</KText>
        {' '}
        Reserved for rare, secondary destinations (settings, support, switch company).
        Never use a drawer for the top-level areas — those belong in the tab bar.
      </KText>
    </View>
  );
}

export function NavigationPatternsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      <KText variant="bodySm" weight="700" color={c.ink2}>Flikfält är standard</KText>; drawer
      endast för sällsynta sekundära mål. Routing = flik + push/pop-stack.
    </KText>
  );

  return (
    <SpecCard title="Navigationsmönster" intro={intro}>
      <SpecSection
        title="Navigation patterns"
        description="On phones the bottom tab bar with a raised center action is the standard — it replaces side navigation for the app's top-level areas. A drawer is kept only for rare, secondary destinations. One brand-led design, identical on iPhone and Android."
        frame="default"
      >
        <PhonePattern
          title="Hem"
          whenLead="Standard — bottom tab bar."
          when="Four core areas plus a raised center action, always visible and one thumb-tap away. The “+” opens the Register action sheet (absence · expense). Use this for every top-level app."
          tabs={[
            { icon: 'home', label: 'Hem', active: true },
            { icon: 'payslip', label: 'Lön' },
            { icon: 'plus', label: '', fab: true },
            { icon: 'bell', label: 'Notiser' },
            { icon: 'user', label: 'Profil' },
          ]}
        />
        <DrawerPattern />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Use the bottom tab bar as the standard primary navigation.',
          'Model routing as a tab + a push/pop stack; slide screens in transform-only.',
          'Let self-managed flows hide the chrome and run their own full-screen header.',
        ]}
        donts={[
          'Reach for a drawer except for rare secondary destinations.',
          'Add a route screen without registering it — a missing route silently falls back to Home.',
          'Mix navigation models within one flow.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  opt: { width: 280, maxWidth: '100%' },
  phone: {
    height: 320,
    borderWidth: 1,
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  },
  fill: { flex: 1, padding: 14, gap: 10 },
  bigCard: { height: 64 },
  ln: { height: 12, borderRadius: 6, borderWidth: 1 },
  tb: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 18,
  },
  tab: { flex: 1, alignItems: 'center', gap: 3 },
  fab: {
    width: 52,
    height: 52,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -24,
  },
  scrim: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  drawer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 190,
    borderRightWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 14,
    gap: 7,
  },
  dnav: {
    height: 40,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 11,
  },
  when: { marginTop: 10, lineHeight: 19 },
});
