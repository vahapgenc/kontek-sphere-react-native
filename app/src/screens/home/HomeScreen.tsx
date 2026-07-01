// HomeScreen — native port of the Home screen in
// design/SPHERE - Full Prototype/k-app.jsx (HomeScreen + its sections).
//
// Layout, top to bottom:
//   1. Large app bar greeting ("Good morning, Sara") + notification bell, with
//      a company · role subtitle line.
//   2. Soft-mint "Upcoming pay" hero (KPayHero) with an expandable Details block
//      listing the preliminary pay items + a kollektivavtal note.
//   3. Collapsible "To do" section — action to-dos (+ manager approvals) or an
//      all-clear card.
//   4. Collapsible "My registrations for <month>" — the activity feed, newest
//      first, each row with a status pill.
//   5. Collapsible "Previous" — the static history rows from the prototype.
//
// Reuses design-system components from '../../components'; pulls data from
// '../../mocks' and the active scenario from the session store.
import React, { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KNotificationBell,
  KPayHero,
  KCollapsibleSection,
  KListCard,
  KListRow,
  KBadge,
  KAvatar,
  KCard,
  KText,
  KIcon,
  type BadgeTone,
  type IconName,
} from '../../components';
import { ME, PERIOD, SCENARIOS, APPROVALS } from '../../mocks';
import { useSession } from '../../store/session';
import { useUnreadNotifCount } from '../../store/notifications';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';
import type { ActivityItem, Status, AbsenceApproval, ExpenseApproval } from '../../api/types';

// A pending approval, tagged with its kind so manager To-do rows can render the
// right subtitle (absence rows append the absence type to the name).
type ApprovalItem = (AbsenceApproval | ExpenseApproval) & { kind: 'absence' | 'expense' };

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

// Status → badge tone + i18n key (mirrors STATUS_META in k-app.jsx).
const STATUS_META: Record<Status, { tone: BadgeTone; key: string }> = {
  action: { tone: 'warn', key: 'statusAction' },
  pending: { tone: 'info', key: 'statusPending' },
  approved: { tone: 'ok', key: 'statusApproved' },
  rejected: { tone: 'danger', key: 'statusRejected' },
  info: { tone: 'neutral', key: 'statusInfo' },
};

// Parse "May 29" / "June 2" into a sortable number so the activity feed shows
// newest-registered first (mirrors the inline sort in k-app.jsx).
const MONTHS: Record<string, number> = { May: 5, June: 6 };
function registeredOrder(registered: string): number {
  const [month, day] = registered.split(' ');
  return (MONTHS[month] ?? 0) * 100 + parseInt(day, 10);
}

// Minimal navigation surface this screen needs (untyped stack: params are open).
type HomeNav = { navigate: (screen: string, params?: { id: string }) => void };

