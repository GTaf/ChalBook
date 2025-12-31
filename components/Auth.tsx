import React, { useState } from 'react';
import { Alert, Dimensions } from 'react-native';
import { supabase } from './Supabase';
import { Button, Input, YStack, XStack } from 'tamagui';

import { useSession } from './AuthCtx';

interface AuthProps {
  onSuccess: () => void;
}

export default function Auth({ onSuccess }: AuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useSession();

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    } else {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
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
    });

    if (error) Alert.alert(error.message);
    if (!session)
      Alert.alert('Please check your inbox for email verification!');
  }

  const { width } = Dimensions.get('window');
  const containerWidth = Math.min(width * 0.9, 400); // 90% of screen width or max 400px

  return (
    <YStack
      backgroundColor="$color.card"
      borderRadius="$radius.3"
      width={containerWidth}
      alignSelf="center"
      marginTop={32}
      padding={16}
    >
      <YStack paddingTop={24}>
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </YStack>
      <YStack>
        <Input
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </YStack>
      <YStack paddingStart={24}>
        <Button
          backgroundColor="$color.primary"
          color="$color.text"
          onPress={() => signInWithEmail()}
        >
          Sign in
        </Button>
      </YStack>
      <YStack>
        <Button
          backgroundColor="$color.primary"
          color="$color.text"
          onPress={() => signUpWithEmail()}
        >
          Sign up
        </Button>
      </YStack>
    </YStack>
  );
}


