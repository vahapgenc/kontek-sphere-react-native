// Logotyp — mirrors preview/logo.html.
// The real Kontek logo lockups (bundled from the design assets) across light/dark/colour
// grounds, with clear-space + minimum-size guidance and incorrect-usage examples.
import React, { type ReactNode } from 'react';
import { View, Image, StyleSheet, type ImageStyle, type ImageSourcePropType } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { logos } from '../../../assets/logos';

function Logo({
  source,
  size = 30,
  tintColor,
  style,
}: {
  source: ImageSourcePropType;
  size?: number;
  tintColor?: string;
  style?: ImageStyle;
}) {
  return (
    <Image
      source={source}
      resizeMode="contain"
      style={[{ height: size, width: size * 4.4 }, tintColor ? { tintColor } : null, style]}
    />
  );
}

function LogoTile({
  bg,
  border,
  children,
}: {
  bg: string;
  border?: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.logoTile,
        {
          backgroundColor: bg,
          borderColor: border ?? 'transparent',
          borderRadius: theme.radii.card,
        },
      ]}
    >
      {children}
    </View>
  );
}

export function LogoSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Den medföljande Kontek-ordbilden —{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>grön på ljust, vit på mörkt</KText>.
      Håll friyta runt om och respektera minsta storlek.
    </KText>
  );

  return (
    <SpecCard title="Logotyp" intro={intro}>
      <SpecSection
        title="Primary logo"
        description="Den fullständiga logotypen — symbol och ordbild tillsammans — i Kontek-grönt på ljus, neutral yta. Detta är förstahandsvalet i alla sammanhang där bakgrunden tillåter det."
        bare
      >
        <LogoTile bg={c.surface} border={c.line}>
          <Logo source={logos.green} size={34} />
        </LogoTile>
      </SpecSection>

      <SpecSection
        title="Monochrome"
        description="När färg inte är möjlig — tryck, gravyr, enfärgade ytor. Svart på ljust, vitt på mörkt. Aldrig grå eller nedtonad."
        bare
      >
        <View style={styles.grid2}>
          <View style={styles.col}>
            <KText variant="micro" weight="500" color={c.ink3} style={styles.cap}>
              Svart · på ljust
            </KText>
            <LogoTile bg={c.surface} border={c.line}>
              <Logo source={logos.monoBlack} size={26} />
            </LogoTile>
          </View>
          <View style={styles.col}>
            <KText variant="micro" weight="500" color={c.ink3} style={styles.cap}>
              Vit · på mörkt
            </KText>
            <LogoTile bg={c.ground}>
              <Logo source={logos.monoWhite} size={26} />
            </LogoTile>
          </View>
        </View>
      </SpecSection>

      <SpecSection
        title="Negative — on colour"
        description="Den vita negativa logotypen på Kontek Green eller annan mörk varumärkesyta. Säkerställ alltid tillräcklig kontrast."
        bare
      >
        <View style={styles.grid2}>
          <View style={styles.col}>
            <KText variant="micro" weight="500" color={c.ink3} style={styles.cap}>
              På Kontek Green
            </KText>
            <LogoTile bg={c.kontekGreen}>
              <Logo source={logos.white} size={26} />
            </LogoTile>
          </View>
          <View style={styles.col}>
            <KText variant="micro" weight="500" color={c.ink3} style={styles.cap}>
              På Signature
            </KText>
            <LogoTile bg={c.signature}>
              <Logo source={logos.white} size={26} />
            </LogoTile>
          </View>
        </View>
      </SpecSection>

      <SpecSection
        title="Clear space & minimum size"
        description="Håll en frizon runt logotypen motsvarande symbolens höjd. Använd den aldrig mindre än 96px bred på skärm (24mm i tryck) så att symbolen förblir läsbar."
        frame="center"
      >
        <View style={[styles.clearbox, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card }]}>
          <View style={[styles.clearInner, { borderColor: c.greenLine }]}>
            <Logo source={logos.green} size={26} />
          </View>
        </View>
        <View style={styles.minRow}>
          <Logo source={logos.greenSm} size={16} />
          <KText variant="caption" color={c.ink3}>
            min. 96px / 24mm
          </KText>
        </View>
      </SpecSection>

      <SpecSection
        title="Incorrect usage"
        description="Förvräng inte, färglägg inte om och lägg inte till effekter. Logotypen används som den är."
        bare
      >
        <View style={styles.grid3}>
          <View style={[styles.dont, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KText variant="micro" weight="700" color={c.danger} style={styles.tag}>
              Töj inte
            </KText>
            <Logo source={logos.green} size={18} style={{ transform: [{ scaleX: 1.6 }] }} />
          </View>
          <View style={[styles.dont, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KText variant="micro" weight="700" color={c.danger} style={styles.tag}>
              Färga inte om
            </KText>
            <Logo source={logos.monoWhite} tintColor={c.info} size={18} />
          </View>
          <View style={[styles.dont, { backgroundColor: c.canvas, borderColor: c.line, borderRadius: theme.radii.card }]}>
            <KText variant="micro" weight="700" color={c.danger} style={styles.tag}>
              Låg kontrast
            </KText>
            <Logo source={logos.green} size={18} style={{ opacity: 0.35 }} />
          </View>
        </View>
      </SpecSection>

      <DosDonts
        dos={[
          'Use the supplied wordmark — green on light, white on dark.',
          'Keep clear space around it and respect the minimum size.',
          'Place it on a calm, high-contrast ground.',
        ]}
        donts={[
          'Recolour, stretch, rotate or add effects to the logo.',
          'Place it on a busy or low-contrast ground.',
          'Shrink it below the minimum size.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  logoTile: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    minHeight: 120,
  },
  grid2: { flexDirection: 'row', gap: 18 },
  grid3: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  col: { flex: 1 },
  cap: { marginBottom: 9 },
  clearbox: { padding: 40, borderWidth: 1 },
  clearInner: {
    borderWidth: 2,
    borderStyle: 'dashed',
    padding: 24,
  },
  minRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 16 },
  dont: {
    flexGrow: 1,
    flexBasis: 100,
    borderWidth: 1,
    padding: 18,
    paddingTop: 28,
    minHeight: 96,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tag: { position: 'absolute', top: 10, left: 12, letterSpacing: 0.4 },
});
