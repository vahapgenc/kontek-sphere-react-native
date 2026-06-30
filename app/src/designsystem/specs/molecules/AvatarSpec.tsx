// Avatar — mirrors preview/avatar.html.
// Size scale, types (photo / initials / icon), colour tones, presence, with name & group,
// on dark surface, incorrect usage, anatomy, dos & don'ts. Demos use the real KAvatar.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KAvatar, KIcon } from '../../../components';
import { useTheme } from '../../../theme';

const PHOTO = { uri: 'https://i.pravatar.cc/160?img=12' };
const PHOTO2 = { uri: 'https://i.pravatar.cc/160?img=33' };

export function AvatarSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Cirkulär identitetsmarkör. Initialer på{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>--guide</KText> med vit text — aldrig
      flerfärgade paletter.
    </KText>
  );

  return (
    <SpecCard title="Avatar" intro={intro}>
      <SpecSection
        title="Size scale"
        description="Cirkulär identitetsmarkör i fem storlekar. 24px i täta listor och chips, 32px i tabellrader, 40px som standard, 48–64px i profilhuvuden. Talet motsvarar diametern i pixlar."
      >
        <StateCell label="xs · 24px" center>
          <KAvatar initials="AL" size="xs" />
        </StateCell>
        <StateCell label="sm · 32px" center>
          <KAvatar initials="AL" size="sm" />
        </StateCell>
        <StateCell label="md · 40px" center>
          <KAvatar initials="AL" size="md" />
        </StateCell>
        <StateCell label="lg · 48px" center>
          <KAvatar initials="AL" size="lg" />
        </StateCell>
        <StateCell label="xl · 64px" center>
          <KAvatar initials="AL" size="xl" />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Types"
        description="Foto när det finns, annars initialer (för- och efternamnets första bokstav) på The Guide-grön. Generisk ikon endast när varken namn eller bild är känt — t.ex. en inbjuden men ej registrerad användare."
      >
        <StateCell label="Foto" center>
          <KAvatar source={PHOTO} size="lg" />
        </StateCell>
        <StateCell label="Initialer" center>
          <KAvatar initials="SN" size="lg" />
        </StateCell>
        <StateCell label="Ikon" center>
          <KAvatar size="lg" tone="muted" />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="Colour tones for initials"
        description="Initialavatarer håller sig inom varumärket. The Guide är standard; soft och Kontek Green finns för kontrast mot olika ytor. Tilldela inte slumpmässiga regnbågsfärger per person."
        frame="center"
      >
        <KAvatar initials="AL" size="lg" tone="default" />
        <KAvatar initials="EH" size="lg" tone="soft" />
        <KAvatar initials="SN" size="lg" tone="forest" />
        <KAvatar initials="JL" size="lg" tone="muted" />
      </SpecSection>

      <SpecSection
        title="Presence"
        description="En valfri statusprick visar närvaro. Pricken har en 2px ring i ytans färg så den läser tydligt även ovanpå fotot."
        frame="center"
      >
        <StateCell label="Online" center>
          <KAvatar source={PHOTO} size="lg" presence="online" />
        </StateCell>
        <StateCell label="Frånvarande" center>
          <KAvatar initials="AL" size="lg" presence="away" />
        </StateCell>
        <StateCell label="Upptagen" center>
          <KAvatar initials="SN" size="lg" tone="forest" presence="busy" />
        </StateCell>
        <StateCell label="Offline" center>
          <KAvatar initials="JL" size="lg" tone="muted" presence="offline" />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="With name & group"
        description="I rader paras avataren med namn och roll. Flera personer staplas med överlapp och en avslutande +N-bricka när antalet överstiger det som visas."
        frame="col"
      >
        <View style={styles.id}>
          <KAvatar initials="AL" size="md" />
          <View>
            <KText variant="bodySm" weight="600" color={c.ink}>Anna Lindqvist</KText>
            <KText variant="caption" color={c.ink3}>Lönechef</KText>
          </View>
        </View>
        <View style={styles.id}>
          <KAvatar source={PHOTO2} size="md" />
          <View>
            <KText variant="bodySm" weight="600" color={c.ink}>Erik Holm</KText>
            <KText variant="caption" color={c.ink3}>Konsult · extern</KText>
          </View>
        </View>
        <View style={styles.group}>
          <View style={styles.stack}><KAvatar source={PHOTO} size="md" style={ringStyle(c)} /></View>
          <View style={styles.stack}><KAvatar initials="SN" size="md" style={ringStyle(c)} /></View>
          <View style={styles.stack}><KAvatar initials="JL" size="md" tone="soft" style={ringStyle(c)} /></View>
          <View style={styles.stack}><KAvatar source={PHOTO2} size="md" style={ringStyle(c)} /></View>
          <View style={styles.stack}><KAvatar initials="+5" size="md" tone="muted" style={ringStyle(c)} /></View>
        </View>
      </SpecSection>

      <SpecSection
        title="On dark surface"
        description="På Brand Signature och andra mörka varumärkesytor — t.ex. sidomenyns kontoblock — behåller avataren sin form. Lägg en ring runt foton så de skiljs från bakgrunden."
        bare
      >
        <View style={[styles.darkbox, { backgroundColor: c.signature, borderRadius: theme.radii.card }]}>
          <KAvatar source={PHOTO} size="lg" />
          <KAvatar initials="AL" size="lg" />
          <View style={styles.id}>
            <KAvatar initials="AL" size="md" />
            <View>
              <KText variant="bodySm" weight="600" color="#fff">Anna Lindqvist</KText>
              <KText variant="caption" color={c.mutedSurface}>Lönechef</KText>
            </View>
          </View>
        </View>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Shape', value: 'circular, centre-cropped' },
            { name: 'Sizes', value: '24 · 32 · 40 · 48 · 64' },
            { name: 'Fill', value: '--guide (The Guide)' },
            { name: 'Initials', value: 'white, 600' },
            { name: 'Presence', value: 'dot + 2px surface ring' },
            { name: 'Fallback', value: 'photo → initials → icon' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: <KAvatar initials="AL" size="lg" />,
            caption: 'Initials on The Guide with white text, always circular.',
          },
          dont: {
            stage: (
              <View style={[styles.squareAva, { backgroundColor: '#C0392B' }]}>
                <KText variant="title" weight="600" color="#fff">AL</KText>
              </View>
            ),
            caption: 'Square shape and a per-person rainbow fill break brand.',
          },
        }}
        dos={[
          'Sit initials on --guide (The Guide) with white text, always circular.',
          'Fall back photo → initials → icon, in that order.',
          'Use the size scale (24/32/40/48/64) and a ring when avatars overlap.',
        ]}
        donts={[
          'Invent per-person rainbow background palettes.',
          'Make avatars square.',
          'Size below 24px or off the scale.',
        ]}
      />
    </SpecCard>
  );
}

function ringStyle(c: { surface: string }) {
  return { borderWidth: 2, borderColor: c.surface } as const;
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  id: { flexDirection: 'row', alignItems: 'center', gap: 11 },
  group: { flexDirection: 'row' },
  stack: { marginLeft: -12 },
  darkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 26,
    padding: 24,
  },
  squareAva: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
