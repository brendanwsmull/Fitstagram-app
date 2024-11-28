// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';

export default function LoginScreen({ navigation }) {
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername } = useContext(UserContext);

    const handleLogin = () => {
        if (inputUsername && password) {
            setUsername(inputUsername); // uses te UserContext to save the username globally for easy access for getting the correct person.
            navigation.replace('MainApp');
        } else {
            alert('Please enter both username and password.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                placeholder="Username"
                value={inputUsername}
                onChangeText={setInputUsername}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    input: { borderWidth: 1, padding: 10, margin: 10, width: '80%' },
});
