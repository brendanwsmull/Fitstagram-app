// screens/ProfileScreen.js
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Share, Alert } from 'react-native';
import { UserContext } from '../UserContext';
import axios from 'axios';

export default function ProfileScreen({ navigation }) {
    const { username, setUsername } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [followUsername, setFollowUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const BASE_URL = 'http://3.144.202.68:5000';

    const fetchPosts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/get_user_posts`, {
                params: { username },
            });
            setPosts(response.data);
        } catch (error) {
            Alert.alert('Error', 'Unable to fetch posts.');
            console.error(error);
        }
    };

    // loads the posts when first loading the profile page
    useEffect(() => {
        fetchPosts();
    }, [username]);

    const handleFollow = async () => {
        // checks to make sure text box is filled
        if (!followUsername) {
            Alert.alert('Error', 'Please enter a username to follow.');
            return;
        }
        setLoading(true); // pauses other app functions until loading is done, has a bad glitch when my internet was lagging and things went poof ;(
        try {
            const response = await axios.post(`${BASE_URL}/follow_user`, {
                username,
                to_follow: followUsername,
            });
            Alert.alert('Success', response.data.message);
            setFollowUsername(''); // clears text box for next use
        } catch (error) {
            Alert.alert('Error', 'Unable to follow the user.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // just look at above comments for this method, practically the same
    const handleUnfollow = async () => {
        if (!followUsername) {
            Alert.alert('Error', 'Please enter a username to unfollow.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}/unfollow_user`, {
                username,
                to_unfollow: followUsername,
            });
            Alert.alert('Success', response.data.message);
            setFollowUsername('');
        } catch (error) {
            Alert.alert('Error', 'Unable to unfollow the user.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        setUsername(null);
        navigation.replace('Login');
    };

    const handleShare = async () => {
        try {
            const message = `My name is ${username} on Fitstagram! You should download the app and follow me!`;
            await Share.share({ message });
        } catch (error) {
            Alert.alert('Error', 'something went wrong :(');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.followContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username to follow/unfollow"
                    value={followUsername}
                    onChangeText={setFollowUsername}
                />
                <View style={styles.buttonRow}>
                    <Button title="Follow" onPress={handleFollow} disabled={loading} />
                    <Button title="Unfollow" onPress={handleUnfollow} disabled={loading} />
                    <Button title="Log Out" onPress={handleLogout} />
                </View>
            </View>

            <Text style={styles.username}>Your Username: {username}</Text>
            <View style={styles.actionRow}>
                <Button title="Share Profile" onPress={handleShare} />
                <Button title="Refresh Posts" onPress={fetchPosts} />
            </View>
            <Text>Your Posts:</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.upid.toString()}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.title}>{item.post_title}</Text>
                        <Text>{item.post_desc}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text>No posts to display.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    post: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' },
    title: { fontWeight: 'bold' },
    username: { fontStyle: 'italic', marginTop: 5, color: '#555', fontSize: 20 },
    followContainer: {
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
});
