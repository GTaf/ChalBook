import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BookShelf from '../components/Bookshelf';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../components/Supabase';
import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import Auth from '../components/Auth';
import { ThemeProvider } from '../components/ThemeProvider';
import { theme, theme_spacing } from '../theme';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Authentified")
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.text}>ChalBook</Text>
        {session && session.user ? <Text style={styles.userText}>User id: {session.user.id}</Text> : <Auth/>}
        <BookShelf/>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    // flex: 1,
    fontFamily: 'RobotoMono_700Bold',
    color: theme.colors.primary,
    marginTop: theme_spacing.xl,
  },
  userText: {
    color: theme.colors.text,
    fontWeight: theme.fonts.regular.fontWeight,
  }
});
