import { Input, Button, Text, YStack, XStack, Sheet } from 'tamagui';
import { Pressable, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Session } from '@supabase/supabase-js';
import { theme, theme_spacing } from '../theme';

interface AddBookProp {
    isVisible: boolean,
    onClose: ((event: GestureResponderEvent) => void) | null | undefined,
}

interface registerBookProp {
    title: string,
    author: string,
}

export default function AddBook({ isVisible, onClose }: AddBookProp) {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])


    async function registerBook({ title, author }: registerBookProp) {
        setLoading(true);
        let user_id = session && session.user ? session.user.id : "";
        const { error } = await supabase.from('Books').insert({ title, user_id, author });
        console.log(error);
        setLoading(false);
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
            <YStack gap="$2">
                <XStack borderRadius="$4" padding="$4" justifyContent="space-between" backgroundColor="$color6">
                    <Text>Ajouter un nouveau livre</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color={theme.colors.text} size={22} />
                    </Pressable>
                </XStack>
                <Input 
                    placeholder="Titre" 
                    size="$6"
                    onChangeText={(text) => setTitle(text)} 
                />
                <Input 
                    placeholder="Auteur" 
                    size="$6"
                    onChangeText={(text) => setAuthor(text)} 
                />
                <Button 
                    disabled={loading} 
                    onPress={() => registerBook({ title, author })}
                >Ajouter</Button>
            </YStack>
            </Sheet.Frame>
        </Sheet>
    );
}

const styles = StyleSheet.create({
    title: {
        color: theme.colors.text,
        ...theme.fonts.regular,
    },
});