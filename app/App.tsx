import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/theme';
import { GalleryScreen } from './src/screens/GalleryScreen';

export default function App() {
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.root}>
        <StatusBar style="dark" />
        <GalleryScreen />
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
