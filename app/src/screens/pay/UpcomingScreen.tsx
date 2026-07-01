// UpcomingScreen — native port of UpcomingScreen (k-misc.jsx). Preliminary
// upcoming-pay breakdown.
//
// Layout, top to bottom (mirrors the prototype exactly):
//   1. Compact centered app bar "Upcoming pay" + back.
//   2. Mint pay hero: a "Preliminary" brand badge + display estimated-net amount
//      + "Estimated net pay · paid on …".
//   3. "What's included" section: a KCard(pad 0) of line rows (label + signed
//      amount; the base item's label is bold, negatives render in danger red),
//      closed by a greenSoft "Estimated net" footer row.
//   4. A delta KCard: a warn-toned arrow-down tile + "<delta> vs May" (bold) + the
//      reason line.
//   5. An info KInfoNote with the "preliminary calculation" note.
//
// Screen root sits on the app-bg mint gradient like Home/Profile.
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KPayHero,
  KCard,
  KSectionLabel,
  KInfoNote,
  KText,
  KIcon,
} from '../../components';
import { UPCOMING } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';

export interface UpcomingScreenProps {
  onBack: () => void;
}

export function UpcomingScreen({ onBack }: UpcomingScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('paydetail');
  const tx = useLocalize();

  const u = UPCOMING;
  const delta = u.estNet - u.prevNet;

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('upcomingTitle')} onBack={onBack} testID="upcoming_appBar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <KPayHero
          testID="upcoming_hero"
          eyebrow=""
          badge={t('preliminary')}
          amount={kr(u.estNet)}
          subtitle={t('estimatedNetSub', { payday: u.payday })}
        />

        {/* What's included */}
        <View>
          <KSectionLabel>{t('whatsIncluded')}</KSectionLabel>
          <KCard padding={0} testID="upcoming_breakdown">
            <View style={styles.itemsPad}>
              {u.items.map((it, i) => (
                <View
                  key={it.id}
                  style={[
                    styles.itemRow,
                    i < u.items.length - 1
                      ? { borderBottomWidth: 1, borderBottomColor: c.line2 }
                      : null,
                  ]}
                >
                  <KText variant="bodySm" weight={it.type === 'base' ? '700' : '500'}>
                    {tx(it.label)}
                  </KText>
                  <KText
                    variant="bodySm"
                    weight="700"
                    color={it.amount < 0 ? c.danger : c.ink}
                  >
                    {kr(it.amount)}
                  </KText>
                </View>
              ))}
            </View>

            {/* Estimated net footer */}
            <View style={[styles.netRow, { backgroundColor: c.greenSoft, borderTopColor: c.line }]}>
              <KText variant="body" weight="700">
                {t('estimatedNet')}
              </KText>
              <KText variant="body" weight="700" color={c.greenDeep}>
                {kr(u.estNet)}
              </KText>
            </View>
          </KCard>
        </View>

        {/* Delta card */}
        <KCard testID="upcoming_delta">
          <View style={styles.deltaRow}>
            <View style={[styles.deltaTile, { backgroundColor: c.warnBg }]}>
              <KIcon name="arrowDown" size={22} color={c.warn} />
            </View>
            <View style={styles.deltaText}>
              <KText variant="bodySm" weight="700">
                {t('deltaVsPrev', { delta: kr(delta) })}
              </KText>
              <KText variant="caption" color={c.ink3}>
                {t('deltaReason')}
              </KText>
            </View>
          </View>
        </KCard>

        {/* Preliminary note */}
        <KInfoNote
          testID="upcoming_note"
          tone="info"
          icon={<KIcon name="info" size={20} color={c.info} />}
        >
          {t('upcomingNote')}
        </KInfoNote>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 28, gap: 16 },

  // Items — prototype padding "4px 16px" on the list, "12px 0" per row.
  itemsPad: { paddingHorizontal: 16, paddingVertical: 4 },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },

  // Estimated net footer — prototype "14px 16px", greenSoft bg, top hairline.
  netRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
  },

  deltaRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  deltaTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  deltaText: { flex: 1, minWidth: 0 },
});
