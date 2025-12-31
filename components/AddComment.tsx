import {
  Input,
  Button,
  ToggleGroup,
  styled,
  Text,
  YStack,
  XStack,
  Sheet,
} from 'tamagui';
import { Pressable } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Session } from '@supabase/supabase-js';

interface AddCommentProp {
  isVisible: boolean;
  onClose: (event: GestureResponderEvent) => void;
  book_id: number;
  onCommentAdded?: () => void;
}

interface registerCommentProp {
  book_id: number;
  content: string;
  content_type: string;
}

const Item = styled(ToggleGroup.Item, {
  color: '$color10',

  focusStyle: {
    color: '$color1',
    backgroundColor: '$color12',
  },
});

export default function AddComment({
  isVisible,
  onClose,
  book_id,
  onCommentAdded,
}: AddCommentProp) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const labels = ['comment', 'quote', 'idea'];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function registerComment({
    book_id,
    content,
    content_type,
  }: registerCommentProp) {
    setLoading(true);
    const user_id = session && session.user ? session.user.id : '';
    const { error } = await supabase
      .from('Comments')
      .insert({ book_id, user_id, content, content_type });
    console.log('Adding comment : ', error, { book_id, user_id, content });
    setLoading(false);

    if (!error && onCommentAdded) {
      onCommentAdded();
    }
  }

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
        <YStack gap="$2" bottom={0}>
          <XStack
            borderRadius="$4"
            padding="$2"
            justifyContent="space-between"
            backgroundColor="$color6"
          >
            <Text>Ajouter un nouveau commentaire</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="$card" size={22} />
            </Pressable>
          </XStack>
          <Input
            placeholder="Commentaire"
            size="$6"
            onChangeText={(text) => setComment(text)}
          />
          <ToggleGroup
            size="$6"
            flex={1}
            type="single"
            pressStyle={{ backgroundColor: 'red' }}
            defaultValue="comment"
            onValueChange={(value) => {
              setSelectedIndex(labels.indexOf(value));
              console.log(value);
            }}
          >
            <Item value="comment" size={10} flex={1}>
              <Text>Commentaire</Text>
            </Item>
            <Item value="quote" size={10} flex={1}>
              <Text>Citation</Text>
            </Item>
            <Item value="idea" size={10} flex={1}>
              <Text>Idée</Text>
            </Item>
          </ToggleGroup>
          <Button
            size="$6"
            disabled={loading}
            onPress={(x) => {
              registerComment({
                book_id,
                content: comment,
                content_type: labels[selectedIndex],
              });
              onClose(x);
            }}
          >
            <Text>Ajouter</Text>
          </Button>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
