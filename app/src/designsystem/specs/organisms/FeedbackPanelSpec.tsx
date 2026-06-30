// Återkopplingspanel — mirrors preview/status-row.html (the "Feedback panel" card).
// Captures a thumb rating + an optional comment. Ask for the rating first; the comment
// is always optional. There is NO dedicated component — the panel is reproduced inline
// from KCard + KIcon + KTextArea + KButton. Live demo carries rating → comment → confirm.
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { SpecCard, SpecSection, StateCell, AnatomyList, DosDonts } from '../../scaffold';
import { KText, KIcon, KCard, KTextArea, KButton } from '../../../components';
import { useTheme } from '../../../theme';

type Rating = 'up' | 'down' | null;

// One thumb button. Selected fills with Brand Signature; check = up, close = down.
function Thumb({ kind, selected, onPress }: { kind: 'up' | 'down'; selected: boolean; onPress: () => void }) {
  const theme = useTheme();
  const c = theme.colors;
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={kind === 'up' ? 'Tummen upp' : 'Tummen ned'}
      style={[
        styles.thumb,
        {
          borderColor: selected ? c.signature : c.line,
          backgroundColor: selected ? c.signature : c.surface,
          borderRadius: theme.radii.input,
        },
      ]}
    >
      <KIcon name={kind === 'up' ? 'check' : 'close'} size={22} color={selected ? c.onDark : c.ink2} strokeWidth={1.9} />
    </Pressable>
  );
}

// The reproduced panel. When `confirmed`, the body is replaced by a calm thank-you.
function FeedbackPanel({
  rating,
  confirmed,
  comment,
  onRate,
  onComment,
  onSubmit,
  onCancel,
}: {
  rating: Rating;
  confirmed: boolean;
  comment: string;
  onRate: (r: Rating) => void;
  onComment: (t: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const expanded = rating !== null;

  if (confirmed) {
    return (
      <KCard style={styles.panel} padding={16}>
        <KText variant="body" weight="600" color={c.ink} align="center">
          Tack för att du tog dig tid 🙏
        </KText>
      </KCard>
    );
  }

  return (
    <KCard style={styles.panel} padding={16}>
      <View style={styles.head}>
        <KText variant="bodySm" weight="600" color={c.ink} style={styles.flex1}>
          Hur är din upplevelse av den här sidan?
        </KText>
        <Pressable onPress={onCancel} accessibilityRole="button" accessibilityLabel="Stäng" hitSlop={8}>
          <KIcon name="close" size={18} color={c.ink3} strokeWidth={2} />
        </Pressable>
      </View>

      <View style={styles.rating}>
        <Thumb kind="up" selected={rating === 'up'} onPress={() => onRate('up')} />
        <Thumb kind="down" selected={rating === 'down'} onPress={() => onRate('down')} />
      </View>

      {expanded ? (
        <>
          <KText variant="bodySm" color={c.ink2} style={styles.prompt}>Kan du berätta mer?</KText>
          <KTextArea value={comment} onChangeText={onComment} placeholder="Skriv ditt svar här…" minHeight={80} />
          <View style={styles.actions}>
            <KButton label="Skicka" variant="primary" onPress={onSubmit} />
            <KButton label="Avbryt" variant="secondary" onPress={onCancel} />
          </View>
        </>
      ) : null}
    </KCard>
  );
}

export function FeedbackPanelSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [rating, setRating] = useState<Rating>(null);
  const [comment, setComment] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const reset = () => {
    setRating(null);
    setComment('');
    setConfirmed(false);
  };

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Fångar ett tumbetyg och en valfri kommentar.{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Fråga betyget först</KText>;
      kommentaren är alltid frivillig.
    </KText>
  );

  return (
    <SpecCard title="Återkopplingspanel" intro={intro}>
      <SpecSection
        title="Interactive"
        description="Captures page feedback as a thumb rating and an optional comment. Pick a thumb and the comment unfolds; after Skicka a confirmation appears and auto-dismisses after 2 seconds."
        frame="col"
      >
        <StateCell label="Live demo">
          <FeedbackPanel
            rating={rating}
            confirmed={confirmed}
            comment={comment}
            onRate={setRating}
            onComment={setComment}
            onSubmit={() => setConfirmed(true)}
            onCancel={reset}
          />
        </StateCell>
        <StateCell label="Återställ demo">
          <KButton label="Återställ demo" variant="ghost" size="sm" onPress={reset} />
        </StateCell>
      </SpecSection>

      <SpecSection
        title="States"
        description="Three content-bearing modes: rating only (start), rating + comment (after a choice), and confirmation (after Skicka). The selected thumb fills with Brand Signature."
        frame="col"
      >
        <StateCell label="Start · enbart betyg">
          <FeedbackPanel rating={null} confirmed={false} comment="" onRate={() => {}} onComment={() => {}} onSubmit={() => {}} onCancel={() => {}} />
        </StateCell>
        <StateCell label="Tummen upp vald">
          <FeedbackPanel rating="up" confirmed={false} comment="" onRate={() => {}} onComment={() => {}} onSubmit={() => {}} onCancel={() => {}} />
        </StateCell>
        <StateCell label="Bekräftelse">
          <FeedbackPanel rating="up" confirmed comment="" onRate={() => {}} onComment={() => {}} onSubmit={() => {}} onCancel={() => {}} />
        </StateCell>
      </SpecSection>

      <SpecSection title="Anatomy" frame="default">
        <AnatomyList
          items={[
            { name: '1 · Rubrik', value: 'Hur är din upplevelse?' },
            { name: '2 · Stäng-ikon', value: 'top-right close' },
            { name: '3 · Tumbetyg', value: 'up / down, selected = signature' },
            { name: '4 · Kommentarsfråga', value: 'Kan du berätta mer?' },
            { name: '5 · Textområde', value: 'optional comment' },
            { name: '6 · Åtgärdsknappar', value: 'Skicka + Avbryt' },
            { name: 'Bredd', value: '320px fast · 16px innerkant' },
            { name: 'Bekräftelse', value: 'auto-stängning 2000 ms' },
          ]}
        />
      </SpecSection>

      <DosDonts
        doHead="Do"
        dontHead="Don't"
        dos={[
          'Ask for the rating first; keep the comment optional.',
          'Fill the selected thumb and the Submit button with --signature.',
          'Replace the body with a short, calm thank-you on submit.',
        ]}
        donts={[
          'Force a written comment before the user can submit.',
          'Use red or hype to chase a rating.',
          'Block the screen behind the panel.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  flex1: { flex: 1, minWidth: 0 },
  panel: { width: 320, maxWidth: '100%' },
  head: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  rating: { flexDirection: 'row', gap: 12, marginTop: 16 },
  thumb: {
    width: 56,
    height: 48,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: { marginTop: 24, marginBottom: 8 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 16 },
});
