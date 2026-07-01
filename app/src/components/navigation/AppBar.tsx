// KAppBar — top bar. Compact 56px variant (.ds-appbar) OR a large-title variant
// (.ds-appbar__large): a single greeting/title block with optional eyebrow + subtitle
// and right-aligned actions. The large variant never duplicates the title.
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

export interface KAppBarProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  large?: boolean;
  eyebrow?: string;
  subtitle?: string;
  testID?: string;
}

export function KAppBar({ title, onBack, right, large, eyebrow, subtitle, testID }: KAppBarProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const c = theme.colors;

  // ── Large-title variant: one block, greeting once, actions top-right ──
  // Mirrors the prototype's large app bar: generous top padding (paddingTop 50
  // + a 20px spacer) under the safe area, so the greeting isn't crammed under
  // the status bar.
  if (large) {
    return (
      <View
        testID={testID}
        style={{ paddingTop: insets.top + LARGE_TOP_PADDING, backgroundColor: 'transparent' }}
      >
        <View style={[styles.largeBlock, { paddingHorizontal: theme.layout.screenGutter }]}>
          {eyebrow ? (
            <KText variant="eyebrow" weight="600" color={c.greenDeep} style={styles.eyebrow}>
              {eyebrow}
            </KText>
          ) : null}
          {/* Title + actions on ONE centered row; subtitle sits below it. */}
          <View style={styles.titleRow}>
            <KText variant="h1" weight="700" numberOfLines={1} style={styles.h1}>
              {title}
            </KText>
            {right ? <View style={styles.rightSlot}>{right}</View> : null}
          </View>
          {subtitle ? (
            <KText variant="bodySm" color={c.ink3} style={styles.subtitle}>
              {subtitle}
            </KText>
          ) : null}
        </View>
      </View>
    );
  }

  // ── Compact variant: centered title, back + right actions balance the sides ──
  return (
    <View
      testID={testID}
      style={[styles.bar, { paddingTop: insets.top, backgroundColor: c.frostBg, borderBottomColor: c.line2 }]}
    >
      <View style={[styles.row, { height: theme.layout.appbarH, paddingHorizontal: theme.space.s03 }]}>
        {onBack ? (
          <Pressable
            testID={testID ? `${testID}-back` : undefined}
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Tillbaka"
            hitSlop={8}
            style={({ pressed }) => [
              styles.action,
              { width: theme.layout.tapMin, height: theme.layout.tapMin, borderRadius: theme.radii.pill },
              pressed ? { backgroundColor: c.surface2 } : null,
            ]}
          >
            <KIcon name="chevL" size={24} color={c.ink2} />
          </Pressable>
        ) : (
          <View style={{ width: theme.space.s03 }} />
        )}

        <KText variant="title" weight="600" numberOfLines={1} align="center" style={styles.title}>
          {title}
        </KText>

        <View style={styles.rightSlot}>{right}</View>
      </View>
    </View>
  );
}

// Small gap under the safe-area inset before the greeting. The inset already
// covers the status bar / notch, so this stays small (the prototype's fixed
// paddingTop:50 was status-bar + ~this gap).
const LARGE_TOP_PADDING = 8;

const styles = StyleSheet.create({
  bar: { borderBottomWidth: StyleSheet.hairlineWidth } as ViewStyle,
  row: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  title: { flex: 1, minWidth: 0 },
  action: { alignItems: 'center', justifyContent: 'center' },
  rightSlot: { minWidth: 48, minHeight: 48, alignItems: 'center', justifyContent: 'center' },
  // .ds-appbar__large padding: var(--space-01) <gutter> var(--space-04) → 2px top, 12px bottom.
  largeBlock: { paddingTop: 2, paddingBottom: 12 },
  // Title and actions share one centered row (bell aligns with the greeting line).
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  h1: { flexShrink: 1, minWidth: 0 },
  eyebrow: { marginBottom: 6 },
  subtitle: { marginTop: 4 },
});
