// KBottomSheet — modal bottom sheet. Mirrors .ds-scrim + .ds-sheet:
// a dimmed scrim over a rounded-top surface (radius sheet = 24) with a grip
// handle, optional title/subtitle, then children. Built on RN Modal.
import React, { type ReactNode } from 'react';
import { Modal, View, Pressable, StyleSheet, ScrollView, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export interface KBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  testID?: string;
}

export function KBottomSheet({ visible, onClose, title, subtitle, children, testID }: KBottomSheetProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const c = theme.colors;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.fill} testID={testID}>
        <Pressable
          testID={testID ? `${testID}-scrim` : undefined}
          accessibilityRole="button"
          accessibilityLabel="Stäng"
          onPress={onClose}
          style={[styles.scrim, { backgroundColor: c.scrim }]}
        />
        <View
          style={[
            styles.sheet,
            {
              backgroundColor: c.surface,
              borderTopLeftRadius: theme.radii.sheet,
              borderTopRightRadius: theme.radii.sheet,
              paddingHorizontal: theme.layout.screenGutter,
              paddingBottom: theme.space.s06 + insets.bottom,
            },
          ]}
        >
          <View style={[styles.grip, { backgroundColor: c.line, borderRadius: theme.radii.pill }]} />
          {title ? (
            <KText variant="h3" weight="700" style={styles.title}>{title}</KText>
          ) : null}
          {subtitle ? (
            <KText variant="bodySm" color={c.ink3} style={styles.sub}>{subtitle}</KText>
          ) : null}
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.bodyContent}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    justifyContent: 'flex-end',
  } as ViewStyle,
  scrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    paddingTop: 10,
    maxHeight: '88%',
    shadowColor: '#052225',
    shadowOffset: { width: 0, height: -12 },
    shadowOpacity: 0.22,
    shadowRadius: 40,
    elevation: 24,
  },
  grip: {
    width: 40,
    height: 5,
    alignSelf: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 2,
  },
  sub: {
    marginBottom: 16,
  },
  body: {
    flexGrow: 0,
  },
  bodyContent: {
    paddingBottom: 4,
  },
});
