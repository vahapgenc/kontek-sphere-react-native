// CalendarScreen — the Calendar tab. Month grid (KCalendarMonth) with per-day
// event dots, a selected-day registration list, and an empty state. Native port
// of CalendarScreen in k-misc.jsx. Bell in the large app bar (root screen).
import React, { useMemo, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KNotificationBell,
  KCalendarMonth,
  KListCard,
  KListRow,
  KBadge,
  KCard,
  KIcon,
  KText,
  type BadgeTone,
  type CalDotTone,
  type IconName,
} from '../../components';
import { CALENDAR_EVENTS } from '../../mocks';
import type { CalendarEvent, Status } from '../../api/types';
import { useSession } from '../../store/session';
import { useUnreadNotifCount } from '../../store/notifications';
import { useLocalize } from '../../i18n/localize';

// status → badge tone + 'home' namespace label key (shared with Home/Status).
const STATUS_META: Record<Status, { tone: BadgeTone; key: string }> = {
  action: { tone: 'warn', key: 'statusAction' },
  pending: { tone: 'info', key: 'statusPending' },
  approved: { tone: 'ok', key: 'statusApproved' },
  rejected: { tone: 'danger', key: 'statusRejected' },
  info: { tone: 'neutral', key: 'statusInfo' },
};

const pad = (n: number) => String(n).padStart(2, '0');
const isoOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;
/** Parse an ISO date into a local Date (avoids UTC timezone shifts). */
function localDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export interface CalendarScreenProps {
  onOpenEvent: (id: string) => void;
  onOpenNotifications?: () => void;
}

export function CalendarScreen({ onOpenEvent, onOpenNotifications }: CalendarScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation(['calendar', 'home']);
  const tx = useLocalize();
  const lang = useSession((s) => s.lang);
  const unread = useUnreadNotifCount();
  const locale = lang === 'sv' ? 'sv-SE' : 'en-GB';

  const [cursor, setCursor] = useState({ y: 2026, m: 5 }); // June 2026
  const [selected, setSelected] = useState<string | null>('2026-06-08');

  const now = new Date();
  const todayISO = isoOf(now.getFullYear(), now.getMonth(), now.getDate());

  // Group events by date; the dot tone is the first event's tone (prototype).
  const { byDate, dotToneByDate } = useMemo(() => {
    const bd: Record<string, CalendarEvent[]> = {};
    const dots: Record<string, CalDotTone> = {};
    CALENDAR_EVENTS.forEach((e) => {
      e.dates.forEach((d) => {
        (bd[d] = bd[d] || []).push(e);
      });
    });
    Object.keys(bd).forEach((d) => {
      dots[d] = bd[d][0].tone as CalDotTone;
    });
    return { byDate: bd, dotToneByDate: dots };
  }, []);

  const move = (delta: number) => {
    const nm = cursor.m + delta;
    setCursor({ y: cursor.y + Math.floor(nm / 12), m: ((nm % 12) + 12) % 12 });
    setSelected(null);
  };
  const goToday = () => {
    setCursor({ y: now.getFullYear(), m: now.getMonth() });
    setSelected(todayISO);
  };

  const selEvents = selected ? byDate[selected] ?? [] : [];
  const selLabel = selected
    ? localDate(selected).toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long' })
    : null;

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar
        large
        title={t('title')}
        testID="calendar_appBar"
        right={
          <KNotificationBell
            testID="calendar_appBar_notifications"
            count={unread}
            onPress={onOpenNotifications}
          />
        }
      />
      <ScrollView
        testID="calendar_scroll"
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <KCalendarMonth
          testID="calendar_month"
          year={cursor.y}
          month={cursor.m}
          selectedISO={selected}
          todayISO={todayISO}
          dotToneByDate={dotToneByDate}
          locale={locale}
          todayLabel={t('today')}
          prevLabel={t('prevMonth')}
          nextLabel={t('nextMonth')}
          onSelectDay={setSelected}
          onPrevMonth={() => move(-1)}
          onNextMonth={() => move(1)}
          onToday={goToday}
        />

        <View style={styles.section}>
          <KText variant="caption" weight="600" color={c.ink3} style={styles.sectionLabel}>
            {selected ? selLabel : t('selectDay')}
          </KText>
          {selEvents.length > 0 ? (
            <KListCard testID="calendar_events">
              {selEvents.map((e) => {
                const meta = STATUS_META[e.status];
                return (
                  <KListRow
                    key={e.id}
                    testID={`calendar_event_${e.id}`}
                    leading={<KIcon name={e.icon as IconName} size={21} color={c.greenDeep} />}
                    title={tx(e.title)}
                    subtitle={tx(e.meta)}
                    meta={tx(e.note)}
                    onPress={() => onOpenEvent(e.id)}
                    trailing={<KBadge tone={meta.tone} dot label={t(meta.key, { ns: 'home' })} />}
                  />
                );
              })}
            </KListCard>
          ) : (
            <KCard testID="calendar_empty" style={styles.emptyCard}>
              <View style={[styles.emptyTile, { backgroundColor: c.surface2 }]}>
                <KIcon name="calendar" size={20} color={c.ink3} />
              </View>
              <KText variant="body" color={c.ink3} style={styles.emptyText}>
                {selected ? t('nothing') : t('tapDay')}
              </KText>
            </KCard>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 28, gap: 18 },
  section: { gap: 0 },
  sectionLabel: { paddingHorizontal: 4, paddingBottom: 10 },
  emptyCard: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  emptyTile: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  emptyText: { flex: 1, minWidth: 0 },
});
