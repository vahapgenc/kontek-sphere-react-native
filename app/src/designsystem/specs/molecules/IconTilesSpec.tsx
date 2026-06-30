// Ikonbrickor & chips — mirrors preview/icon-tiles.html.
// Action / navigational tiles (brand fill + warn palette), soft chips & people avatars,
// dos & don'ts. Demos use the real KIconTile (brand/soft) and KAvatar.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, DosDonts } from '../../scaffold';
import { KText, KIconTile, KAvatar, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

export function IconTilesSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Åtgärdsbrickor är fyllda{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--tile-fill</KText> med vit ikon; mjuka
      chips är --green-soft; avatarer sitter på --guide.
    </KText>
  );

  return (
    <SpecCard title="Ikonbrickor & chips" intro={intro}>
      <SpecSection
        title="Action / navigational tiles"
        description="Tiles that front a row action use a solid --tile-fill (Kontek Green) square with a white icon — no border, 11–12px radius. Action-required tiles flip to the warn palette so they read as needs you."
      >
        <StateCell label="Action tile · #053F22 · white" center>
          <KIconTile icon="calendar" tone="brand" size={44} />
        </StateCell>
        <StateCell label="Action tile" center>
          <KIconTile icon="receipt" tone="brand" size={44} />
        </StateCell>
        <StateCell label="Action required · warn palette" center>
          <View style={[styles.warnTile, { backgroundColor: c.warnSoft }]}>
            <KIcon name="warn" size={23} color={c.warn} strokeWidth={1.9} />
          </View>
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Soft chips & people avatars"
        description="Soft chips (register cards, expense/leave glyphs) use a --green-soft background with a --green-deep icon. People avatars are initials on --guide (The Guide), white text, circular — never multi-colour."
      >
        <StateCell label="Soft chip · --green-soft" center>
          <KIconTile icon="receipt" tone="soft" size={44} />
        </StateCell>
        <StateCell label="Soft chip" center>
          <KIconTile icon="wallet" tone="soft" size={44} />
        </StateCell>
        <StateCell label="Avatar · --guide" center>
          <KAvatar initials="AL" size="lg" />
        </StateCell>
        <StateCell label="Avatar" center>
          <KAvatar initials="MK" size="lg" />
        </StateCell>
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <>
                <KIconTile icon="calendar" tone="brand" size={46} />
                <KAvatar initials="AL" size="lg" />
              </>
            ),
            caption: 'Single-colour tile + initials avatar on The Guide.',
          },
          dont: {
            stage: (
              <>
                <View style={[styles.badTile, { backgroundColor: '#EC4899' }]}>
                  <KIcon name="calendar" size={23} color="#fff" strokeWidth={1.8} />
                </View>
                <View style={[styles.badAva, { backgroundColor: '#EC4899' }]}>
                  <KText variant="title" weight="600" color="#fff">AL</KText>
                </View>
              </>
            ),
            caption: 'Multi-colour tiles and rainbow avatars break brand discipline.',
          },
        }}
        dos={[
          'Use a solid --tile-fill square with a white icon for action/nav tiles.',
          'Flip action-required tiles to the --warn palette so they signal "needs you".',
          'Sit people avatars on --guide with white initials, always circular.',
        ]}
        donts={[
          'Multi-colour icons or give avatars per-person rainbow fills.',
          'Add a border to tiles, or mix tile and chip radii.',
          'Use the warn palette for anything other than action-required.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  warnTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badTile: {
    width: 46,
    height: 46,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badAva: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
