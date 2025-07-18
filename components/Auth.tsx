import React, { useState } from 'react'
import { Alert, StyleSheet, View, Dimensions } from 'react-native'
import { supabase } from './Supabase'
import { Button, Input } from 'tamagui'
// import MyCaptcha from './MyCaptcha';
import { theme, theme_spacing } from '../theme';
import { router } from 'expo-router';

import { useSession } from './AuthCtx';

interface AuthProps {
  onSuccess: () => void;
}

export default function Auth({onSuccess} : AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const { login } = useSession();

  

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
      options: { captchaToken }
    })

    if (error) {Alert.alert(error.message)} else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if(session) {
          login(session);
          onSuccess();
        }
      });
    }
  }

  async function signUpWithEmail() {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: { captchaToken }
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button 
          onPress={() => signInWithEmail()} 
        >Sign in</Button>
      </View>
      <View style={styles.verticallySpaced}>
        <Button 
          onPress={() => signUpWithEmail()}
        >Sign up</Button>
      </View>
    </View>
  )
}

const { width } = Dimensions.get('window');
const containerWidth = Math.min(width * 0.9, 400); // 90% of screen width or max 400px

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 8,
    width: containerWidth,
    alignSelf: 'center',
    marginTop: theme_spacing.xl,
    padding: theme_spacing.md,
  },
  verticallySpaced: {
    alignSelf: 'stretch',
    paddingTop: theme_spacing.xs,
    paddingBottom: theme_spacing.xs,
  },
  mt20: {
    marginTop: theme_spacing.lg,
  },
  input: {
    color: theme.colors.text,
  },
  label: {
    color: theme.colors.text,
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    width: '100%',
    padding: theme_spacing.md,
  },
  secondaryButton: {
    backgroundColor: theme.colors.primary,
  },
})