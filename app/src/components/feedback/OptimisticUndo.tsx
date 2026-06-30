// KOptimisticUndo — the approve-then-undo pattern (optimistic-undo §Organisms).
// An approval row (avatar · name · sub · status pill) that, once acted on, transitions
// to the "gone" state (faded, strike-through, green check) and surfaces a dark snackbar
// offering Ångra. Reuses KSnackbar's visual via the shared bottom toast. Presentational:
// the host owns the `acted` flag and the dismiss timer, and supplies onUndo.
import React from 'react';
import { View, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';
import { KSnackbar } from './Snackbar';

export interface KOptimisticUndoProps {
  // Two-letter avatar initials, e.g. "ML".
  initials: string;
  name: string;
  // Sub line in the resting state (e.g. "Utlägg · 480 kr").
  detail: string;
  // Sub line shown once acted (e.g. "Godkänd"). Defaults to the resting detail.
  actedDetail?: string;
  // Resting-state status pill (e.g. "Granska"). Tone defaults to info.
  statusLabel?: string;
  statusTone?: 'info' | 'ok' | 'warn' | 'danger';
  // When true the row collapses to the "gone" state and the snackbar appears.
  acted: boolean;
  // Snackbar message shown while reversible (e.g. "Utlägg godkänt").
  snackbarMessage?: string;
  undoLabel?: string;
  onUndo?: () => void;
  testID?: string;
  style?: ViewStyle;
}

const TONE_KEY = {
  info: { bg: 'infoSoft', ink: 'info' },
  ok: { bg: 'okSoft', ink: 'ok' },
  warn: { bg: 'warnSoft', ink: 'warn' },
  danger: { bg: 'dangerSoft', ink: 'danger' },
} as const;

export function KOptimisticUndo({
  initials,
  name,
  detail,
  actedDetail,
  statusLabel,
  statusTone = 'info',
  acted,
  snackbarMessage,
  undoLabel = 'Ångra',
  onUndo,
  testID,
  style,
}: KOptimisticUndoProps) {
  const theme = useTheme();
  const c = theme.colors;
  const tone = TONE_KEY[statusTone];

  return (
    <>
      <View
        testID={testID}
        style={[
          styles.row,
          {
            backgroundColor: c.surface,
            borderRadius: theme.radii.card,
            ...theme.shadows.sm,
          },
          acted ? styles.gone : null,
          style,
        ]}
      >
        <View style={[styles.avatar, { backgroundColor: c.avatarFill, borderRadius: theme.radii.pill }]}>
          <KText variant="caption" weight="600" color={c.onDark}>
            {initials}
          </KText>
        </View>

        <View style={styles.body}>
          <KText
            variant="bodySm"
            weight="600"
            color={c.ink}
            numberOfLines={1}
            style={acted ? styles.struck : undefined}
          >
            {name}
          </KText>
          <KText variant="micro" color={c.ink3} numberOfLines={1}>
            {acted ? (actedDetail ?? detail) : detail}
          </KText>
        </View>

        {acted ? (
          <View style={[styles.miniOk, { backgroundColor: c.ok, borderRadius: theme.radii.pill }]}>
            <KIcon name="check" size={14} color={c.onDark} strokeWidth={3.2} />
          </View>
        ) : statusLabel ? (
          <View
            style={[
              styles.pill,
              { backgroundColor: c[tone.bg], borderRadius: theme.radii.pill },
            ]}
          >
            <KText variant="micro" weight="700" color={c[tone.ink]}>
              {statusLabel}
            </KText>
          </View>
        ) : null}
      </View>

      <KSnackbar
        visible={acted}
        message={snackbarMessage ?? 'Godkänt'}
        actionLabel={undoLabel}
        onAction={onUndo}
        testID={testID ? `${testID}-snackbar` : undefined}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    paddingVertical: 12,
    paddingHorizontal: 14,
  } as ViewStyle,
  gone: { opacity: 0.32 },
  struck: { textDecorationLine: 'line-through' },
  avatar: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0 },
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 9,
  },
  miniOk: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
