// RegDetailScreen — "Details" for a calendar registration. Native port of
// RegDetailScreen in k-misc.jsx: a header (green tile + title + date + status
// badge), a label/value card, and an info note with the registration's note.
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KCard,
  KInfoNote,
  KBadge,
  KIcon,
  KText,
  type BadgeTone,
  type IconName,
} from '../../components';
import { CALENDAR_EVENTS } from '../../mocks';
import type { Status } from '../../api/types';
import { useSession } from '../../store/session';
import { useLocalize } from '../../i18n/localize';

const STATUS_META: Record<Status, { tone: BadgeTone; key: string }> = {
  action: { tone: 'warn', key: 'statusAction' },
  pending: { tone: 'info', key: 'statusPending' },
  approved: { tone: 'ok', key: 'statusApproved' },
  rejected: { tone: 'danger', key: 'statusRejected' },
  info: { tone: 'neutral', key: 'statusInfo' },
};

function localDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export interface RegDetailScreenProps {
  id: string;
  onBack: () => void;
}

export function RegDetailScreen({ id, onBack }: RegDetailScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation(['calendar', 'home']);
  const tx = useLocalize();
  const lang = useSession((s) => s.lang);
  const locale = lang === 'sv' ? 'sv-SE' : 'en-GB';

  const event = CALENDAR_EVENTS.find((e) => e.id === id);
  if (!event) {
    return (
      <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
        <KAppBar title={t('detailsTitle')} onBack={onBack} testID="regdetail_appBar" />
      </LinearGradient>
    );
  }

  const meta = STATUS_META[event.status];
  const isExpense = event.icon === 'receipt';
  const fmt = (iso: string) => localDate(iso).toLocaleDateString(locale, { day: 'numeric', month: 'short' });
  const when =
    event.dates.length > 1
      ? `${fmt(event.dates[0])} – ${fmt(event.dates[event.dates.length - 1])}`
      : fmt(event.dates[0]);

  const rows: [string, string][] = isExpense
    ? [
        [t('labelAmount'), tx(event.meta)],
        [t('labelDate'), when],
      ]
    : [
        [t('labelType'), tx(event.title)],
        [t('labelPeriod'), when],
        [t('labelDuration'), tx(event.meta)],
      ];

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('detailsTitle')} onBack={onBack} testID="regdetail_appBar" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.tile, { backgroundColor: c.kontekGreen }]}>
            <KIcon name={event.icon as IconName} size={26} color={c.onDark} />
          </View>
          <View style={styles.headerBody}>
            <KText variant="h3" weight="700" color={c.ink} numberOfLines={2}>
              {tx(event.title)}
            </KText>
            <KText variant="bodySm" color={c.ink3} style={styles.when}>
              {when}
            </KText>
          </View>
          <KBadge tone={meta.tone} dot label={t(meta.key, { ns: 'home' })} />
        </View>

        {/* Field rows */}
        <KCard testID="regdetail_rows" padding={0}>
          {rows.map(([label, value], i) => (
            <View
              key={label}
              style={[
                styles.row,
                i > 0 ? { borderTopWidth: 1, borderTopColor: c.line2 } : null,
              ]}
            >
              <KText variant="body" color={c.ink3}>
                {label}
              </KText>
              <KText variant="body" weight="600" color={c.ink} style={styles.rowValue}>
                {value}
              </KText>
            </View>
          ))}
        </KCard>

        {/* Note */}
        <KInfoNote
          testID="regdetail_note"
          tone="info"
          icon={<KIcon name="info" size={19} color={c.infoText} />}
        >
          {tx(event.note)}
        </KInfoNote>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24, gap: 18 },
  header: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, paddingTop: 4 },
  tile: {
    width: 52,
    height: 52,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerBody: { flex: 1, minWidth: 0, paddingTop: 2 },
  when: { marginTop: 2 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  rowValue: { textAlign: 'right', flexShrink: 1 },
});
