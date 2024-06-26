import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import RootStackScreen from './screens/RootStackScreen';


export default function App() {
  return (
  <NavigationContainer screenOptions={{ headerShown: false }}>
     <RootStackScreen/>
  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
