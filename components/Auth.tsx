import React, { useState } from 'react'
import { Alert, StyleSheet, View, Dimensions } from 'react-native'
import { supabase } from './Supabase'
import { Button, Input } from '@rneui/themed'
import MyCaptcha from './MyCaptcha';
import { theme, theme_spacing } from '../theme';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');

  async function signInWithEmail() {    
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
      options: { captchaToken }
    })

    if (error) Alert.alert(error.message)
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
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
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <MyCaptcha setCaptachaToken={setCaptchaToken} />
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
          inputStyle={styles.input}
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
          inputStyle={styles.input}
          labelStyle={styles.label}
          containerStyle={styles.inputContainer}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button 
          title="Sign in" 
          disabled={loading} 
          onPress={() => signInWithEmail()} 
          buttonStyle={styles.button}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button 
          title="Sign up" 
          disabled={loading} 
          onPress={() => signUpWithEmail()} 
          buttonStyle={[styles.button, styles.secondaryButton]}
        />
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