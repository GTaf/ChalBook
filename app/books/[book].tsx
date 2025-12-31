import { useLocalSearchParams } from 'expo-router';
import { Image, FlatList, Pressable } from 'react-native';
import { Text, View, YStack, XStack, Button } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '../../components/Supabase';
import { useEffect, useState, useCallback } from 'react';
import { Tables } from '../../components/database.type';
import AddComment from '../../components/AddComment';
import Comment from '../../components/Comment';
import EditComment from '../../components/EditComment';
import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import EditBook from '../../components/EditBook';

export default function Page() {
  const { book_id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [cover, setCover] = useState<string | null>(null);
  const [bookId, setBookId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [comments, setComments] = useState<Tables<'Comments'>[]>([]);
  const [editCommentModalVisible, setEditCommentModalVisible] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<Tables<'Comments'> | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  const fetchComments = async () => {
    if (bookId) {
      const { data } = await supabase
        .from('Comments')
        .select()
        .eq('book_id', bookId)
        .returns<Tables<'Comments'>[]>();
      if (data !== null) {
        setComments(data);
      }
    }
  };

  const loadComments = useCallback(fetchComments, [bookId]);

  useEffect(() => {
    if (!Number.isNaN(book_id)) {
      supabase
        .from('Books')
        .select()
        .eq('id', Number(book_id))
        .returns<Tables<'Books'>[]>()
        .then(({ data }) => {
          if (data !== null && data[0].title !== null) {
            setName(data[0].title);
            setCover(data[0].cover_url);
            setBookId(data[0].id);
            setAuthor(data[0].author ? data[0].author : 'Auteur inconnu');
          }
        });

      loadComments();
    }
  }, [book_id, loadComments]);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadComments();
    setRefreshing(false);
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <YStack flex={1} background="$background" paddingStart="$2">
      <XStack
        paddingStart="$2"
        marginEnd="$2"
        background="$color.card"
        borderRadius="$radius.3"
        alignItems="center"
      >
        <View width={100} marginRight="$3">
          {cover ? (
            <Image source={{ uri: cover }} style={{ height: 150, width: 100, resizeMode: 'contain' }} />
          ) : null}
        </View>
        <YStack flex={1} justify="center">
          <Text
            fontSize={18}
            marginBottom="$1"
            color="$color.text"
            numberOfLines={2}
          >
            {name}
          </Text>
          <Text fontSize={14} color="$color.text" opacity={0.8}>
            {author}
          </Text>
        </YStack>
        <View>
          <Pressable
            onPress={() => {
              setIsEditModalVisible(true);
            }}
          >
            <MaterialIcons
              name="mode-edit"
              color="$color.text"
              size={22}
            />
          </Pressable>
        </View>
      </XStack>

      {bookId ? (
        <AddComment
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          book_id={bookId}
          onCommentAdded={loadComments}
        />
      ) : null}

      {bookId ? (
        <EditBook
          isVisible={isEditModalVisible}
          onClose={() => setIsEditModalVisible(false)}
          bookId={bookId}
        />
      ) : null}

      <FlatList
        data={comments}
        keyExtractor={(item) => item.id.toString()}
        onRefresh={onRefresh}
        refreshing={refreshing}
        renderItem={({ item }) => (
          <Comment
            content={item.content}
            type={item.content_type}
            onLongPress={() => {
              setSelectedComment(item);
              setEditCommentModalVisible(true);
            }}
          />
        )}
      />
      {selectedComment && (
        <EditComment
          isVisible={editCommentModalVisible}
          onClose={() => setEditCommentModalVisible(false)}
          comment={selectedComment}
          onCommentUpdated={loadComments}
          onCommentDeleted={loadComments}
        />
      )}

      <Button
        background="$color.primary"
        color="$color.text"
        onPress={() => setIsModalVisible(true)}
      >
        Nouveau commentaire
      </Button>
      <StatusBar style="auto" />
    </YStack>
  );
}


