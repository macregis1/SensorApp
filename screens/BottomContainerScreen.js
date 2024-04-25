import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import * as ScreenOrientation from "expo-screen-orientation";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//sensors files import
import StepCounterSensor from '../Sensors/StepCounterSensor';
import CompassSensor from '../Sensors/CompassSensor';
import GPSTrackerSensor from '../Sensors/GPSTrackerSensor';
import LightSensor from '../Sensors/LightSensor';
import RotationSensor from '../Sensors/RotationSensor';

import { StyleSheet, TouchableOpacity } from 'react-native';
const Tab = createBottomTabNavigator();

export default function BottomContainer() {
    const [orientation, setOrientation] = useState(null);

    useEffect(() => {
        checkOrientation();
        const subscription = ScreenOrientation.addOrientationChangeListener(
            handleOrientationChange
        );
        return () => {
            ScreenOrientation.removeOrientationChangeListeners(subscription);
        };
    }, []);

    const checkOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        setOrientation(orientation);
    };

    const changeOrientation = async () => {
        if (orientation === 1 || orientation === 2) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
    };

    const handleOrientationChange = (o) => {
        setOrientation(o.orientationInfo.orientation);
    };
    return (
        <Tab.Navigator screenOptions={{ tabBarActiveTintColor: 'blue', }} >
            <Tab.Screen
                name="Step Tracker"
                component={StepCounterSensor}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="blind" color={color} />,
                }}
            />
            <Tab.Screen
                name="GPS Tracker"
                component={GPSTrackerSensor}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="globe" color={color} />,
                }}
            />
            <Tab.Screen
                name="Light Sensor"
                component={LightSensor}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="lightbulb-o" color={color} />,
                }}
            />
            <Tab.Screen
                name="Compass"
                component={CompassSensor}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="compass" color={color} />,
                }}
            />
            <Tab.Screen
                name="Rotation"
                component={RotationSensor}
                // onPress={() => changeOrientation()}
                options={{
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="rotate-right" color={color} onPress={() => changeOrientation()} />,
                }}
            />
        </Tab.Navigator>
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
