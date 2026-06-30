import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './src/theme';
import { RootNavigator } from './src/navigation/RootNavigator';
import { queryClient } from './src/api/queryClient';
import { useSession } from './src/store/session';
import i18n from './src/i18n';

// Keep i18next in sync with the session language.
function LangSync() {
  const lang = useSession((s) => s.lang);
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  return null;
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="dark" />
          <LangSync />
          <RootNavigator />
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
