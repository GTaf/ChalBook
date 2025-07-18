import { FlatList, View, StyleSheet, Button } from 'react-native';
import BookOnShelf from './BookOnShelf';
import AddBook from './AddBook';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Tables } from './database.type';
import { theme, theme_spacing } from '../theme';
import { useSession } from './AuthCtx';

export default function BookShelf() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [books, setBooks] = useState<Tables<'Books'>[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useSession();

  const fetchBooks = async () => {
    if (session?.user.id != null) {
      console.log('Fetching books for user: ' + session.user.id);
      const { data } = await supabase
        .from('Books')
        .select()
        .eq('user_id', session?.user.id);
      if (data !== null) {
        setBooks(data);
      }
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [session]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.bookShelf}>
        <FlatList
          data={books}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <BookOnShelf
              title={item.title ? item.title : 'Livre sans titre'}
              cover={item.cover_url}
              book_id={item.id.toString()}
            />
          )}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Je lis un nouveau livre"
          onPress={() => {
            console.log('Button pressed');
            setIsModalVisible(true);
          }}
          color={theme.colors.primary}
        />
      </View>
      <AddBook
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  bookShelf: {
    width: '100%',
    marginVertical: theme_spacing.md,
  },
  listContent: {
    paddingHorizontal: theme_spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginVertical: theme_spacing.md,
    paddingHorizontal: theme_spacing.xl,
  },
});
