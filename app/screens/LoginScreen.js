// screens/LoginScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { UserContext } from '../UserContext';

export default function LoginScreen({ navigation }) {
    const [inputUsername, setInputUsername] = useState('');
    const [password, setPassword] = useState('');
    const { setUsername } = useContext(UserContext); // saves the logged-in username globally
    const BASE_URL = 'http://3.144.202.68:5000';

    const handleLogin = async () => {
        // needs both a user name and a password
        if (!inputUsername || !password) {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/login`, {
                username: inputUsername,
                password: password,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Login successful!');
                setUsername(inputUsername); // saves the username globally
                navigation.replace('MainApp'); // navigates to the main app navigation, see App.js for more
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Error', 'Invalid username or password.');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again later.');
                console.error(error);
            }
        }
    };

    const handleCreateAccount = async () => {
        // same thing as log-in method, requires both fields filled
        if (!inputUsername || !password) {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/create_account`, {
                username: inputUsername,
                password: password,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Account created successfully! You can now log in.');
                setInputUsername(''); // just wanted to clear the input field
                setPassword('');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                Alert.alert('Error', 'Username already exists.');
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again later.');
                console.error(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
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
            <Button title="Create Account" onPress={handleCreateAccount} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20 
    },
    input: { 
        borderWidth: 1, 
        padding: 10, 
        margin: 10, 
        width: '80%', 
        borderRadius: 5 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 20 
    },
});
