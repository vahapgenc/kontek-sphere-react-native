// PayslipDetailScreen — native port of PayslipDetail (k-misc.jsx).
//
// Layout, top to bottom (mirrors the prototype exactly):
//   1. Compact centered app bar "Pay slip" + back.
//   2. Mint pay hero: eyebrow (month) + display net amount + "Net pay · paid …".
//   3. "Details" collapsible section (header sits OUTSIDE the card): a KCard(pad 0)
//      containing the pay breakdown grouped by section (Pay / Deductions — the Net
//      group is rendered as the bold "Paid" footer, not a line row). Each line row
//      is label · qty (muted) · amount (danger red when negative). A greenSoft
//      "Paid" footer row (bold) closes the breakdown, then a "View as PDF" button.
//   4. "Is your pay correct" collapsible section: the notes paragraph, then either
//      the Yes/No CTAs, or — once confirmed — an ok medallion + "you're all done"
//      + an Undo action. "No – contact payroll" calls onCheck.
//
// Screen root sits on the app-bg mint gradient like Home/Profile.
import React, { useState } from 'react';
import { View, ScrollView, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KPayHero,
  KCard,
  KCollapsibleSection,
  KButton,
  KText,
  KIcon,
} from '../../components';
import { PAYSLIPS } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';
import type { PayslipRowGroup } from '../../api/types';

export interface PayslipDetailScreenProps {
  id: string;
  onBack: () => void;
  onCheck: () => void;
}

export function PayslipDetailScreen({ id, onBack, onCheck }: PayslipDetailScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('paydetail');
  const tx = useLocalize();

  const p = PAYSLIPS.find((x) => x.id === id) ?? PAYSLIPS[0];
  const [confirmed, setConfirmed] = useState(false);

  // Groups in source order, excluding "Net" (the net becomes the "Paid" footer).
  const groups = p.rows
    .filter((r) => r.group !== 'Net')
    .map((r) => r.group)
    .filter((g, i, arr) => arr.indexOf(g) === i) as PayslipRowGroup[];

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('payslipTitle')} onBack={onBack} testID="payslip_detail_appBar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <KPayHero
          testID="payslip_detail_hero"
          eyebrow={tx(p.month)}
          amount={kr(p.net)}
          subtitle={t('netPaidSub', { payday: p.payday })}
        />

        {/* Details — header outside the card */}
        <KCollapsibleSection title={t('details')} testID="payslip_detail_detailsToggle">
          <KCard padding={0} testID="payslip_detail_breakdown">
            {groups.map((g) => (
              <View key={g} style={styles.groupPad}>
                {p.rows
                  .filter((r) => r.group === g)
                  .map((r, i) => (
                    <View
                      key={`${g}_${i}`}
                      style={[styles.lineRow, { borderBottomColor: c.line2 }]}
                    >
                      <View style={styles.lineLabel}>
                        <KText variant="bodySm">{tx(r.label)}</KText>
                        {r.qty ? (
                          <KText variant="caption" color={c.ink3} style={styles.qty}>
                            {tx(r.qty)}
                          </KText>
                        ) : null}
                      </View>
                      <KText
                        variant="bodySm"
                        weight="600"
                        color={r.amount < 0 ? c.danger : c.ink}
                      >
                        {kr(r.amount)}
                      </KText>
                    </View>
                  ))}
              </View>
            ))}

            {/* Paid (net) footer */}
            <View
              style={[styles.paidRow, { backgroundColor: c.greenSoft, borderTopColor: c.line }]}
            >
              <KText variant="title" weight="700">
                {t('paid')}
              </KText>
              <KText variant="h3" weight="700" color={c.greenDeep}>
                {kr(p.net)}
              </KText>
            </View>

            {/* View as PDF */}
            <View style={[styles.pdfWrap, { borderTopColor: c.line2 }]}>
              <KButton
                testID="payslip_detail_viewPdfButton"
                label={t('viewAsPdf')}
                variant="secondary"
                block
              />
            </View>
          </KCard>
        </KCollapsibleSection>

        {/* Is your pay correct — header outside the card */}
        <KCollapsibleSection
          title={t('isYourPayCorrect')}
          testID="payslip_detail_correctToggle"
        >
          <KCard testID="payslip_detail_correctCard">
            {p.notes ? (
              <KText variant="bodySm" color={c.ink2} style={styles.notes}>
                {tx(p.notes)}
              </KText>
            ) : null}

            {!confirmed ? (
              <View style={styles.ctaColumn}>
                <KButton
                  testID="payslip_detail_correctYesButton"
                  label={t('yesCorrect')}
                  block
                  onPress={() => setConfirmed(true)}
                />
                <KButton
                  testID="payslip_detail_correctNoButton"
                  label={t('noContactPayroll')}
                  variant="secondary"
                  block
                  onPress={onCheck}
                />
              </View>
            ) : (
              <View style={styles.confirmedRow}>
                <View style={[styles.confirmedTile, { backgroundColor: c.okSoft }]}>
                  <KIcon name="checkCirc" size={22} color={c.okText} />
                </View>
                <View style={styles.confirmedText}>
                  <KText variant="title" weight="600">
                    {t('thanksAllDone')}
                  </KText>
                  <KText variant="bodySm" color={c.ink3}>
                    {t('notedCorrect')}
                  </KText>
                </View>
                <Pressable
                  testID="payslip_detail_undoButton"
                  accessibilityRole="button"
                  hitSlop={8}
                  onPress={() => setConfirmed(false)}
                >
                  <KText variant="bodySm" weight="600" color={c.signature}>
                    {t('undo')}
                  </KText>
                </Pressable>
              </View>
            )}
          </KCard>
        </KCollapsibleSection>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 4, paddingBottom: 28, gap: 16 },

  // Breakdown line rows — prototype padding "0 16px" on the group, "9px 0" per row.
  groupPad: { paddingHorizontal: 16 },
  lineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 9,
    borderBottomWidth: 1,
  },
  lineLabel: { flex: 1, minWidth: 0, flexDirection: 'row', alignItems: 'baseline' },
  qty: { marginLeft: 8 },

  // Paid footer — prototype padding 16, greenSoft bg, top hairline.
  paidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
  },
  pdfWrap: { padding: 16, borderTopWidth: 1 },

  notes: { marginBottom: 14, lineHeight: 22 },
  ctaColumn: { gap: 10 },
  confirmedRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  confirmedTile: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  confirmedText: { flex: 1, minWidth: 0 },
});
