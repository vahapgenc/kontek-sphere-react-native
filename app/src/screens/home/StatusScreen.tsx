// StatusScreen — native port of StatusDetail (k-misc.jsx). Opened from the Home
// "My registrations for <month>" activity rows and the "Previous" rows. Shows a
// single registration's status as a vertical timeline.
//
// Layout, top to bottom:
//   1. Compact app bar "Details" with a back action.
//   2. Identity row: a dark brand icon tile + title + sub + a status KBadge (dot)
//      on the right.
//   3. An "Impact on pay" card (only when the item has a non-zero pay impact and
//      is not rejected).
//   4. A "Status" section with a vertical KStatusTimeline of the steps.
//   5. For rejected items, a danger KInfoNote with the rejection reason.
//   6. Footer: a danger "Delete registration" button (hidden once approved,
//      mirroring the prototype). Delete is a local no-op → returns Home.
//
// All statuses are handled:
//   action  → 3-step timeline, only "Registered" done (awaiting still pending).
//   pending → 3-step timeline, "Registered" + "Awaiting approval" done.
//   approved→ 3-step timeline, all three done; delete button hidden.
//   rejected→ 2-step timeline ("Registered" + "Rejected"), impact card hidden,
//             rejection reason shown.
//   info    → treated like pending (3-step timeline).
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KIconTile,
  KBadge,
  KCard,
  KInfoNote,
  KButton,
  KSectionLabel,
  KStatusTimeline,
  KText,
  KIcon,
  type BadgeTone,
  type IconName,
  type StatusTimelineStep,
} from '../../components';
import { SCENARIOS, ME, UPCOMING } from '../../mocks';
import { useSession } from '../../store/session';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';
import type { Status } from '../../api/types';

export interface StatusScreenProps {
  id: string;
  onBack: () => void;
}

// Status → badge tone + 'home'-namespace label key (mirrors STATUS_META in k-app.jsx).
const STATUS_META: Record<Status, { tone: BadgeTone; key: string }> = {
  action: { tone: 'warn', key: 'statusAction' },
  pending: { tone: 'info', key: 'statusPending' },
  approved: { tone: 'ok', key: 'statusApproved' },
  rejected: { tone: 'danger', key: 'statusRejected' },
  info: { tone: 'neutral', key: 'statusInfo' },
};

export function StatusScreen({ id, onBack }: StatusScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('detail');
  const { t: th } = useTranslation('home');
  const tx = useLocalize();

  const scenario = useSession((s) => s.scenario);
  const data = SCENARIOS[scenario] ?? SCENARIOS['Standard'];
  const item = data.activity.find((x) => x.id === id);

  if (!item) {
    return (
      <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
        <KAppBar title={t('detailsTitle')} onBack={onBack} testID="status_appBar" />
        <View style={styles.notFound}>
          <KText variant="body" color={c.ink3}>
            {t('notFound')}
          </KText>
        </View>
      </LinearGradient>
    );
  }

  const meta = STATUS_META[item.status];

  // Build the timeline steps (mirrors StatusDetail's step logic).
  const steps: StatusTimelineStep[] =
    item.status === 'rejected'
      ? [
          { state: 'done', label: t('stepRegistered'), sub: t('by') },
          { state: 'done', label: t('stepRejected'), sub: ME.hrName },
        ]
      : [
          { state: 'done', label: t('stepRegistered'), sub: t('by') },
          {
            state: item.status !== 'action' ? 'done' : 'pending',
            label: t('stepAwaitingApproval'),
            sub: ME.hrName,
          },
          {
            state: item.status === 'approved' ? 'done' : 'pending',
            label: t('stepIncludedInPay'),
            sub: UPCOMING.payday,
          },
        ];

  const showImpact = item.amount !== 0 && item.status !== 'rejected';
  const showDelete = item.status !== 'approved';

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('detailsTitle')} onBack={onBack} testID="status_appBar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity row */}
        <View style={styles.identity}>
          <KIconTile icon={item.icon as IconName} tone="brand" size={56} />
          <View style={styles.identityText}>
            <KText variant="h2" weight="700">
              {tx(item.title)}
            </KText>
            <KText variant="bodySm" color={c.ink3} style={styles.identitySub}>
              {tx(item.sub)}
            </KText>
          </View>
          <KBadge label={th(meta.key)} tone={meta.tone} dot />
        </View>

        {/* Impact on pay */}
        {showImpact ? (
          <KCard testID="status_impact">
            <View style={styles.impactRow}>
              <KText variant="bodySm" color={c.ink2}>
                {t('impactOnPay')}
              </KText>
              <KText variant="h3" weight="700" color={item.amount < 0 ? c.red : c.ok}>
                {kr(item.amount, { sign: item.amount > 0 })}
              </KText>
            </View>
          </KCard>
        ) : null}

        {/* Status timeline */}
        <View>
          <KSectionLabel>{t('status')}</KSectionLabel>
          <KCard>
            <KStatusTimeline testID="status_timeline" steps={steps} />
          </KCard>
        </View>

        {/* Rejection reason */}
        {item.status === 'rejected' && item.reason ? (
          <KInfoNote
            testID="status_reason"
            tone="danger"
            title={t('whyRejected')}
            icon={<KIcon name="warn" size={20} color={c.danger} />}
          >
            {tx(item.reason)}
          </KInfoNote>
        ) : null}
      </ScrollView>

      {/* Footer */}
      {showDelete ? (
        <View style={[styles.footer, { paddingBottom: theme.space.s06 }]}>
          <KButton
            testID="status_delete"
            label={t('deleteRegistration')}
            size="lg"
            variant="danger"
            block
            onPress={onBack}
          />
        </View>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 18 },
  notFound: { padding: 24 },
  identity: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, paddingTop: 8 },
  identityText: { flex: 1, minWidth: 0, paddingTop: 2 },
  identitySub: { marginTop: 2 },
  impactRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 10,
    backgroundColor: 'transparent',
  },
});
