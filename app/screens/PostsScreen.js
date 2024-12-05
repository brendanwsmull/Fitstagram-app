// screens/PostsScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, FlatList, Text, StyleSheet, Alert, Button } from 'react-native';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function PostsScreen() {
    const { username } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const BASE_URL = 'http://3.144.202.68:5000';

    const fetchFeed = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_feed`, {
                params: { username },
            });
            setPosts(response.data);
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch the feed.');
            console.error(error);
        }
    };

    // loads the posts when first loading the profile page
    useEffect(() => {
        fetchFeed();
    }, [username]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button title="Refresh" onPress={fetchFeed} />
            </View>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.upid.toString()}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.title}>{item.post_title}</Text>
                        <Text>{item.post_desc}</Text>
                        <Text style={styles.username}>Posted by: {item.acc}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No posts to display.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, paddingTop: 40 },
    header: {
        position: 'absolute',
        top: 10,
        left: 10,
    },
    post: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    title: { fontWeight: 'bold' },
    username: { fontStyle: 'italic', marginTop: 5, color: '#555' },
});
