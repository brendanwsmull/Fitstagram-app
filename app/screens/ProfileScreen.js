// screens/ProfileScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Share } from 'react-native';
import { UserContext } from '../UserContext';

export default function ProfileScreen() {
    const { username } = useContext(UserContext); // gets the logged-in username

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

    return (
        <View style={styles.container}>
            <Text>Username: {username}</Text>
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
    username: { fontStyle: 'italic', marginTop: 5, color: '#555' },
});
