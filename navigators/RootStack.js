import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from "./../screens/Login";
import Home from "./../screens/Home";
import Register from "./../screens/Register";
import { AuthProvider } from "../context/Auth";

const Stack = createNativeStackNavigator();

const RootStack = () => {
    return(
        //<SecurityNameProvider>
        <NavigationContainer>
            <AuthProvider>
                <Stack.Navigator>
                    <Stack.Screen name="Scanner" component={Home} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                </Stack.Navigator>
            </AuthProvider>
        </NavigationContainer>
        //</SecurityNameProvider>
    )
}

export default RootStack;