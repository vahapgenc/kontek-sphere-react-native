// KSuccess — success / confirmation view. Mirrors Success in k-flow.jsx.
// Centered check-mark medallion (circle + check via react-native-svg) + title +
// body lines, with a sticky primary CTA and optional secondary CTA via KButton.
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KButton } from '../buttons/Button';
import { KIcon, type IconName } from '../../icons/Icon';

/** A success body line — an icon glyph + text; `warn` tone tints the icon amber. */
export interface KSuccessLine {
  icon: IconName;
  text: string;
  tone?: 'warn';
}

export interface KSuccessProps {
  title: string;
  lines?: KSuccessLine[];
  /** "approved" gets the ok medallion; anything else gets the brand medallion. */
  status?: string;
  primaryLabel?: string;
  onPrimary?: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  testID?: string;
}

export function KSuccess({
  title,
  lines = [],
  status = 'pending',
  primaryLabel = 'Done',
  onPrimary,
  secondaryLabel,
  onSecondary,
  testID,
}: KSuccessProps) {
  const theme = useTheme();
  const c = theme.colors;
  const isApproved = status === 'approved';
  const medallionBg = isApproved ? c.okSoft : c.brand100;
  const markColor = isApproved ? c.ok : c.brand600;

  return (
    <LinearGradient
      testID={testID}
      colors={theme.gradients.appBg}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.root}
    >
      <ScrollView
        contentContainerStyle={[
          styles.center,
          { paddingHorizontal: theme.space.s06 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.medallion, { backgroundColor: medallionBg }]}>
          <Svg width={46} height={46} viewBox="0 0 24 24">
            {isApproved ? (
              <Circle cx={12} cy={12} r={10} stroke={markColor} strokeWidth={2.2} fill="none" />
            ) : null}
            <Path
              d="M5 12.5 L10 17.5 L19 7"
              stroke={markColor}
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>

        <KText variant="h1" weight="600" align="center" style={styles.title}>
          {title}
        </KText>

        {lines.length > 0 ? (
          <View style={styles.lines}>
            {lines.map((line, i) => (
              <View key={`${line.text}_${i}`} style={styles.lineRow}>
                <KIcon
                  name={line.icon}
                  size={20}
                  color={line.tone === 'warn' ? c.warnText : c.brand600}
                />
                <KText variant="bodySm" color={c.ink2} style={styles.lineText}>
                  {line.text}
                </KText>
              </View>
            ))}
          </View>
        ) : null}
      </ScrollView>

      <View style={[styles.footer, { paddingHorizontal: theme.layout.screenGutterLg }]}>
        <KButton
          testID="flow_success_primaryButton"
          label={primaryLabel}
          size="lg"
          block
          onPress={onPrimary}
        />
        {secondaryLabel ? (
          <KButton
            testID="flow_success_secondaryButton"
            label={secondaryLabel}
            variant="secondary"
            block
            onPress={onSecondary}
          />
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  center: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 32,
  },
  medallion: {
    width: 84,
    height: 84,
    borderRadius: 999,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  title: { marginBottom: 4 },
  lines: { marginTop: 22, gap: 14, width: '100%' },
  lineRow: { flexDirection: 'row', gap: 11, alignItems: 'flex-start' },
  lineText: { flex: 1, minWidth: 0 },
  footer: {
    paddingTop: 12,
    // Clears the raised register FAB that overlays the tab bar edge in-flow.
    paddingBottom: 34,
    gap: 10,
  },
});
