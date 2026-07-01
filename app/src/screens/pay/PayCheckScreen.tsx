// PayCheckScreen — native port of PayslipCheck (k-misc.jsx). The "contact payroll"
// flow reached from PayslipDetail's "No – contact payroll".
//
// Two states (mirrors the prototype):
//   1. Form (KFlowShell, title "Contact payroll"): an intro paragraph, the HR
//      contact card (avatar + name/role), a labelled message textarea, and a
//      "Regarding: <month>" badge. Sticky footer "Send to payroll" — disabled
//      until the message is non-empty.
//   2. Success (KSuccess, pending): three confirmation lines, "Go to home"
//      primary + "Back to pay slip" secondary — both return via onBack.
//
// The prototype reads the payslip from params.id; with the fixed { onBack } prop
// signature we default to the most recent slip (PAYSLIPS[0], "May 2026"), matching
// PayslipDetail's own default.
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KFlowShell,
  KSuccess,
  KButton,
  KAvatar,
  KBadge,
  KTextArea,
  KText,
  KIcon,
} from '../../components';
import { PAYSLIPS, ME } from '../../mocks';
import { useLocalize } from '../../i18n/localize';

export interface PayCheckScreenProps {
  onBack: () => void;
}

export function PayCheckScreen({ onBack }: PayCheckScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('paydetail');
  const tx = useLocalize();

  const p = PAYSLIPS[0];
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState('');

  const month = tx(p.month);
  const hrName = tx(ME.hrName);
  const hrRole = tx(ME.hrRole);

  if (sent) {
    return (
      <KSuccess
        testID="pay_check_success"
        title={t('sentToPayroll')}
        status="pending"
        lines={[
          t('sentLineReceived', { name: hrName, role: hrRole, month }),
          t('sentLineReply'),
          t('sentLineCorrected'),
        ]}
        primaryLabel={t('goToHome')}
        onPrimary={onBack}
        secondaryLabel={t('backToPaySlip')}
        onSecondary={onBack}
      />
    );
  }

  const initials = hrName
    .split(' ')
    .map((s) => s[0])
    .join('');

  return (
    <KFlowShell
      testID="pay_check_shell"
      title={t('contactPayroll')}
      onBack={onBack}
      headerIcon={<KIcon name="chevL" size={24} color={c.ink} />}
      footer={
        <KButton
          testID="pay_check_sendButton"
          label={t('sendToPayroll')}
          size="lg"
          block
          disabled={!msg.trim()}
          onPress={() => setSent(true)}
        />
      }
    >
      <KText variant="bodySm" color={c.ink2} style={styles.intro}>
        {t('contactIntro', { name: hrName })}
      </KText>

      {/* HR contact card */}
      <View style={[styles.contact, { backgroundColor: c.surface, borderRadius: theme.radii.card }]}>
        <KAvatar initials={initials} size="md" tone="default" testID="pay_check_hrAvatar" />
        <View style={styles.contactText}>
          <KText variant="bodySm" weight="600">
            {hrName}
          </KText>
          <KText variant="caption" color={c.ink3}>
            {hrRole}
          </KText>
        </View>
      </View>

      <KTextArea
        testID="pay_check_messageInput"
        label={t('whatIsItAbout')}
        value={msg}
        onChangeText={setMsg}
        placeholder={t('messagePlaceholder', { month: month.toLowerCase() })}
      />

      <View style={styles.badgeWrap}>
        <KBadge label={t('regarding', { month })} tone="neutral" />
      </View>
    </KFlowShell>
  );
}

const styles = StyleSheet.create({
  intro: { marginBottom: 18, lineHeight: 22 },
  contact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 13,
    marginBottom: 14,
  },
  contactText: { minWidth: 0 },
  badgeWrap: { marginTop: 12, flexDirection: 'row' },
});
