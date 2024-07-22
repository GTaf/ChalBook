import { Text, Pressable, StyleSheet, Image, View } from "react-native";
import { Link } from "expo-router";

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
                <Text>{title}</Text>
                {cover ? <Image source={ {uri : cover} } style={styles.bookCover}></Image>: <></>}
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
        margin: 10,
    },
    outerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: '20%',
        marginTop: '20%',
        marginRight: 5,
        marginLeft: 5,
        width: 200
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});