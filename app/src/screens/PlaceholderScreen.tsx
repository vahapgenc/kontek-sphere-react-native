// Temporary placeholder for screens not yet built (later groups).
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../theme';
import { KText, KAppBar } from '../components';

export function PlaceholderScreen({ title }: { title: string }) {
  const theme = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: theme.colors.canvas }]}>
      <KAppBar title={title} large />
      <View style={styles.body}>
        <KText variant="bodySm" color={theme.colors.ink4}>
          {title} — byggs härnäst.
        </KText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
});
