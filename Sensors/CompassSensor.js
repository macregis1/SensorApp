import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const CompassSensor = () => {
    const [heading, setHeading] = useState(0);
    const [needleRotation, setNeedleRotation] = useState(0);
    const [previousHeading, setPreviousHeading] = useState(null);

    useEffect(() => {
        const subscriptionHeading = Accelerometer.addListener(({ x, y }) => {
            // Calculate the heading from the accelerometer data
            const headingRad = Math.atan2(y, x);
            let headingDeg = (headingRad * 180) / Math.PI + 360;

            // Apply low-pass filter to smooth out the data
            if (previousHeading !== null) {
                const alpha = 0.1; // Adjust alpha for desired smoothness
                headingDeg = alpha * headingDeg + (1 - alpha) * previousHeading;
            }

            setHeading(headingDeg % 360);
            setPreviousHeading(headingDeg);

            // Adjust the rotation of the needle based on the difference between current heading and north (0 degrees)
            const needleRotation = (headingDeg - 360) % 360;
            setNeedleRotation(-needleRotation);
        });

        return () => {
            subscriptionHeading.remove();
        };
    }, [previousHeading]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Compass</Text>
            <View style={styles.compassContainer}>
                <Image
                    source={require('./assets/compass.png')}
                    style={[ styles.needle, { transform: [{ rotateZ: `${needleRotation}deg` }] }]}
                />
                <View style={styles.compassBackground} />
            </View>
            <Text style={styles.value}>Heading: {heading.toFixed(2)} degrees</Text>
        </View>
    );
};

const { width } = Dimensions.get('window');
const compassSize = width * 0.8;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'darkBlue',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    value: {
        fontSize: 18,
        marginTop: 20,
    },
    compassContainer: {
        width: compassSize,
        height: compassSize,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compassBackground: {
        width: compassSize * 0.8,
        height: compassSize * 0.8,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: compassSize * 0.4,
    },
    needle: {
        width: compassSize * 0.8,
        height: compassSize * 0.8,
        position: 'absolute',
        resizeMode: 'contain',
        borderRadius: 150
    },
});

export default CompassSensor;