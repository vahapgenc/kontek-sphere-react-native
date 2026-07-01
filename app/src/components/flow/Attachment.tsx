// KAttachment — file-upload widget. Mirrors Attachment in k-flow.jsx.
// Empty state: dashed tappable area with an upload prompt (icon chip + label + hint).
// Filled state: solid ok-bordered row showing the file name + "Uploaded" confirmation.
// Does NOT wire a real picker — it simply calls `onPick`.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

export interface KAttachmentValue {
  name: string;
}

export interface KAttachmentProps {
  label: string;
  hint?: string;
  value?: KAttachmentValue;
  onPick: () => void;
  /** Clears the attached file (renders the close button in the filled state). */
  onClear?: () => void;
  optional?: boolean;
  /** Optional icon node for the empty-state chip (defaults to a camera glyph). */
  icon?: ReactNode;
  /** Optional icon node for the filled-state chip (defaults to a doc glyph). */
  fileIcon?: ReactNode;
  testID?: string;
}

export function KAttachment({
  label,
  hint,
  value,
  onPick,
  onClear,
  optional,
  icon,
  fileIcon,
  testID,
}: KAttachmentProps) {
  const theme = useTheme();
  const c = theme.colors;

  if (value) {
    return (
      <View
        testID={testID}
        style={[
          styles.filled,
          { backgroundColor: c.surface, borderColor: c.ok, borderRadius: theme.radii.input },
        ]}
      >
        <View style={[styles.fileChip, { backgroundColor: c.okSoft }]}>
          {fileIcon ?? <KIcon name="doc" size={22} color={c.ok} />}
        </View>
        <View style={styles.body}>
          <KText variant="bodySm" weight="700" color={c.ink} numberOfLines={1}>
            {value.name}
          </KText>
          <View style={styles.uploadedRow}>
            <KIcon name="check" size={13} color={c.ok} strokeWidth={2.5} />
            <KText variant="caption" color={c.ok}>
              Uploaded
            </KText>
          </View>
        </View>
        {onClear ? (
          <Pressable
            testID={testID ? `${testID}-clear` : undefined}
            onPress={onClear}
            accessibilityRole="button"
            hitSlop={8}
            style={[styles.clear, { backgroundColor: c.line2 }]}
          >
            <KIcon name="close" size={16} color={c.ink2} />
          </Pressable>
        ) : null}
      </View>
    );
  }

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPick}
      style={({ pressed }) => [
        styles.empty,
        { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.input },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.iconChip, { backgroundColor: c.greenSoft }]}>
        {icon ?? <KIcon name="camera" size={22} color={c.greenDeep} />}
      </View>
      <View style={styles.body}>
        <KText variant="bodySm" weight="700" color={c.ink}>
          {label}
          {optional ? (
            <KText variant="bodySm" color={c.ink3}>
              {'  ·  optional'}
            </KText>
          ) : null}
        </KText>
        {hint ? (
          <KText variant="caption" color={c.ink3}>
            {hint}
          </KText>
        ) : null}
      </View>
      <KIcon name="plus" size={20} color={c.greenDeep} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  empty: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 15,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  filled: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    borderWidth: 1.5,
  },
  pressed: { opacity: 0.95 },
  iconChip: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fileChip: {
    width: 40,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: { flex: 1, minWidth: 0 },
  uploadedRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 },
  clear: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
