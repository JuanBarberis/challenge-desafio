import { View, Text, Button, FlatList, ActivityIndicator, Image, TextInput, StyleSheet, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import getMarsPhotos from '../utils/apiCall'
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {

    const navigation = useNavigation()
    const apiKey = 'GUbMFE1WeBBiksXj9mKDbdDXKtPNVySIXZJ6pSrK';
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [camera, setCamera] = useState({})

    useEffect(() => {
        const roverName = 'curiosity';
        const sol = 1000;
        getMarsPhotos(roverName, sol, apiKey, setPhotos, setLoading, setError);
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="red"  />;
    }

    if (error) {
        return <Text>Error loading photos</Text>;
    }

    return (
        <>
            <View style={styles.container}>
                <Text>
                    ingrese el tipo de camara
                </Text>
                <TextInput value='' style={{ borderWidth: 1, width: '80%', alignSelf: 'center', borderRadius: 3 }} />
                <FlatList
                    data={photos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => {
                        return (

                            (
                                <View >
                                    <Image source={{ uri: item.img_src }} style={{ width: 100, height: 100 }} />
                                    <Text>{item.earth_date}</Text>
                                </View>
                            )
                        )
                    }
                    }
                />
            </View>
        </>

    );
};
export default HomeScreen

const styles = StyleSheet.create({

    container: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});