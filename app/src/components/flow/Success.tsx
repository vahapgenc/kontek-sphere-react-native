// KSuccess — success / confirmation view. Mirrors Success in k-flow.jsx.
// Centered check-mark medallion (circle + check via react-native-svg) + title +
// body lines, with a sticky primary CTA and optional secondary CTA via KButton.
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KButton } from '../buttons/Button';

export interface KSuccessProps {
  title: string;
  lines?: string[];
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
  const medallionBg = isApproved ? c.okSoft : c.greenSoft;
  const markColor = isApproved ? c.ok : c.signature;

  return (
    <View testID={testID} style={[styles.root, { backgroundColor: c.surface }]}>
      <ScrollView
        contentContainerStyle={[
          styles.center,
          { paddingHorizontal: theme.layout.screenGutterLg },
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
              <View key={`${line}_${i}`} style={styles.lineRow}>
                <View style={[styles.bullet, { backgroundColor: markColor }]} />
                <KText variant="bodySm" color={c.ink2} style={styles.lineText}>
                  {line}
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
    </View>
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
  bullet: { width: 8, height: 8, borderRadius: 999, marginTop: 7 },
  lineText: { flex: 1, minWidth: 0 },
  footer: {
    paddingTop: 12,
    paddingBottom: 24,
    gap: 10,
  },
});
