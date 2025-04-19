import { Input, Button } from '@rneui/themed';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
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
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ajouter un nouveau livre</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color={theme.colors.text} size={22} />
                    </Pressable>
                </View>
                <Input 
                    label="Titre" 
                    onChangeText={(text) => setTitle(text)} 
                    inputStyle={styles.inputText}
                    labelStyle={styles.label}
                />
                <Input 
                    label="Auteur" 
                    onChangeText={(text) => setAuthor(text)} 
                    inputStyle={styles.inputText}
                    labelStyle={styles.label}
                />
                <Button 
                    title="Ajouter" 
                    disabled={loading} 
                    onPress={() => registerBook({ title, author })}
                    buttonStyle={styles.button}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '50%',
        width: '100%',
        backgroundColor: theme.colors.primary,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '10%',
        backgroundColor: theme.colors.primary,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme_spacing.lg,
    },
    title: {
        color: theme.colors.text,
        ...theme.fonts.regular,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme_spacing.xl,
        paddingVertical: theme_spacing.xl,
    },
    inputText: {
        color: theme.colors.text,
    },
    label: {
        color: theme.colors.text,
    },
    button: {
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        padding: theme_spacing.md,
        marginHorizontal: theme_spacing.md,
    },
});