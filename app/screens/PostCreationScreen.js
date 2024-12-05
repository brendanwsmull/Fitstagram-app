// screens/PostCreationScreen.js
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function PostCreationScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const { username } = useContext(UserContext); // gets the username entered on login page
    const BASE_URL = 'http://3.144.202.68:5000'; // the ip for the backend
    // I dont care if people see this since repo is private and ip changes everytime server shuts down

    const handlePost = async () => {
        // requries both title and description field be filled out
        if (!title || !description) {
            Alert.alert('Error', 'Please provide both a title and description');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/make_post`, {
                username,
                title,
                description,
            });
            Alert.alert('Success', response.data.message || 'Post created successfully');
            setTitle(''); // clears the text boxes incase another post wanted to be made.
            setDescription('');
        } catch (error) {
            console.error('Error creating post:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to create post. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            keyboardVerticalOffset={80}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <TextInput
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        style={[styles.input, styles.textArea]}
                    />
                    <Button title="Submit Post" onPress={handlePost} />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },
    input: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
        borderColor: '#ccc',
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
});
