// BankAccountsScreen — faithful port of k-misc.jsx BankAccountsScreen.
// Intro paragraph, then one card per connected bank account. The primary account
// shows a "Salary account" badge; the others offer a "Use for salary" action.
// Each account (when more than one exists) offers a danger-red "Remove" action.
// A dashed "+ Add bank account" button closes the list. Primary toggle / remove
// are local state only — no real persistence in this prototype.
import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KAppBar, KBadge, KIconTile, KSnackbar, KText, KIcon } from '../../components';
import { BANK_ACCOUNTS } from '../../mocks';
import type { BankAccount } from '../../api/types';

export interface BankAccountsScreenProps {
  onBack?: () => void;
}

export function BankAccountsScreen({ onBack }: BankAccountsScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('profile');

  const [accounts, setAccounts] = useState<BankAccount[]>(BANK_ACCOUNTS);
  const [snack, setSnack] = useState<string | null>(null);

  const canDelete = accounts.length > 1;

  const setPrimary = (id: string) => {
    setAccounts((prev) => prev.map((a) => ({ ...a, primary: a.id === id })));
    setSnack(t('salaryAccountUpdated'));
  };

  const remove = (id: string) => {
    setAccounts((prev) => prev.filter((a) => a.id !== id));
    setSnack(t('bankAccountRemoved'));
  };

  return (
    <View style={styles.root}>
      <KAppBar title={t('bankAccountsTitle')} onBack={onBack} testID="bank_appbar" />
      <ScrollView contentContainerStyle={styles.wrap}>
        <KText variant="body" color={c.ink3} style={styles.intro}>
          {t('bankAccountsIntro')}
        </KText>

        <View style={styles.list}>
          {accounts.map((a) => (
            <View
              key={a.id}
              testID={`bank_account_card_${a.id}`}
              style={[
                styles.card,
                {
                  backgroundColor: c.surface,
                  borderRadius: theme.radii.panel,
                  borderColor: a.primary ? c.signature : c.line2,
                  borderWidth: a.primary ? 1.5 : 1,
                  ...theme.shadows.sm,
                },
              ]}
            >
              <View style={styles.header}>
                <KIconTile icon="wallet" tone="brand" size={44} />
                <View style={styles.headerText}>
                  <KText variant="title" weight="700" numberOfLines={1}>
                    {a.bank}
                  </KText>
                  <KText variant="bodySm" color={c.ink3} style={styles.acctSub}>
                    {a.clearing} · {a.number}
                  </KText>
                </View>
                {a.primary ? <KBadge label={t('salaryAccount')} tone="ok" dot /> : null}
              </View>

              <View style={[styles.divider, { backgroundColor: c.line2 }]} />

              <View style={styles.actions}>
                {!a.primary ? (
                  <Pressable
                    testID={`bank_useForSalary_button_${a.id}`}
                    accessibilityRole="button"
                    onPress={() => setPrimary(a.id)}
                    style={({ pressed }) => [
                      styles.action,
                      styles.actionGrow,
                      pressed ? styles.pressed : null,
                    ]}
                  >
                    <KIcon name="check" size={17} color={c.signature} />
                    <KText variant="bodySm" weight="600" color={c.signature}>
                      {t('useForSalary')}
                    </KText>
                  </Pressable>
                ) : null}
                {canDelete ? (
                  <Pressable
                    testID={`bank_remove_button_${a.id}`}
                    accessibilityRole="button"
                    onPress={() => remove(a.id)}
                    style={({ pressed }) => [
                      styles.action,
                      a.primary ? styles.actionGrow : styles.actionEnd,
                      pressed ? styles.pressed : null,
                    ]}
                  >
                    <KIcon name="trash" size={17} color={c.danger} />
                    <KText variant="bodySm" weight="600" color={c.danger}>
                      {t('remove')}
                    </KText>
                  </Pressable>
                ) : null}
              </View>
            </View>
          ))}
        </View>

        <Pressable
          testID="bank_add_button"
          accessibilityRole="button"
          onPress={() => setSnack(t('addNotAvailable'))}
          style={({ pressed }) => [
            styles.addButton,
            { borderColor: c.line, borderRadius: theme.radii.panel },
            pressed ? styles.pressed : null,
          ]}
        >
          <KIcon name="plus" size={20} color={c.signature} />
          <KText variant="body" weight="600" color={c.signature}>
            {t('addBankAccount')}
          </KText>
        </Pressable>
      </ScrollView>

      <KSnackbar visible={snack !== null} message={snack ?? ''} testID="bank_snackbar" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  wrap: { padding: 16, paddingBottom: 40, gap: 16 },
  intro: { paddingHorizontal: 2, lineHeight: 22 },
  list: { gap: 12 },
  card: { overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, paddingBottom: 14 },
  headerText: { flex: 1, minWidth: 0 },
  acctSub: { marginTop: 2 },
  divider: { height: 1, marginHorizontal: 16 },
  actions: { flexDirection: 'row', padding: 8 },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  actionGrow: { flex: 1 },
  actionEnd: { marginLeft: 'auto' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
  },
  pressed: { opacity: 0.7 },
});
