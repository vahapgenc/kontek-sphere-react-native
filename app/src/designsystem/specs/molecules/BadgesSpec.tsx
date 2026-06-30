// Etiketter — mirrors preview/badges.html.
// Status pills (six tones, meaning), state→tone→label map, dot-or-no-dot,
// count badge, anatomy, dos & don'ts. The pills use the real KBadge component.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KBadge, KIcon, type BadgeTone } from '../../../components';
import { useTheme } from '../../../theme';

interface ToneRow {
  tone: BadgeTone;
  label: string;
  dot: boolean;
  meaningHead: string;
  meaning: string;
  key: string;
}

const TONES: ToneRow[] = [
  { tone: 'ok', label: 'Godkänd', dot: true, meaningHead: 'ok', meaning: '— klart och bra: godkänd, betald, aktiv.', key: '--ok · --ok-bg' },
  { tone: 'warn', label: 'Åtgärd krävs', dot: true, meaningHead: 'warn', meaning: '— behöver dig: fixa, åtgärd krävs.', key: '--warn · --warn-bg' },
  { tone: 'info', label: 'Väntar på godkännande', dot: true, meaningHead: 'info', meaning: '— pågår: inväntar godkännande, granska.', key: '--info · --info-bg' },
  { tone: 'danger', label: 'Avvisad', dot: true, meaningHead: 'danger', meaning: '— misslyckat/negativt: avvisad.', key: '--danger · --danger-bg' },
  { tone: 'neutral', label: 'Gäller: maj', dot: false, meaningHead: 'neutral', meaning: '— tyst metadata, valfria ledtrådar.', key: '--ink-3 · --surface-2' },
  { tone: 'brand', label: 'Preliminär', dot: true, meaningHead: 'brand', meaning: '— varumärkesmarkör, t.ex. ”Preliminär” på lön.', key: '--signature · --green-soft' },
];

interface MapRow {
  code: string;
  tone: BadgeTone;
  label: string;
  dot: boolean;
}

const MAP: MapRow[] = [
  { code: 'action', tone: 'warn', label: 'Åtgärd krävs', dot: true },
  { code: 'pending', tone: 'info', label: 'Väntar på godkännande', dot: true },
  { code: 'approved', tone: 'ok', label: 'Godkänd', dot: true },
  { code: 'rejected', tone: 'danger', label: 'Avvisad', dot: true },
  { code: 'info', tone: 'neutral', label: 'Info', dot: false },
];

