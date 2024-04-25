import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Circle, Polygon, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const GPSTrackerSensor = () => {
    const [location, setLocation] = useState(null);
    const [mapType, setMapType] = useState('standard');
    const [distance, setDistance] = useState(0);
    let lineEdge1= 0.001;
    let lineEdge2= 0.001;

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const toggleMapType = () => {
        setMapType(mapType === 'standard' ? 'hybrid' : 'standard');
    };

    const calculateDistance = (coordinates) => {
        let Distancing = 0;
        for (let i = 0; i < coordinates.length - 1; i++) {
            const lat1 = coordinates[i].latitude;
            const lon1 = coordinates[i].longitude;
            const lat2 = coordinates[i + 1].latitude;
            const lon2 = coordinates[i + 1].longitude;
            const distanceBetweenPoints = calculateDistanceBetweenPoints(lat1, lon1, lat2, lon2);
            Distancing += distanceBetweenPoints;
        }
        return Distancing;
    };

    const calculateDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
        const R = 6371e3; // Earth radius in meters
        const φ1 = lat1 * (Math.PI / 180);
        const φ2 = lat2 * (Math.PI / 180);
        const Δφ = (lat2 - lat1) * (Math.PI / 180);
        const Δλ = (lon2 - lon1) * (Math.PI / 180);

        const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = R * c; // Distance in meters
        return distance;
    };

    useEffect(() => {
        if (location) {
            const coordinates = [
                { latitude: location.coords.latitude, longitude: location.coords.longitude },
                { latitude: location.coords.latitude + lineEdge1, longitude: location.coords.longitude + lineEdge2 },
            ];
            const calculatedDistance = calculateDistance(coordinates);
            setDistance(calculatedDistance);
        }
    }, [location]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>GPS Tracker</Text>
            <Text>Distance: {distance.toFixed(2)} meters</Text>
            {location && (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    mapType={mapType}
                >
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="You are here"
                        description="Your current location"
                    />
                    <Circle
                        center={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        radius={100} // in meters
                        strokeColor="rgba(0, 0, 255, 0.5)"
                        fillColor="rgba(0, 0, 255, 0.2)"
                    />
                    {/* <Polygon
                        coordinates={[
                            { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude - 0.001 },
                            { latitude: location.coords.latitude - 0.001, longitude: location.coords.longitude - 0.001 },
                            { latitude: location.coords.latitude - 0.001, longitude: location.coords.longitude + 0.001 },
                            { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001 },
                        ]}
                        strokeColor="rgba(255, 0, 0, 0.5)"
                        fillColor="rgba(255, 0, 0, 0.2)"
                    />
                    <Polyline
                        coordinates={[
                            { latitude: location.coords.latitude, longitude: location.coords.longitude },
                            { latitude: location.coords.latitude + lineEdge1, longitude: location.coords.longitude + lineEdge2 },
                        ]}
                        strokeColor="#ff0000"
                        strokeWidth={2}
                    /> */}
                </MapView>
            )}
            <TouchableOpacity onPress={toggleMapType} style={styles.toggleButton}>
                <Text>Switch to {mapType === 'standard' ? 'Satellite View' : 'Standard View'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    map: {
        width: '100%',
        height: '75%',
    },
    toggleButton: {
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
    },
});

export default GPSTrackerSensor;
