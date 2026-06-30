// AnatomyList — mirrors preview/_card.css `.anatomy` (name · value, wrapped row).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';
import { KText } from '../../components';

export function AnatomyList({ items }: { items: { name: string; value: string }[] }) {
  const theme = useTheme();
  return (
    <View style={styles.row}>
      {items.map((it) => (
        <View key={it.name} style={styles.item}>
          <KText variant="caption" weight="600" color={theme.colors.ink2}>
            {it.name}
          </KText>
          <KText variant="caption" color={theme.colors.ink3}>
            {' · '}
            {it.value}
          </KText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', columnGap: 28, rowGap: 8 },
  item: { flexDirection: 'row' },
});
