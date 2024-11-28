// screens/PostCreationScreen.js
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';

export default function PostCreationScreen() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handlePost = () => {
        alert(`Posted: ${title} - ${description}`);
        setTitle('');
        setDescription('');
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
