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
                console.log("books : ", books);
            }
        })
    }, [])

    supabase.from('Books').select();

    return (
        <View style={styles.bookShelf}>
            <FlatList
                data={books}
                horizontal={true}
                renderItem={({ item }) => <BookOnShelf title={item.title ? item.title : "Livre sans titre"} cover={item.cover_url} book_id={item.id.toString()} />}
                style={styles.list}
            />
            <Button 
                title='Je lis un nouveau livre' 
                onPress={() => setIsModalVisible(true)}
                color={theme.colors.primary}
            />
            <AddBook isVisible={isModalVisible} onClose={(_) => setIsModalVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    bookShelf: {
        flex: 4,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme_spacing.md,
        backgroundColor: theme.colors.background,
        borderRadius: 8,
    },
    list: {
        width: '100%',
        paddingHorizontal: theme_spacing.md,
    },
});
