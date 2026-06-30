// Rörelse — mirrors preview/motion.html.
// Duration scale + easing curves read from src/tokens (duration, easing).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { SpecCard, SpecSection, Frame, DosDonts } from '../../scaffold';
import { KText } from '../../../components';
import { useTheme } from '../../../theme';
import { duration, easing } from '../../../tokens';

type DurKey = keyof typeof duration;

const DUR_USE: Record<DurKey, string> = {
  instant: 'Hover-ton, kantbyte',
  fast: 'Kryssruta, reglage, klick',
  moderate: 'Dropdown, tooltip, dragspel',
  slow: 'Modal, drawer, notis',
  slower: 'Scrim / bakgrundsdimning',
};

// Max duration in the scale — used to size the track-fill width proportionally.
const MAX_MS = Math.max(...Object.values(duration));

interface Curve {
  name: string;
  value: string;
  d: string;
}

const CURVES: Curve[] = [
  { name: 'standard', value: easing.standard.join(', '), d: 'M0 100 C20 100 38 10 100 0' },
  { name: 'entrance', value: easing.entrance.join(', '), d: 'M0 100 C0 100 38 10 100 0' },
  { name: 'exit', value: easing.exit.join(', '), d: 'M0 100 C20 100 100 10 100 0' },
  { name: 'linear', value: 'jämn takt', d: 'M0 100 L100 0' },
];

export function MotionSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Återhållsam rörelse: 120–320ms, mjuk easing. Tryck = liten scale(0.98).{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>
        Ingen studs, ingen oändlig loop
      </KText>
      ; respektera reducerad rörelse.
    </KText>
  );

  return (
    <SpecCard title="Rörelse" intro={intro}>
      <SpecSection
        title="Duration"
        description="Hela skalan ryms inom 400ms — rörelsen ska kännas, inte väntas på. Kortare för direkt feedback, längre för ytor som glider in. Vid prefers-reduced-motion kollapsar alla till 0ms."
        frame="col"
      >
        {(Object.keys(duration) as DurKey[]).map((k, i, arr) => (
          <View
            key={k}
            style={[
              styles.drow,
              { borderBottomColor: c.line2 },
              i === arr.length - 1 && styles.drowLast,
            ]}
          >
            <KText variant="caption" weight="600" color={c.ink} style={styles.tok}>
              {k}
            </KText>
            <KText variant="caption" color={c.ink3} style={styles.ms}>
              {duration[k]}ms
            </KText>
            <View style={[styles.track, { backgroundColor: c.surface2 }]}>
              <View
                style={[
                  styles.fill,
                  { backgroundColor: c.green, width: `${(duration[k] / MAX_MS) * 100}%` },
                ]}
              />
            </View>
            <KText variant="caption" color={c.ink3} style={styles.use}>
              {DUR_USE[k]}
            </KText>
          </View>
        ))}
      </SpecSection>

      <SpecSection
        title="Easing"
        description="Standard för synliga övergångar, entrance för element som dyker upp, exit för element som lämnar, linear för konstant takt (loaders, progress)."
      >
        <View style={styles.curves}>
          {CURVES.map((cv) => (
            <View key={cv.name} style={styles.curve}>
              <View style={[styles.curveBox, { backgroundColor: c.surface2 }]}>
                <Svg width={100} height={100} viewBox="0 0 100 100">
                  <Path d={cv.d} fill="none" stroke={c.greenDeep} strokeWidth={2.5} />
                </Svg>
              </View>
              <KText variant="caption" weight="600" color={c.ink} style={styles.curveName}>
                {cv.name}
              </KText>
              <KText variant="micro" color={c.ink3}>
                {cv.value}
              </KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="In practice"
        description="Hovra kortet för det lyft de flesta ytor gör. Loadern går i konstant linjär takt. Ingen studs, ingen oändlig dekorativ rörelse på innehåll."
        frame="center"
      >
        <View
          style={[
            styles.demoCard,
            theme.shadows.sm,
            { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card },
          ]}
        >
          <KText variant="caption" color={c.ink2}>
            Hovra för lyft + djupare skugga
          </KText>
        </View>
        <View style={[styles.loader, { borderColor: c.surface2, borderTopColor: c.green }]} />
        <KText variant="caption" color={c.ink3}>
          Loader · linear · kontinuerlig
        </KText>
      </SpecSection>

      <DosDonts
        dos={[
          'Keep motion 120–320ms on cubic-bezier(.22,.61,.36,1).',
          'Press = a slight scale(0.98) that springs back.',
          'Make entrances transform-only and respect prefers-reduced-motion.',
        ]}
        donts={[
          'Add hover states on the phone — resting and hover look identical.',
          'Use bounce, spin or infinite loops on content.',
          'Animate opacity-from-0 with no reduced-motion fallback — a paused frame must still show content.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  drow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  drowLast: { borderBottomWidth: 0 },
  tok: { width: 96 },
  ms: { width: 52 },
  track: { flex: 1, height: 8, borderRadius: 999, overflow: 'hidden', minWidth: 60 },
  fill: { height: 8, borderRadius: 999 },
  use: { width: 130 },
  curves: { flexDirection: 'row', gap: 26, flexWrap: 'wrap' },
  curve: { alignItems: 'center' },
  curveBox: { borderRadius: 10, padding: 0, overflow: 'hidden' },
  curveName: { marginTop: 9 },
  demoCard: { width: 170, padding: 18, borderWidth: 1 },
  loader: { width: 34, height: 34, borderRadius: 17, borderWidth: 3 },
});
