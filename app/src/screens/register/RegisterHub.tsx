// RegisterHub — the quick-action sheet opened by the center FAB. Mirrors
// RegisterHub in k-app.jsx. Rendered as an overlay that sits ABOVE the still-
// visible bottom tab bar (the FAB itself toggles to a close "✕" while open), not
// a full-screen modal — so the menu stays visible like the prototype.
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KIconTile, KText, KIcon, KOverlayFab } from '../../components';
import { useSession } from '../../store/session';

export type RegisterKind = 'absence' | 'expense';

export function RegisterHub({ onSelect }: { onSelect: (kind: RegisterKind) => void }) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('register');
  const insets = useSafeAreaInsets();
  const open = useSession((s) => s.registerOpen);
  const close = useSession((s) => s.closeRegister);

  if (!open) return null;

  // The overlay stops above the tab bar so the menu stays visible + tappable.
  const tabBarHeight = theme.layout.tabbarH + insets.bottom;

  const options: { id: RegisterKind; icon: 'calendar' | 'receipt'; title: string; sub: string }[] = [
    { id: 'absence', icon: 'calendar', title: t('absenceTitle'), sub: t('absenceSub') },
    { id: 'expense', icon: 'receipt', title: t('expenseTitle'), sub: t('expenseSub') },
  ];

  const choose = (kind: RegisterKind) => {
    close();
    setTimeout(() => onSelect(kind), 120);
  };

  return (
    <View style={[StyleSheet.absoluteFill, { bottom: tabBarHeight }]} testID="register_hub">
      <Pressable
        testID="register_hub_scrim"
        accessibilityRole="button"
        accessibilityLabel="Close"
        onPress={close}
        style={[StyleSheet.absoluteFill, { backgroundColor: c.scrim }]}
      />
      <View
        style={[
          styles.sheet,
          {
            backgroundColor: c.surface,
            borderTopLeftRadius: theme.radii.sheet,
            borderTopRightRadius: theme.radii.sheet,
          },
        ]}
      >
        <View style={[styles.grip, { backgroundColor: c.line }]} />
        <KText variant="h3" weight="700">{t('title')}</KText>
        <KText variant="bodySm" color={c.ink3} style={styles.sub}>{t('sub')}</KText>
        <View style={styles.list}>
          {options.map((o) => (
            <Pressable
              key={o.id}
              testID={`register_hub_${o.id}`}
              accessibilityRole="button"
              onPress={() => choose(o.id)}
              style={({ pressed }) => [
                styles.item,
                { backgroundColor: c.surface, borderRadius: theme.radii.panel },
                theme.shadows.floatingCard,
                pressed ? styles.pressed : null,
              ]}
            >
              <KIconTile icon={o.icon} tone="brand" />
              <View style={styles.body}>
                <KText variant="title" weight="600">{o.title}</KText>
                <KText variant="caption" color={c.ink3}>{o.sub}</KText>
              </View>
              <KIcon name="chevR" size={20} color={c.ink4} />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Close FAB — on top of the sheet so it's fully visible, aligned with the
          tab bar's register FAB position (which the sheet would otherwise clip). */}
      <KOverlayFab icon="close" active onPress={close} testID="register_hub_close" accessibilityLabel="Close" />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  grip: { alignSelf: 'center', width: 40, height: 5, borderRadius: 999, marginBottom: 14 },
  sub: { marginTop: 2, marginBottom: 14 },
  list: { gap: 10 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 13, padding: 14 },
  body: { flex: 1, minWidth: 0, gap: 2 },
  pressed: { opacity: 0.96 },
});