export function HomeScreen() {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('home');
  const tx = useLocalize();
  const navigation = useNavigation() as unknown as HomeNav;

  const scenario = useSession((s) => s.scenario);
  const mode = useSession((s) => s.mode);
  const isManager = mode === 'manager';
  const data = SCENARIOS[scenario] ?? SCENARIOS['Standard'];
  const { upcoming, activity, todos } = data;

  const [openDetails, setOpenDetails] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const firstName = ME.name.split(' ')[0];
  const greeting = `${t('greetingMorning')}, ${firstName}`;
  // Home passes the "company · role" line as the subtitle (no eyebrow): the
  // greeting is the h1. Approvers get the approver role label.
  const subtitle = `${ME.employer} · ${t(isManager ? 'roleApprover' : 'roleEmployee')}`;
  const monthShort = upcoming.month.split(' ')[0];

  const actionItems = todos.filter((todo) => todo.status === 'action');
  // Manager mode also surfaces pending absence + expense approvals in the To-do
  // list (mirrors k-app.jsx HomeScreen). Employees see an empty approvals set.
  const approvalItems: ApprovalItem[] = isManager
    ? [
        ...APPROVALS.absence.map((a): ApprovalItem => ({ ...a, kind: 'absence' })),
        ...APPROVALS.expense.map((e): ApprovalItem => ({ ...e, kind: 'expense' })),
      ]
    : [];
  const sortedActivity = [...activity].sort(
    (a, b) => registeredOrder(b.registered) - registeredOrder(a.registered),
  );
  const todoCount = actionItems.length + approvalItems.length;
  const unreadNotifCount = useUnreadNotifCount();

  const noop = () => {};

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar
        large
        title={greeting}
        subtitle={subtitle}
        testID="home_appBar"
        right={
          <KNotificationBell
            testID="home_appBar_notifications"
            count={unreadNotifCount}
            onPress={() => navigation.navigate('Notifications')}
          />
        }
      />

      <ScrollView
        testID="home_scroll"
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={(e) => setScrolled(e.nativeEvent.contentOffset.y > 6)}
        scrollEventThrottle={16}
        stickyHeaderIndices={[0]}
      >
        {/* Upcoming pay hero — sticky; docks to a frosted full-bleed bar on scroll */}
        <KPayHero
          testID="home_payHero"
          docked={scrolled}
          eyebrow={`${t('upcomingPay')} · ${PERIOD.payday}`.toUpperCase()}
          amount={kr(upcoming.estNet)}
          badge={t('preliminary')}
          trailing={
            <View>
              <Pressable
                testID="home_payHero_toggle"
                onPress={() => setOpenDetails((o) => !o)}
                accessibilityRole="button"
                style={({ pressed }) => [
                  styles.detailsPill,
                  { borderRadius: theme.radii.pill },
                  pressed ? { opacity: 0.85 } : null,
                ]}
              >
                <KText variant="bodySm" weight="600" color={c.greenDeep}>
                  {openDetails ? t('hideDetails') : t('details')}
                </KText>
                <View style={openDetails ? styles.chevOpen : undefined}>
                  <KIcon name="chevD" size={17} color={c.greenDeep} />
                </View>
              </Pressable>

              {openDetails ? (
                <View style={[styles.detailsBox, { borderTopColor: c.greenLine }]}>
                  {upcoming.items.map((item) => (
                    <View key={item.id} style={styles.detailRow}>
                      <KText variant="bodySm" color={c.ink} style={styles.detailLabel}>
                        {tx(item.label)}
                      </KText>
                      <KText
                        variant="bodySm"
                        weight="600"
                        color={item.amount < 0 ? c.red : c.signature}
                      >
                        {kr(item.amount, { sign: item.amount > 0 })}
                      </KText>
                    </View>
                  ))}
                  <View style={[styles.note, { borderTopColor: c.greenLine }]}>
                    <KText variant="caption" color={c.ink3}>
                      {t('kollektivavtalPrefix')}
                      <KText variant="caption" weight="600" color={c.greenDeep}>
                        {t('kollektivavtal')}
                      </KText>
                      {t('kollektivavtalSuffix')}
                    </KText>
                  </View>
                </View>
              ) : null}
            </View>
          }
        />

        {/* To do */}
        <KCollapsibleSection
          testID="home_section_todo"
          title={t('toDo')}
          count={todoCount > 0 ? todoCount : undefined}
          defaultOpen
        >
          {todoCount > 0 ? (
            <KListCard>
              {actionItems.map((todo) => (
                <KListRow
                  key={todo.id}
                  testID={`home_todo_${todo.id}`}
                  dense
                  title={tx(todo.title)}
                  subtitle={tx(todo.sub)}
                  leading={
                    <KIcon
                      name={todo.kind === 'expense' ? 'receipt' : 'calendar'}
                      size={18}
                      color={c.greenDeep}
                    />
                  }
                  trailing={<KBadge label={t('fix')} tone="warn" dot />}
                  onPress={() => navigation.navigate('Complete', { id: todo.id })}
                />
              ))}
              {approvalItems.map((approval) => (
                <KListRow
                  key={approval.id}
                  testID={`home_approval_${approval.id}`}
                  dense
                  title={
                    approval.kind === 'absence'
                      ? `${tx(approval.name)} · ${tx(approval.type)}`
                      : tx(approval.name)
                  }
                  subtitle={`${tx(approval.range)} · ${tx(approval.meta)}`}
                  leading={
                    <KAvatar initials={initials(approval.name)} size="sm" tone="default" />
                  }
                  leadingBare
                  trailing={<KBadge label={t('review')} tone="info" dot />}
                  onPress={noop}
                />
              ))}
            </KListCard>
          ) : (
            <KCard testID="home_todo_empty" style={styles.emptyCard}>
              <View style={[styles.emptyIcon, { backgroundColor: c.okSoft }]}>
                <KIcon name="check" size={20} color={c.ok} strokeWidth={2.2} />
              </View>
              <View style={styles.emptyBody}>
                <KText variant="title" weight="600">
                  {t('nothingToDoTitle')}
                </KText>
                <KText variant="bodySm" color={c.ink3}>
                  {t('nothingToDoSub')}
                </KText>
              </View>
            </KCard>
          )}
        </KCollapsibleSection>

        {/* My registrations for <month> */}
        <KCollapsibleSection
          testID="home_section_registrations"
          title={`${t('myRegistrationsFor')} ${monthShort}`}
          defaultOpen
        >
          {sortedActivity.length === 0 ? (
            <KCard testID="home_registrations_empty">
              <KText variant="bodySm" color={c.ink3} align="center">
                {t('nothingRegisteredYet')}
              </KText>
            </KCard>
          ) : (
            <KListCard>
              {sortedActivity.map((item) => (
                <ActivityRow
                  key={item.id}
                  item={item}
                  onPress={() => navigation.navigate('Status', { id: item.id })}
                />
              ))}
            </KListCard>
          )}
        </KCollapsibleSection>

        {/* Previous */}
        <KCollapsibleSection
          testID="home_section_previous"
          title={t('previous')}
          defaultOpen={false}
        >
          <KListCard>
            <KListRow
              testID="home_previous_annualLeave"
              dense
              title={t('prevAnnualLeaveTitle')}
              subtitle={t('prevAnnualLeaveSub')}
              leading={<KIcon name="calendar" size={18} color={c.greenDeep} />}
              trailing={<KBadge label={t('approved')} tone="ok" dot />}
              onPress={() => navigation.navigate('Status', { id: 'prev-annualLeave' })}
            />
            <KListRow
              testID="home_previous_expenseTravel"
              dense
              title={t('prevExpenseTravelTitle')}
              subtitle={t('prevExpenseTravelSub')}
              leading={<KIcon name="receipt" size={18} color={c.greenDeep} />}
              trailing={<KBadge label={t('paid')} tone="ok" dot />}
              onPress={() => navigation.navigate('Status', { id: 'prev-expenseTravel' })}
            />
            <KListRow
              testID="home_previous_childSick"
              dense
              title={t('prevChildSickTitle')}
              subtitle={t('prevChildSickSub')}
              leading={<KIcon name="calendar" size={18} color={c.greenDeep} />}
              trailing={<KBadge label={t('approved')} tone="ok" dot />}
              onPress={() => navigation.navigate('Status', { id: 'prev-childSick' })}
            />
            <KListRow
              testID="home_previous_payslip"
              dense
              title={t('prevPayslipTitle')}
              subtitle={t('prevPayslipSub')}
              leading={<KIcon name="payslip" size={18} color={c.greenDeep} />}
              trailing={<KBadge label={t('paid')} tone="ok" dot />}
              onPress={() => navigation.navigate('Status', { id: 'prev-payslip' })}
            />
          </KListCard>
        </KCollapsibleSection>
      </ScrollView>
    </LinearGradient>
  );
}

