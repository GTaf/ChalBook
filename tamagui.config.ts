import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { defaultConfig } from '@tamagui/config/v4'
import { themes as baseThemes } from '@tamagui/themes'

// Simple themes
const themes = {
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
}

// Create the Tamagui config
const config = createTamagui({
  ...defaultConfig,
  themes,
  settings: {
    ...defaultConfig.settings,
    onlyAllowShorthands: false,
  }
})

export type AppConfig = typeof config

// Add some debugging
console.log('Tamagui config created:', config)
console.log('Config themes:', config.themes)
console.log('Config tokens:', config.tokens)

export default config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export { useTheme } from 'tamagui'