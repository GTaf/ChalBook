import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BookShelf from '../components/Bookshelf';
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../components/Supabase';

import {  useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import Auth from '../components/Auth';

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
    <View style={styles.container}>
      <Text style={styles.text}>ChalBook</Text>
      {session && session.user ? <Text>{session.user.id}</Text> : <Auth/>}
      <BookShelf/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    display: 'flex',
    backgroundColor: 'antiquewhite',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontFamily: 'RobotoMono_700Bold',
    fontSize: 40
  }
});
