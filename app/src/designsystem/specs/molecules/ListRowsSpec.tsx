// Listrader — mirrors preview/list-rows.html.
// The workhorse: a leading media slot, title + optional subtitle, trailing slot
// (value · chevron · switch · badge). Inset groups vs full-bleed lists.
// Demos use the real KListCard + KListRow. Anatomy + dos & don'ts.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import {
  KText,
  KListCard,
  KListRow,
  KIcon,
  KBadge,
  KSwitch,
  KAvatar,
  KButton,
} from '../../../components';
import { useTheme } from '../../../theme';

export function ListRowsSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [reminders, setReminders] = useState(true);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Mobilappens arbetshäst. Gruppera rader i ett flytande kort och separera med en{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--line-2-hårlinje</KText>.
    </KText>
  );

  return (
    <SpecCard title="Listrader" intro={intro}>
      <SpecSection
        title="Inset groups — settings & grouped data"
        description="Rounded cards within the gutter for settings and grouped data. A row carries a leading media slot, a title with optional subtitle, and a trailing value, chevron, switch or badge."
        bare
      >
        <View style={styles.insetWrap}>
          <KListCard header="Dina produkter">
            <KListRow
              title="Lön"
              subtitle="Kör lön, skatt och utbetalningar"
              leading={<KIcon name="wallet" size={21} color={c.greenDeep} strokeWidth={1.85} />}
              trailing={
                <View style={styles.trail}>
                  <KBadge label="1 väntar" tone="warn" />
                  <KIcon name="chevR" size={20} color={c.ink4} strokeWidth={1.85} />
                </View>
              }
              onPress={() => {}}
            />
            <KListRow
              title="Time"
              subtitle="Tid, frånvaro och scheman"
              leading={<KIcon name="clock" size={21} color={c.greenDeep} strokeWidth={1.85} />}
              onPress={() => {}}
            />
            <KListRow
              title="Sphere"
              subtitle="Medarbetardata och dokument"
              leading={<KIcon name="globe" size={21} color={c.greenDeep} strokeWidth={1.85} />}
              onPress={() => {}}
            />
          </KListCard>

          <KListCard header="Inställningar" style={styles.secondGroup}>
            <KListRow
              title="Påminnelser"
              leading={<KIcon name="bell" size={21} color={c.ink3} strokeWidth={1.85} />}
              trailing={<KSwitch value={reminders} onValueChange={setReminders} />}
            />
            <KListRow
              title="Språk"
              leading={<KIcon name="globe" size={21} color={c.ink3} strokeWidth={1.85} />}
              trailing={
                <View style={styles.trail}>
                  <KText variant="bodySm" color={c.ink3}>Svenska</KText>
                  <KIcon name="chevR" size={20} color={c.ink4} strokeWidth={1.85} />
                </View>
              }
              onPress={() => {}}
            />
          </KListCard>
        </View>
      </SpecSection>

      <SpecSection
        title="Full-bleed — long scrolling lists"
        description="A full-bleed list with left-inset dividers for long scrolling collections. Whole rows are tappable at ≥ 60px tall."
        bare
      >
        <View style={[styles.fullBleed, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card }]}>
          <KText variant="caption" weight="600" color={c.ink3} style={styles.fbHeader}>ATT ATTESTERA</KText>
          <KListRow
            title="Erik Holm"
            subtitle="Vecka 20 · 38,5 h"
            leading={<KAvatar initials="EH" size="md" />}
            trailing={<KButton label="Godkänn" variant="primary" size="sm" />}
          />
          <View style={[styles.fbDivider, { backgroundColor: c.line2 }]} />
          <KListRow
            title="Sara Nilsson"
            subtitle="Vecka 20 · 40 h"
            leading={<KAvatar initials="SN" size="md" />}
            trailing={<KButton label="Godkänn" variant="primary" size="sm" />}
          />
          <View style={[styles.fbDivider, { backgroundColor: c.line2 }]} />
          <KListRow
            title="Johan Lund"
            subtitle="Vecka 20 · 36 h"
            leading={<KAvatar initials="JL" size="md" tone="soft" />}
            trailing={<KButton label="Ångra" variant="secondary" size="sm" />}
          />
          <View style={[styles.fbDivider, { backgroundColor: c.line2 }]} />
          <KListRow
            title="Maja Andersson"
            subtitle="Vecka 20 · 40 h"
            leading={<KAvatar initials="MA" size="md" />}
            trailing={<KButton label="Godkänn" variant="primary" size="sm" />}
          />
        </View>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Min height', value: '60px (tap-safe)' },
            { name: 'Lead media', value: '40px tile / avatar' },
            { name: 'Title', value: '17px / 600' },
            { name: 'Subtitle', value: '15px / ink-3' },
            { name: 'Divider', value: 'inset past the media' },
            { name: 'Trailing', value: 'value · chevron · switch · badge' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <View style={[styles.exGood, { backgroundColor: c.surface }]}>
                <View style={styles.exRow}><KText variant="bodySm" weight="600" color={c.ink}>Ledighet</KText></View>
                <View style={[styles.exRow, styles.exRowTop, { borderTopColor: c.line2 }]}><KText variant="bodySm" weight="600" color={c.ink}>Utlägg</KText></View>
              </View>
            ),
            caption: 'Rows split by a --line-2 hairline inside one floating card.',
          },
          dont: {
            stage: (
              <View style={styles.exBadWrap}>
                <View style={[styles.exBad, { borderColor: '#C9D2D3', backgroundColor: c.surface }]}><KText variant="bodySm" weight="600" color={c.ink}>Ledighet</KText></View>
                <View style={[styles.exBad, { borderColor: '#C9D2D3', backgroundColor: c.surface }]}><KText variant="bodySm" weight="600" color={c.ink}>Utlägg</KText></View>
              </View>
            ),
            caption: "Don't box each row with a visible border.",
          },
        }}
        dos={[
          'Group rows in an inset floating card; separate them with a --line-2 hairline.',
          'Reach for the Row anatomy (lead tile / title+sub / trailing) over bespoke flex rows.',
          'Make pressable rows real buttons with a chevron and ≥ 48px height.',
        ]}
        donts={[
          'Box each row with its own border.',
          "Use a real border for the in-card divider — it's a hairline pseudo-line.",
          'Hand-roll a flex row when the Row component fits.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  insetWrap: { gap: 18 },
  secondGroup: { marginTop: 4 },
  trail: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  fullBleed: { borderWidth: 1, overflow: 'hidden', paddingVertical: 6 },
  fbHeader: { letterSpacing: 0.5, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 6 },
  fbDivider: { height: 1, marginLeft: 16 },
  exGood: { width: 200, borderRadius: 16, overflow: 'hidden' },
  exRow: { paddingVertical: 11, paddingHorizontal: 14 },
  exRowTop: { borderTopWidth: 1 },
  exBadWrap: { width: 200, gap: 8 },
  exBad: { paddingVertical: 11, paddingHorizontal: 14, borderWidth: 1, borderRadius: 10 },
});
