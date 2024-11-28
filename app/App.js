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

function MainApp() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Your Feed" component={PostsScreen} />
            <Tab.Screen name="Post" component={PostCreationScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

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
