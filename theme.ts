import { DefaultTheme } from '@react-navigation/native';
import { Theme } from '@react-navigation/native';

const WEB_FONT_STACK =
  'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'

export const theme = {
  ...DefaultTheme,
  colors: {
    // Paper-like colors
    background: '#F5F5F5', // Light paper background
    primary: '#795548',    // Brown paper-like primary color
    card: '#8D6E63',  // Lighter brown for secondary elements
    text: '#212121',       // Dark text for good contrast
    border: '#E0E0E0',     // Light gray for borders
    notification: '#2196F3',       // Info color
  },
  fonts: {
    regular: {
      fontFamily: WEB_FONT_STACK,
      fontWeight: '700',
    },
    medium: {
        fontFamily: WEB_FONT_STACK,
      fontWeight: '700',
    },
    bold: {
        fontFamily: WEB_FONT_STACK,
      fontWeight: '600',
    },
    heavy: {
      fontFamily: WEB_FONT_STACK,
      fontWeight: "400",
    },
  },
} as Theme;

export const theme_spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
}