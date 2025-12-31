import { FlatList } from 'react-native';
import { Button, View, YStack } from 'tamagui';
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

  console.log('Bookshelf component rendered');

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
    <YStack flex={1} width="100%" alignItems="center" backgroundColor="$background">
      <View width="100%" marginVertical="$md" flex={1}>
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
      <View>
        <Button
          backgroundColor="$primary"
          color="$text"
          borderColor="$bg"
          //width="100%"
          height="$lg"
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
