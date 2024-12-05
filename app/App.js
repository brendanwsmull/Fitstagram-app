// Apps.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider } from './UserContext';
import LoginScreen from './screens/LoginScreen';
import PostsScreen from './screens/PostsScreen';
import PostCreationScreen from './screens/PostCreationScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// this is the main navigation after the log-in screen
function MainApp() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Your Feed" component={PostsScreen} />
            <Tab.Screen name="Post" component={PostCreationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

// Uses NavigationContainer to swap from the log-in page to the main navigation and back
export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="MainApp" component={MainApp} />
                </Stack.Navigator>
            </NavigationContainer>
        </UserProvider>
    );
}
