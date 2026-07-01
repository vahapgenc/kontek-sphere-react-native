// CompleteScreen — native port of CompleteFlow (k-expense.jsx) + the shared flow
// bits (FlowShell, Attachment, InfoNote) from k-flow.jsx. Opened from the Home
// "To do" list; resolves a to-do that is missing a file (an expense missing its
// receipt, or a sick period past day 7 needing a medical certificate).
//
// Layout, top to bottom:
//   1. Compact app bar "Complete" with a back action.
//   2. Identity row: a dark brand icon tile + the to-do title + sub line.
//   3. A KAttachment control ("Attach receipt" for expenses / "Upload medical
//      certificate" for a sick certificate).
//   4. A warn KInfoNote "Why is this needed?" with the to-do's detail text.
//   5. A sticky footer: primary "Submit" (DISABLED until a file is attached) and
//      a danger "Delete registration" button.
//
// Submit / Delete are local no-ops (no persistence): Submit shows the "sent for
// approval" success view; Delete shows the "registration deleted" success view.
import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../theme';
import {
  KAppBar,
  KIconTile,
  KAttachment,
  KInfoNote,
  KButton,
  KSuccess,
  KText,
  KIcon,
  type KAttachmentValue,
} from '../../components';
import { SCENARIOS } from '../../mocks';
import { useSession } from '../../store/session';
import { useLocalize } from '../../i18n/localize';

export interface CompleteScreenProps {
  id: string;
  onBack: () => void;
}

export function CompleteScreen({ id, onBack }: CompleteScreenProps) {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation('detail');
  const tx = useLocalize();

  const scenario = useSession((s) => s.scenario);
  const data = SCENARIOS[scenario] ?? SCENARIOS['Standard'];
  const todo = data.todos.find((x) => x.id === id);

  const [file, setFile] = useState<KAttachmentValue | null>(null);
  const [done, setDone] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // ── Deleted confirmation ──
  if (deleted) {
    return (
      <KSuccess
        testID="complete_deleted"
        title={t('registrationDeletedTitle')}
        status="approved"
        primaryLabel={t('goToHome')}
        onPrimary={onBack}
      />
    );
  }

  // ── Item no longer exists ──
  if (!todo) {
    return (
      <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
        <KAppBar title={t('completeTitle')} onBack={onBack} testID="complete_appBar" />
        <View style={styles.notFound}>
          <KText variant="body" color={c.ink3}>
            {t('notFound')}
          </KText>
        </View>
      </LinearGradient>
    );
  }

  const isExpense = todo.kind === 'expense';

  // ── Submitted confirmation ──
  if (done) {
    return (
      <KSuccess
        testID="complete_done"
        title={isExpense ? t('receiptAttachedTitle') : t('certificateUploadedTitle')}
        status="pending"
        primaryLabel={t('goToHome')}
        onPrimary={onBack}
      />
    );
  }

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      <KAppBar title={t('completeTitle')} onBack={onBack} testID="complete_appBar" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity row */}
        <View style={styles.identity}>
          <KIconTile icon={isExpense ? 'receipt' : 'calendar'} tone="brand" size={60} />
          <View style={styles.identityText}>
            <KText variant="h2" weight="700">
              {tx(todo.title)}
            </KText>
            <KText variant="body" color={c.ink3} style={styles.identitySub}>
              {tx(todo.sub)}
            </KText>
          </View>
        </View>

        {/* Attachment + note */}
        <View style={styles.controls}>
          <KAttachment
            testID="complete_attach"
            label={isExpense ? t('attachReceipt') : t('uploadCertificate')}
            hint={isExpense ? t('attachReceiptHint') : t('uploadCertificateHint')}
            value={file ?? undefined}
            onPick={() =>
              setFile({ name: isExpense ? 'Kvitto.jpg' : 'Medical_certificate.pdf' })
            }
            icon={<KIcon name="camera" size={22} color={c.greenDeep} />}
            fileIcon={<KIcon name="doc" size={22} color={c.ok} />}
          />
          <KInfoNote
            tone="warn"
            title={t('whyNeeded')}
            icon={<KIcon name="warn" size={20} color={c.warn} />}
          >
            {tx(todo.detail)}
          </KInfoNote>
        </View>
      </ScrollView>

      {/* Sticky footer */}
      <View style={[styles.footer, { paddingBottom: theme.space.s06 }]}>
        <KButton
          testID="complete_submit"
          label={t('submit')}
          size="lg"
          block
          disabled={!file}
          onPress={() => setDone(true)}
        />
        <KButton
          testID="complete_delete"
          label={t('deleteRegistration')}
          size="lg"
          variant="danger"
          block
          onPress={() => setDeleted(true)}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  notFound: { padding: 24 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 20 },
  identityText: { flex: 1, minWidth: 0 },
  identitySub: { marginTop: 3 },
  controls: { gap: 14 },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 12,
    gap: 10,
    backgroundColor: 'transparent',
  },
});
