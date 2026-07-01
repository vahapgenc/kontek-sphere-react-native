// PayslipsScreen — the Pay tab. Faithful port of k-misc.jsx <PayslipsScreen>.
//
// Layout, top to bottom (root: 4px top / 16px gutters / 28px bottom, gap 16):
//   1. Large app bar "Pay".
//   2. Balance tiles grid (KBalanceTiles) — shown for employees only, taps a
//      tile → onOpenBalance(id). Hidden in manager mode (mirrors !store.isManager).
//   3. "Upcoming" collapsible section: a two-row list of the preliminary/planned
//      pay entries. The current period (June) taps → onOpenUpcoming; the future
//      period (July) is inert. Both show a muted "~<estimate>" trailing value.
//   4. "Recent" collapsible section: the archived pay slips (PAYSLIPS), each row
//      is the month + a muted "Paid <date>" sub and the net amount, taps →
//      onOpenPayslip(id).
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KNotificationBell,
  KCollapsibleSection,
  KListCard,
  KListRow,
  KBalanceTiles,
  KSectionLabel,
  KIcon,
  KText,
} from '../../components';
import { PAYSLIPS, UPCOMING, COMPANIES, BALANCES } from '../../mocks';
import { useSession } from '../../store/session';
import { useUnreadNotifCount } from '../../store/notifications';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';

export interface PayslipsScreenProps {
  onOpenPayslip: (id: string) => void;
  onOpenUpcoming: () => void;
  onOpenBalance: (id: string) => void;
}

export function PayslipsScreen({
  onOpenPayslip,
  onOpenUpcoming,
  onOpenBalance,
}: PayslipsScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('pay');
  const tx = useLocalize();

  const companyId = useSession((s) => s.companyId);
  const mode = useSession((s) => s.mode);
  const isManager = mode === 'manager';
  const unreadNotifCount = useUnreadNotifCount();

  const activeCompany = COMPANIES.find((co) => co.id === companyId) ?? COMPANIES[0];
  const balances = activeCompany.balances ?? BALANCES;

  // Preliminary / planned pay entries (mirrors the prototype's `planned`).
  const planned = [
    { id: 'pl-jun', month: 'Juni 2026', payday: '25 juni', est: UPCOMING.estNet, current: true },
    { id: 'pl-jul', month: 'Juli 2026', payday: '25 juli', est: 25120, current: false },
  ];

  const estValue = (amount: number) => (
    <KText variant="bodySm" weight="600" color={c.ink3}>
      ~{kr(amount)}
    </KText>
  );

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar
        title={t('title')}
        large
        testID="pay_appBar"
        right={
          <KNotificationBell
            testID="pay_appBar_notifications"
            count={unreadNotifCount}
            onPress={() => {}}
          />
        }
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance tiles — employees only */}
        {!isManager ? (
          <View>
            <KSectionLabel testID="pay_balances_label">{t('myBalances')}</KSectionLabel>
            <KBalanceTiles
              testID="pay_balanceTiles"
              balances={balances.map((b) => ({ ...b, label: tx(b.label), unit: tx(b.unit) }))}
              onOpen={onOpenBalance}
            />
          </View>
        ) : null}

        {/* Upcoming */}
        <KCollapsibleSection title={t('upcoming')} testID="pay_upcoming_section">
          <KListCard>
            {planned.map((p) => (
              <KListRow
                key={p.id}
                testID={`pay_upcoming_row_${p.id}`}
                title={tx(p.month)}
                subtitle={t('estimatedPayment', { payday: tx(p.payday) })}
                leading={<KIcon name="calendar" color={c.ink} />}
                onPress={p.current ? onOpenUpcoming : undefined}
                trailing={
                  p.current ? (
                    <>
                      {estValue(p.est)}
                      <KIcon name="chevR" size={20} color={c.ink4} />
                    </>
                  ) : (
                    estValue(p.est)
                  )
                }
              />
            ))}
          </KListCard>
        </KCollapsibleSection>

        {/* Recent */}
        <KCollapsibleSection title={t('recent')} testID="pay_recent_section">
          <KListCard>
            {PAYSLIPS.map((p) => (
              <KListRow
                key={p.id}
                testID={`pay_recent_row_${p.id}`}
                title={tx(p.month)}
                subtitle={t('paid', { payday: tx(p.payday.replace(', 2026', '')) })}
                leading={<KIcon name="payslip" color={c.ink} />}
                onPress={() => onOpenPayslip(p.id)}
                trailing={
                  <>
                    <KText variant="bodySm" weight="600" color={c.ink}>
                      {kr(p.net)}
                    </KText>
                    <KIcon name="chevR" size={20} color={c.ink4} />
                  </>
                }
              />
            ))}
          </KListCard>
        </KCollapsibleSection>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  // Prototype root padding: "4px 16px 28px", column gap 16.
  content: {
    paddingTop: 4,
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 16,
  },
});
