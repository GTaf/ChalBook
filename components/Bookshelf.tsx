import { FlatList } from 'react-native';
import { Button, View, YStack, useTheme} from 'tamagui';
import BookOnShelf from './BookOnShelf';
import AddBook from './AddBook';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Tables } from './database.type';
import { useSession } from './AuthCtx';

export default function BookShelf() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [books, setBooks] = useState<Tables<'Books'>[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useSession();
  const theme = useTheme();

  const fetchBooks = async () => {
    try {
      if (session?.user.id != null) {
        console.log('Fetching books for user: ' + session.user.id);
        const { data, error } = await supabase
          .from('Books')
          .select()
          .eq('user_id', session?.user.id);
        
        if (error) {
          console.error('Supabase error:', error);
        }
        
        if (data !== null) {
          setBooks(data);
          console.log('Books fetched:', data.length);
        }
      } else {
        console.log('No session or user ID available');
      }
    } catch (error) {
      console.error('Error in fetchBooks:', error);
    }
  };

  useEffect(() => {
    try {
      fetchBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, [session]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchBooks();
    setRefreshing(false);
  };

  console.log('Books count:', books.length);
  console.log('Session:', session);

  return (
    <YStack flex={1} width="100%" items="center" background="$background">
      <View width="100%" flex={1}>
        <FlatList
          data={books}
          horizontal={false}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
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
      <View width="100%">
        {/* Test with direct color first */}
        <Button
          width="100%"
          background="$color.primary" // Try token again
          color="$color.text"
          onPress={() => {
            console.log('Button pressed');
            setIsModalVisible(true);
          }}
        >
          Je lis un nouveau livre
        </Button>
      </View>
      <AddBook
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </YStack>
  );
}
