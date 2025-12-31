import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes as baseThemes } from '@tamagui/themes'

// Extend the base themes with your custom colors
const themes = {
  ...baseThemes,
  light: {
    ...baseThemes.light,
    // Override with your paper-like colors
    bg: '#F5F5F5',
    color: '#212121',
    primary: '#795548',
    card: '#8D6E63',
    borderColor: '#E0E0E0',
    // Add your custom token colors
    background: '#F5F5F5',
    text: '#212121',
    border: '#E0E0E0',
    notification: '#2196F3',
  },
  dark: {
    ...baseThemes.dark,
    // Dark paper-like aesthetic
    bg: '#2E2E2E',
    color: '#F5F5F5',
    primary: '#A1887F',
    card: '#3E2723',
    borderColor: '#4E342E',
    // Add your custom token colors
    background: '#2E2E2E',
    text: '#F5F5F5',
    border: '#4E342E',
    notification: '#4FC3F7',
  },
}

// Create the Tamagui config
const config = createTamagui({
  fonts: {
    body: createInterFont(),
    heading: createInterFont(),
  },
  themes,
  shorthands,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
  },
  shouldAddPrefersColorTheme: true,
  defaultTheme: 'light',
})

export type AppConfig = typeof config
export default config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export { useTheme } from 'tamagui'