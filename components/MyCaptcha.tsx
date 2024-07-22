import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useRef } from 'react';
import ConfirmHcaptcha from '@hcaptcha/react-native-hcaptcha';
import { WebViewMessageEvent } from 'react-native-webview';

// demo sitekey
const siteKey = '00751ca2-bf8d-4e80-860c-41e38ec69538';
const baseUrl = 'https://hcaptcha.com';

interface MyCaptchaProp {
    setCaptachaToken: (token: string) => void,
}

export default function MyCaptcha({setCaptachaToken} : MyCaptchaProp) {

    const [captchaForm, setCaptchaForm] = useState<ConfirmHcaptcha|null>(null);

    function onMessage(event: WebViewMessageEvent) {
    if (captchaForm && event && event.nativeEvent.data) {
      if (['cancel'].includes(event.nativeEvent.data)) {
        captchaForm.hide();
        setCaptachaToken(event.nativeEvent.data);
      } else if (['error', 'expired'].includes(event.nativeEvent.data)) {
        captchaForm.hide();
        setCaptachaToken(event.nativeEvent.data);
      } else if (event.nativeEvent.data === 'open') {
        console.log('Visual challenge opened');
      } else {
        console.log('Verified code from hCaptcha', event.nativeEvent.data);
        captchaForm.hide();
        setCaptachaToken(event.nativeEvent.data);
      }
    }
  };

    return (
      <View style={styles.container}>
        <ConfirmHcaptcha
          ref={_ref => setCaptchaForm(_ref)}
          siteKey={siteKey}
          baseUrl={baseUrl}
          languageCode="en"
          onMessage={onMessage}
          size='normal'
        />
        <TouchableOpacity
          onPress={() => {
            captchaForm && captchaForm.show();
          }}>
          <Text style={styles.paragraph}>Click to launch</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 0,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});