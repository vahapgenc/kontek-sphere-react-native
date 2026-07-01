// KFlowShell — full-screen multi-step flow frame. Mirrors FlowShell in k-flow.jsx.
// Header: close/back action slot + step counter ("step/total") + title (+ optional kicker).
// Body: scrollable content. Footer: sticky CTA area (transparent, no border).
import React, { type ReactNode } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';
import { KSteps } from '../data-display/Steps';

export interface KFlowShellProps {
  /** Close action — used for the header action when no `onBack` is given. */
  onClose?: () => void;
  /** Back action — when present, the header action goes back instead of closing. */
  onBack?: () => void;
  /** Current step (1-based). When set with `total`, renders a "step/total" counter. */
  step?: number;
  /** Total step count, paired with `step`. */
  total?: number;
  /** Screen title. Shown large in the body when stepped, otherwise centered in the bar. */
  title: string;
  /** Optional eyebrow/kicker above the title. */
  kicker?: string;
  /** Sticky CTA area at the bottom. */
  footer?: ReactNode;
  /** Slot for the header action icon (close or back). Falls back to a text glyph. */
  headerIcon?: ReactNode;
  children?: ReactNode;
  testID?: string;
}

export function KFlowShell({
  onClose,
  onBack,
  step,
  total,
  title,
  kicker,
  footer,
  headerIcon,
  children,
  testID,
}: KFlowShellProps) {
  const theme = useTheme();
  const c = theme.colors;
  const insets = useSafeAreaInsets();
  const stepped = typeof step === 'number';
  const handleAction = onBack ?? onClose;

  return (
    <LinearGradient
      testID={testID}
      colors={theme.gradients.appBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.root}
    >
      {/* App bar — safe-area top, then the 56px bar (prototype paddingTop:50). */}
      <View style={[styles.appbar, { height: theme.layout.appbarH, marginTop: insets.top + 8 }]}>
        <Pressable
          testID="flow_shell_actionButton"
          accessibilityRole="button"
          accessibilityLabel={onBack ? 'Back' : 'Close'}
          onPress={handleAction}
          disabled={!handleAction}
          style={({ pressed }) => [
            styles.action,
            { borderRadius: theme.radii.pill },
            pressed ? styles.pressed : null,
          ]}
        >
          {headerIcon ?? <KIcon name={onBack ? 'chevL' : 'close'} size={24} color={c.ink} />}
        </Pressable>

        <View style={styles.appbarCenter}>
          {stepped ? (
            <KSteps total={total ?? 1} current={(step ?? 1) - 1} />
          ) : (
            <KText variant="title" weight="600" color={c.ink} numberOfLines={1}>
              {title}
            </KText>
          )}
        </View>

        <View style={styles.actionSpacer} />
      </View>

      {/* Body */}
      <ScrollView
        style={styles.bodyScroll}
        contentContainerStyle={[
          styles.body,
          { paddingHorizontal: theme.layout.screenGutterLg },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {kicker ? (
          <KText variant="eyebrow" color={c.ink4} style={styles.kicker}>
            {kicker}
          </KText>
        ) : null}
        {stepped ? (
          <KText variant="h1" style={styles.title}>
            {title}
          </KText>
        ) : null}
        {children}
      </ScrollView>

      {/* Footer (sticky CTA) */}
      {footer ? (
        <View
          style={[
            styles.footer,
            { paddingHorizontal: theme.layout.screenGutterLg },
          ]}
        >
          {footer}
        </View>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 } as ViewStyle,
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  action: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSpacer: { width: 48, height: 48 },
  appbarCenter: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
  bodyScroll: { flex: 1 },
  body: { paddingTop: 20, paddingBottom: 16, gap: 14 },
  kicker: { marginBottom: 8 },
  title: { marginBottom: 18 },
  // paddingBottom clears the raised register FAB that overlays the tab bar edge.
  footer: { paddingTop: 12, paddingBottom: 34, gap: 10 },
});
