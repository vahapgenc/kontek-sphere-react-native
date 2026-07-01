// AbsenceFlowScreen — multi-step "Register absence" flow.
// Native port of AbsenceFlow (design/SPHERE - Full Prototype/k-absence.jsx).
//
// Dynamic step sequence (mirrors the prototype exactly):
//   ["type", "dates", ...(needsCert ? ["cert"] : []), "confirm"]  → then Success.
// A cert step is inserted only when the chosen type needs a certificate
// (needsCert === "after7") AND the selected range is longer than 7 days.
//
//   type    — KOptionCard grid of ABSENCE_TYPES (radio select)
//   dates   — KCalendar range picker + selected-period row + pay-impact KInfoNote
//   cert    — KAttachment upload (conditional) + "no certificate" opt-out + notes
//   confirm — summary card (KCard) + "when you confirm" KInfoNote
//   success — KSuccess with contextual lines
//
// Frame: KFlowShell (close + back + "step/total" counter + title + kicker + footer).
// Amounts via kr(); mock-data strings (type labels/descriptions) via useLocalize().
import React, { useState, type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KFlowShell,
  KOptionCard,
  KCalendar,
  KAttachment,
  KInfoNote,
  KSuccess,
  KCard,
  KButton,
  KTextLink,
  KText,
  KIcon,
  type IconName,
  type KAttachmentValue,
  type KSuccessLine,
} from '../../components';
import { ABSENCE_TYPES, ME, PERIOD } from '../../mocks';
import { useLocalize } from '../../i18n/localize';
import { kr } from '../../utils/money';

// ---- Flow types --------------------------------------------------------------

interface DateRange {
  start: number | null;
  end: number | null;
}

interface ImpactLine {
  label: string;
  amount: number;
  note?: string;
}
interface Impact {
  amount: number;
  lines: ImpactLine[];
}

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];
const YEAR = 2026;
const MONTH = 5; // June — the prototype's fixed calendar month.

// ---- Pure helpers (ported from k-absence.jsx) --------------------------------

function rangeDays(v: DateRange | null): number {
  if (!v || v.start == null) return 0;
  if (v.end == null) return 1;
  return v.end - v.start + 1;
}

function fmtRange(v: DateRange | null): string {
  if (!v || v.start == null) return '';
  const mo = MONTHS_SHORT[MONTH];
  if (v.end == null || v.end === v.start) return `${v.start} ${mo}`;
  return `${v.start}–${v.end} ${mo}`;
}

function absenceImpact(typeId: string, days: number): Impact {
  switch (typeId) {
    case 'sick': {
      const karens = -890;
      const sjukavdrag = Math.round(-1010 * Math.max(0, days));
      return {
        amount: karens + sjukavdrag,
        lines: [
          { label: 'Waiting day deduction (once)', amount: karens },
          { label: `Sick deduction · ${days} ${days === 1 ? 'day' : 'days'}`, amount: sjukavdrag },
          { label: 'Sick pay (days 2–14)', amount: Math.round(Math.max(0, days - 1) * 760), note: days > 1 ? undefined : '—' },
        ],
      };
    }
    case 'vab': {
      const avd = Math.round(-1090 * days);
      return {
        amount: avd,
        lines: [
          { label: `Pay deduction · ${days} ${days === 1 ? 'day' : 'days'}`, amount: avd },
          { label: 'Compensation via Social Insurance Agency', amount: 0, note: 'Apply via the SIA' },
        ],
      };
    }
    case 'vacation':
      return {
        amount: 0,
        lines: [
          { label: `Holiday days · ${days}`, amount: 0, note: `−${days} day` },
          { label: 'Holiday pay', amount: 0, note: 'Pay unchanged' },
        ],
      };
    case 'parental': {
      const avd = Math.round(-1430 * days);
      return {
        amount: avd,
        lines: [
          { label: `Pay deduction · ${days} ${days === 1 ? 'day' : 'days'}`, amount: avd },
          { label: 'Parental benefit', amount: 0, note: 'Apply via SIA' },
        ],
      };
    }
    default: {
      const NO_IMPACT = ['compensatory', 'working_time_account', 'permission', 'contact_day', 'union'];
      if (NO_IMPACT.indexOf(typeId) >= 0) {
        return { amount: 0, lines: [{ label: 'No pay deduction', amount: 0, note: 'Pay unchanged' }] };
      }
      const avd = Math.round(-1430 * days);
      return { amount: avd, lines: [{ label: `Pay deduction · ${days} ${days === 1 ? 'day' : 'days'}`, amount: avd }] };
    }
  }
}

