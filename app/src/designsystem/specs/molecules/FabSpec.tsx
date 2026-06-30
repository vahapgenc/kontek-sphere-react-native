// Flytande åtgärdsknapp — mirrors preview/fab.html.
// The one persistent create action: a 56px circular mint button floating bottom-right,
// extended with a label when naming is needed, plus a Signature secondary variant.
// The circular demo uses the real KFab. Anatomy + dos & don'ts.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KFab, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function FabSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Den <KText variant="bodySm" weight="700" color={c.ink2}>enda</KText> bestående
      skapa-åtgärden. Cirkulär mintknapp som flyter över innehållet; --extended bär en etikett.
    </KText>
  );

  const plusIcon = <KIcon name="plus" size={26} color={c.shellCtaInk} strokeWidth={2.1} />;

  return (
    <SpecCard title="Flytande åtgärdsknapp" intro={intro}>
      <SpecSection
        title="Floating action button"
        description="One persistent, screen-level create action — Ny lönekörning, Ny anställd. It floats above the content, bottom-right, clear of the tab bar. Circular when the icon is self-evident; extended with a label when the action needs naming. Accent-mint CTA fill with the brand glow; a Signature variant exists for secondary contexts."
        frame="center"
      >
        <StateCell label="Circular — in context" center>
          <View style={[styles.ground, { backgroundColor: c.canvas, borderColor: c.line, borderRadius: 24 }]}>
            <View style={styles.rows}>
              <Skel /><Skel /><Skel />
            </View>
            <View style={styles.fabPin}>
              <KFab icon={plusIcon} onPress={() => {}} accessibilityLabel="Ny körning" />
            </View>
          </View>
        </StateCell>

        <StateCell label="Extended — labelled" center>
          <View style={[styles.ground, { backgroundColor: c.canvas, borderColor: c.line, borderRadius: 24 }]}>
            <View style={styles.rows}>
              <Skel /><Skel /><Skel />
            </View>
            <View style={styles.fabPin}>
              <View style={[styles.extended, { backgroundColor: c.shellCta, borderRadius: theme.radii.pill, ...theme.shadows.cta }]}>
                <KIcon name="plus" size={22} color={c.shellCtaInk} strokeWidth={2.1} />
                <KText variant="bodySm" weight="600" color={c.shellCtaInk}>Ny körning</KText>
              </View>
            </View>
          </View>
        </StateCell>

        <StateCell label="Mint (primary) · Signature (secondary)" center>
          <View style={styles.pairRow}>
            <KFab icon={plusIcon} onPress={() => {}} accessibilityLabel="Lägg till" />
            <View style={[styles.sigFab, { backgroundColor: c.signature, borderRadius: theme.radii.pill, ...theme.shadows.md }]}>
              <KIcon name="plus" size={26} color={c.onDark} strokeWidth={2.1} />
            </View>
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Size', value: '56×56 (extended auto-width)' },
            { name: 'Radius', value: '18px round · pill extended' },
            { name: 'Icon', value: '26px / 2.1 stroke' },
            { name: 'Fill', value: 'mint CTA + green glow' },
            { name: 'Press', value: 'scale 0.95' },
            { name: 'Rule', value: 'one FAB per screen' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: <KFab icon={plusIcon} onPress={() => {}} accessibilityLabel="Skapa" />,
            caption: 'One mint + for the single create action, 56px, lifted.',
          },
          dont: {
            stage: (
              <View style={styles.dontStack}>
                <View style={[styles.dontFab, { backgroundColor: c.shellCta, borderRadius: theme.radii.pill }]}>
                  <KIcon name="plus" size={22} color={c.shellCtaInk} strokeWidth={2.1} />
                </View>
                <KText variant="micro" color={c.ink3}>Skapa</KText>
              </View>
            ),
            caption: 'A label under the + turns the create action into a tab.',
          },
        }}
        dos={[
          'Reserve the centre + for the one create action (Absence / Expense).',
          'Flip it from mint (--status-badge) to --green + × while the hub is open.',
          'Keep it 56px and lifted above the tab bar.',
        ]}
        donts={[
          'Give the + a destination/selected state — it is not a tab.',
          'Add a label under the +.',
          'Use it for more than the single create action.',
        ]}
      />
    </SpecCard>
  );
}

function Skel() {
  const theme = useTheme();
  return (
    <View style={[styles.skel, { backgroundColor: theme.colors.surface, borderColor: theme.colors.line2 }]} />
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  ground: { width: 260, height: 200, borderWidth: 1, overflow: 'hidden' },
  rows: { padding: 16, gap: 10 },
  skel: { height: 46, borderRadius: 12, borderWidth: 1 },
  fabPin: { position: 'absolute', right: 18, bottom: 18 },
  extended: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 56,
    paddingHorizontal: 20,
  },
  pairRow: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  sigFab: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  dontStack: { alignItems: 'center', gap: 6 },
  dontFab: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
});
