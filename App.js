import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/Login';

import RootStack from './navigators/RootStack';
import Home from './screens/Home';


export default function App() {
  return (
    <RootStack />
    //<Home />
  );
}