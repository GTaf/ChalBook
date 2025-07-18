import { useFonts, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import { Stack } from "expo-router";
import { theme } from "../theme";
import { createTamagui, TamaguiProvider, View } from "tamagui";
import { defaultConfig } from "@tamagui/config/v4";
import { createContext, useEffect, useState } from "react";
import { supabase } from "../components/Supabase";
import { Session } from "@supabase/supabase-js";
import { SessionProvider, useSession } from "../components/AuthCtx";

export default function Layout() {
  const [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  global.Buffer = require('buffer').Buffer;

  const config = createTamagui(defaultConfig);

  return (
    <TamaguiProvider config={config}>
      <SessionProvider>
        <RootNavigator />
      </SessionProvider>
    </TamaguiProvider>
  );
}

function RootNavigator() {
  const { session } = useSession();
  return <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <Stack>
          <Stack.Protected guard={!!session}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack.Protected>
          <Stack.Protected guard={!session}>
            <Stack.Screen name="login" options={{ headerShown: false }} />
          </Stack.Protected>
        </Stack>
      </View>;
}
