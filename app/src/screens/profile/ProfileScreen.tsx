// ProfileScreen — faithful port of k-misc.jsx ProfileScreen.
// Large app bar ("Profile") + notification bell, then avatar + name + role · company,
// then three grouped sections:
//   • My companies — the active company, taps through to the Companies screen
//   • Pay & contact — HR contact (phone trailing), bank account, employment details
//   • App — language switch (opens the Language bottom sheet) + log out
// A centered footer closes the screen. Row leading tiles are the dark Kontek-green
// brand tiles (KIconTile tone="brand"), rendered via KListRow leadingBare.
import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KNotificationBell,
  KListCard,
  KListRow,
  KAvatar,
  KIconTile,
  KBottomSheet,
  KSnackbar,
  KText,
  KIcon,
} from '../../components';
import { ME, COMPANIES, BANK_ACCOUNTS } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { useSession, type Lang } from '../../store/session';
import { useUnreadNotifCount } from '../../store/notifications';

export interface ProfileScreenProps {
  onOpenCompanies?: () => void;
  onOpenBankAccounts?: () => void;
  onOpenEmployment?: () => void;
  onOpenNotifications?: () => void;
}

export function ProfileScreen({
  onOpenCompanies,
  onOpenBankAccounts,
  onOpenEmployment,
  onOpenNotifications,
}: ProfileScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('profile');
  const tx = useLocalize();

  const companyId = useSession((s) => s.companyId);
  const lang = useSession((s) => s.lang);
  const setLang = useSession((s) => s.setLang);
  const logout = useSession((s) => s.logout);
  const unreadNotifCount = useUnreadNotifCount();

  const [langOpen, setLangOpen] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  const ac = COMPANIES.find((co) => co.id === companyId) ?? COMPANIES[0];
  const employments = COMPANIES.length;
  const initials = ME.name
    .split(' ')
    .map((s) => s[0])
    .join('');
  const roleLine = `${tx(ac.role)} · ${ac.name}`;
  const companySub = `${ac.kind === 'manager' ? t('approver') : t('employee')} · ${employments} ${t('employments')}`;

  const primaryBank = BANK_ACCOUNTS.find((b) => b.primary);
  const bankSub = primaryBank ? `${primaryBank.bank} · ${primaryBank.number}` : t('noAccount');

  const languages: { id: Lang; label: string; sub: string }[] = [
    { id: 'sv', label: t('swedish'), sub: t('swedishSub') },
    { id: 'en', label: t('english'), sub: t('englishSub') },
  ];
  const langValue = languages.find((l) => l.id === lang) ?? languages[0];

  const chooseLanguage = (id: Lang, label: string) => {
    setLang(id);
    setLangOpen(false);
    setSnack(t('languageSetTo', { lang: label }));
  };

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar
        title={t('title')}
        large
        testID="profile_appbar"
        right={
          <KNotificationBell
            testID="profile_notifications_button"
            count={unreadNotifCount}
            onPress={onOpenNotifications}
          />
        }
      />
      <ScrollView contentContainerStyle={styles.wrap}>
        {/* Identity */}
        <View style={styles.identity}>
          <KAvatar initials={initials} size="lg" tone="forest" testID="profile_avatar" />
          <View style={styles.identityText}>
            <KText variant="h3" weight="700">
              {ME.name}
            </KText>
            <KText variant="bodySm" color={c.ink3}>
              {roleLine}
            </KText>
          </View>
        </View>

        {/* My companies */}
        <KListCard header={t('myCompanies')}>
          <KListRow
            testID="profile_companies_row"
            title={ac.name}
            subtitle={companySub}
            leadingBare
            leading={<KIconTile icon="building" tone="brand" />}
            onPress={onOpenCompanies}
          />
        </KListCard>

        {/* Pay & contact */}
        <KListCard header={t('payAndContact')}>
          <KListRow
            testID="profile_hr_row"
            title={tx(ME.hrName)}
            subtitle={`${tx(ME.hrRole)} · ${ME.employer}`}
            leadingBare
            leading={<KIconTile icon="user" tone="brand" />}
            trailing={<KIcon name="phone" size={20} color={c.signature} />}
          />
          <KListRow
            testID="profile_bank_row"
            title={t('bankAccount')}
            subtitle={bankSub}
            leadingBare
            leading={<KIconTile icon="wallet" tone="brand" />}
            onPress={onOpenBankAccounts}
          />
          <KListRow
            testID="profile_employment_row"
            title={t('employmentDetails')}
            leadingBare
            leading={<KIconTile icon="doc" tone="brand" />}
            onPress={onOpenEmployment}
          />
        </KListCard>

        {/* App */}
        <KListCard header={t('app')}>
          <KListRow
            testID="profile_language_row"
            title={t('language')}
            leadingBare
            leading={<KIconTile icon="globe" tone="brand" />}
            onPress={() => setLangOpen(true)}
            trailing={
              <View style={styles.langValue}>
                <KText variant="body" color={c.ink3}>
                  {langValue.label}
                </KText>
                <KIcon name="chevR" size={20} color={c.ink4} />
              </View>
            }
          />
          <KListRow
            testID="profile_logout_button"
            title={t('logout')}
            leadingBare
            leading={<KIconTile icon="logOut" tone="brand" />}
            trailing={null}
            onPress={() => logout()}
          />
        </KListCard>

        <KText variant="caption" color={c.ink3} style={styles.footer}>
          {t('footer')}
        </KText>
      </ScrollView>

      {/* Language chooser */}
      <KBottomSheet
        visible={langOpen}
        onClose={() => setLangOpen(false)}
        title={t('language')}
        subtitle={t('chooseLanguage')}
        testID="profile_language_sheet"
      >
        <View style={styles.langList}>
          {languages.map((l) => {
            const selected = lang === l.id;
            return (
              <Pressable
                key={l.id}
                testID={`profile_language_option_${l.id}`}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => chooseLanguage(l.id, l.label)}
                style={[
                  styles.langOption,
                  {
                    borderRadius: theme.radii.panel,
                    backgroundColor: selected ? c.greenSoft : c.surface,
                    borderColor: selected ? c.signature : c.line2,
                    borderWidth: selected ? 1.5 : 1,
                  },
                ]}
              >
                <View style={styles.langOptionText}>
                  <KText variant="title" weight="700">
                    {l.label}
                  </KText>
                  <KText variant="bodySm" color={c.ink3}>
                    {l.sub}
                  </KText>
                </View>
                {selected ? <KIcon name="check" size={22} color={c.signature} /> : null}
              </Pressable>
            );
          })}
        </View>
      </KBottomSheet>

      <KSnackbar visible={snack !== null} message={snack ?? ''} testID="profile_snackbar" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  wrap: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40, gap: 18 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 4 },
  identityText: { flex: 1, minWidth: 0, gap: 2 },
  langValue: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  footer: { textAlign: 'center', marginTop: 4 },
  langList: { gap: 8, paddingVertical: 4 },
  langOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  langOptionText: { flex: 1, minWidth: 0, gap: 1 },
});
