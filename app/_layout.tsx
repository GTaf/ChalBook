import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { theme } from '../theme';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.card,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontFamily: 'RobotoMono_700Bold',
          },
        }}
      />
    </View>
  );
} 