// KDialog — centred modal confirmation. Mirrors .ds-dialog-scrim + .ds-dialog:
// a scrim backdrop with a centred card (radius sheet = 24), title, optional
// message/children, and stacked KButton actions (primary on top, .ds-dialog__actions).
import React, { type ReactNode } from 'react';
import { Modal, View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KButton } from '../buttons/Button';

export interface KDialogProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  children?: ReactNode;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  testID?: string;
}

export function KDialog({
  visible,
  onClose,
  title,
  message,
  children,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  testID,
}: KDialogProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={[styles.scrim, { backgroundColor: c.scrim, padding: theme.space.s06 }]}>
        <Pressable
          testID={testID ? `${testID}-scrim` : undefined}
          accessibilityRole="button"
          accessibilityLabel="Stäng"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />
        <View
          testID={testID}
          style={[
            styles.dialog,
            {
              backgroundColor: c.surface,
              borderRadius: theme.radii.sheet,
              padding: theme.space.s06,
              ...theme.shadows.lg,
            },
          ]}
        >
          <KText variant="h3" weight="700" style={styles.title}>{title}</KText>
          {message ? (
            <KText variant="body" color={c.ink2}>{message}</KText>
          ) : null}
          {children ? <View style={styles.content}>{children}</View> : null}

          {primaryLabel || secondaryLabel ? (
            <View style={[styles.actions, { gap: theme.space.s03, marginTop: theme.space.s06 }]}>
              {primaryLabel ? (
                <KButton
                  testID={testID ? `${testID}-primary` : undefined}
                  label={primaryLabel}
                  variant="primary"
                  block
                  onPress={onPrimary ?? onClose}
                />
              ) : null}
              {secondaryLabel ? (
                <KButton
                  testID={testID ? `${testID}-secondary` : undefined}
                  label={secondaryLabel}
                  variant="secondary"
                  block
                  onPress={onSecondary ?? onClose}
                />
              ) : null}
            </View>
          ) : null}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  dialog: {
    width: '100%',
    maxWidth: 360,
  },
  title: {
    marginBottom: 8,
  },
  content: {
    marginTop: 12,
  },
  actions: {
    flexDirection: 'column',
  },
});
