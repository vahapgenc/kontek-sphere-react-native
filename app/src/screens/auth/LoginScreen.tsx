// LoginScreen — faithful port of k-login.jsx. Two-step (email → password) on the
// app-bg gradient with a white sheet. Mock auth: "sign in" flips authed=true.
import React, { useState } from 'react';
import { View, Image, StyleSheet, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { KText, KTextField, KButton, KIcon } from '../../components';
import { logos } from '../../assets/logos';
import { useSession } from '../../store/session';

export function LoginScreen() {
  const theme = useTheme();
  const c = theme.colors;
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const login = useSession((s) => s.login);

  const [step, setStep] = useState<'email' | 'password'>('email');
  const [email, setEmail] = useState('sara.lindqvist@nordvik.se');
  const [pw, setPw] = useState('kontek2026');
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);

  const emailOk = /\S+@\S+\.\S+/.test(email.trim());
  const pwOk = pw.length > 0;

  const submit = () => {
    if (busy) return;
    setBusy(true);
    setTimeout(() => login(), 450);
  };

  return (
    <LinearGradient colors={theme.gradients.appBg} style={styles.root}>
      {/* Hero */}
      <View style={[styles.hero, { paddingTop: insets.top + 72 }]}>
        <Image source={logos.green} resizeMode="contain" style={styles.logo} />
        <KText variant="micro" weight="700" color={c.greenDeep} style={styles.eyebrow}>
          {t('auth.eyebrow').toUpperCase()}
        </KText>
        <KText variant="h2" weight="700" color={c.signature} style={styles.welcome}>
          {t('auth.welcome')}
        </KText>
        <KText variant="bodySm" color={c.ink2} style={styles.subtitle}>
          {t('auth.subtitle')}
        </KText>
      </View>

      {/* Sheet */}
      <View style={[styles.sheet, { backgroundColor: c.surface, borderTopLeftRadius: theme.radii.sheet, borderTopRightRadius: theme.radii.sheet }]}>
        <ScrollView contentContainerStyle={[styles.sheetBody, { paddingBottom: insets.bottom + 16 }]} keyboardShouldPersistTaps="handled">
          {step === 'email' ? (
            <>
              <KText variant="h2" weight="700">{t('action.signIn')}</KText>
              <KTextField
                label={t('label.email')}
                value={email}
                onChangeText={setEmail}
                placeholder={t('auth.emailPlaceholder')}
                keyboardType="email-address"
                testID="auth_login_emailInput"
              />
              <KButton
                label={t('action.continue')}
                variant="primary"
                block
                disabled={!emailOk}
                onPress={() => emailOk && setStep('password')}
                testID="auth_login_continueButton"
              />
              <Divider label={t('auth.or')} />
              <KButton
                label={t('action.bankId')}
                variant="secondary"
                block
                disabled={busy}
                leading={<KIcon name="phone" size={20} />}
                onPress={submit}
                testID="auth_login_bankIdButton"
              />
              <View style={styles.footer}>
                <KText variant="caption" color={c.ink3} align="center">
                  {t('auth.trouble')}{' '}
                  <KText variant="caption" weight="600" color={c.signature}>{t('auth.contactAdmin')}</KText>
                </KText>
              </View>
            </>
          ) : (
            <>
              <Pressable style={styles.backBtn} onPress={() => { setStep('email'); setBusy(false); }} testID="auth_login_backButton">
                <KIcon name="chevL" size={18} color={c.ink3} />
                <KText variant="bodySm" weight="600" color={c.ink3}>{t('action.back')}</KText>
              </Pressable>

              <KText variant="h2" weight="700">{t('auth.enterPassword')}</KText>

              <View style={[styles.chip, { backgroundColor: c.surface2, borderColor: c.line2, borderRadius: theme.radii.pill }]}>
                <View style={styles.chipIc}>
                  <KIcon name="user" size={15} color="#fff" />
                </View>
                <KText variant="bodySm" weight="600" numberOfLines={1}>{email}</KText>
              </View>

              <View>
                <KTextField
                  label={t('label.password')}
                  value={pw}
                  onChangeText={setPw}
                  placeholder="••••••••"
                  secureTextEntry={!show}
                  testID="auth_login_passwordInput"
                />
                <Pressable style={styles.showBtn} onPress={() => setShow((s) => !s)} testID="auth_login_showButton">
                  <KText variant="caption" weight="600" color={c.ink3}>{show ? t('auth.hide') : t('auth.show')}</KText>
                </Pressable>
              </View>

              <View style={styles.forgotRow}>
                <KButton label={t('auth.forgot')} variant="transparent" size="sm" onPress={() => {}} />
              </View>

              <KButton
                label={busy ? t('auth.signingIn') : t('action.signIn')}
                variant="primary"
                block
                disabled={!pwOk || busy}
                onPress={submit}
                testID="auth_login_signInButton"
              />
            </>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

function Divider({ label }: { label: string }) {
  const theme = useTheme();
  return (
    <View style={styles.divider}>
      <View style={[styles.line, { backgroundColor: theme.colors.line }]} />
      <KText variant="caption" weight="600" color={theme.colors.ink4}>{label}</KText>
      <View style={[styles.line, { backgroundColor: theme.colors.line }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  hero: { paddingHorizontal: 28, paddingBottom: 56 },
  logo: { height: 22, width: 110, marginBottom: 14 },
  eyebrow: { letterSpacing: 2, marginBottom: 5 },
  welcome: { fontSize: 25, lineHeight: 28 },
  subtitle: { marginTop: 6, maxWidth: 320 },
  sheet: {
    flex: 1,
    shadowColor: '#203B3C',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.16,
    shadowRadius: 30,
    elevation: 12,
  },
  sheetBody: { padding: 24, paddingTop: 20, gap: 14 },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  line: { flex: 1, height: 1 },
  footer: { marginTop: 2 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, alignSelf: 'flex-start', maxWidth: '100%' },
  chipIc: { width: 26, height: 26, borderRadius: 13, backgroundColor: '#053F22', alignItems: 'center', justifyContent: 'center' },
  showBtn: { position: 'absolute', right: 8, top: 30, height: 36, paddingHorizontal: 12, justifyContent: 'center' },
  forgotRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: -8 },
});