export function BadgesSpec() {
  const theme = useTheme();
  const c = theme.colors;

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Två obesläktade saker kallas ”badge”. Håll isär dem:{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>statuspiller</KText> säger{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>vilket tillstånd</KText> (sex semantiska
      toner, prick = levande tillstånd),{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>antalsbrickor</KText> säger{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>hur många</KText> (grön cirkel i
      nav-fliken, neutralt grå annars; vit siffra, bara när &gt; 0). Blanda dem aldrig.
    </KText>
  );

  return (
    <SpecCard title="Etiketter" intro={intro}>
      <SpecSection
        title="Status pill — the six tones"
        description="A pill's colour is never set by hand. You pick a tone by meaning; the tone resolves to a matched text-colour + soft-background pair. These six are the complete set — default tone is info."
        bare
      >
        <View style={[styles.tones, { borderColor: c.line2, backgroundColor: c.surface, borderRadius: theme.radii.card }]}>
          {TONES.map((t, i) => (
            <View key={t.tone} style={[styles.trow, i < TONES.length - 1 && { borderBottomColor: c.line2, borderBottomWidth: 1 }]}>
              <DotBadge tone={t.tone} label={t.label} dot={t.dot} />
              <KText variant="caption" color={c.ink3} style={styles.meaning}>
                <KText variant="caption" weight="600" color={c.ink2}>{t.meaningHead} </KText>
                {t.meaning}
              </KText>
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="State → tone → label"
        description="Item-tillstånd löses genom en delad tabell så att samma tillstånd alltid ser likadant ut. Använd dessa etiketter och toner ordagrant."
        bare
      >
        <View style={[styles.tones, { borderColor: c.line2, backgroundColor: c.surface, borderRadius: theme.radii.card }]}>
          {MAP.map((m, i) => (
            <View key={m.code} style={[styles.maprow, i < MAP.length - 1 && { borderBottomColor: c.line2, borderBottomWidth: 1 }]}>
              <KText variant="caption" weight="600" color={c.ink2} style={styles.code}>
                {m.code}
              </KText>
              <DotBadge tone={m.tone} label={m.label} dot={m.dot} />
            </View>
          ))}
        </View>
      </SpecSection>

      <SpecSection
        title="Dot or no dot"
        description="Rule of thumb: a live state of a real item carries a dot; a static tag or metadata doesn't."
      >
        <DotBadge tone="ok" label="Betald" dot />
        <DotBadge tone="warn" label="Fixa" dot />
        <DotBadge tone="info" label="Granska" dot />
        <DotBadge tone="neutral" label="Gäller: maj" dot={false} />
        <DotBadge tone="neutral" label="Kan kräva intyg" dot={false} />
      </SpecSection>

      <SpecSection
        title="Count badge"
        description="A tiny number bubble that shows a count — only ever when it is > 0. Green is for the bottom-nav tabs only. Everywhere else a count appears — the app-bar bell, a section header — it is a neutral dark-grey circle. White number, 2px white ring in both cases."
      >
        <CountSlot caption="Nav-flikar — grön">
          <IconCount icon="home" label="Hem" count={5} tone="green" />
          <IconCount icon="user" label="Anställda" count={12} tone="green" muted />
        </CountSlot>
        <CountSlot caption="Klocka & rubriker — neutralt grått">
          <IconCount icon="bell" label="Notiser" count={3} tone="neutral" muted />
          <IconCount icon="approvals" label="Att göra" count={12} tone="neutral" muted />
        </CountSlot>
      </SpecSection>

      <SpecSection title="Anatomy" bare>
        <AnatomyList
          items={[
            { name: 'Pill', value: '--r-pill · 4px 10px · 11px/600' },
            { name: 'Dot', value: '6×6 · text colour' },
            { name: 'Tones', value: '6 (ok·warn·info·danger·neutral·brand)' },
            { name: 'Count', value: '18px · pill at 2+ digits · white 11px' },
            { name: 'Fill', value: '--green (nav) · --ink-3 (elsewhere)' },
            { name: 'Ring', value: '2px --surface' },
            { name: 'Position', value: 'top -6 · right -11' },
          ]}
        />
      </SpecSection>

      <DosDonts
        examples={{
          do: {
            stage: (
              <View style={styles.exRow}>
                <DotBadge tone="info" label="Granska" dot />
                <IconCount icon="bell" label="" count={3} tone="neutral" muted compact />
              </View>
            ),
            caption: 'Pill = what state (tone + dot); circle = how many. Two different jobs.',
          },
          dont: {
            stage: (
              <View style={styles.exRow}>
                <KBadge tone="info" label="Väntar (3)" />
                <KBadge tone="danger" label="Ta bort" />
              </View>
            ),
            caption: "Don't bury a count in a pill, and never use danger for a destructive action.",
          },
        }}
        dos={[
          'Pick the tone by meaning, and always use the matched text + background pair.',
          'Add a dot for a live item state; leave it off for a static tag or metadata.',
          'Use the green count circle on the bottom-nav tabs and the neutral grey circle for the bell and section headers — white number, 2px ring, only when > 0.',
          'Keep labels 1–2 words, sentence case; shorten the copy rather than truncate.',
        ]}
        donts={[
          'Use danger for a destructive action — it only marks a negative/failed state (rejected).',
          'Hand-roll a 7th colour; an uncovered state maps to neutral.',
          'Put a count inside a pill, a status word inside a circle, or render a ”0” badge.',
          "Mix a tone's text colour with a different background.",
        ]}
      />
    </SpecCard>
  );
}

// A KBadge with an optional leading "live state" dot, matching the preview pill.
function DotBadge({ tone, label, dot }: { tone: BadgeTone; label: string; dot: boolean }) {
  const theme = useTheme();
  const ink = toneInk(tone, theme.colors);
  if (!dot) return <KBadge tone={tone} label={label} />;
  // The live-state dot sits in extra left padding so it never overlaps the label.
  return (
    <View style={styles.dotWrap}>
      <KBadge tone={tone} label={label} style={styles.dotBadge} />
      <View style={[styles.dot, { backgroundColor: ink }]} pointerEvents="none" />
    </View>
  );
}

function CountSlot({ caption, children }: { caption: string; children: React.ReactNode }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <View style={styles.slot}>
      <View style={styles.counts}>{children}</View>
      <KText variant="micro" color={c.ink3}>
        {caption}
      </KText>
    </View>
  );
}

function IconCount({
  icon,
  label,
  count,
  tone,
  muted,
  compact,
}: {
  icon: React.ComponentProps<typeof KIcon>['name'];
  label: string;
  count: number;
  tone: 'green' | 'neutral';
  muted?: boolean;
  compact?: boolean;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const bubbleBg = tone === 'green' ? c.green : c.ink3;
  const iconColor = muted ? c.ink3 : c.signature;
  return (
    <View style={styles.tabish}>
      <View style={styles.iconWrap}>
        <KIcon name={icon} size={26} color={iconColor} strokeWidth={1.9} />
        {count > 0 ? (
          <View style={[styles.bubble, { backgroundColor: bubbleBg, borderColor: c.surface }]}>
            <KText variant="micro" weight="700" color="#fff">
              {count}
            </KText>
          </View>
        ) : null}
      </View>
      {!compact && label ? (
        <KText variant="micro" weight="600" color={c.signature}>
          {label}
        </KText>
      ) : null}
    </View>
  );
}

function toneInk(tone: BadgeTone, c: ReturnType<typeof useTheme>['colors']) {
  switch (tone) {
    case 'ok':
      return c.ok;
    case 'warn':
      return c.warn;
    case 'info':
      return c.info;
    case 'danger':
      return c.danger;
    case 'brand':
      return c.signature;
    case 'neutral':
    default:
      return c.ink3;
  }
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  tones: { width: '100%', borderWidth: 1, paddingHorizontal: 16 },
  trow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 13,
  },
  meaning: { flex: 1, lineHeight: 19 },
  maprow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    paddingVertical: 11,
  },
  code: { width: 110 },
  dotWrap: { position: 'relative', alignSelf: 'flex-start' },
  dotBadge: { paddingLeft: 22 },
  dot: {
    position: 'absolute',
    left: 10,
    top: '50%',
    marginTop: -3,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  slot: { gap: 8, alignItems: 'center' },
  counts: { flexDirection: 'row', gap: 34, flexWrap: 'wrap', alignItems: 'flex-start' },
  tabish: { alignItems: 'center', gap: 8, paddingHorizontal: 8 },
  iconWrap: { position: 'relative', padding: 2 },
  bubble: {
    position: 'absolute',
    top: -6,
    right: -11,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  exRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
});
