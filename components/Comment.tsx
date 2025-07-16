import { View, Text, StyleSheet } from 'react-native';

interface CommentProp {
    content: string | null;
    type: string;
}

export default function Comment({content, type} : CommentProp) {
    let style = styles.defaultStyle;
    if (type === "quote") {
        style = styles.quoteStyle;
    }
    return (<View style={styles.commentContainer}>
        <Text style={style}>{content}</Text>
    </View>)
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