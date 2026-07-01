// KAttachment — file-upload widget. Mirrors Attachment in k-flow.jsx.
// Empty state: dashed tappable area with an upload prompt (icon chip + label + hint).
// Tapping it opens a picker bottom sheet ("Take photo" / "Choose a file"); choosing
// an option calls `onPick(source)`. Filled state: solid ok-bordered row with the
// file name + "Uploaded" confirmation and a clear button.
import React, { useState, type ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';
import { KBottomSheet } from '../surfaces/BottomSheet';

export interface KAttachmentValue {
  name: string;
}

export type AttachmentSource = 'camera' | 'file';

export interface KAttachmentProps {
  label: string;
  hint?: string;
  value?: KAttachmentValue;
  /** Called with the chosen source when the user picks from the sheet. */
  onPick: (source: AttachmentSource) => void;
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
  const { t } = useTranslation('attachment');
  const [pickOpen, setPickOpen] = useState(false);

  const choose = (source: AttachmentSource) => {
    setPickOpen(false);
    onPick(source);
  };

  const pickerOptions: { src: AttachmentSource; icon: 'camera' | 'upload'; title: string; desc: string }[] = [
    { src: 'camera', icon: 'camera', title: t('takePhoto'), desc: t('takePhotoDesc') },
    { src: 'file', icon: 'upload', title: t('chooseFile'), desc: t('chooseFileDesc') },
  ];

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
    <>
      <Pressable
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => setPickOpen(true)}
        style={({ pressed }) => [
          styles.empty,
          { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.input },
          pressed ? styles.pressed : null,
        ]}
      >
        <View style={[styles.iconChip, { backgroundColor: c.brand100 }]}>
          {icon ?? <KIcon name="camera" size={22} color={c.brand700} />}
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
        <KIcon name="plus" size={20} color={c.brand600} />
      </Pressable>

      <KBottomSheet
        testID={testID ? `${testID}-picker` : undefined}
        visible={pickOpen}
        onClose={() => setPickOpen(false)}
        title={t('pickerTitle')}
        subtitle={t('pickerSub')}
      >
        <View style={styles.pickerList}>
          {pickerOptions.map((o) => (
            <Pressable
              key={o.src}
              testID={testID ? `${testID}-pick-${o.src}` : undefined}
              accessibilityRole="button"
              onPress={() => choose(o.src)}
              style={({ pressed }) => [
                styles.pickerRow,
                { backgroundColor: c.surface, borderColor: c.line2, borderRadius: theme.radii.panel },
                pressed ? styles.pressed : null,
              ]}
            >
              <View style={[styles.pickerTile, { backgroundColor: c.kontekGreen }]}>
                <KIcon name={o.icon} size={22} color={c.onDark} />
              </View>
              <View style={styles.body}>
                <KText variant="title" weight="700" color={c.ink}>
                  {o.title}
                </KText>
                <KText variant="bodySm" color={c.ink3}>
                  {o.desc}
                </KText>
              </View>
              <KIcon name="chevR" size={20} color={c.ink4} />
            </Pressable>
          ))}
        </View>
      </KBottomSheet>
    </>
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
  pickerList: { gap: 10, paddingBottom: 4 },
  pickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    borderWidth: 1,
  },
  pickerTile: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});
