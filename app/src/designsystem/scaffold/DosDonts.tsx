// DosDonts — mirrors _guidance.css `.kdd` block: "Riktlinjer" eyebrow,
// "Dos & don'ts" title, optional do/don't example pair, and the two checklists.
import React, { type ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText, KIcon } from '../../components';

export interface DosDontsExample {
  stage: ReactNode;
  caption: string;
}

export interface DosDontsProps {
  examples?: { do: DosDontsExample; dont: DosDontsExample };
  doHead?: string;
  dontHead?: string;
  dos: (string | ReactNode)[];
  donts: (string | ReactNode)[];
}

export function DosDonts({
  examples,
  doHead = 'Gör',
  dontHead = 'Undvik',
  dos,
  donts,
}: DosDontsProps) {
  const theme = useTheme();
  const c = theme.colors;

  return (
    <View style={[styles.kdd, { borderTopColor: c.line }]}>
      <KText variant="eyebrow" color={c.ink4} style={styles.eyebrow}>
        Riktlinjer
      </KText>
      <KText variant="h3" weight="600" style={styles.title}>
        Dos & don&apos;ts
      </KText>

      {examples ? (
        <View style={styles.cols}>
          <ExampleCard tone="do" data={examples.do} />
          <ExampleCard tone="dont" data={examples.dont} />
        </View>
      ) : null}

      <View style={styles.cols}>
        <ChecklistCard tone="do" head={doHead} items={dos} />
        <ChecklistCard tone="dont" head={dontHead} items={donts} />
      </View>
    </View>
  );
}

function ExampleCard({ tone, data }: { tone: 'do' | 'dont'; data: DosDontsExample }) {
  const theme = useTheme();
  const c = theme.colors;
  const isDo = tone === 'do';
  return (
    <View
      style={[
        styles.exCard,
        { backgroundColor: isDo ? c.okSoft : c.dangerSoft, borderRadius: theme.radii.card },
      ]}
    >
      <View style={styles.exStage}>{data.stage}</View>
      <View style={styles.exCap}>
        <Badge tone={tone} />
        <KText variant="caption" weight="500" color={isDo ? c.okText : c.dangerText} style={styles.flex1}>
          {data.caption}
        </KText>
      </View>
    </View>
  );
}

function ChecklistCard({
  tone,
  head,
  items,
}: {
  tone: 'do' | 'dont';
  head: string;
  items: (string | ReactNode)[];
}) {
  const theme = useTheme();
  const c = theme.colors;
  const isDo = tone === 'do';
  return (
    <View
      style={[
        styles.listCard,
        { backgroundColor: isDo ? c.okSoft : c.dangerSoft, borderRadius: theme.radii.card },
      ]}
    >
      <View style={styles.listHead}>
        <Badge tone={tone} small />
        <KText variant="caption" weight="700" color={isDo ? c.okText : c.dangerText}>
          {head}
        </KText>
      </View>
      <View style={styles.ul}>
        {items.map((item, i) => (
          <View key={i} style={styles.li}>
            <View
              style={[styles.dot, { backgroundColor: isDo ? c.okAccent : c.danger }]}
            />
            {typeof item === 'string' ? (
              <KText variant="bodySm" color={c.ink2} style={styles.flex1}>
                {item}
              </KText>
            ) : (
              <View style={styles.flex1}>{item}</View>
            )}
          </View>
        ))}
      </View>
    </View>
  );
}

function Badge({ tone, small }: { tone: 'do' | 'dont'; small?: boolean }) {
  const theme = useTheme();
  const c = theme.colors;
  const size = small ? 20 : 22;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: tone === 'do' ? c.ok : c.danger,
      }}
    >
      <KIcon name={tone === 'do' ? 'check' : 'close'} size={small ? 12 : 13} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  kdd: { marginTop: 20, paddingTop: 34, paddingBottom: 6, borderTopWidth: 1 },
  eyebrow: { marginBottom: 6 },
  title: { marginBottom: 18 },
  cols: { flexDirection: 'row', flexWrap: 'wrap', gap: 16, marginBottom: 18 },
  exCard: { flexGrow: 1, flexBasis: 240, padding: 18, gap: 14, minHeight: 92 },
  exStage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
    minHeight: 56,
  },
  exCap: { flexDirection: 'row', alignItems: 'flex-start', gap: 9 },
  listCard: { flexGrow: 1, flexBasis: 240, paddingVertical: 16, paddingHorizontal: 18 },
  listHead: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 13 },
  ul: { gap: 10 },
  li: { flexDirection: 'row', gap: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 8 },
  flex1: { flex: 1 },
});
