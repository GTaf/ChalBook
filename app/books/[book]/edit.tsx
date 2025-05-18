import { Button, Input } from "@rneui/themed";
import { useLocalSearchParams, usePathname, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { supabase } from "../../../components/Supabase";
import { Tables } from "../../../components/database.type";

export default function EditBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const pathname = usePathname();
  console.log(pathname);

  const segments = useSegments();
  console.log(segments);

  const { book } = useLocalSearchParams<{ book: string }>();

  useEffect(() => {
    console.log("Book id is: " + book);
    if (!Number.isNaN(book)) {
      supabase.from('Books').select().eq('id', Number(book)).returns<Tables<'Books'>[]>().then(({ data }) => {
        console.log(data);
        if (data !== null && data[0].title !== null) {
          setTitle(data[0].title);
          setAuthor(data[0].author ? data[0].author : "Auteur inconnu");
        }
      });
    }
  }, [book]);

  return (
    <View>
      <Input value={title} onChangeText={setTitle}></Input>
      <Input value={author} onChangeText={setAuthor}></Input>
      <Button title="Save" onPress={() => {
        console.log("Updating book with author: " + author + " and title: " + title);
        supabase.from('Books').update({ title: title, author: author }).eq('id', Number(book)).then(({ error, status, statusText }) => {
          if (error) {
            console.log(error);
          } else {
            console.log(status + " Status text: " + statusText);
            router.back();
          }
        });
      }}></Button>
    </View>
  );
}