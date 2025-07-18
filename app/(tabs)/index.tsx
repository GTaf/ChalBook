import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'tamagui';
import BookShelf from '../../components/Bookshelf';
import { theme, theme_spacing } from '../../theme';
import { StyleSheet } from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ChalBook</Text>
      <BookShelf />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'RobotoMono_700Bold',
    color: theme.colors.primary,
    marginTop: theme_spacing.xl,
  },
  userText: {
    color: theme.colors.text,
    fontWeight: theme.fonts.regular.fontWeight,
  },
});
