import { View, Text, Button, FlatList, ActivityIndicator, Image, TextInput, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { API } from '../utils/apiCall'

import CustomButtom from '../components/CustomButtom';
import RenderText from '../components/renderText/RenderText';
import CustomSlider from '../components/customSlider/CustomSlider';
import RenderItem from '../components/renderItem/RenderItem';

const HomeScreen = () => {

    const navigation = useNavigation()
    const apiKey = 'GUbMFE1WeBBiksXj9mKDbdDXKtPNVySIXZJ6pSrK';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [camera, setCamera] = useState({})
    const [sol, setSol] = useState(100);
    const [photo, setPhoto] = useState([]);
    const [rover, setRover] = useState(null);

    const [page, setPage] = useState(1)

    const getMarsRover = async () => {
        if (rover !== null) {
            setLoading(true);
            setError(false);

            try {
                const res = await API.get(`/${rover}/photos?sol=${sol}&page=${page}&api_key=${apiKey}`);
                setPhoto(res.data.photos);
            } catch (error) {
                console.error('Error fetching Mars photos:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleValueChange = (value) => {
        setSol(value);
    };

    const nextPage = () => {
        setPage(page + 1)
    }
    const backPage = () => {
        setPage(page - 1)
    }

    useEffect(() => {
        getMarsRover()
    }, [rover, camera, sol, page])


    return (

        <View style={styles.container}>
           

                <RenderText
                    size={24}
                    color="orange"
                    weight="bold"
                    text="MARS ROVER"
                    callback={() => console.log('Text pressed!')}

                />

                {
                    !rover && (<RenderText text={'Seleccione un rover para cargar las imagenes'} size={16} />)
                }
                <View style={styles.conteinerButton}>
                    <CustomButtom text={'Curiosity'} color={'orange'} width={'30%'} callback={() => setRover('curiosity')} />
                    <CustomButtom text={'Spirit'} color={'orange'} width={'30%'} callback={() => setRover('spirit')} />
                    <CustomButtom text={'Opportunity'} color={'orange'} width={'30%'} callback={() => setRover('opportunity')} />
                </View>

            {
                rover && (
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <RenderText text={`SOL - ${sol}`} size={20} weight={'bold'} />
                        <CustomSlider
                            width='95%'
                            color='orange'
                            onValueChange={handleValueChange}
                            value={sol}
                            maximumValue={3200}
                            minimumValue={100}
                            size='large'
                        />
                    </View>
                )
            }

            {/* <TextInput value='' style={{ borderWidth: 1, width: '90%', alignSelf: 'center', borderRadius: 3 }} /> */}
            {
                loading ?
                    <>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator color={'orange'} size={'large'} />
                        </View>
                    </>
                    :
                    <View style={{
                        width: '95%',
                        height: '60%',

                    }} >
                        <FlatList
                            data={photo}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={(item) => (<RenderItem item={item} loading={loading} rover={rover} />)}
                        />
                    </View>
            }

            <View style={styles.boxPage}>
                <View style={styles.buttonContainer}>
                    {page <= 1 ? (
                        <View style={styles.placeholder} /> // Espacio reservado para mantener la alineación
                    ) : (
                        <TouchableOpacity onPress={backPage}>
                            <RenderText text={"Atras"} size={20} />
                        </TouchableOpacity>
                    )}
                </View>

                <RenderText text={page} size={20} />

                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={nextPage}>
                        <RenderText text={"Siguiente"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
};
export default HomeScreen

const styles = StyleSheet.create({

    container: {
        height: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    conteinerButton: {
        width: '90%',
        justifyContent: 'space-around',
        flexDirection: 'row',

    },
    boxPage: {
        padding: 7,
        backgroundColor: 'orange',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0
    },
    // boxPage: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'space-between',
    //     width: '100%',
    // },
    buttonContainer: {
        flex: 1,
        alignItems: 'center', // Centra el botón o el espacio reservado
    },
    placeholder: {
        width: '100%', // Ancho para ocupar espacio similar al botón
        height: 20, // Altura similar al texto del botón para mantener la alineación vertical
    },
});