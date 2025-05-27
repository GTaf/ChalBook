import { Input, Button, YStack, Sheet } from "tamagui";
import { GestureResponderEvent } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import { Tables } from "./database.type";

interface EditBookProp {
  isVisible: boolean;
  onClose: ((event: GestureResponderEvent) => void) | null | undefined,
  bookId: number;
}

export default function EditBook({ isVisible, onClose, bookId }: EditBookProp) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    console.log("Book id is: " + bookId);
    if (!Number.isNaN(bookId)) {
      supabase
        .from("Books")
        .select()
        .eq("id", Number(bookId))
        .returns<Tables<"Books">[]>()
        .then(({ data }) => {
          console.log(data);
          if (data !== null && data[0].title !== null) {
            setTitle(data[0].title);
            setAuthor(data[0].author ? data[0].author : "Auteur inconnu");
          }
        });
    }
  }, [bookId]);

  return (
    <Sheet
      modal
      snapPoints={[50, 0]}
      animation="snap"
      open={isVisible}
      dismissOnSnapToBottom
      position={0}
    >
      <Sheet.Frame padding="$4">
        <YStack gap="$4" padding="$4">
          <Input value={title} onChangeText={setTitle}></Input>
          <Input value={author} onChangeText={setAuthor}></Input>
          <Button
            onPress={(event) => {
              console.log(
                "Updating book with author: " + author + " and title: " + title
              );
              supabase
                .from("Books")
                .update({ title: title, author: author })
                .eq("id", Number(bookId))
                .then(({ error, status, statusText }) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(status + " Status text: " + statusText);
                    if (onClose) {
                        onClose(event);
                      }
                  }
                });
            }}
          >
            Save
          </Button>
          <Button
            onPress={(event) => {
              console.log(
                "Deleting book with author: " + author + " and title: " + title
              );
              supabase
                .from("Books")
                .delete()
                .eq("id", Number(bookId))
                .then(({ error, status, statusText }) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log(status + " Status text: " + statusText);
                    if (onClose) {
                      onClose(event);
                    }
                  }
                });
            }}
            color="error"
          >
            Delete book
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
