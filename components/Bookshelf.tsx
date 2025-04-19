import { FlatList, Text, View, StyleSheet, Button } from "react-native";
import BookOnShelf from "./BookOnShelf";
import AddBook from "./AddBook";
import { useState, useEffect } from "react";
import { supabase } from "./Supabase";
import { Tables } from "../app/database.type";
import { theme, theme_spacing } from "../theme";

export default function BookShelf() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [books, setBooks] = useState<Tables<'Books'>[]>([]);

    useEffect(() => {
        supabase.from('Books').select().then(({ data }) => {
            if (data !== null) {
                setBooks(data);
            }
        })
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.bookShelf}>
                <FlatList
                    data={books}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }) => (
                        <BookOnShelf 
                            title={item.title ? item.title : "Livre sans titre"} 
                            cover={item.cover_url} 
                            book_id={item.id.toString()} 
                        />
                    )}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title='Je lis un nouveau livre' 
                    onPress={() => setIsModalVisible(true)}
                    color={theme.colors.primary}
                />
            </View>
            <AddBook isVisible={isModalVisible} onClose={(_) => setIsModalVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    bookShelf: {
        width: '100%',
        marginVertical: theme_spacing.md,
    },
    listContent: {
        paddingHorizontal: theme_spacing.md,
    },
    buttonContainer: {
        marginVertical: theme_spacing.md,
        paddingHorizontal: theme_spacing.xl,
    },
});
