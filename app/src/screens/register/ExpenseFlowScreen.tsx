// ExpenseFlowScreen — native port of the ExpenseFlow in k-expense.jsx.
// Multi-step "Registrera utlägg" flow inside a KFlowShell frame
// (close + back + step counter + title). Reuses the K* flow library:
// KAttachment, KInfoNote, KBottomSheet, KCard, KSummaryRow, KButton, KSuccess.
//
// Step order (mirrors the prototype `steps = ["details", "confirm"]`):
//   Step 1 · details
//     - KAttachment "Upload receipt" (optional). Attaching a receipt auto-fills
//       amount/category/description and shows a green "we filled it in" line.
//       With no receipt, an underlined "I don't have a receipt right now" link
//       toggles the no-receipt branch.
//     - Category picker (opens a KBottomSheet listing EXP_CATS).
//     - Amount input at display size with a trailing "kr".
//     - Description KTextField (optional).
//     - Notes: danger note in the no-receipt branch ("No receipt – no payment");
//       info note ("How this affects your pay") when a receipt is attached.
//   Step 2 · confirm
//     - KCard summary (Category / Amount / Description / Receipt) + info note.
//   Then → KSuccess (registered when a receipt is attached, saved otherwise).
//
// No persistence — submit just shows the success view. i18n via the 'expense'
// namespace; EXP_CATS labels are localized at runtime with useLocalize().
import React, { useState } from 'react';
import { View, TextInput, Pressable, StyleSheet, type TextStyle } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KFlowShell,
  KAttachment,
  KInfoNote,
  KBottomSheet,
  KCard,
  KSummaryRow,
  KButton,
  KTextLink,
  KSuccess,
  KText,
  KIcon,
  type KAttachmentValue,
  type KSuccessLine,
} from '../../components';
import { EXP_CATS, ME, PERIOD } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';

export interface ExpenseFlowScreenProps {
  onClose: () => void;
  onDone?: () => void;
}

const STEPS = ['details', 'confirm'] as const;

