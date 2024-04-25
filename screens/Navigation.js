// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './SplashScreen';
import BottomContainer from './BottomContainerScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Container" component={BottomContainer} />
    </Stack.Navigator>
  );
};

export default Navigation;