// ---- Screen ------------------------------------------------------------------

export interface AbsenceFlowScreenProps {
  /** Closes / backs out of the flow (FlowShell close, and back from step 0). */
  onClose: () => void;
  /** Called from the Success screen's primary "Go to home" action. */
  onDone?: () => void;
}

export function AbsenceFlowScreen({ onClose, onDone }: AbsenceFlowScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('absence');
  const tx = useLocalize();

  const [step, setStep] = useState(0);
  const [typeId, setTypeId] = useState<string | null>(null);
  const [range, setRange] = useState<DateRange | null>(null);
  const [attachment, setAttachment] = useState<KAttachmentValue | null>(null);
  const [noAttach, setNoAttach] = useState(false);
  const [done, setDone] = useState(false);

  const type = ABSENCE_TYPES.find((tp) => tp.id === typeId) ?? null;
  const days = rangeDays(range);
  const needsCert = !!type && type.needsCert === 'after7' && days > 7;

  // Dynamic step list — matches the prototype verbatim.
  const steps: string[] = ['type', 'dates', ...(needsCert ? ['cert'] : []), 'confirm'];
  const cur = steps[step];
  const total = steps.length;

  const impact: Impact | null = type ? absenceImpact(type.id, days) : null;

  const daysLabel = (n: number) => t(n === 1 ? 'daysOne' : 'daysOther', { count: n });
  const periodLabel = range && range.start != null ? `${fmtRange(range)} · ${daysLabel(days)}` : '';

  function next() {
    setStep((s) => Math.min(s + 1, total - 1));
  }
  function back() {
    if (step === 0) onClose();
    else setStep((s) => s - 1);
  }
  function submit() {
    setDone(true);
  }
  function reset() {
    setStep(0);
    setTypeId(null);
    setRange(null);
    setAttachment(null);
    setNoAttach(false);
    setDone(false);
  }

  // Range picker — ported from Calendar.pick() range branch.
  function pickDay(date: Date) {
    const d = date.getDate();
    const v = range;
    if (!v || v.start == null || (v.start != null && v.end != null)) {
      setRange({ start: d, end: null });
    } else if (d < v.start) {
      setRange({ start: d, end: v.start });
    } else {
      setRange({ start: v.start, end: d });
    }
  }

  // ---- Success screen --------------------------------------------------------
  if (done && type && impact) {
    const noImpact = impact.amount === 0;
    const lines: KSuccessLine[] = [
      { icon: 'bell', text: t('successNotified', { hrName: ME.hrName }) },
      { icon: 'calendar', text: t('successPeriod', { range: fmtRange(range), days: daysLabel(days) }) },
      {
        icon: 'wallet',
        text: noImpact
          ? type.id === 'vacation'
            ? t('successNoImpactVacation')
            : t('successNoImpact')
          : t('successImpact', { payday: PERIOD.payday, amount: kr(impact.amount) }),
      },
      needsCert && !attachment
        ? { icon: 'warn', tone: 'warn', text: t('successCertReminder') }
        : { icon: 'clock', text: t('successFollowStatus') },
    ];
    return (
      <KSuccess
        testID="absence_success"
        title={t('registeredTitle', { type: tx(type.label) })}
        status="pending"
        lines={lines}
        primaryLabel={t('goToHome')}
        onPrimary={onDone ?? onClose}
        secondaryLabel={t('registerMore')}
        onSecondary={reset}
      />
    );
  }

  // ---- Per-step content ------------------------------------------------------
  let content: ReactNode = null;
  let footer: ReactNode = null;
  let title = '';
  let kicker: string | undefined;

  if (cur === 'type') {
    title = t('stepTypeTitle');
    kicker = t('kickerAbsence');
    content = (
      <View style={styles.gapSm}>
        {ABSENCE_TYPES.map((tp) => (
          <KOptionCard
            key={tp.id}
            testID={`absence_type_card_${tp.id}`}
            icon={<KIcon name={tp.icon as IconName} size={23} color={typeId === tp.id ? c.onDark : c.greenDeep} />}
            title={tx(tp.label)}
            description={tx(tp.desc)}
            selected={typeId === tp.id}
            onPress={() => setTypeId(tp.id)}
            badge={tp.needsCert === 'after7' ? t('badgeMayRequireCert') : undefined}
          />
        ))}
      </View>
    );
    footer = (
      <KButton
        testID="absence_type_continue"
        label={t('continue')}
        size="lg"
        block
        disabled={!typeId}
        onPress={next}
      />
    );
  } else if (cur === 'dates' && type) {
    title = t('stepDatesTitle');
    kicker = tx(type.label);
    const salaryNote = salaryNoteFor(type.id, impact, t);
    const certNote = certNoteFor(type, days, t);
    const warnTone = type.needsCert === 'after7' && days > 7;
    content = (
      <View style={styles.gapLg}>
        <View style={styles.periodRow}>
          <KText variant="bodySm" color={c.ink2}>
            {t('selectedPeriod')}
          </KText>
          <KText variant="bodySm" weight="700" color={c.ink}>
            {range && range.start != null ? periodLabel : t('noneSelected')}
          </KText>
        </View>
        <KCalendar
          testID="absence_calendar"
          year={YEAR}
          month={MONTH}
          rangeStart={range && range.start != null ? new Date(YEAR, MONTH, range.start) : undefined}
          rangeEnd={range && range.end != null ? new Date(YEAR, MONTH, range.end) : undefined}
          onSelect={pickDay}
        />
        <KInfoNote
          testID="absence_dates_note"
          tone={warnTone ? 'warn' : 'info'}
          title={t('howThisAffectsPay')}
          icon={<KIcon name={warnTone ? 'warn' : 'info'} size={20} color={warnTone ? c.warnText : c.infoText} />}
        >
          {certNote ? `${salaryNote} ${certNote}` : salaryNote}
        </KInfoNote>
      </View>
    );
    footer = (
      <KButton
        testID="absence_dates_continue"
        label={t('continue')}
        size="lg"
        block
        disabled={!range || range.start == null}
        onPress={next}
      />
    );
  } else if (cur === 'cert' && type) {
    const isSick = type.id === 'sick';
    title = isSick ? t('stepCertTitleSick') : t('stepCertTitle');
    kicker = t('kickerStepRequired');
    content = (
      <View style={styles.gapMd}>
        <KAttachment
          testID="absence_cert_attachment"
          label={isSick ? t('attachMedicalCertificate') : t('attachCertificate')}
          hint={t('attachHint')}
          value={attachment ?? undefined}
          onPick={(source) => {
            setAttachment({
              name:
                source === 'camera'
                  ? 'Photo_certificate.jpg'
                  : isSick
                    ? 'Medical_certificate.pdf'
                    : 'Certificate.pdf',
            });
            setNoAttach(false);
          }}
          onClear={() => setAttachment(null)}
          fileIcon={<KIcon name="doc" size={22} color={c.ok} />}
          icon={<KIcon name="camera" size={22} color={c.brand700} />}
        />
        <KTextLink
          testID="absence_cert_noCertificate"
          label={t('noCertificateYet')}
          onPress={() => {
            setNoAttach(!noAttach);
            setAttachment(null);
          }}
        />
        <KInfoNote
          tone="warn"
          title={t('certificateRequired')}
          icon={<KIcon name="warn" size={20} color={c.warnText} />}
        >
          {t('certificateRequiredBody')}
        </KInfoNote>
        {noAttach ? (
          <KInfoNote
            tone="danger"
            title={t('whatHappensThen')}
            icon={<KIcon name="info" size={20} color={c.dangerText} />}
          >
            {t('noCertConsequenceBody')}
          </KInfoNote>
        ) : null}
      </View>
    );
    footer = (
      <KButton
        testID="absence_cert_continue"
        label={attachment ? t('continueWithCert') : t('continueWithoutCert')}
        size="lg"
        block
        disabled={!attachment && !noAttach}
        onPress={next}
      />
    );
  } else if (cur === 'confirm' && type && impact) {
    title = t('stepConfirmTitle');
    kicker = t('kickerConfirm');
    const payImpactValue =
      impact.amount === 0
        ? type.id === 'vacation'
          ? t('payImpactNoneHoliday')
          : t('payImpactNone')
        : kr(impact.amount);
    content = (
      <View style={styles.gapMd}>
        <KCard testID="absence_confirm_summary" padding={0}>
          <View style={styles.summaryInner}>
            <SummaryRow label={t('labelType')} value={tx(type.label)} />
            <SummaryRow label={t('labelPeriod')} value={periodLabel} />
            {needsCert ? (
              <SummaryRow
                label={t('labelCertificate')}
                value={attachment ? attachment.name : t('certMissingUploadLater')}
                tone={attachment ? 'ok' : 'warn'}
              />
            ) : null}
            <SummaryRow
              label={t('labelPayImpact')}
              value={payImpactValue}
              tone={impact.amount === 0 ? undefined : 'danger'}
              last
            />
          </View>
        </KCard>
        <KInfoNote
          tone="info"
          title={t('whenYouConfirm')}
          icon={<KIcon name="bell" size={20} color={c.infoText} />}
        >
          {t('whenYouConfirmBody', { hrName: ME.hrName })}
        </KInfoNote>
      </View>
    );
    footer = (
      <View style={styles.footerCol}>
        <KButton
          testID="absence_confirm_submit"
          label={t('confirmAndSend')}
          size="lg"
          block
          onPress={submit}
        />
        <KButton
          testID="absence_confirm_cancel"
          label={t('cancel')}
          variant="secondary"
          block
          onPress={onClose}
        />
      </View>
    );
  }

  return (
    <KFlowShell
      testID="absence_flow"
      onClose={onClose}
      onBack={step > 0 ? back : undefined}
      step={step + 1}
      total={total}
      title={title}
      kicker={kicker}
      footer={footer}
    >
      {content}
    </KFlowShell>
  );
}

