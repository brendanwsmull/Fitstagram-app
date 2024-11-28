// screens/ProfileScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, TextInput, StyleSheet, Share } from 'react-native';
import { UserContext } from '../UserContext';

export default function ProfileScreen() {
    const { username } = useContext(UserContext); // gets the logged-in username
    const [followUsername, setFollowUsername] = useState(''); // use state for inputting usernames for following

    const posts = [
        { id: '1', title: 'my own post', description: 'post is being displayed in profile only rn'},
        { id: '2', title: 'i did it again', description: 'really hoping this works...'},
    ]; // this is just testing data for right now

    const handleShare = async () => {
        try {
            const message = `My name is ${username} on Fitstagram! You should download the app and follow me!`;
            await Share.share({ message });
        } catch (error) {
            alert('something went wrong :(');
        }
    };

    const handleFollow = () => {
        alert(`Following ${followUsername}`);
        setFollowUsername('');
    };

    const handleUnfollow = () => {
        alert(`Unfollowed ${followUsername}`);
        setFollowUsername('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.followContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter username to follow/unfollow"
                    value={followUsername}
                    onChangeText={setFollowUsername} // Updates followUsername state
                />
                <View style={styles.buttonRow}>
                    <Button title="Follow" onPress={handleFollow} />
                    <Button title="Unfollow" onPress={handleUnfollow} />
                </View>
            </View>
            <Text style={styles.username}>Your Username: {username}</Text>
            <Button title="Share Profile" onPress={handleShare} />
            <Text>Your Posts:</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.post}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text>{item.description}</Text>
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
});
