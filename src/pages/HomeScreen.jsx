import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { API } from '../utils/apiCall'

import CustomButtom from '../components/CustomButtom';
import RenderText from '../components/renderText/RenderText';
import CustomSlider from '../components/customSlider/CustomSlider';
import RenderItem from '../components/renderItem/RenderItem';
import cameraRover from '../utils/cameraRover.js'
import { SelectList } from 'react-native-dropdown-select-list';

const HomeScreen = () => {

    const navigation = useNavigation()
    const apiKey = 'GUbMFE1WeBBiksXj9mKDbdDXKtPNVySIXZJ6pSrK';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [camera, setCamera] = useState(null)
    const [sol, setSol] = useState(100);
    const [photo, setPhoto] = useState([]);
    const [rover, setRover] = useState(null);

    const [numColumns, setNumColumns] = useState(3); // Estado para el número de columnas
    const [page, setPage] = useState(1)

    //funcion que realiza la consulta a la api
    const getMarsRover = async () => {
        if (rover !== null) {
            setLoading(true);
            setError(false);

            try {
                if (camera != null) {
                    const res = await API.get(`/${rover}/photos?sol=${sol}&page=${page}&api_key=${apiKey}&camera=${camera}`);
                    setPhoto(res.data.photos);
                } else {
                    const res = await API.get(`/${rover}/photos?sol=${sol}&page=${page}&api_key=${apiKey}`);
                    setPhoto(res.data.photos);
                }
            } catch (error) {
                console.error('Error fetching Mars photos:', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCameraSelect = (selectedKey) => {
        // Busca la cámara en el objeto cameraRover
        const selectedCamera = cameraRover.find(item => item.name === selectedKey);
        if (selectedCamera) {
            setCamera(selectedCamera.camera);
        }
    };
    //funcion que mapea el objeto con las camaras
    const dropdownData = cameraRover.map(item => ({
        key: item.key,
        value: item.name, // o cualquier propiedad que quieras mostrar en la lista
    }));


    //funcion para setear la fecha segun el sol
    const handleValueChange = (value) => {
        setSol(value);
    };

    //funcion para setear pagina siguiente
    const nextPage = () => {
        setPage(page + 1)
    }
    //funcion para volver a la pagina anterior
    const backPage = () => {
        setPage(page - 1)
    }

    // Función para cambiar el número de columnas
    const toggleColumns = () => {
        setNumColumns(prev => (prev === 2 ? 3 : 2)); // Cambia entre 2 y 3 columnas
    };

    useEffect(() => {
        getMarsRover()
    }, [rover, camera, sol, page])

    console.log('camera', camera)

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
                    <View style={{ width: '95%', alignItems: 'center' }}>
                        <RenderText text={`SOL - ${sol}`} size={20} weight={'bold'} />
                        <CustomSlider
                            width='100%'
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

            <SelectList
                data={dropdownData}
                setSelected={(val) => {
                    handleCameraSelect(val);
                }}
                placeholder="Seleccione una cámara"
                search={false}
                boxStyles={{
                    width: '90%',
                    position: 'relative', // Para que el dropdown aparezca relativo al botón
                    zIndex: 1, // Para que el dropdown se muestre sobre otros componentes
                }}
                dropdownStyles={{
                    position: 'absolute', // Mantiene el dropdown sobre otros componentes
                    top: 50, // Ajusta según la posición que desees
                    maxHeight: 200, // Limita la altura del dropdown para evitar el desplazamiento
                    width: '90%',
                    zIndex: 1,
                    backgroundColor: 'white'
                }}
                save='value'
                defaultOption={{ key: '', value: '' }}
            />

            {
                loading ?
                    <>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <ActivityIndicator color={'orange'} size={'large'} />
                        </View>
                    </>
                    :
                    <View style={{
                        width: '90%',
                        height: '50%',
                        marginTop: 5,
                    }} >
                        {
                            photo.length === 0 ?
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <RenderText text={'No hay imagenes para mostrar'} size={22} />
                                </View>
                                :
                                // <FlatList
                                //     data={photo}
                                //     keyExtractor={(item) => item.id.toString()}
                                //     renderItem={(item) => (<RenderItem item={item} loading={loading} rover={rover} />)}
                                //     numColumns={numColumns}
                                //     columnWrapperStyle={{ justifyContent: 'space-around',marginBottom:10,flexDirection:'row' }}
                                // />
                                <FlatList
                                    data={photo}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (<RenderItem item={item} />)}
                                    numColumns={numColumns}
                                    key={numColumns} // Cambiar el key cuando se cambia numColumns
                                    columnWrapperStyle={{ justifyContent: 'space-around',marginBottom:5}}
                                />
                        }
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
        width: '95%',
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