// ---- Pay-impact salary/cert notes (ported from k-absence.jsx dates step) ------

function salaryNoteFor(
  typeId: string,
  impact: Impact | null,
  t: (k: string) => string,
): string {
  switch (typeId) {
    case 'sick':
      return t('salaryNoteSick');
    case 'vab':
      return t('salaryNoteVab');
    case 'vacation':
      return t('salaryNoteVacation');
    case 'parental':
      return t('salaryNoteParental');
    default:
      return impact && impact.amount === 0 ? t('salaryNoteNoImpact') : t('salaryNoteDefault');
  }
}

function certNoteFor(
  type: (typeof ABSENCE_TYPES)[number],
  days: number,
  t: (k: string) => string,
): string | null {
  if (type.needsCert !== 'after7') return null;
  if (type.id === 'sick') return days > 7 ? t('certNoteSickLonger') : t('certNoteSickWithin');
  return days > 7 ? t('certNoteVabLonger') : t('certNoteVabWithin');
}

// ---- Confirm summary row (flow-local; mirrors SummaryRow in k-absence.jsx) -----

interface SummaryRowProps {
  label: string;
  value: string;
  tone?: 'ok' | 'warn' | 'danger';
  last?: boolean;
}

function SummaryRow({ label, value, tone, last }: SummaryRowProps) {
  const theme = useTheme();
  const c = theme.colors;
  const valueColor =
    tone === 'ok' ? c.ok : tone === 'warn' ? c.warnText : tone === 'danger' ? c.danger : c.ink;
  return (
    <View
      style={[
        styles.summaryRow,
        last ? null : { borderBottomWidth: 1, borderBottomColor: c.line2 },
      ]}
    >
      <KText variant="bodySm" color={c.ink3}>
        {label}
      </KText>
      <KText variant="bodySm" weight="700" color={valueColor} align="right" style={styles.summaryValue}>
        {value}
      </KText>
    </View>
  );
}

const styles = StyleSheet.create({
  gapSm: { gap: 10 },
  gapMd: { gap: 14 },
  gapLg: { gap: 16 },
  periodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  summaryInner: { paddingHorizontal: 16, paddingVertical: 4 },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: 12,
    paddingVertical: 12,
  },
  summaryValue: { flex: 1, minWidth: 0 },
  footerCol: { gap: 10 },
});
