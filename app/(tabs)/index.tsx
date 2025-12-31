import { StatusBar } from 'expo-status-bar';
import { Text, YStack } from 'tamagui';
import BookShelf from '../../components/Bookshelf';

export default function Home() {
  return (
    <YStack flex={1} background="$background" items={"center"}>
      <Text color="$primary">
        ChalBook
      </Text>
      <BookShelf />
      <StatusBar style="auto" />
    </YStack>
  );
}
