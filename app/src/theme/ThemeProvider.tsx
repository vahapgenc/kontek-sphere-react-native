// Kontek Sphere — theme context + font loading.
// Wrap the app in <ThemeProvider>; consume tokens via useTheme().
import React, { createContext, useContext, type ReactNode } from 'react';
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';
import { JetBrainsMono_400Regular } from '@expo-google-fonts/jetbrains-mono';
import { theme, type Theme } from './theme';

const ThemeContext = createContext<Theme>(theme);

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

/**
 * Loads the Kontek fonts and provides the theme.
 * Returns `fontsReady=false` while fonts load so the host can hold the splash.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [fontsReady] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
    JetBrainsMono_400Regular,
  });

  if (!fontsReady) {
    return null;
  }

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
