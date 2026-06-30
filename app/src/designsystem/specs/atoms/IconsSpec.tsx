// Ikoner — mirrors preview/icons.html.
// Grid of every KIcon name with a live search filter (mirrors the preview's interactive search).
import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { SpecCard, SpecSection, DosDonts } from '../../scaffold';
import { KText, KIcon, type IconName } from '../../../components';
import { useTheme } from '../../../theme';

// The system's curated stroke set — the IconName union exported from the component library.
const ICON_NAMES: IconName[] = [
  'home', 'payslip', 'plus', 'minus', 'calendar', 'receipt', 'user', 'bell',
  'chevR', 'chevL', 'chevD', 'close', 'check', 'checkCirc', 'info', 'warn',
  'clock', 'upload', 'camera', 'doc', 'arrowDown', 'sun', 'heart', 'child',
  'plane', 'wallet', 'phone', 'help', 'edit', 'trash', 'arrowR', 'external',
  'building', 'logOut', 'approvals', 'swap', 'globe',
];

export function IconsSpec() {
  const theme = useTheme();
  const c = theme.colors;
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const v = query.trim().toLowerCase();
    return v ? ICON_NAMES.filter((n) => n.toLowerCase().includes(v)) : ICON_NAMES;
  }, [query]);

  const intro = (
    <KText variant="bodySm" color={c.ink2} style={styles.introText}>
      Systemet använder{' '}
      <KText variant="bodySm" weight="700" color={c.ink2}>Lucide</KText>-linjeikoner —
      24×24px, 1,75px streck, rundade hörn. På ljusa ytor tar ikonerna varumärkesgrönt
      via currentColor, så de färgas med texten.
    </KText>
  );

  return (
    <SpecCard title="Ikoner" intro={intro}>
      <SpecSection
        title="Curated set"
        description="Varje ikon i systemets streckset, renderad i Brand Signature #203B3C. Filtrera på namn för att hitta en specifik ikon."
        bare
      >
        <View style={[styles.search, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.button }]}>
          <KIcon name="help" size={17} color={c.ink3} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Filter by name…"
            placeholderTextColor={c.ink4}
            autoCorrect={false}
            autoCapitalize="none"
            style={[styles.searchInput, { color: c.ink }]}
          />
        </View>
        <KText variant="caption" color={c.ink3} style={styles.count}>
          <KText variant="caption" weight="600" color={c.ink2}>
            {query ? filtered.length : ICON_NAMES.length}
          </KText>
          {query ? ` of ${ICON_NAMES.length}` : ' icons'}
        </KText>

        {filtered.length === 0 ? (
          <KText variant="bodySm" color={c.ink3} style={styles.empty}>
            No matches.
          </KText>
        ) : (
          <View style={styles.grid}>
            {filtered.map((name) => (
              <View
                key={name}
                style={[styles.cell, { backgroundColor: c.surface, borderColor: c.line, borderRadius: theme.radii.card }]}
              >
                <View style={[styles.tile, { backgroundColor: c.surface2, borderRadius: theme.radii.sm }]}>
                  <KIcon name={name} size={24} color={c.signature} strokeWidth={1.75} />
                </View>
                <KText variant="micro" color={c.ink2} align="center">
                  {name}
                </KText>
              </View>
            ))}
          </View>
        )}
      </SpecSection>

      <DosDonts
        dos={[
          'Use the curated stroke set — 24px geometry, ~1.7px stroke, rounded caps.',
          'Recolour via currentColor; brand green on light surfaces.',
          'Keep one icon per concept across the app.',
        ]}
        donts={[
          'Use emoji, icon fonts or multi-colour icons.',
          'Rescale stroke weight per icon.',
          'Mix filled and outline styles in one set.',
        ]}
      />
    </SpecCard>
  );
}

const styles = StyleSheet.create({
  introText: { lineHeight: 24 },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    borderWidth: 1,
    paddingVertical: 9,
    paddingHorizontal: 13,
    marginBottom: 10,
  },
  searchInput: { flex: 1, fontSize: 15, padding: 0 },
  count: { marginBottom: 16 },
  empty: { paddingVertical: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  cell: {
    width: 96,
    flexGrow: 1,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    paddingTop: 18,
    paddingBottom: 12,
    paddingHorizontal: 10,
  },
  tile: {
    width: '100%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
