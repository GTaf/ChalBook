import { Input, Button, YStack, Sheet } from "tamagui";
import { GestureResponderEvent } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import { Tables } from "./database.type";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

interface EditBookProp {
  isVisible: boolean;
  onClose: ((event: GestureResponderEvent) => void) | null | undefined;
  bookId: number;
}

function DeleteBook(
  bookId: number,
  onClose: ((event: GestureResponderEvent) => void) | null | undefined,
  event: GestureResponderEvent
) {
  console.log("Deleting book " + bookId);
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
}

function UpdateBook(
  bookId: number,
  onClose: ((event: GestureResponderEvent) => void) | null | undefined,
  event: GestureResponderEvent,
  title: string,
  author: string
) {
  console.log(
    "Updating book: " +
      bookId +
      " with title: " +
      title +
      " and author: " +
      author
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
}

function UpdateCover(
  bookId: number,
  onClose: ((event: GestureResponderEvent) => void) | null | undefined,
  event: GestureResponderEvent,
  cover_url: string
) {
  console.log(
    "Updating cover for book: " + bookId + " with cover url: " + cover_url
  );
  supabase
    .from("Books")
    .update({ cover_url: cover_url })
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
}

async function uploadImage(uri: string, bookId: number) {
  const fileExt = uri.split(".").pop();
  const fileName = `${bookId}-${Date.now()}.${fileExt}`;
  const filePath = `${fileName}`;

  const fileData = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  try {
  const { error } = await supabase.storage
    .from("covers")
    .upload(filePath, Buffer.from(fileData, "base64"), {
      contentType: "image/jpeg",
      upsert: true,
    });
    console.error("Exception during upload:", error);
  } catch (err) {
    console.error("Exception during upload:", err);
  }
  try {
  const { data } = supabase.storage.from("covers").getPublicUrl(filePath);
  return data.publicUrl;
  } catch (err) {
    console.error("Exception url retrieval :", err);
  }
  return "";
}

async function updateBookCover(bookId: number, imageUrl: string) {
  const { error } = await supabase
    .from("Books")
    .update({ cover_url: imageUrl })
    .eq("id", bookId);
  if (error) throw error;
}

async function handleUpdateCover(bookId: number) {
  const uri = await pickImage();
  console.log(uri);
  if (!uri) return;

  const publicUrl = await uploadImage(uri, bookId);
  await updateBookCover(bookId, publicUrl);

  console.log("Cover updated!");
}

async function pickImage() {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: false,
    quality: 1,
  });

  if (!result.canceled) {
    return result.assets[0].uri; // path to image file
  }

  return null;
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
              UpdateBook(bookId, onClose, event, title, author);
            }}
          >
            Save
          </Button>
          <Button
            onPress={(event) => {
              DeleteBook(bookId, onClose, event);
            }}
            color="red"
          >
            Delete book
          </Button>
          <Button
            onPress={(event) => {
              console.log("Coucou");
              handleUpdateCover(bookId).then(() => {
                if (onClose) {
                  onClose(event);
                }
              });
            }}
          >
            Upload book cover
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
