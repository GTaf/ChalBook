import { View, Text, StyleSheet } from 'react-native';

interface CommentProp {
    content: string | null;
}

export default function Comment({content} : CommentProp) {
    return (<View style={styles.commentContainer}>
        <Text>{content}</Text>
    </View>)
}


const styles = StyleSheet.create({
    commentContainer: {
        margin: 5,
        borderWidth: 1,
        borderRadius: 5,
        width: "90%",
    }
}
)