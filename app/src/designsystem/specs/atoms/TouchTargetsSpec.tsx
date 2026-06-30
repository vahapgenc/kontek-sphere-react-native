// Tryckytor — mirrors preview/touch-targets.html.
// Visualises the 48px minimum hit area with padded targets + the layout tokens.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

interface Target {
  size: number;
  bg: string;
  border: string;
  ink: string;
  hit: string;
  glyph: 'plus' | 'text';
  text?: string;
  name: string;
  px: string;
}

export function TouchTargetsSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const targets: Target[] = [
    {
      size: 48,
      bg: c.greenSoft,
      border: c.greenLine,
      ink: c.greenDeep,
      hit: c.green,
      glyph: 'plus',
      name: 'tap-min',
      px: '48 × 48',
    },
    {
      size: 48,
      bg: c.signature,
      border: c.signature,
      ink: '#fff',
      hit: 'rgba(255,255,255,.5)',
      glyph: 'text',
      text: 'Aa',
      name: 'control-h',
      px: '48',
    },
    {
      size: 56,
      bg: c.action,
      border: c.action,
      ink: '#fff',
      hit: 'rgba(255,255,255,.5)',
      glyph: 'text',
      text: 'Aa',
      name: 'control-h-lg',
      px: '56',
    },
    {
      size: 40,
      bg: c.surface2,
      border: c.line,
      ink: c.ink3,
      hit: c.silverMist,
      glyph: 'text',
      text: 'sm',
      name: 'control-h-sm',
      px: '40 (in dense rows)',
    },
  ];

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Allt interaktivt är minst{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>48px</KText> — samma säkra
      minimum på iOS och Android. Utöka träffytan med padding, inte en större ikon.
    </KText>
  );

  return (
    <SpecCard title="Tryckytor" intro={intro}>
      <SpecSection
        title="One safe minimum for both platforms"
        description="iOS asks for ≥ 44pt and Android Material for ≥ 48dp — we standardise on 48 so nothing is ever borderline. A control may look smaller, but its hit area is padded out to 48; comfortable spacing between targets prevents mis-taps."
        frame="center"
      >
        <View style={styles.tt}>
          {targets.map((t, i) => (
            <View key={i} style={styles.tcol}>
              <View
                style={[
                  styles.target,
                  {
                    width: t.size,
                    height: t.size,
                    backgroundColor: t.bg,
                    borderColor: t.border,
                    borderRadius: theme.radii.button,
                  },
                ]}
              >
                <View
                  style={[
                    styles.hit,
                    { borderColor: t.hit, borderRadius: theme.radii.button },
                  ]}
                />
                {t.glyph === 'plus' ? (
                  <KIcon name="plus" size={22} color={t.ink} strokeWidth={1.85} />
                ) : (
                  <KText variant="bodySm" weight="600" color={t.ink}>
                    {t.text}
                  </KText>
                )}
              </View>
              <KText variant="eyebrow" weight="600" color={c.ink}>
                {t.name}
              </KText>
              <KText variant="micro" color={c.ink3}>
                {t.px}
              </KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection title="Tokens">
        <AnatomyList
          items={[
            { name: '--tap-min', value: '48px' },
            { name: '--control-h', value: '48px' },
            { name: '--control-h-lg', value: '56px' },
            { name: '--control-h-sm', value: '40px' },
            { name: '--screen-gutter', value: '16px' },
            { name: '--appbar-h', value: '56px' },
            { name: '--tabbar-h', value: '58px' },
            { name: '--safe-top / --safe-bottom', value: 'env()' },
          ]}
        />
      </SpecSection>

      <DosDonts
        dos={[
          'Keep every interactive element at least 48px (--tap-min) on iOS and Android.',
          "Expand a small glyph's hit area with padding, not a bigger icon.",
          'Space adjacent targets so their hit areas never overlap.',
        ]}
        donts={[
          'Ship a sub-48px tap target, even for a tiny icon.',
          'Crowd two targets so a thumb hits both.',
          'Rely on the visible art size — size the hit area.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  tt: { flexDirection: 'row', gap: 22, flexWrap: 'wrap', alignItems: 'flex-end' },
  tcol: { alignItems: 'center', gap: 9 },
  target: { alignItems: 'center', justifyContent: 'center', borderWidth: 1.5 },
  hit: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    opacity: 0.55,
  },
});
