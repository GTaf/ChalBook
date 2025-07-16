import { View, Text, StyleSheet, Pressable } from 'react-native';


interface CommentProp {
    content: string | null;
    type: string;
    onLongPress?: () => void;
}

export default function Comment({content, type, onLongPress} : CommentProp) {
    let style = styles.defaultStyle;
    if (type === "quote") {
        style = styles.quoteStyle;
    }
    return (
        <Pressable onLongPress={onLongPress} delayLongPress={300}>
            <View style={styles.commentContainer}>
                <Text style={style}>{content}</Text>
            </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    commentContainer: {
        margin: 5,
        padding: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "95%",
    },
    quoteStyle: {
        fontStyle: 'italic'
    },
    defaultStyle: {

    }
}
)