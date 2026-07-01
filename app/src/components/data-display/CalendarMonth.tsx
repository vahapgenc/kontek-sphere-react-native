// KCalendarMonth — full month grid with a per-day event dot, prev/next month
// navigation, and a "Today" pill. Mirrors CalendarScreen's calendar card in
// k-misc.jsx (NOT the flow range picker). Presentational: the parent owns the
// cursor + selection and passes an ISO→tone map for the dots.
import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../Text';
import { KIcon } from '../../icons/Icon';

/** Event-dot tones (CAL_DOT in the prototype). */
export type CalDotTone = 'ok' | 'warn' | 'info' | 'brand' | 'neutral' | 'danger';

export interface KCalendarMonthProps {
  year: number;
  /** 0-based month index. */
  month: number;
  /** Selected day ISO (YYYY-MM-DD) or null. */
  selectedISO: string | null;
  /** Today ISO (YYYY-MM-DD). */
  todayISO: string;
  /** ISO → dot tone for days that have events. */
  dotToneByDate: Record<string, CalDotTone>;
  /** BCP-47 locale for the month label (e.g. 'sv-SE', 'en-GB'). */
  locale: string;
  todayLabel: string;
  prevLabel?: string;
  nextLabel?: string;
  onSelectDay: (iso: string) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  testID?: string;
}

const WEEKDAY_REF = [
  // A Mon–Sun reference week (2024-01-01 is a Monday) for localized short names.
  new Date(2024, 0, 1), new Date(2024, 0, 2), new Date(2024, 0, 3), new Date(2024, 0, 4),
  new Date(2024, 0, 5), new Date(2024, 0, 6), new Date(2024, 0, 7),
];

const pad = (n: number) => String(n).padStart(2, '0');
const isoOf = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

export function KCalendarMonth({
  year,
  month,
  selectedISO,
  todayISO,
  dotToneByDate,
  locale,
  todayLabel,
  prevLabel = 'Previous month',
  nextLabel = 'Next month',
  onSelectDay,
  onPrevMonth,
  onNextMonth,
  onToday,
  testID,
}: KCalendarMonthProps) {
  const theme = useTheme();
  const c = theme.colors;

  const dotColor: Record<CalDotTone, string> = {
    ok: c.ok,
    warn: c.warn,
    info: c.info,
    brand: c.signature,
    neutral: c.ink3,
    danger: c.danger,
  };

  const first = new Date(year, month, 1);
  const startCol = (first.getDay() + 6) % 7; // Mon = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = first.toLocaleString(locale, { month: 'long', year: 'numeric' });
  const weekdays = WEEKDAY_REF.map((d) => d.toLocaleDateString(locale, { weekday: 'short' }));

  const cells: (number | null)[] = [];
  for (let i = 0; i < startCol; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) cells.push(d);

  return (
    <View
      testID={testID}
      style={[styles.card, { backgroundColor: c.surface, borderRadius: theme.radii.panel, ...theme.shadows.sm }]}
    >
      {/* Month header */}
      <View style={styles.header}>
        <Pressable
          testID={testID ? `${testID}-prev` : undefined}
          accessibilityRole="button"
          accessibilityLabel={prevLabel}
          onPress={onPrevMonth}
          style={({ pressed }) => [styles.navBtn, pressed ? styles.pressed : null]}
        >
          <KIcon name="chevL" size={20} color={c.ink2} />
        </Pressable>
        <KText variant="title" weight="700" color={c.ink} style={styles.monthLabel}>
          {monthLabel}
        </KText>
        <Pressable
          testID={testID ? `${testID}-next` : undefined}
          accessibilityRole="button"
          accessibilityLabel={nextLabel}
          onPress={onNextMonth}
          style={({ pressed }) => [styles.navBtn, pressed ? styles.pressed : null]}
        >
          <KIcon name="chevR" size={20} color={c.ink2} />
        </Pressable>
      </View>

      {/* Weekday headers */}
      <View style={styles.weekRow}>
        {weekdays.map((w, i) => (
          <View key={i} style={styles.weekCell}>
            <KText variant="caption" weight="700" color={c.ink4} align="center">
              {w}
            </KText>
          </View>
        ))}
      </View>

      {/* Day grid */}
      <View style={styles.grid}>
        {cells.map((d, i) => {
          if (d === null) return <View key={`b${i}`} style={styles.dayCell} />;
          const iso = isoOf(year, month, d);
          const tone = dotToneByDate[iso];
          const isSel = selectedISO === iso;
          const isToday = iso === todayISO;
          return (
            <View key={iso} style={styles.dayCell}>
              <Pressable
                testID={`calendar_day_${iso}`}
                accessibilityRole="button"
                accessibilityState={{ selected: isSel }}
                onPress={() => onSelectDay(iso)}
                style={[
                  styles.dayBtn,
                  {
                    borderColor: isToday && !isSel ? c.signature : 'transparent',
                    backgroundColor: isSel ? c.signature : 'transparent',
                  },
                ]}
              >
                <KText
                  variant="body"
                  weight={isSel || isToday ? '700' : '500'}
                  color={isSel ? c.onDark : isToday ? c.signature : c.ink}
                  align="center"
                >
                  {d}
                </KText>
                {tone ? (
                  <View
                    style={[
                      styles.dot,
                      { backgroundColor: isSel ? 'rgba(255,255,255,0.85)' : dotColor[tone] },
                    ]}
                  />
                ) : null}
              </Pressable>
            </View>
          );
        })}
      </View>

      {/* Today pill */}
      <View style={styles.todayRow}>
        <Pressable
          testID={testID ? `${testID}-today` : undefined}
          accessibilityRole="button"
          onPress={onToday}
          style={({ pressed }) => [
            styles.todayBtn,
            // --surface-1 is undefined in the design tokens → falls back to the
            // white card behind; the pill reads as an outline (1px line + signature).
            { borderColor: c.line, backgroundColor: c.surface, borderRadius: theme.radii.pill },
            pressed ? styles.pressed : null,
          ]}
        >
          <KText variant="bodySm" weight="700" color={c.signature}>
            {todayLabel}
          </KText>
        </Pressable>
      </View>
    </View>
  );
}

const CELL = `${100 / 7}%`;

const styles = StyleSheet.create({
  card: { paddingHorizontal: 14, paddingTop: 14, paddingBottom: 16 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navBtn: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  monthLabel: { textAlign: 'center' },
  pressed: { opacity: 0.6 },
  weekRow: { flexDirection: 'row', marginBottom: 4 },
  weekCell: { width: CELL as unknown as number, alignItems: 'center', paddingVertical: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: CELL as unknown as number, padding: 1 },
  dayBtn: {
    minHeight: 46,
    borderWidth: 1.5,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    position: 'absolute',
    bottom: 6,
    width: 5,
    height: 5,
    borderRadius: 999,
  },
  todayRow: { alignItems: 'center', marginTop: 12 },
  todayBtn: {
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
