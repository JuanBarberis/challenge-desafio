import { View, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { API } from '../utils/apiCall'

import CustomButtom from '../components/customButton/CustomButtom.jsx';
import RenderText from '../components/renderText/RenderText';
import CustomSlider from '../components/customSlider/CustomSlider';
import RenderItem from '../components/renderItem/RenderItem';
import cameraRover from '../utils/cameraRover.js'
import { SelectList } from 'react-native-dropdown-select-list';
import CustomPicker from '../components/customPicker/CustomPicker.jsx';
import dateFilter from '../utils/dateFilter.js';

const HomeScreen = () => {

    const navigation = useNavigation()
    const apiKey = 'kGRt15FiHbLqzI6YsEWK3V3Me6bFOVLfTbg2TZjS'; //ApiKey que se envia a la api
    const [loading, setLoading] = useState(false); //Estado para contrar que carguen las imagenes
    const [error, setError] = useState(false); //Estado de error
    const [camera, setCamera] = useState(null) // Estado para filtrar por camaras en Sol mariciano
    const [sol, setSol] = useState(100); //Fecha segun el sol para filtrar con sol marciano
    const [photo, setPhoto] = useState([]); // Estado para almacenar las imagenes de api
    const [rover, setRover] = useState('curiosity'); // Estado para filtrar segun los (curiosity,spirit,opportunity)
    const [earthDate, setEarthDate] = useState(''); // Estado para la fecha seleccionada

    const [typeFilter, setTypeFilter] = useState(null) //Estado para seleccionar type de fecha a filtrar

    const [numColumns, setNumColumns] = useState(3); // Estado para el número de columnas
    const [page, setPage] = useState(1) //Estado para paginar las imagenes


    const getMarsRover = async () => {
        setError(false);
        setLoading(true);
        try {
            let res;
            if (typeFilter === 'Earth date') {
                res = await API.get(`/${rover}/photos?earth_date=${earthDate}&api_key=${apiKey}&page=${page}`);
                if (res.status) {
                    setPhoto([])

                }
            } else if (typeFilter === 'Martial Sol') {
                if (!camera) {
                    res = await API.get(`/${rover}/photos?sol=${sol}&page=${page}&api_key=${apiKey}`);
                }
                else {
                    res = await API.get(`/${rover}/photos?sol=${sol}&page=${page}&camera=${camera}&api_key=${apiKey}`);
                }
            }
            setPhoto(res?.data?.photos);
        } catch (error) {
            console.error('Error fetching Mars photos:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    //funcion que mapea el objeto con las camaras
    const dropdownData = cameraRover.map(item => ({
        key: item.key,
        value: item.name, // o cualquier propiedad que quieras mostrar en la lista
    }));

    const handleCameraSelect = (selectedKey) => {
        // Busca la cámara en el objeto cameraRover
        const selectedCamera = cameraRover.find(item => item.name === selectedKey);
        if (selectedCamera) {
            setCamera(selectedCamera.camera);
        }
    };

    const handleTypeDate = (selectedTypeDate) => {
        const typeDate = dateFilter.find((item) => item.name === selectedTypeDate);
        if (typeDate) {
            setTypeFilter(typeDate.name)
            setPhoto([])
            setPage(1)
        }
    }

    const dropdownDate = dateFilter.map(item => ({
        key: item.key,
        value: item.name, // o cualquier propiedad que quieras mostrar en la lista
    }));


    //funcion para setear la fecha segun el sol
    const handleValueChange = (value) => {
        setSol(value);
    };
    // Función para setear la fecha desde el picker
    const handleDateChange = (date) => {
        setEarthDate(date);
    };

    //funcion para setear pagina siguiente
    const nextPage = () => {
        setPage(page + 1)
    }
    //funcion para volver a la pagina anterior
    const backPage = () => {
        setPage(page - 1)
    }

    useEffect(() => {
        getMarsRover()
    }, [rover, camera, sol, page, earthDate, typeFilter])

    return (

        <View style={styles.container}>

            <RenderText
                size={24}
                color="orange"
                weight="bold"
                text="MARS ROVER"
            />

            < SelectList
                data={dropdownDate}
                setSelected={(val) => {
                    handleTypeDate(val);
                }}
                placeholder="Seleccione tipo de hora para filtrar"
                search={false}
                boxStyles={{
                    width: '95%',
                    height: 45,
                    position: 'relative', // Para que el dropdown aparezca relativo al botón
                    zIndex: 1, // Para que el dropdown se muestre sobre otros componentes
                }}
                dropdownStyles={{
                    position: 'absolute', // Mantiene el dropdown sobre otros componentes
                    top: 50, // Ajusta según la posición que desees
                    maxHeight: 200, // Limita la altura del dropdown para evitar el desplazamiento
                    width: '95%',
                    zIndex: 3,
                    backgroundColor: 'white'
                }}
                save='value'
            />
            {
                typeFilter === 'Martial Sol' &&
                (
                    <>
                        {
                            !rover && (<RenderText text={'Seleccione un rover para cargar las imagenes'} size={16} />)

                        }
                        < View style={styles.conteinerButton}>
                            <CustomButtom text={'Curiosity'} color={'orange'} width={'30%'} callback={() => setRover('curiosity')} />
                            <CustomButtom text={'Spirit'} color={'orange'} width={'30%'} callback={() => setRover('spirit')} />
                            <CustomButtom text={'Opportunity'} color={'orange'} width={'30%'} callback={() => setRover('opportunity')} />
                        </View>
                        <View style={{ width: '95%', alignItems: 'center', marginBottom: 10, justifyContent: 'space-around', gap: 5 }}>

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
                            < SelectList
                                data={dropdownData}
                                setSelected={(val) => {
                                    handleCameraSelect(val);
                                }}
                                placeholder="Seleccione una cámara"
                                search={false}
                                boxStyles={{
                                    width: '100%',
                                    height: 45,
                                    position: 'relative', // Para que el dropdown aparezca relativo al botón
                                    zIndex: 1, // Para que el dropdown se muestre sobre otros componentes
                                }}
                                dropdownStyles={{
                                    position: 'absolute', // Mantiene el dropdown sobre otros componentes
                                    top: 50, // Ajusta según la posición que desees
                                    maxHeight: 200, // Limita la altura del dropdown para evitar el desplazamiento
                                    width: '95%',
                                    zIndex: 1,
                                    backgroundColor: 'white'
                                }}
                                save='value'
                            // defaultOption={{ key: 10, value: 'All Camera' }}
                            />
                        </View>
                    </>
                )
            }
            {
                typeFilter === 'Earth date' &&
                (
                    <View style={{ width: '100%', marginTop: 10 }}>
                        <CustomPicker onDateChange={handleDateChange} placeholder={'Ingrese una fecha'} label={'fecha'} />
                    </View>
                )
            }


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
                            photo?.length === 0 ?
                                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                    <RenderText text={'No hay imagenes para mostrar'} size={22} />
                                </View>
                                :
                                <FlatList
                                    data={photo}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (<RenderItem item={item} />)}
                                    numColumns={numColumns}
                                    // key={numColumns} // Cambiar el key cuando se cambia numColumns
                                    columnWrapperStyle={{ justifyContent: 'space-around', marginBottom: 5 }}
                                />
                        }
                    </View>
            }

            {
                typeFilter && (
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
                            {
                                photo <= 1 ?
                                    (
                                        <View style={styles.placeholder} /> // Espacio reservado para mantener la alineación
                                    ) : (
                                        <TouchableOpacity onPress={nextPage}>
                                            <RenderText text={"Siguiente"} size={20} />
                                        </TouchableOpacity>
                                    )
                            }
                        </View>
                    </View>
                )

            }


        </View >
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
    buttonContainer: {
        flex: 1,
        alignItems: 'center', // Centra el botón o el espacio reservado
    },
    placeholder: {
        width: '100%', // Ancho para ocupar espacio similar al botón
        height: 20, // Altura similar al texto del botón para mantener la alineación vertical
    },
});