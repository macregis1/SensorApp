import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";

export default function RotationSensor() {
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

    // console.log(orientation);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>This is a rotation sensor</Text>
            {/* <Text>ORIENTATION: {orientation}</Text>
            <TouchableOpacity
                style={[styles.btn, { marginTop: 15 }]}
                onPress={() => changeOrientation()}
            >
                <Text style={styles.txt}>
                    {orientation === 1 || orientation === 2
                        ? "Tap to Landscape orientation"
                        : "Tap to Portrait orientation"}
                </Text>
            </TouchableOpacity>*/}
            <StatusBar style="auto" /> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    btn: {
        padding: 10,
    },
    txt: {
        fontSize: 16,
        color: "blue",
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    body: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});
