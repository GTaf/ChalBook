import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import { Stack } from 'expo-router';
import { createTamagui, TamaguiProvider, View } from 'tamagui';
import { PortalProvider } from '@tamagui/portal';
import { defaultConfig } from '@tamagui/config/v4';
import { SessionProvider, useSession } from '../components/AuthCtx';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const config = createTamagui(defaultConfig);

  return (
    <TamaguiProvider config={config}>
      <PortalProvider>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
      </PortalProvider>
    </TamaguiProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  return (
    <View flex={1} backgroundColor="$background">
      <Stack>
        <Stack.Protected guard={!!session}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!session}>
          <Stack.Screen name="login" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </View>
  );
}
