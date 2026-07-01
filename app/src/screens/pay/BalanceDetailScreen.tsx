// BalanceDetailScreen — faithful port of k-misc.jsx <BalanceDetailScreen>.
//
// Layout, top to bottom (compact centered app bar + back):
//   1. Stat hero — the mint gradient card (matching the tile treatment): a large
//      display value + green-deep unit on one baseline, then the muted label.
//   2. History — a section labelled per balance ("Leave taken this year" /
//      "Child sick care taken" / "Sick leave this year"). Either an empty state
//      ("Nothing registered this year.") or a surface card with an "<n> occasions"
//      header row and one row per occasion (range + weekday, muted meta trailing).
import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import { KAppBar, KSectionLabel, KIcon, KText } from '../../components';
import { COMPANIES, BALANCES } from '../../mocks';
import { useSession } from '../../store/session';
import { useLocalize } from '../../i18n/localize';

export interface BalanceDetailScreenProps {
  id: string;
  onBack: () => void;
}

export function BalanceDetailScreen({ id, onBack }: BalanceDetailScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('pay');
  const tx = useLocalize();

  const companyId = useSession((s) => s.companyId);
  const activeCompany = COMPANIES.find((co) => co.id === companyId) ?? COMPANIES[0];
  const balances = activeCompany.balances ?? BALANCES;
  const bal = balances.find((b) => b.id === id);

  const historyTitle =
    id === 'sem' ? t('historyLeave') : id === 'vab' ? t('historyVab') : t('historySick');

  if (!bal) {
    return (
      <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
        <KAppBar title={t('balanceDetailTitle')} onBack={onBack} testID="balanceDetail_appBar" />
        <View style={styles.notFound}>
          <KText variant="body" color={c.ink3}>
            {t('notFound')}
          </KText>
        </View>
      </LinearGradient>
    );
  }

  const history = bal.history ?? [];

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('balanceDetailTitle')} onBack={onBack} testID="balanceDetail_appBar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stat hero — matches the tile */}
        <LinearGradient
          colors={theme.gradients.mint}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { borderRadius: theme.radii.sheet, borderColor: c.mintLine }, theme.shadows.mint]}
          testID="balanceDetail_hero"
        >
          <View style={styles.heroValueRow}>
            <KText variant="display" weight="700" color={c.signature} style={styles.heroValue}>
              {String(bal.value)}
            </KText>
            <KText variant="body" weight="600" color={c.greenDeep}>
              {tx(bal.unit)}
            </KText>
          </View>
          <KText variant="bodySm" color={c.ink3} style={styles.heroLabel}>
            {tx(bal.label)}
          </KText>
        </LinearGradient>

        {/* History */}
        <View>
          <KSectionLabel testID="balanceDetail_history_label">{historyTitle}</KSectionLabel>

          {history.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: c.surface, borderRadius: theme.radii.panel }, theme.shadows.sm]}>
              <View style={[styles.emptyIcon, { backgroundColor: c.okSoft }]}>
                <KIcon name="check" size={19} color={c.ok} />
              </View>
              <KText variant="body" color={c.ink3} style={styles.flex}>
                {t('nothingRegistered')}
              </KText>
            </View>
          ) : (
            <View style={[styles.listCard, { backgroundColor: c.surface, borderRadius: theme.radii.panel }, theme.shadows.sm]}>
              {/* "<n> occasions" header row */}
              <View style={[styles.occHeader, { backgroundColor: c.canvas, borderBottomColor: c.line2 }]}>
                <KIcon name="calendar" size={17} color={c.ink3} />
                <KText variant="bodySm" color={c.ink3}>
                  {t('occasions', { count: history.length })}
                </KText>
              </View>

              {history.map((s, i) => (
                <View
                  key={i}
                  testID={`balanceDetail_occasion_${i}`}
                  style={[styles.occRow, i > 0 ? { borderTopWidth: 1, borderTopColor: c.line2 } : null]}
                >
                  <View style={styles.flex}>
                    <KText variant="body" color={c.ink2}>
                      {tx(s.range)}
                    </KText>
                    {s.weekday ? (
                      <KText variant="caption" color={c.ink3} style={styles.weekday}>
                        {tx(s.weekday)}
                      </KText>
                    ) : null}
                  </View>
                  <KText variant="bodySm" color={c.ink3}>
                    {tx(s.meta)}
                  </KText>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  flex: { flex: 1 },
  // Prototype root padding: "8px 16px 28px", column gap 20.
  content: {
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 28,
    gap: 20,
  },
  notFound: { padding: 24 },

  // Hero: padding "20px 22px", 1px mint border, deep mint shadow.
  hero: { paddingVertical: 20, paddingHorizontal: 22, borderWidth: 1 },
  heroValueRow: { flexDirection: 'row', alignItems: 'baseline', gap: 6 },
  heroValue: { lineHeight: 36 },
  heroLabel: { marginTop: 4 },

  // Empty state row.
  emptyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  emptyIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // History list card.
  listCard: { borderWidth: 1, borderColor: 'transparent', overflow: 'hidden' },
  occHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  occRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  weekday: { marginTop: 1 },
});
