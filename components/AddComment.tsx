import { Input, Button, ButtonGroup } from '@rneui/themed';
import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { GestureResponderEvent } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState, useEffect } from 'react';
import { supabase } from './Supabase';
import { Session } from '@supabase/supabase-js';
import { theme, theme_spacing } from '../theme';

interface AddCommentProp {
    isVisible: boolean,
    onClose: ((event: GestureResponderEvent) => void),
    book_id: number,
    onCommentAdded?: () => void,
}

interface registerCommentProp {
    book_id: number,
    content: string,
    content_type: string,
}

export default function AddComment({ isVisible, onClose, book_id, onCommentAdded }: AddCommentProp) {
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [selectedIndex, setSelectedIndex] = useState(0);

    let labels = ['comment', 'quote', 'idea'];

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])


    async function registerComment({ book_id, content, content_type }: registerCommentProp) {
        setLoading(true);
        let user_id = session && session.user ? session.user.id : "";
        const { error } = await supabase.from('Comments').insert({ book_id, user_id, content, content_type });
        console.log("Adding comment : ", error, { book_id, user_id, content });
        setLoading(false);
        
        if (!error && onCommentAdded) {
            onCommentAdded();
        }
    }

    return (
        <Modal animationType="slide" transparent={true} visible={isVisible}>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Ajouter un nouveau commentaire</Text>
                    <Pressable onPress={onClose}>
                        <MaterialIcons name="close" color={theme.colors.card} size={22} />
                    </Pressable>
                </View>
                <Input 
                    label="Commentaire" 
                    onChangeText={(text) => setComment(text)} 
                    inputStyle={styles.inputText} 
                    labelStyle={styles.label}
                />
                <ButtonGroup
                    buttons={labels}
                    selectedIndex={selectedIndex}
                    onPress={(value) => {
                        setSelectedIndex(value);
                    }}
                    containerStyle={{ marginBottom: 20 }}
                />
                <Button 
                    title="Ajouter" 
                    disabled={loading} 
                    onPress={(x) => {
                        registerComment({ book_id, content: comment, content_type: labels[selectedIndex] }); 
                        onClose(x);
                    }} 
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
        backgroundColor: theme.colors.card,
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
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: theme.colors.card,
        fontWeight: '700',
    },
    pickerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 50,
        paddingVertical: 20,
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
        padding: 16,
        marginHorizontal: 16,
    },
});