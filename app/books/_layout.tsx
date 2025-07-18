import { Stack } from 'expo-router';

export default function BooksLayout() {
  return (
    <Stack>
      <Stack.Screen name="[book]" options={{ headerShown: false }} />
      <Stack.Screen
        name="[book]/edit"
        options={{
          title: 'Edit [book]',
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}
