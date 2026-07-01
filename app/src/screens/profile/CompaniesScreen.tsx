// CompaniesScreen — faithful port of k-misc.jsx CompaniesScreen.
// Large app bar + a list of the user's companies as selectable cards. The current
// company is highlighted with a signature border + ring; tapping another *active*
// company switches the active company (passing its kind as the session mode) and
// shows a confirmation snackbar. Each card carries a status badge (Active/Inactive)
// and the company's permission list.
import React, { useState } from 'react';
import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KAppBar, KBadge, KSnackbar, KText, KIcon } from '../../components';
import { COMPANIES } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { useSession, type CompanyMode } from '../../store/session';
import type { Company } from '../../api/types';

export interface CompaniesScreenProps {
  onBack?: () => void;
}

interface CardLabels {
  active: string;
  inactive: string;
  permissions: string;
}

export function CompaniesScreen({ onBack }: CompaniesScreenProps) {
  const { t } = useTranslation('profile');

  const companyId = useSession((s) => s.companyId);
  const setCompany = useSession((s) => s.setCompany);

  const [snack, setSnack] = useState<string | null>(null);

  const switchTo = (co: Company) => {
    setCompany(co.id, co.kind as CompanyMode);
    setSnack(t('companyChanged', { name: co.name }));
  };

  const labels: CardLabels = {
    active: t('active'),
    inactive: t('inactive'),
    permissions: t('permissions'),
  };

  return (
    <View style={styles.root}>
      <KAppBar title={t('companiesTitle')} onBack={onBack} testID="companies_appbar" />
      <ScrollView contentContainerStyle={styles.wrap}>
        {COMPANIES.map((co) => (
          <CompanyCard
            key={co.id}
            company={co}
            current={companyId === co.id}
            labels={labels}
            onSelect={switchTo}
          />
        ))}
      </ScrollView>

      <KSnackbar visible={snack !== null} message={snack ?? ''} testID="companies_snackbar" />
    </View>
  );
}

function CompanyCard({
  company,
  current,
  labels,
  onSelect,
}: {
  company: Company;
  current: boolean;
  labels: CardLabels;
  onSelect: (c: Company) => void;
}) {
  const theme = useTheme();
  const c = theme.colors;
  const tx = useLocalize();
  const selectable = company.active && !current;

  const border = current
    ? { borderColor: c.signature, borderWidth: 1.5 }
    : { borderColor: c.line2, borderWidth: 1 };

  const inner = (
    <>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.logo,
            { backgroundColor: company.active ? c.kontekGreen : c.surface2 },
          ]}
        >
          <KIcon name="building" size={24} color={company.active ? c.onDark : c.ink3} />
        </View>
        <View style={styles.headerText}>
          <KText variant="title" weight="700" numberOfLines={1}>
            {company.name}
          </KText>
          <KText variant="bodySm" color={c.ink3} style={styles.role}>
            {tx(company.role)}
          </KText>
        </View>
        <KBadge
          label={company.active ? labels.active : labels.inactive}
          tone={company.active ? 'ok' : 'neutral'}
        />
      </View>

      {/* Divider */}
      <View style={[styles.divider, { backgroundColor: c.line2 }]} />

      {/* Permissions */}
      <View style={styles.perms}>
        <KText variant="caption" weight="600" color={c.ink3} style={styles.permsLabel}>
          {labels.permissions}
        </KText>
        <View style={styles.permsList}>
          {company.permissions.map((p) => {
            const isApprove = /^Approve/.test(p);
            return (
              <View key={p} style={styles.permRow}>
                <KIcon name="check" size={18} color={isApprove ? c.signature : c.ok} />
                <KText variant="body">{tx(p)}</KText>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );

  const cardStyle = [
    styles.card,
    {
      backgroundColor: c.surface,
      borderRadius: theme.radii.panel,
      opacity: company.active ? 1 : 0.72,
      ...theme.shadows.sm,
    },
    border,
    current ? theme.shadows.floatingCard : null,
  ];

  if (selectable) {
    return (
      <Pressable
        testID={`companies_row_${company.id}`}
        accessibilityRole="button"
        accessibilityState={{ selected: current }}
        onPress={() => onSelect(company)}
        style={({ pressed }) => [...cardStyle, pressed ? styles.pressed : null]}
      >
        {inner}
      </Pressable>
    );
  }

  return (
    <View
      testID={`companies_row_${company.id}`}
      accessibilityState={{ selected: current }}
      style={cardStyle}
    >
      {inner}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  wrap: { padding: 16, paddingBottom: 40, gap: 16 },
  card: { overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, paddingBottom: 14 },
  logo: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  headerText: { flex: 1, minWidth: 0 },
  role: { marginTop: 4 },
  divider: { height: 1, marginHorizontal: 16 },
  perms: { padding: 16, paddingTop: 14 },
  permsLabel: { marginBottom: 12 },
  permsList: { gap: 10 },
  permRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  pressed: { transform: [{ scale: 0.99 }], opacity: 0.97 },
});
