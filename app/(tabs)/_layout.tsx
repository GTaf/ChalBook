import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome5';

import {useTheme} from 'tamagui';

export default function TabLayout() {
  const theme = useTheme();
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.primary.get() }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'BookShelf',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="book-open" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="comments"
        options={{
          title: 'Comments',
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="comments" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
