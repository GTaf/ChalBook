import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BookShelf from '../../components/Bookshelf';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../components/Supabase';
import Auth from '../../components/Auth';
import { theme, theme_spacing } from '../../theme';

export default function Home() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Authentified")
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChalBook</Text>
      {session && session.user ? <Text style={styles.userText}>User id is: {session.user.id}</Text> : <Auth/>}
      <BookShelf/>
      <StatusBar style="auto" />
    </View>
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
    fontFamily: 'RobotoMono_700Bold',
    color: theme.colors.primary,
    marginTop: theme_spacing.xl,
  },
  userText: {
    color: theme.colors.text,
    fontWeight: theme.fonts.regular.fontWeight,
  }
});
