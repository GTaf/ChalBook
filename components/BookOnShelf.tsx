import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { Link } from "expo-router";
import { theme, theme_spacing } from "../theme";
import React from "react";

interface BookOnShelfProp {
    title: string,
    cover: string | null,
    book_id: string,
}

export default function BookOnShelf({ title, cover, book_id }: BookOnShelfProp) {
    console.log(title, cover);
    return (
        <View style={styles.outerContainer}>
        <Link href={{pathname: "/[book]", params: {book_id: book_id}}} asChild>
            <Pressable>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{title}</Text>
                {cover ? <Image source={ {uri : cover} } style={styles.bookCover} /> : <></>}
            </View>
            </Pressable>
        </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    bookCover: {
        height: 300,
        width: 150,
        resizeMode: 'contain',
        margin: theme_spacing.sm,
    },
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 10,
        width: 200,
        backgroundColor: theme.colors.background,
        marginBottom: theme_spacing.xl,
        marginTop: theme_spacing.xl,
        marginRight: theme_spacing.xs,
        marginLeft: theme_spacing.xs,
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme_spacing.sm,
    },
    title: {
        ...theme.fonts.regular,
        color: theme.colors.text,
        textAlign: 'center',
        marginBottom: theme_spacing.sm,
    },
});