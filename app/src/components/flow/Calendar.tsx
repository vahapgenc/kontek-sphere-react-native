// KCalendar — single-month calendar with single-or-range date selection.
// Mirrors Calendar in k-flow.jsx. Self-contained: the month grid is computed in JS
// with Date math (no external date library). Monday-first weekday headers.
// Selected range is highlighted (signature-soft); endpoints are filled (signature).
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];
const DOW = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

export interface KCalendarProps {
  /** Full year, e.g. 2026. */
  year: number;
  /** Month index, 0 = January. */
  month: number;
  rangeStart?: Date;
  rangeEnd?: Date;
  onSelect: (date: Date) => void;
  testID?: string;
}

function sameDay(a?: Date, b?: Date): boolean {
  return (
    !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function KCalendar({
  year,
  month,
  rangeStart,
  rangeEnd,
  onSelect,
  testID,
}: KCalendarProps) {
  const theme = useTheme();
  const c = theme.colors;

  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const startMs = rangeStart ? new Date(year, month, rangeStart.getDate()).getTime() : null;

  const isEndpoint = (day: number): boolean => {
    const d = new Date(year, month, day);
    return sameDay(d, rangeStart) || sameDay(d, rangeEnd);
  };
  const isMid = (day: number): boolean => {
    if (!rangeStart || !rangeEnd) return false;
    const t = new Date(year, month, day).getTime();
    const lo = Math.min(rangeStart.getTime(), rangeEnd.getTime());
    const hi = Math.max(rangeStart.getTime(), rangeEnd.getTime());
    return t > lo && t < hi;
  };

  const leadingBlanks = Array.from({ length: startDow }, (_, i) => i);
  const dayCells = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <View
      testID={testID}
      style={[
        styles.card,
        {
          backgroundColor: c.surface,
          borderRadius: theme.radii.panel,
          ...theme.shadows.sm,
        },
      ]}
    >
      <View style={styles.header}>
        <KText variant="body" weight="700" color={c.ink}>
          {MONTHS[month]} {year}
        </KText>
      </View>

      <View style={styles.grid}>
        {DOW.map((d) => (
          <View key={d} style={styles.cell}>
            <KText variant="micro" weight="600" color={c.ink3} align="center">
              {d}
            </KText>
          </View>
        ))}

        {leadingBlanks.map((i) => (
          <View key={`blank_${i}`} style={styles.cell} />
        ))}

        {dayCells.map((day) => {
          const endpoint = isEndpoint(day);
          const mid = isMid(day);
          const fillBg: ViewStyle = {
            backgroundColor: endpoint
              ? c.signature
              : mid
                ? c.greenSoft
                : 'transparent',
          };
          return (
            <Pressable
              key={day}
              testID={`flow_calendar_day_${day}`}
              accessibilityRole="button"
              accessibilityLabel={`${day} ${MONTHS[month]} ${year}`}
              accessibilityState={{ selected: endpoint }}
              onPress={() => onSelect(new Date(year, month, day))}
              style={[styles.cell, styles.dayCell, mid ? { backgroundColor: c.greenSoft } : null]}
            >
              <View style={[styles.dayInner, fillBg]}>
                <KText
                  variant="bodySm"
                  weight={endpoint ? '700' : '500'}
                  color={endpoint ? c.onDark : c.ink}
                  align="center"
                >
                  {day}
                </KText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const CELL = `${100 / 7}%`;

const styles = StyleSheet.create({
  card: { padding: 16 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  cell: {
    width: CELL as unknown as number,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  dayCell: { height: 38 },
  dayInner: {
    width: 32,
    height: 32,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
