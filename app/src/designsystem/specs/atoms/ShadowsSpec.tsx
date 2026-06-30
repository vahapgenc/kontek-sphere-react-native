// Skuggor — mirrors preview/shadows.html.
// Renders one card per shadow token (xs/sm/md/lg/cta), reading real values from src/tokens.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { shadows } from '../../../tokens';

interface Sample {
  token: 'xs' | 'sm' | 'md' | 'lg' | 'cta';
  use: string;
  red?: boolean;
}

const SAMPLES: Sample[] = [
  { token: 'xs', use: 'hairline lift' },
  { token: 'sm', use: 'resting card' },
  { token: 'md', use: 'raised / hover' },
  { token: 'lg', use: 'menu / modal' },
  { token: 'cta', use: 'red glow', red: true },
];

export function ShadowsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Lyft, inte ramar, separerar ytor. Använd{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--sh-1</KText> för flytande
      kort; skuggfärgen är alltid en låg-alpha djup teal.
    </KText>
  );

  return (
    <SpecCard title="Skuggor" intro={intro}>
      <SpecSection title="Elevation tokens" frame="spread">
        {SAMPLES.map((s) => (
          <View key={s.token} style={styles.item}>
            <View
              style={[
                styles.box,
                shadows[s.token],
                { backgroundColor: s.red ? c.red : c.surface, borderRadius: theme.radii.card },
              ]}
            />
            <KText variant="caption" weight="600" color={c.ink} style={styles.name}>
              {s.token}
            </KText>
            <KText variant="micro" color={c.ink3}>
              {s.use}
            </KText>
          </View>
        ))}
      </SpecSection>

      <DosDonts
        dos={[
          'Use --sh-1 for floating cards; --shadow-sm/md/lg for lighter elevation.',
          'Keep shadow ink a low-alpha deep teal, rgba(18,33,33, …).',
          'Let elevation, not borders, separate stacked surfaces.',
        ]}
        donts={[
          'Use a hard, dark or coloured drop shadow.',
          'Add a shadow and a visible border to the same card.',
          'Over-elevate — reserve the deepest shadows for overlays.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  item: { alignItems: 'center', flexBasis: 80, flexGrow: 1, gap: 2 },
  box: { width: '100%', height: 70, marginBottom: 8 },
  name: { marginTop: 2 },
});
