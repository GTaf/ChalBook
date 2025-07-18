import { View } from 'tamagui';
import Auth from '../components/Auth';
import { router } from 'expo-router';

export default function Login() {
  return (
    <View>
      <Auth
        onSuccess={() => {
          router.navigate('(tabs)');
        }}
      ></Auth>
    </View>
  );
}
