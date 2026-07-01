// EmploymentScreen — faithful port of k-misc.jsx EmploymentDetailsScreen.
// Avatar + name + role · company header, then two label-over-value cards:
//   • Personal details — Name, Personal ID, Address, Phone, Email
//   • Employment — Employer, Role, Employment type, Start date, Manager
// Each field uses KFieldRow (small label above a bold value), rows separated by
// hairline dividers inside a KCard.
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KAppBar, KAvatar, KCard, KFieldRow, KSectionLabel, KText } from '../../components';
import { ME, COMPANIES } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { useSession } from '../../store/session';

export interface EmploymentScreenProps {
  onBack?: () => void;
}

interface Field {
  label: string;
  value: string;
  key: string;
}

export function EmploymentScreen({ onBack }: EmploymentScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('profile');
  const tx = useLocalize();

  const companyId = useSession((s) => s.companyId);
  const ac = COMPANIES.find((co) => co.id === companyId) ?? COMPANIES[0];

  const initials = ME.name
    .split(' ')
    .map((s) => s[0])
    .join('');
  const roleLine = `${tx(ac.role)} · ${ac.name}`;

  const personal: Field[] = [
    { key: 'name', label: t('fieldName'), value: ME.name },
    { key: 'personalId', label: t('fieldPersonalId'), value: ME.personalId },
    { key: 'address', label: t('fieldAddress'), value: ME.address },
    { key: 'phone', label: t('fieldPhone'), value: ME.phone },
    { key: 'email', label: t('fieldEmail'), value: ME.email },
  ];
  const employment: Field[] = [
    { key: 'employer', label: t('fieldEmployer'), value: ac.name },
    { key: 'role', label: t('fieldRole'), value: tx(ac.role) },
    { key: 'employmentType', label: t('fieldEmploymentType'), value: tx(ME.employmentType) },
    { key: 'startDate', label: t('fieldStartDate'), value: tx(ME.startDate) },
    { key: 'manager', label: t('fieldManager'), value: tx(ME.manager) },
  ];

  const renderSection = (label: string, rows: Field[], testID: string) => (
    <View>
      <KSectionLabel>{label}</KSectionLabel>
      <KCard padding={0} testID={testID}>
        <View style={styles.cardInner}>
          {rows.map((f, i) => (
            <KFieldRow
              key={f.key}
              testID={`employment_field_${f.key}`}
              label={f.label}
              value={f.value}
              style={
                i < rows.length - 1
                  ? { borderBottomWidth: 1, borderBottomColor: c.line2 }
                  : undefined
              }
            />
          ))}
        </View>
      </KCard>
    </View>
  );

  return (
    <View style={styles.root}>
      <KAppBar title={t('employmentTitle')} onBack={onBack} testID="employment_appbar" />
      <ScrollView contentContainerStyle={styles.wrap}>
        <View style={styles.identity}>
          <KAvatar initials={initials} size="lg" tone="forest" testID="employment_avatar" />
          <View style={styles.identityText}>
            <KText variant="h3" weight="700">
              {ME.name}
            </KText>
            <KText variant="bodySm" color={c.ink3}>
              {roleLine}
            </KText>
          </View>
        </View>

        {renderSection(t('personalDetails'), personal, 'employment_personal_card')}
        {renderSection(t('employmentSection'), employment, 'employment_employment_card')}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  wrap: { padding: 16, paddingBottom: 40, gap: 18 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 4, paddingTop: 4 },
  identityText: { flex: 1, minWidth: 0, gap: 2 },
  cardInner: { paddingHorizontal: 16, paddingVertical: 4 },
});
