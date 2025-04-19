import { View, Text, FlatList } from "react-native";
import { Tables } from "../database.type";
import { useEffect, useState } from "react";
import { supabase } from "../../components/Supabase";
import Comment from "../../components/Comment";


export default function Comments() {
    const [comments, setComments] = useState<Tables<'Comments'>[]>([]);

    useEffect(() => {
        supabase.from('Comments').select().then(({ data }) => {
            if (data !== null) {
                setComments(data);
            }
        })
    }, []);
    
    return (
        <View>
            <Text>Comments</Text>
            <FlatList
            data={comments}
            renderItem={({item}) => {return <Comment content={item.content} type={item.content_type} />}}
            />
        </View>
    )
}