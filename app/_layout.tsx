import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import { Stack } from 'expo-router';
import { TamaguiProvider, View } from 'tamagui';
import { PortalProvider } from '@tamagui/portal';
import config from '../tamagui.config';
import { SessionProvider, useSession } from '../components/AuthCtx';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TamaguiProvider config={config} defaultTheme="light">
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
    <View flex={1}>
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
