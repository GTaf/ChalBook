import { Input, Button } from '@rneui/themed';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Session } from '@supabase/supabase-js';

interface AddCommentProp {
    isVisible: boolean,
    onClose: ((event: GestureResponderEvent) => void) | null | undefined,
    book_id: number,
    onAdd: null,
}

interface registerCommentProp {
    book_id: number,
    content: string,
}

export default function AddComment({ isVisible, onClose, book_id, onAdd }: AddCommentProp) {
    const [comment, setComment] = useState('');
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


    async function registerComment({ book_id, content }: registerCommentProp) {
        setLoading(true);
        let user_id = session && session.user ? session.user.id : "";
        const { error } = await supabase.from('Comments').insert({ book_id, user_id, content });
        console.log("Adding comment : ", error, { book_id, user_id, content });
        setLoading(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ajouter un nouveau commentaire</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color="#fff" size={22} />
                    </Pressable>
                </View>
                <Input label="Commentaire" onChangeText={(text) => setComment(text)} inputStyle={styles.onputText} />
                <Button title="Ajouter" disabled={loading} onPress={() => registerComment({ book_id, content : comment })} />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContent: {
        height: '50%',
        width: '100%',
        backgroundColor: '#25292e',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        position: 'absolute',
        bottom: 0,
    },
    titleContainer: {
        height: '10%',
        backgroundColor: '#464C55',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#fff',
        fontSize: 16,
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
    },
    onputText: {
        color: "#fff",
    },
});