import { StatusBar } from 'expo-status-bar';
import { Text, YStack } from 'tamagui';
import BookShelf from '../../components/Bookshelf';

export default function Home() {
  return (
    <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center">
      <Text fontFamily="RobotoMono_700Bold" color="$primary" marginTop="$xl">
        ChalBook
      </Text>
      <BookShelf />
      <StatusBar style="auto" />
    </YStack>
  );
}
