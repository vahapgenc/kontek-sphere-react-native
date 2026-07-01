// KStatusTimeline — a vertical status timeline. Mirrors the "Status" section of
// StatusDetail in k-misc.jsx: a column of steps, each with a circular node and a
// connecting line down to the next step.
//
//  - done    → filled green node with a check glyph
//  - current → filled green node with a check glyph (the active, latest done step)
//  - pending → grey node showing the 1-based step number
//
// Each step has a bold label and a muted sub line (e.g. "You", an approver name,
// or a date). The connector line is drawn under every node except the last.
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme';
import { KText } from '../Text';

export type StatusTimelineStepState = 'done' | 'current' | 'pending';

export interface StatusTimelineStep {
  state: StatusTimelineStepState;
  label: string;
  sub?: string;
  /** Number shown inside a pending node. Falls back to the 1-based position. */
  index?: number;
}

export interface KStatusTimelineProps {
  steps: StatusTimelineStep[];
  testID?: string;
}

const NODE_SIZE = 26;

export function KStatusTimeline({ steps, testID }: KStatusTimelineProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <View testID={testID}>
      {steps.map((step, i) => {
        const done = step.state === 'done' || step.state === 'current';
        const isLast = i === steps.length - 1;
        return (
          <View
            key={`${step.label}_${i}`}
            testID={testID ? `${testID}_step_${i}` : undefined}
            accessibilityLabel={`${step.label}${step.sub ? `, ${step.sub}` : ''}`}
            style={[styles.row, { minHeight: isLast ? 0 : 58 }]}
          >
            {/* Node + connector rail */}
            <View style={styles.rail}>
              <View
                style={[
                  styles.node,
                  { backgroundColor: done ? c.green : c.line2 },
                ]}
              >
                {done ? (
                  <Svg width={15} height={15} viewBox="0 0 24 24">
                    <Path
                      d="M5 12.5 L10 17.5 L19 7"
                      stroke={c.onDark}
                      strokeWidth={2.6}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </Svg>
                ) : (
                  <KText variant="caption" weight="700" color={c.ink3}>
                    {step.index ?? i + 1}
                  </KText>
                )}
              </View>
              {!isLast ? <View style={[styles.connector, { backgroundColor: c.ink4 }]} /> : null}
            </View>

            {/* Label + sub */}
            <View style={styles.text}>
              <KText variant="bodySm" weight="700" color={done ? c.ink : c.ink3}>
                {step.label}
              </KText>
              {step.sub ? (
                <KText variant="caption" color={c.ink3} style={styles.sub}>
                  {step.sub}
                </KText>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 14, alignItems: 'flex-start' },
  rail: { alignItems: 'center', alignSelf: 'stretch' },
  node: {
    width: NODE_SIZE,
    height: NODE_SIZE,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  connector: { width: 2, flex: 1 },
  text: { paddingTop: 2, flex: 1, minWidth: 0 },
  sub: { marginTop: 1 },
});