// A single activity-feed row: icon tile, title, "<sub> · Registered <date>" and
// a status pill. The subtitle combines the item sub with the registered date
// (the prototype stacks them; here we join with a separator to fit KListRow).
function ActivityRow({ item, onPress }: { item: ActivityItem; onPress: () => void }) {
  const theme = useTheme();
  const { t } = useTranslation('home');
  const tx = useLocalize();
  const meta = STATUS_META[item.status];
  return (
    <KListRow
      testID={`home_activity_${item.id}`}
      dense
      title={tx(item.title)}
      subtitle={tx(item.sub)}
      meta={`${t('registeredPrefix')} ${tx(item.registered)}`}
      leading={<KIcon name={item.icon as IconName} size={18} color={theme.colors.greenDeep} />}
      trailing={<KBadge label={t(meta.key)} tone={meta.tone} dot />}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 28,
    gap: 22,
  },
  detailsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    marginTop: 12,
    // Prototype: marginLeft -10 pulls the pill back under the amount's edge.
    marginLeft: -10,
    minHeight: 40,
    paddingVertical: 8,
    paddingHorizontal: 14,
    // Prototype: faint dark tint rgba(32,59,60,0.06), not white.
    backgroundColor: 'rgba(32,59,60,0.06)',
  },
  chevOpen: { transform: [{ rotate: '180deg' }] },
  detailsBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    gap: 0,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 8,
  },
  detailLabel: { flex: 1, minWidth: 0 },
  note: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  emptyIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyBody: { flex: 1, minWidth: 0, gap: 1 },
});
