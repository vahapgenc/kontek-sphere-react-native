// Produktkort — mirrors preview/product-card.html.
// A content card built on the floating-card recipe: soft chip glyph, semibold title,
// muted description, one clear action. Demos use the real KProductCard. Dos & don'ts.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KProductCard, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function ProductCardSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Innehållskort byggt på det flytande receptet —{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--sh-1</KText>, 20px radie, transparent
      ram. En tydlig åtgärd per kort.
    </KText>
  );

  return (
    <SpecCard title="Produktkort" intro={intro}>
      <SpecSection
        title="Product card"
        description="A content card on the floating-card recipe. A soft chip or icon tile fronts the card, a semibold title and a muted description follow, and a single action row (label + chevron) closes it. The whole card may be pressable."
        frame="default"
      >
        <KProductCard
          title="Lön"
          description="Kör lön, skatt och utbetalningar — automatiskt."
          icon={<KIcon name="wallet" size={20} color={c.greenDeep} strokeWidth={2} />}
          actionLabel="Öppna"
          style={styles.card}
        />
        <KProductCard
          title="Time"
          description="Tid, frånvaro och scheman som flödar rakt in i lönen."
          icon={<KIcon name="clock" size={20} color={c.greenDeep} strokeWidth={2} />}
          actionLabel="Öppna"
          style={styles.card}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <KProductCard
                title="Lön"
                description="Kör lön, skatt och utbetalningar."
                icon={<KIcon name="wallet" size={18} color={c.greenDeep} strokeWidth={2} />}
                actionLabel="Öppna"
                style={styles.exCard}
              />
            ),
            caption: 'Floating-card recipe, soft chip glyph, one clear action.',
          },
          dont: {
            stage: (
              <View style={[styles.dontCard, { borderColor: '#C9D2D3', backgroundColor: c.surface }]}>
                <KText variant="title" weight="600" color={c.ink}>Lön</KText>
                <KText variant="caption" color={c.ink3} style={styles.dontDesc}>
                  Hård kant, flera knappar.
                </KText>
              </View>
            ),
            caption: 'Visible border, hard shadow and several competing buttons.',
          },
        }}
        dos={[
          'Build it on the floating-card recipe — --sh-1, 20px radius, transparent border.',
          'Keep one clear action per card.',
          'Use a soft chip or icon tile for the leading glyph.',
        ]}
        donts={[
          'Give the card a visible border or a hard shadow.',
          'Crowd several primary buttons into one card.',
          'Mix card radii across a list of cards.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  card: { flexGrow: 1, flexBasis: 220 },
  exCard: { width: 200 },
  dontCard: { width: 170, padding: 16, borderWidth: 1, borderRadius: 8 },
  dontDesc: { marginTop: 6 },
});
