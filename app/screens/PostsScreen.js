// screens/PostsScreen.js
import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

export default function PostsScreen() {
    const [posts, setPosts] = useState([
        { id: '1', title: 'my first post', description: 'this is the first post', username: 'User123' },
        { id: '2', title: 'post 2', description: 'made another post', username: 'User456' },
    ]);

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.description}</Text>
                        <Text style={styles.username}>Posted by: {item.username}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    post: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    title: { fontWeight: 'bold' },
    username: { fontStyle: 'italic', marginTop: 5, color: '#555' },
});
