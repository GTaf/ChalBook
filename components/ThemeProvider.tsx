import React from 'react';
import { ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { theme } from '../theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavigationThemeProvider value={theme}>
      {children}
    </NavigationThemeProvider>
  );
} 