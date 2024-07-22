import { supabase } from '../components/Supabase';
import { Button, Text } from '@rneui/base';
import { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';

import MyCaptcha from './MyCaptcha';

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('')
    const [captchaToken, setCaptchaToken] = useState('');

    async function signIn() {
        setLoading(true);
        console.log("FAIL");
        const { data, error } = await supabase.auth.signInAnonymously({options: { captchaToken }});
        setLoading(false);
        console.log(data, error);
    }

    return (
        <View style={styles.container}>
            <Button onPress={signIn}>Sign In</Button>
            <MyCaptcha setCaptachaToken={setCaptchaToken} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      height: 100
    },
  });