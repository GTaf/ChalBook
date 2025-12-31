import { Text, Pressable, Image } from 'react-native';
import { Link } from 'expo-router';
import { YStack, XStack } from 'tamagui';
import React from 'react';

interface BookOnShelfProp {
  title: string;
  cover: string | null;
  book_id: string;
}

export default function BookOnShelf({
  title,
  cover,
  book_id,
}: BookOnShelfProp) {
  return (
    <YStack
      borderWidth={1}
      borderColor="$border"
      borderRadius={8}
      width={140}
      height={240}
      backgroundColor="$card"
      margin="$xs"
      padding="$sm"
      alignItems="center"
      justifyContent="center"
    >
      <Link
        href={{ pathname: '/books/[book]', params: { book_id: book_id } }}
        asChild
      >
        <Pressable>
          <YStack alignItems="center" justifyContent="center">
            {cover ? (
              <Image source={{ uri: cover }} style={{ height: 180, width: 120, resizeMode: 'contain', marginBottom: 8 }} />
            ) : (
              <YStack
                height={180}
                width={120}
                backgroundColor="$background"
                borderWidth={1}
                borderColor="$border"
                justifyContent="center"
                alignItems="center"
                marginBottom={8}
              >
                <Text style={{ color: '$text', opacity: 0.3 }}>
                  Pas de couverture
                </Text>
              </YStack>
            )}
            <Text style={{ fontFamily: 'RobotoMono_700Bold', color: '$text', textAlign: 'center', fontSize: 12 }} numberOfLines={2}>
              {title}
            </Text>
          </YStack>
        </Pressable>
      </Link>
    </YStack>
  );
}