export function ExpenseFlowScreen({ onClose, onDone }: ExpenseFlowScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('expense');
  const tx = useLocalize();

  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [receipt, setReceipt] = useState<KAttachmentValue | null>(null);
  const [noReceipt, setNoReceipt] = useState(false);
  const [done, setDone] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const cat = EXP_CATS.find((x) => x.id === category);
  const cur = STEPS[step];
  const total = STEPS.length;
  const amt = parseInt(amount || '0', 10);

  function next() {
    setStep((s) => Math.min(s + 1, total - 1));
  }
  function back() {
    if (step === 0) onClose();
    else setStep((s) => s - 1);
  }

  // Attaching a receipt auto-fills the rest of the form (prototype behaviour).
  function onReceiptChange(v: KAttachmentValue | null) {
    setReceipt(v);
    if (v) {
      setNoReceipt(false);
      if (!amount) setAmount('540');
      if (!category) setCategory('other');
      if (!desc) setDesc('Materials at client visit');
    } else {
      setAmount('');
      setDesc('');
    }
  }

  function reset() {
    setStep(0);
    setAmount('');
    setCategory('');
    setDesc('');
    setReceipt(null);
    setNoReceipt(false);
    setDone(false);
  }

  // ── Success ──
  if (done) {
    const hrName = tx(ME.hrName);
    return (
      <KSuccess
        testID="expense_success"
        title={receipt ? t('successRegisteredTitle') : t('successSavedTitle')}
        status="pending"
        lines={
          (receipt
            ? [
                { icon: 'bell', text: t('successNotificationSent', { hrName }) },
                {
                  icon: 'wallet',
                  text: t('successWillBePaid', {
                    payday: tx(PERIOD.payday),
                    amount: kr(amt, { sign: true }),
                  }),
                },
                { icon: 'clock', text: t('successFollowStatus') },
              ]
            : [
                { icon: 'info', tone: 'warn', text: t('successSavedNotPaid') },
                { icon: 'warn', tone: 'warn', text: t('successNoReceiptNoPay') },
                { icon: 'clock', text: t('successFindUnderTodo') },
              ]) as KSuccessLine[]
        }
        primaryLabel={t('goToHome')}
        onPrimary={onDone ?? onClose}
        secondaryLabel={t('registerMore')}
        onSecondary={reset}
      />
    );
  }

  // ── Step 1 · details ──
  if (cur === 'details') {
    const canContinue = !!amt && !!category && (!!receipt || noReceipt);
    return (
      <KFlowShell
        testID="expense_flow"
        onClose={onClose}
        onBack={step > 0 ? back : undefined}
        step={step + 1}
        total={total}
        title={t('detailsTitle')}
        kicker={t('kickerExpense')}
        footer={
          <KButton
            testID="expense_continue"
            label={receipt ? t('continue') : t('continueNoReceipt')}
            size="lg"
            block
            disabled={!canContinue}
            onPress={next}
          />
        }
      >
        <View style={styles.form}>
          {/* Receipt */}
          <View>
            <KAttachment
              testID="expense_attach"
              label={t('uploadReceipt')}
              hint={t('uploadReceiptHint')}
              value={receipt ?? undefined}
              onPick={(source) =>
                onReceiptChange({
                  name: `${source === 'camera' ? 'Photo' : 'Kvitto'}_${Date.now().toString().slice(-4)}.jpg`,
                })
              }
              onClear={() => onReceiptChange(null)}
              icon={<KIcon name="camera" size={22} color={c.brand700} />}
              fileIcon={<KIcon name="doc" size={22} color={c.ok} />}
            />
            {receipt ? (
              <View style={styles.autoFillRow}>
                <KIcon name="check" size={14} color={c.ok} strokeWidth={2.5} />
                <KText variant="caption" weight="600" color={c.ok} style={styles.autoFillText}>
                  {t('autoFilled')}
                </KText>
              </View>
            ) : (
              <KTextLink
                testID="expense_noReceiptToggle"
                label={t('noReceiptToggle')}
                size="caption"
                onPress={() => setNoReceipt((v) => !v)}
                style={styles.noReceiptToggle}
              />
            )}
          </View>

          {/* Category */}
          <View>
            <KText variant="caption" weight="700" color={c.ink2}>
              {t('categoryLabel')}
            </KText>
            <Pressable
              testID="expense_categoryTrigger"
              accessibilityRole="button"
              onPress={() => setCatOpen(true)}
              style={[
                styles.selectTrigger,
                { borderColor: c.line, borderRadius: theme.radii.input, backgroundColor: c.surface },
              ]}
            >
              <KText
                variant="bodySm"
                color={cat ? c.ink : c.ink3}
                numberOfLines={1}
                style={styles.selectValue}
              >
                {cat ? tx(cat.label) : t('categoryPlaceholder')}
              </KText>
              <KIcon name="chevD" size={18} color={c.ink3} />
            </Pressable>
          </View>

          {/* Amount */}
          <View>
            <KText variant="caption" weight="700" color={c.ink2}>
              {t('amountLabel')}
            </KText>
            <View
              style={[
                styles.amountShell,
                { borderColor: c.line, borderRadius: theme.radii.input, backgroundColor: c.surface },
              ]}
            >
              <TextInput
                testID="expense_amountInput"
                inputMode="numeric"
                keyboardType="number-pad"
                value={amount}
                onChangeText={(v) => setAmount(v.replace(/[^0-9]/g, ''))}
                placeholder="0"
                placeholderTextColor={c.ink4}
                style={[theme.text.display as TextStyle, styles.amountInput, { color: c.ink }]}
              />
              <KText variant="h2" weight="700" color={c.ink3}>
                {t('currency')}
              </KText>
            </View>
          </View>

          {/* Description */}
          <View>
            <KText variant="caption" weight="700" color={c.ink2}>
              {t('descriptionLabel')}{' '}
              <KText variant="caption" weight="500" color={c.ink3}>
                {`· ${t('descriptionOptional')}`}
              </KText>
            </KText>
            <TextInput
              testID="expense_descriptionInput"
              value={desc}
              onChangeText={setDesc}
              placeholder={t('descriptionPlaceholder')}
              placeholderTextColor={c.ink4}
              style={[
                theme.text.bodySm as TextStyle,
                styles.descInput,
                { borderColor: c.line, borderRadius: theme.radii.input, backgroundColor: c.surface, color: c.ink },
              ]}
            />
          </View>

          {/* Notes */}
          {!receipt && noReceipt ? (
            <KInfoNote
              testID="expense_noReceiptNote"
              tone="danger"
              title={t('noReceiptNoteTitle')}
              icon={<KIcon name="warn" size={20} color={c.danger} />}
            >
              {t('noReceiptNoteBody')}
            </KInfoNote>
          ) : null}
          {receipt ? (
            <KInfoNote
              testID="expense_payImpactNote"
              tone="info"
              title={t('payImpactNoteTitle')}
              icon={<KIcon name="info" size={20} color={c.infoText} />}
            >
              {t('payImpactNoteBody')}
            </KInfoNote>
          ) : null}
        </View>

        {/* Category sheet */}
        <KBottomSheet
          testID="expense_categorySheet"
          visible={catOpen}
          onClose={() => setCatOpen(false)}
          title={t('categorySheetTitle')}
          subtitle={t('categorySheetSub')}
        >
          <View style={styles.catList}>
            {EXP_CATS.map((x) => {
              const selected = category === x.id;
              return (
                <Pressable
                  key={x.id}
                  testID={`expense_categoryOption_${x.id}`}
                  accessibilityRole="button"
                  onPress={() => {
                    setCategory(x.id);
                    setCatOpen(false);
                  }}
                  style={[
                    styles.catOption,
                    {
                      borderRadius: theme.radii.panel,
                      backgroundColor: selected ? c.greenSoft : c.surface,
                      borderColor: selected ? c.signature : c.line2,
                      borderWidth: selected ? 1.5 : 1,
                    },
                  ]}
                >
                  <KText variant="title" weight="700" color={c.ink} numberOfLines={1} style={styles.catLabel}>
                    {tx(x.label)}
                  </KText>
                  {selected ? <KIcon name="check" size={22} color={c.signature} strokeWidth={2.2} /> : null}
                </Pressable>
              );
            })}
          </View>
        </KBottomSheet>
      </KFlowShell>
    );
  }

  // ── Step 2 · confirm ──
  const hrName = tx(ME.hrName);
  return (
    <KFlowShell
      testID="expense_flow"
      onClose={onClose}
      onBack={back}
      step={step + 1}
      total={total}
      title={t('confirmTitle')}
      kicker={t('kickerConfirm')}
      footer={
        <View style={styles.confirmFooter}>
          <KButton
            testID="expense_submit"
            label={receipt ? t('confirmSend') : t('saveExpense')}
            size="lg"
            block
            onPress={() => setDone(true)}
          />
          <KButton
            testID="expense_cancel"
            label={t('cancel')}
            variant="secondary"
            block
            onPress={onClose}
          />
        </View>
      }
    >
      <View style={styles.confirmBody}>
        <KCard padding={0}>
          <View style={styles.summaryPad}>
            {cat ? <KSummaryRow label={t('summaryCategory')} value={tx(cat.label)} /> : null}
            <KSummaryRow label={t('summaryAmount')} value={kr(amt)} />
            {desc ? <KSummaryRow label={t('summaryDescription')} value={desc} /> : null}
            <KSummaryRow
              label={t('summaryReceipt')}
              value={receipt ? receipt.name : t('summaryReceiptMissing')}
              tone={receipt ? 'ok' : 'warn'}
              last
            />
          </View>
        </KCard>
        <KInfoNote
          testID="expense_confirmNote"
          tone="info"
          title={t('confirmNoteTitle')}
          icon={<KIcon name="bell" size={20} color={c.infoText} />}
        >
          {receipt ? t('confirmNoteWithReceipt', { hrName }) : t('confirmNoteNoReceipt')}
        </KInfoNote>
      </View>
    </KFlowShell>
  );
}

const styles = StyleSheet.create({
  form: { gap: 20 },
  autoFillRow: { flexDirection: 'row', alignItems: 'center', gap: 7, marginTop: 8 },
  autoFillText: { flex: 1, minWidth: 0 },
  noReceiptToggle: { marginTop: 6 },
  selectTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 8,
    borderWidth: 1.5,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  selectValue: { flex: 1, minWidth: 0 },
  amountShell: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1.5,
    paddingHorizontal: 16,
  },
  amountInput: { flex: 1, paddingVertical: 14, letterSpacing: -0.7 },
  descInput: {
    width: '100%',
    marginTop: 8,
    borderWidth: 1.5,
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  catList: { paddingVertical: 4, gap: 8 },
  catOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
  catLabel: { flex: 1, minWidth: 0 },
  confirmBody: { gap: 14 },
  summaryPad: { paddingHorizontal: 16, paddingVertical: 4 },
  confirmFooter: { gap: 10 },
});
