// KCollapsibleSection — a titled section whose body collapses via a chevron.
// Mirrors the prototype's "To do" / "My registrations" / "Previous" sections.
import React, { useState, type ReactNode } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

export interface KCollapsibleSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  right?: ReactNode;
  children: ReactNode;
  testID?: string;
}

export function KCollapsibleSection({
  title,
  count,
  defaultOpen = true,
  right,
  children,
  testID,
}: KCollapsibleSectionProps) {
  const theme = useTheme();
  const c = theme.colors;
  const [open, setOpen] = useState(defaultOpen);

  return (
    <View style={styles.section}>
      <Pressable
        testID={testID}
        style={styles.head}
        onPress={() => setOpen((o) => !o)}
        accessibilityRole="button"
      >
        <KText variant="caption" weight="600" color={c.ink3} style={styles.title}>
          {title}
        </KText>
        {typeof count === 'number' ? (
          <View style={[styles.countPill, { backgroundColor: c.ink3 }]}>
            <KText variant="micro" weight="700" color={c.onDark}>{count}</KText>
          </View>
        ) : null}
        <View style={styles.spacer} />
        {right}
        <View style={open ? styles.chevOpen : undefined}>
          <KIcon name="chevD" size={18} color={c.ink3} />
        </View>
      </Pressable>
      {open ? <View style={styles.body}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: 10 },
  // Prototype header padding: "2px 4px 10px" — tight top, 10px below before the body.
  head: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 2, paddingBottom: 10, paddingHorizontal: 4 },
  // Prototype letter-spacing 0.005em (≈0.065px at 13px) — effectively none, NOT uppercase.
  title: { letterSpacing: 0.065 },
  countPill: { minWidth: 18, height: 18, borderRadius: 9, paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' },
  spacer: { flex: 1 },
  chevOpen: { transform: [{ rotate: '180deg' }] },
  body: { gap: 10 },
});
