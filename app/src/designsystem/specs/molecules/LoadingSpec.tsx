// Laddning — mirrors preview/loading.html.
// Skeletons that mirror the loading layout, plus spinners in three sizes and an on-dark
// variant, and a pull-to-refresh affordance. Demos use the real KSkeleton + KSpinner.
// Anatomy + dos & don'ts.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KSkeleton, KSpinner } from '../../../components';
import { useTheme } from '../../../theme';

export function LoadingSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Skelett som speglar layouten som laddar, spinner för korta väntor. Frys allt till ett lugnt
      statiskt läge vid reducerad rörelse.
    </KText>
  );

  return (
    <SpecCard title="Laddning" intro={intro}>
      <SpecSection
        title="Skeletons"
        description="While data loads, mirror the shape of the content with shimmering placeholders rather than a blank screen or a lone spinner — it keeps the layout stable and the wait feeling shorter. Compose from text, title, circle and block primitives. The shimmer freezes for prefers-reduced-motion."
        frame="center"
      >
        <View style={[styles.skelCard, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card, ...theme.shadows.sm }]}>
          <View style={styles.skelRow}>
            <KSkeleton width={40} height={40} radius={20} />
            <View style={styles.skelBody}>
              <KSkeleton width="62%" height={14} />
              <KSkeleton width="88%" height={11} />
            </View>
          </View>
          <View style={styles.skelRow}>
            <KSkeleton width={40} height={40} radius={20} />
            <View style={styles.skelBody}>
              <KSkeleton width="48%" height={14} />
              <KSkeleton width="76%" height={11} />
            </View>
          </View>
          <KSkeleton width="100%" height={56} radius={theme.radii.sm} />
        </View>
      </SpecSection>

      <SpecSection
        title="Spinner & pull-to-refresh"
        description="A spinner covers indeterminate waits inside buttons, inline loads and the pull-to-refresh affordance at the top of a scrolling list. Three sizes plus an on-dark variant."
        frame="center"
      >
        <StateCell label="sm" center>
          <KSpinner size="sm" />
        </StateCell>
        <StateCell label="default" center>
          <KSpinner size="md" />
        </StateCell>
        <StateCell label="lg" center>
          <KSpinner size="lg" />
        </StateCell>
        <StateCell label="on dark" center>
          <View style={[styles.darkChip, { backgroundColor: c.ground }]}>
            <KSpinner size="md" onDark />
          </View>
        </StateCell>
        <StateCell label="Pull-to-refresh" center>
          <View style={[styles.ptr, { borderColor: c.line, backgroundColor: c.surface, borderRadius: theme.radii.card }]}>
            <View style={styles.ptrRow}>
              <KSpinner size="sm" />
              <KText variant="bodySm" color={c.ink3}>Uppdaterar…</KText>
            </View>
            <View style={[styles.ptrItem, { borderTopColor: c.line2 }]}>
              <KText variant="bodySm" color={c.ink3}>Senaste körningar</KText>
            </View>
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Skeleton', value: 'surface-2 + 1.4s shimmer' },
            { name: 'Spinner', value: 'green-line ring, deep-green head' },
            { name: 'Sizes', value: '20 · 28 · 40px' },
            { name: 'Reduced motion', value: 'shimmer & spin freeze' },
          ]}
        />
      </SpecSection>

      <DosDonts
        dos={[
          "Use skeletons that mirror the layout that's loading.",
          'Reserve the spinner for short, indeterminate waits.',
          'Freeze shimmer and spin to a calm static state under prefers-reduced-motion.',
        ]}
        donts={[
          'Block an optimistic action behind a spinner — apply it and confirm.',
          'Leave an infinite spin running with no reduced-motion fallback.',
          'Show a generic spinner where a structured skeleton would reassure.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  skelCard: { width: 300, maxWidth: '100%', borderWidth: 1, padding: 16, gap: 16 },
  skelRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  skelBody: { flex: 1, gap: 8 },
  darkChip: { padding: 14, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  ptr: { width: 260, maxWidth: '100%', borderWidth: 1, overflow: 'hidden' },
  ptrRow: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14 },
  ptrItem: { borderTopWidth: 1, paddingVertical: 14, paddingHorizontal: 16 },
});
