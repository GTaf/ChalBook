import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { theme } from '../../theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary }}>
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
