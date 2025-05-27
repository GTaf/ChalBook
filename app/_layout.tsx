import { useFonts, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import { Stack } from "expo-router";
import { theme } from "../theme";
import { createTamagui, TamaguiProvider, View } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";

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
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </TamaguiProvider>
  );
}
