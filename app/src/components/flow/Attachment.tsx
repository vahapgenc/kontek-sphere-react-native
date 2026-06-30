// KAttachment — file-upload widget. Mirrors Attachment in k-flow.jsx.
// Empty state: dashed tappable area with an upload prompt (icon chip + label + hint).
// Filled state: solid ok-bordered row showing the file name + "Uploaded" confirmation.
// Does NOT wire a real picker — it simply calls `onPick`.
import React, { type ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KAttachmentValue {
  name: string;
}

export interface KAttachmentProps {
  label: string;
  hint?: string;
  value?: KAttachmentValue;
  onPick: () => void;
  optional?: boolean;
  /** Optional icon node for the empty-state chip (e.g. a camera glyph). */
  icon?: ReactNode;
  /** Optional icon node for the filled-state chip (e.g. a document glyph). */
  fileIcon?: ReactNode;
  testID?: string;
}

export function KAttachment({
  label,
  hint,
  value,
  onPick,
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
          {
            backgroundColor: c.surface,
            borderColor: c.ok,
            borderRadius: theme.radii.input,
          },
        ]}
      >
        <View style={[styles.fileChip, { backgroundColor: c.okSoft }]}>
          {fileIcon ?? (
            <KText variant="caption" weight="700" color={c.ok}>
              PDF
            </KText>
          )}
        </View>
        <View style={styles.body}>
          <KText variant="bodySm" weight="700" color={c.ink} numberOfLines={1}>
            {value.name}
          </KText>
          <KText variant="caption" color={c.ok} style={styles.uploaded}>
            ✓ Uploaded
          </KText>
        </View>
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
        {
          backgroundColor: c.surface,
          borderColor: c.line,
          borderRadius: theme.radii.input,
        },
        pressed ? styles.pressed : null,
      ]}
    >
      <View style={[styles.iconChip, { backgroundColor: c.greenSoft }]}>
        {icon ?? (
          <KText variant="title" weight="700" color={c.greenDeep}>
            +
          </KText>
        )}
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
  uploaded: { marginTop: 1 },
});
