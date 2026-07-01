// NotificationsScreen — the bell's list. Native port of NotificationsScreen in
// k-misc.jsx: unread items get a green dot + bolder text; a "Mark all as read"
// link clears them. Manager context adds two approval notifications. Read-state
// lives in the session store (notifRead), so the app-bar bell badge updates.
import React from 'react';
import { View, Pressable, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KAppBar, KText, KIcon, type IconName } from '../../components';
import { ME } from '../../mocks';
import { useSession } from '../../store/session';
import { useLocalize } from '../../i18n/localize';

type Tone = 'warn' | 'ok' | 'info';

interface NotifItem {
  id: string;
  icon: IconName;
  tone: Tone;
  titleKey: string;
  subKey: string;
  timeKey: string;
  unread: boolean;
}

export interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('notifications');
  const tx = useLocalize();
  const isManager = useSession((s) => s.mode === 'manager');
  const notifRead = useSession((s) => s.notifRead);
  const markNotifRead = useSession((s) => s.markNotifRead);
  const markAllNotifRead = useSession((s) => s.markAllNotifRead);

  const items: NotifItem[] = [
    ...(isManager
      ? ([
          { id: 'n-appr-abs', icon: 'approvals', tone: 'info', titleKey: 'apprAbsTitle', subKey: 'apprAbsSub', timeKey: 'timeToday', unread: true },
          { id: 'n-appr-exp', icon: 'approvals', tone: 'info', titleKey: 'apprExpTitle', subKey: 'apprExpSub', timeKey: 'timeToday', unread: true },
        ] as NotifItem[])
      : []),
    { id: 'n-sick', icon: 'warn', tone: 'warn', titleKey: 'sickTitle', subKey: 'sickSub', timeKey: 'timeToday', unread: true },
    { id: 'n-exp', icon: 'warn', tone: 'warn', titleKey: 'expTitle', subKey: 'expSub', timeKey: 'timeToday', unread: true },
    { id: 'n-vab', icon: 'checkCirc', tone: 'ok', titleKey: 'vabTitle', subKey: 'vabSub', timeKey: 'timeYesterday', unread: false },
    { id: 'n-pay', icon: 'info', tone: 'info', titleKey: 'payTitle', subKey: 'paySub', timeKey: 'timePay', unread: false },
  ];

  const unreadIds = items.filter((n) => n.unread).map((n) => n.id);
  const anyUnread = unreadIds.some((id) => !notifRead.has(id));
  const toneColor = (tone: Tone) => (tone === 'warn' ? c.warn : tone === 'ok' ? c.ok : c.info);

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('title')} onBack={onBack} testID="notifications_appBar" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {anyUnread ? (
          <View style={styles.markAllRow}>
            <Pressable
              testID="notifications_markAll"
              accessibilityRole="button"
              hitSlop={6}
              onPress={() => markAllNotifRead(unreadIds)}
            >
              <KText variant="bodySm" weight="600" color={c.action}>
                {t('markAll')}
              </KText>
            </Pressable>
          </View>
        ) : null}

        {items.map((n) => {
          const isNew = n.unread && !notifRead.has(n.id);
          const sub = n.id === 'n-vab' ? t(n.subKey, { hrName: tx(ME.hrName) }) : t(n.subKey);
          return (
            <Pressable
              key={n.id}
              testID={`notification_${n.id}`}
              accessibilityRole="button"
              onPress={() => n.unread && markNotifRead(n.id)}
              style={[styles.card, { backgroundColor: c.surface, borderRadius: theme.radii.panel, ...theme.shadows.sm }]}
            >
              <View style={styles.iconArea}>
                <KIcon name={n.icon} size={22} color={toneColor(n.tone)} />
              </View>
              <View style={styles.body}>
                <View style={styles.titleRow}>
                  <View style={styles.titleLeft}>
                    {isNew ? <View style={[styles.newDot, { backgroundColor: c.green }]} /> : null}
                    <KText variant="title" weight={isNew ? '700' : '600'} color={c.ink} style={styles.title}>
                      {t(n.titleKey)}
                    </KText>
                  </View>
                  <KText variant="caption" color={c.ink3} style={styles.time}>
                    {t(n.timeKey)}
                  </KText>
                </View>
                <KText variant="body" weight={isNew ? '600' : '400'} color={c.ink3} style={styles.sub}>
                  {sub}
                </KText>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 28, gap: 10 },
  markAllRow: { flexDirection: 'row', justifyContent: 'flex-end' },
  card: { flexDirection: 'row', gap: 13, padding: 14, alignItems: 'flex-start' },
  iconArea: { width: 40, alignItems: 'center', justifyContent: 'center', marginTop: 1, flexShrink: 0 },
  body: { flex: 1, minWidth: 0 },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  titleLeft: { flexDirection: 'row', alignItems: 'center', gap: 7, flex: 1, minWidth: 0 },
  title: { flexShrink: 1 },
  newDot: { width: 9, height: 9, borderRadius: 999, flexShrink: 0 },
  time: { flexShrink: 0 },
  sub: { marginTop: 2 },
});
