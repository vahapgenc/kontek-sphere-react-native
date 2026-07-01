// KCalendar — single-month calendar with single-or-range date selection.
// Mirrors Calendar in k-flow.jsx. Self-contained: the month grid is computed in JS
// with Date math (no external date library). Monday-first weekday headers.
// Selected range is highlighted (signature-soft); endpoints are filled (signature).
import React from 'react';
import { View, Pressable, StyleSheet, type ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

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
  /** Day-of-month highlighted as "today" (ringed + bold). Prototype uses 8. */
  today?: number;
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
  today = 8,
  testID,
}: KCalendarProps) {
  const theme = useTheme();
  const c = theme.colors;

  const first = new Date(year, month, 1);
  const startDow = (first.getDay() + 6) % 7; // Monday = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();

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
        <View style={styles.navArrows}>
          <KIcon name="chevL" size={18} color={c.ink3} />
          <KIcon name="chevR" size={18} color={c.ink3} />
        </View>
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
          const isToday = day === today;
          // Endpoint = filled signature circle; today (when not selected/in-range)
          // = brand-500 ring. Mid days form a continuous brand-100 band (square).
          const innerStyle: ViewStyle = {
            backgroundColor: endpoint ? c.signature : 'transparent',
            borderWidth: isToday && !endpoint && !mid ? 1.5 : 0,
            borderColor: c.brand500,
          };
          return (
            <Pressable
              key={day}
              testID={`flow_calendar_day_${day}`}
              accessibilityRole="button"
              accessibilityLabel={`${day} ${MONTHS[month]} ${year}`}
              accessibilityState={{ selected: endpoint }}
              onPress={() => onSelect(new Date(year, month, day))}
              style={[styles.dayCell, mid ? { backgroundColor: c.brand100 } : null]}
            >
              <View style={[styles.dayInner, innerStyle]}>
                <KText
                  variant="bodySm"
                  weight={endpoint || isToday ? '700' : '500'}
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
  navArrows: { flexDirection: 'row', gap: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  // DOW headers + leading blanks.
  cell: {
    width: CELL as unknown as number,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 2,
  },
  // Day button — full cell, no vertical padding so the mid-range band is a
  // continuous block (mirrors the prototype's height:38, padding:0 button).
  dayCell: {
    width: CELL as unknown as number,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Inner pill — inset 3 on every side so it fills the cell (wider than tall =
  // stadium shape), matching the prototype's <span inset:3 borderRadius:99>.
  dayInner: {
    position: 'absolute',
    top: 3,
    left: 3,
    right: 3,
    bottom: 3,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
