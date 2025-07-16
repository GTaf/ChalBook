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
    return (
        <View style={styles.outerContainer}>
        <Link href={{pathname: "/books/[book]", params: {book_id: book_id}}} asChild>
            <Pressable>
            <View style={styles.innerContainer}>
                {cover ? (
                    <Image source={{ uri: cover }} style={styles.bookCover} />
                ) : (
                    <View style={[styles.bookCover, {backgroundColor: theme.colors.background, borderWidth: 1, borderColor: theme.colors.border, justifyContent: 'center', alignItems: 'center'}]}>
                        <Text style={{color: theme.colors.text, opacity: 0.3}}>Pas de couverture</Text>
                    </View>
                )}
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
            </View>
            </Pressable>
        </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    bookCover: {
        height: 180,
        width: 120,
        resizeMode: 'contain',
        marginBottom: theme_spacing.sm,
    },
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: 8,
        width: 140,
        height: 240, // fixed height for all items
        backgroundColor: theme.colors.card,
        margin: theme_spacing.xs,
        padding: theme_spacing.sm,
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        ...theme.fonts.regular,
        color: theme.colors.text,
        textAlign: 'center',
        fontSize: 12,
    },
});