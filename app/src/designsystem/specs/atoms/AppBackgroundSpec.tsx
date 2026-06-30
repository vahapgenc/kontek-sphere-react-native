// App-bakgrund — mirrors preview/app-background.html.
// The one sanctioned gradient (--app-bg): a phone mock floating cards on the tinted
// canvas, plus a swatch + note. Uses expo-linear-gradient with theme.gradients.appBg.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

// The app-bg recipe: a vertical pale-forest → white toning. theme.gradients.appBg gives
// the linear stops; the radial mint glows are approximated by the gradient itself here.
function AppBg({ style, children }: { style?: object; children?: React.ReactNode }) {
  const theme = useTheme();
  return (
    <LinearGradient
      colors={theme.gradients.appBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={style}
    >
      {children}
    </LinearGradient>
  );
}

function PhoneMock() {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={[styles.phone, theme.shadows.lg]}>
      <AppBg style={styles.phoneScreen}>
        <View style={styles.phoneTop} />
        <View style={[styles.float, { backgroundColor: c.surface, borderRadius: theme.radii.panel }, theme.shadows.sm]}>
          <KText variant="eyebrow" weight="600" color={c.greenDeep}>Nästa lön</KText>
          <KText variant="h2" weight="700" color={c.signature} style={styles.fig}>28 450 kr</KText>
          <KText variant="caption" color={c.ink3} style={styles.sub}>Utbetalas 25 jun · Swedbank ·••• 8842</KText>
        </View>
        <FloatRow icon="calendar" title="Ansök om ledighet" sub="Semester, vab, föräldraledigt" />
        <FloatRow icon="receipt" title="Lägg till utlägg" sub="Kvitto, milersättning" />
      </AppBg>
    </View>
  );
}

function FloatRow({ icon, title, sub }: { icon: 'calendar' | 'receipt'; title: string; sub: string }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={[styles.floatRow, { backgroundColor: c.surface, borderRadius: theme.radii.panel }, theme.shadows.sm]}>
      <View style={[styles.ftile, { backgroundColor: c.tileFill }]}>
        <KIcon name={icon} size={20} color={c.tileInk} strokeWidth={1.8} />
      </View>
      <View style={styles.floatRowText}>
        <KText variant="title" weight="600" color={c.ink}>{title}</KText>
        <KText variant="bodySm" color={c.ink3}>{sub}</KText>
      </View>
    </View>
  );
}

export function AppBackgroundSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Hela appen, inloggningen och alla flöden vilar på en delad gradient,{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--app-bg</KText>. Kort flyter på den
      tonade ytan — inga andra dekorativa gradienter.
    </KText>
  );

  return (
    <SpecCard title="App-bakgrund" intro={intro}>
      <SpecSection
        title="Pale-forest gradient"
        description="The whole authenticated app, the sign-in screen and every registration flow sit on one shared background gradient — never a flat fill. Cards float on this tinted canvas; flow screens reuse it so transitions never reveal a seam. Published as the --app-bg token."
        frame="center"
      >
        <PhoneMock />
        <View style={styles.right}>
          <AppBg style={[styles.swatch, { borderColor: c.line, borderRadius: theme.radii.card }]} />
          <KText variant="caption" color={c.ink3} style={styles.note}>
            Radiella mintsken uppe till höger och vänster över en lodrät toning till vitt.
            Korten lyfter från ytan med --sh-1 — ingen ram behövs.
          </KText>
        </View>
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <AppBg style={styles.exStage}>
                <View style={[styles.exCard, { backgroundColor: c.surface, borderRadius: theme.radii.card }, theme.shadows.sm]}>
                  <KText variant="caption" weight="600" color={c.signature}>Floating card</KText>
                </View>
              </AppBg>
            ),
            caption: 'White cards float on the tinted canvas — the gradient reads edge to edge.',
          },
          dont: {
            stage: (
              <LinearGradient
                colors={['#7C3AED', '#EC4899', '#F59E0B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.exStage}
              >
                <View style={[styles.exCard, { backgroundColor: '#fff', borderRadius: theme.radii.card }]}>
                  <KText variant="caption" weight="600" color="#333">Card</KText>
                </View>
              </LinearGradient>
            ),
            caption: 'Decorative rainbow gradients break the calm, software-grade feel.',
          },
        }}
        dos={[
          'Use --app-bg on the app shell, sign-in and every flow screen so transitions never reveal a seam.',
          'Keep CTA bars inside flows transparent so the gradient runs to the edge.',
          'Let cards lift off the canvas with --sh-1 — the lift, not a border, does the separating.',
        ]}
        donts={[
          'Add other decorative gradients anywhere — this is the one sanctioned gradient.',
          'Drop a flat fill behind a flow screen — it creates a visible seam on the slide-in.',
          'Re-tint or re-angle the recipe per screen; the canvas stays constant app-wide.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  phone: {
    width: 248,
    borderRadius: 34,
    padding: 10,
    backgroundColor: '#0F1112',
  },
  phoneScreen: { borderRadius: 26, overflow: 'hidden', height: 420 },
  phoneTop: { height: 46 },
  float: { marginHorizontal: 16, marginBottom: 14, paddingVertical: 16, paddingHorizontal: 18 },
  fig: { marginTop: 6 },
  sub: { marginTop: 4 },
  floatRow: {
    marginHorizontal: 16,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  ftile: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatRowText: { flex: 1, minWidth: 0 },
  right: { flex: 1, minWidth: 220, gap: 12 },
  swatch: { width: '100%', height: 160, borderWidth: 1 },
  note: { lineHeight: 20 },
  exStage: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    minHeight: 64,
  },
  exCard: { paddingVertical: 12, paddingHorizontal: 16 },
});
