// Frostat appfält — mirrors preview/frosted-bar.html.
// The app bar is transparent at rest and frosts in on scroll. On Home the pay hero
// docks into the same tinted surface. Demos show the real KAppBar; the frost
// behaviour is described, since scroll-frost is a runtime effect.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KAppBar } from '../../../components';
import { useTheme } from '../../../theme';

export function FrostedBarSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Appfältet är{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>
        transparent i vila
      </KText>{' '}
      och frostar in vid skroll. På Home dockar lönehjälten in i samma tonade yta.
    </KText>
  );

  return (
    <SpecCard title="Frostat appfält" intro={intro}>
      <SpecSection
        title="Transparent app bar + scroll-frost"
        description="The app bar is transparent at rest so the gradient runs to the top edge. On scroll it frosts in: the bar — and, on Home, the sticky pay hero — cross-fades to --frost-bg with --frost-blur and grows a 1px --frost-line bottom hairline. The docked tint matches the bar exactly, so they read as one surface."
        frame="col"
      >
        <StateCell label="At rest — top of screen (transparent)">
          <View style={[styles.phone, { backgroundColor: c.canvas, borderColor: c.line, borderRadius: theme.radii.panel }]}>
            <KAppBar title="God morgon, Anna" large />
            <View style={styles.body}>
              <View style={[styles.mcard, { borderRadius: theme.radii.panel, ...theme.shadows.sm }]}>
                <KText variant="micro" weight="700" color={c.greenDeep}>NÄSTA LÖN</KText>
                <KText variant="h2" weight="700" color={c.signature} style={styles.amount}>28 450 kr</KText>
              </View>
            </View>
          </View>
        </StateCell>

        <StateCell label="Scrolled — frosted in (--frost-bg + --frost-blur)">
          <View style={[styles.phone, { backgroundColor: c.canvas, borderColor: c.line, borderRadius: theme.radii.panel }]}>
            <View style={[styles.frostBar, { backgroundColor: c.frostBg, borderBottomColor: c.frostLine }]}>
              <KText variant="micro" weight="600" color={c.greenDeep}>ÖVERSIKT</KText>
              <KText variant="h3" weight="700" color={c.ink} style={styles.frostTitle}>God morgon, Anna</KText>
            </View>
            <View style={styles.body}>
              <View style={[styles.mcardSkel, { borderRadius: theme.radii.panel, ...theme.shadows.sm }]}>
                <View style={[styles.skel, { backgroundColor: c.surface2 }]} />
                <View style={[styles.skel, styles.skelShort, { backgroundColor: c.surface2 }]} />
              </View>
            </View>
          </View>
        </StateCell>
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Keep the bar transparent at rest so the gradient reaches the top edge.',
          'Cross-fade to --frost-bg + --frost-blur and add the 1px --frost-line hairline only once content scrolls under it.',
          'Match the docked Home hero tint to the frosted bar exactly so they read as one surface.',
        ]}
        donts={[
          'Give the resting bar a solid fill or a divider — it should be invisible until scrolled.',
          'Snap the frost on abruptly; cross-fade it with the scroll.',
          'Let the docked hero use a different tint from the bar — the seam will show.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  phone: {
    width: 262,
    maxWidth: '100%',
    borderWidth: 1,
    overflow: 'hidden',
  },
  body: { padding: 16, gap: 12 },
  mcard: { backgroundColor: '#fff', padding: 16 },
  amount: { marginTop: 4 },
  mcardSkel: { backgroundColor: '#fff', padding: 16, gap: 10 },
  skel: { height: 11, borderRadius: 6 },
  skelShort: { width: '60%' },
  frostBar: {
    paddingTop: 24,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
  },
  frostTitle: { marginTop: 2 },
});
