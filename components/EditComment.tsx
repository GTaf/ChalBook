import React, { useState } from 'react';
import { Sheet, Button, Input, Text, YStack, XStack } from 'tamagui';
import { Pressable } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { supabase } from './Supabase';

interface EditCommentProps {
  isVisible: boolean;
  onClose: () => void;
  comment: {
    id: number;
    content: string;
    content_type: string;
    created_at: string;
  };
  onCommentUpdated?: () => void;
  onCommentDeleted?: () => void;
}

export default function EditComment({
  isVisible,
  onClose,
  comment,
  onCommentUpdated,
  onCommentDeleted,
}: EditCommentProps) {
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('Comments')
      .update({ content })
      .eq('id', comment.id);
    setLoading(false);
    if (!error && onCommentUpdated) onCommentUpdated();
    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('Comments')
      .delete()
      .eq('id', comment.id);
    setLoading(false);
    if (!error && onCommentDeleted) onCommentDeleted();
    onClose();
  };

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
          <XStack justifyContent="space-between" alignItems="center">
            <Text>Editer le commentaire</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="$card" size={22} />
            </Pressable>
          </XStack>
          <Input
            value={content}
            onChangeText={setContent}
            placeholder="Modifier le commentaire"
            size="$6"
            multiline
            numberOfLines={5}
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
          <Button size="$6" disabled={loading} onPress={handleUpdate}>
            <Text>Enregistrer</Text>
          </Button>
          <Button
            size="$6"
            disabled={loading}
            onPress={handleDelete}
            backgroundColor="$red10"
            color="$color1"
          >
            Supprimer
          </Button>
          <Text>
            Type: {comment.content_type} | Créé le: {comment.created_at}
          </Text>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
}
