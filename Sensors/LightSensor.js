import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Sensors from 'expo-sensors';

const LightSensor = () => {
    const [lightLevel, setLightLevel] = useState(0);
    const [isScreenCovered, setIsScreenCovered] = useState(false);
    const ScreenCover = 10; // Adjust this value as needed

    useEffect(() => {
        const subscription = Sensors.LightSensor.addListener((data) => {
            setLightLevel(data.illuminance);
            checkScreenCover(data.illuminance);
        });

        return () => {
            subscription.remove();
        };
    }, []);

    const checkScreenCover = (illuminance) => {
        if (illuminance <= ScreenCover) {
            setIsScreenCovered(true);
        } else {
            setIsScreenCovered(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Light Sensor</Text>
            <Text style={styles.lightLevel}>
                Light Brightness level: {isScreenCovered ? 'Screen covered' : lightLevel.toFixed(1) + ' lux'}
            </Text>
            <Text style={styles.threshold}>Screen is covered below {ScreenCover} lux!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    lightLevel: {
        fontSize: 18,
    },
    threshold: {
        fontSize: 12,
        marginTop: 10,
        fontStyle:'italic',
    },
});

export default LightSensor;