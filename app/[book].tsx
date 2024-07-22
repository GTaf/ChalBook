import { useLocalSearchParams } from 'expo-router';
import { Text, View, Image, StyleSheet, FlatList } from 'react-native';
import { Button } from '@rneui/themed';
import { supabase } from '../components/Supabase';

import { useEffect, useState } from 'react';
import { Tables } from './database.type';

import AddComment from "../components/AddComment";
import Comment from '../components/Comment';
import {  useFonts, RobotoMono_700Bold } from '@expo-google-fonts/roboto-mono';

export default function Page() {
  const { book_id } = useLocalSearchParams();
  const [name, setName] = useState("");
  const [cover, setCover] = useState<string | null>(null);
  const [bookId, setBookId] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [comments, setComments] = useState<(string | null)[]>([]);

  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  useEffect(() => {
    if (!Number.isNaN(book_id)) {
      supabase.from('Books').select().eq('id', Number(book_id)).returns<Tables<'Books'>[]>().then(({ data }) => {
        if (data !== null && data[0].title !== null) {
          setName(data[0].title);
          setCover(data[0].cover_url);
          setBookId(data[0].id);
        }
      });

      supabase.from('Comments').select().eq('book_id', Number(book_id)).returns<Tables<'Comments'>[]>().then(({ data }) => {
        if (data !== null) {
          console.log(data);
          setComments(data.map((comment) => comment.content));
        }
      });

    }
  }, [])

  if (!fontsLoaded) {
    return null;
  }

  return <View style={styles.container}>
    <Text style={styles.title}>{name}</Text>
    {cover ? <Image source={{ uri: cover }} style={styles.bookCover}></Image> : <></>}
    {bookId ? <AddComment isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} book_id={bookId}></AddComment> : <></>}
    <FlatList
      style={styles.commentsContainer}
      data={comments}
      renderItem={({ item }) => <Comment content={item} />}
    />
    <Button onPress={() => setIsModalVisible(true)}>Nouveau commentaire</Button>
  </View>
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    flex: 1,
    fontFamily: 'RobotoMono_700Bold',
    fontSize: 20
  },
  commentsContainer: {
    flex: 5,
    width: '100%',
  },
  bookCover: {
    height: 300,
    width: 150,
    resizeMode: 'contain',
    margin: 10,
    flex: 3,
  },
  container: {
    backgroundColor: 'antiquewhite',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
  },
});