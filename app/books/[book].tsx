import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, FlatList, Pressable } from 'react-native';
import { Text, View } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import { Button } from 'tamagui';
import { supabase } from '../../components/Supabase';
import { useEffect, useState, useCallback } from 'react';
import { Tables } from '../../components/database.type';
import AddComment from "../../components/AddComment";
import Comment from '../../components/Comment';
import { useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';
import React from 'react';
import { theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';

export default function Page() {
  const { book_id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [bookId, setBookId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comments, setComments] = useState<([string, string])[]>([]);
  const router = useRouter();

  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  const loadComments = useCallback(async () => {
    if (bookId) {
      const { data } = await supabase
        .from('Comments')
        .select()
        .eq('book_id', bookId)
        .returns<Tables<'Comments'>[]>();
      
      if (data !== null) {
        setComments(data.map((comment) => [comment.content, comment.content_type]));
      }
    }
  }, [bookId]);

  useEffect(() => {
    if (!Number.isNaN(book_id)) {
      supabase.from('Books').select().eq('id', Number(book_id)).returns<Tables<'Books'>[]>().then(({ data }) => {
        if (data !== null && data[0].title !== null) {
          setName(data[0].title);
          setCover(data[0].cover_url);
          setBookId(data[0].id);
          setAuthor(data[0].author ? data[0].author : "Auteur inconnu");
        }
      });

      loadComments();
    }
  }, [book_id, loadComments]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.coverContainer}>
          {cover ? <Image source={{ uri: cover }} style={styles.bookCover} /> : null}
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>{name}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <View>
          <Pressable onPress={()=>{router.push(`/books/${book_id}/edit`)}}>
            <MaterialIcons name="mode-edit" color={theme.colors.text} size={22} />
          </Pressable>
        </View>
      </View>

      {bookId ? (
        <AddComment 
          isVisible={isModalVisible} 
          onClose={() => setIsModalVisible(false)} 
          book_id={bookId}
          onCommentAdded={loadComments}
        />
      ) : null}

      <FlatList
        style={styles.commentsContainer}
        data={comments}
        renderItem={({ item }) => <Comment content={item[0]} type={item[1]} />}
      />

      <Button 
        color={theme.colors.primary} 
        onPress={() => setIsModalVisible(true)}
      >
        Nouveau commentaire
      </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: theme.colors.card,
    borderRadius: 8,
  },
  coverContainer: {
    width: 100,
    marginRight: 15,
  },
  bookCover: {
    height: 150,
    width: 100,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'RobotoMono_700Bold',
    fontSize: 18,
    marginBottom: 5,
    color: theme.colors.text,
  },
  author: {
    fontSize: 14,
    color: theme.colors.text,
    opacity: 0.8,
  },
  commentsContainer: {
    flex: 1,
  },
  addButton: {
    margin: 10,
    paddingHorizontal: 20,
  },
});