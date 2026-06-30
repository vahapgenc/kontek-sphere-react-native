// ProfileScreen — faithful port of k-misc.jsx ProfileScreen.
// Large app bar, avatar + name + role, then three grouped sections:
//   • My companies — the active company, taps through to the Companies screen
//   • Pay & contact — HR contact, bank account, employment details
//   • App — language switch (segmented Svenska/Engelska) + log out
// A footer line closes the screen. The language chooser is rendered inline as a
// KSegmentedControl (the prototype used a bottom sheet; the lead specced a segment).
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KListCard,
  KListRow,
  KAvatar,
  KSegmentedControl,
  KText,
  KIcon,
} from '../../components';
import { ME, COMPANIES, BANK_ACCOUNTS } from '../../mocks';
import { useSession, type Lang } from '../../store/session';

export interface ProfileScreenProps {
  onOpenCompanies?: () => void;
}

export function ProfileScreen({ onOpenCompanies }: ProfileScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('profile');

  const companyId = useSession((s) => s.companyId);
  const lang = useSession((s) => s.lang);
  const setLang = useSession((s) => s.setLang);
  const logout = useSession((s) => s.logout);

  const ac = COMPANIES.find((co) => co.id === companyId) ?? COMPANIES[0];
  const employments = COMPANIES.length;
  const initials = ME.name
    .split(' ')
    .map((s) => s[0])
    .join('');
  const roleLine = `${ac.role} · ${ac.name}`;
  const companySub = `${ac.kind === 'manager' ? t('approver') : t('employee')} · ${employments} ${t('employments')}`;

  const primaryBank = BANK_ACCOUNTS.find((b) => b.primary);
  const bankSub = primaryBank ? `${primaryBank.bank} · ${primaryBank.number}` : t('noAccount');

  return (
    <View style={[styles.root, { backgroundColor: c.canvas }]}>
      <KAppBar title={t('title')} large testID="profile_appbar" />
      <ScrollView contentContainerStyle={styles.wrap}>
        {/* Identity */}
        <View style={styles.identity}>
          <KAvatar initials={initials} size="xl" tone="forest" testID="profile_avatar" />
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
            leading={<KIcon name="building" size={22} color={c.greenDeep} />}
            onPress={onOpenCompanies}
          />
        </KListCard>

        {/* Pay & contact */}
        <KListCard header={t('payAndContact')}>
          <KListRow
            testID="profile_hr_row"
            title={ME.hrName}
            subtitle={`${ME.hrRole} · ${ME.employer}`}
            leading={<KIcon name="user" size={22} color={c.greenDeep} />}
            trailing={<KIcon name="phone" size={20} color={c.signature} />}
          />
          <KListRow
            testID="profile_bank_row"
            title={t('bankAccount')}
            subtitle={bankSub}
            leading={<KIcon name="wallet" size={22} color={c.greenDeep} />}
            onPress={() => {}}
          />
          <KListRow
            testID="profile_employment_row"
            title={t('employmentDetails')}
            leading={<KIcon name="doc" size={22} color={c.greenDeep} />}
            onPress={() => {}}
          />
        </KListCard>

        {/* App */}
        <KListCard header={t('app')}>
          <KListRow
            testID="profile_language_row"
            title={t('language')}
            leading={<KIcon name="globe" size={22} color={c.greenDeep} />}
            trailing={
              <View style={styles.langSegment}>
                <KSegmentedControl
                  testID="profile_language_segment"
                  options={[
                    { label: t('swedish'), value: 'sv' },
                    { label: t('english'), value: 'en' },
                  ]}
                  value={lang}
                  onChange={(v) => setLang(v as Lang)}
                />
              </View>
            }
          />
          <KListRow
            testID="profile_logout_button"
            title={t('logout')}
            leading={<KIcon name="logOut" size={22} color={c.danger} />}
            trailing={null}
            onPress={() => logout()}
          />
        </KListCard>

        <KText variant="caption" color={c.ink3} style={styles.footer}>
          {t('footer')}
        </KText>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  wrap: { padding: 16, paddingBottom: 40, gap: 18 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 4, paddingTop: 4 },
  identityText: { flex: 1, minWidth: 0, gap: 2 },
  langSegment: { width: 180 },
  footer: { textAlign: 'center', marginTop: 4 },
});
