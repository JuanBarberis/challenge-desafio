import { View, StyleSheet } from 'react-native'
import React from 'react'
import dateFilter from '../../utils/dateFilter';
import CustomIcon from '../customIcon/CustomIcon';
import CustomPicker from '../customPicker/CustomPicker';
import cameraRover from '../../utils/cameraRover';
import RenderText from '../renderText/RenderText';
import CustomButton from '../customButton/CustomButtom';
import { SelectList } from 'react-native-dropdown-select-list';
import CustomSlider from '../customSlider/CustomSlider';

const ComponentFilter = ({
    setPhoto,
    setPage,
    setCamera,
    setModalVisible,
    modalVisible,
    setTypeFilter,
    typeFilter,
    rover,
    setRover,
    sol,
    setSol,
    earthDate,
    setEarthDate

}) => {

    const dropdownData = cameraRover.map(item => ({
        key: item.key,
        value: item.name,
    }));

    const handleCameraSelect = (selectedKey) => {
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
        value: item.name,
    }));

    return (
        <View style={{
            width: '100%',
            flex: 1,
            marginTop: 30,
            alignItems: 'center'
        }}
        >
            <View 
            style={{
                width: '100%',
                height: 80,
                justifyContent:'space-around',
                alignItems: 'center',
                gap:8

            }}
            >

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
                    placeholder={"Seleccione tipo de hora para filtrar"}
                    search={false}
                    boxStyles={{
                        width: '98%',
                        height: 45,
                        position: 'relative',
                        zIndex: 1,
                    }}
                    dropdownStyles={{
                        position: 'absolute',
                        top: 40,
                        maxHeight: 200,
                        width: '98%',
                        zIndex: 3,
                        backgroundColor: 'white'
                    }}
                    save='value'
                />
            </View>


            {
                typeFilter === 'Martial Sol' &&
                (
                    <>
                        {
                            !rover
                            &&
                            <RenderText
                                text={'Seleccione un rover para cargar las imagenes'}
                                size={16}
                            />
                        }
                        < View style={styles.conteinerButton}>
                            <CustomButton
                                text={'Curiosity'}
                                color={'orange'}
                                width={'30%'}
                                callback={() => setRover('curiosity')}
                            />
                            <CustomButton
                                text={'Spirit'}
                                color={'orange'}
                                width={'30%'}
                                callback={() => setRover('spirit')}
                            />
                            <CustomButton
                                text={'Opportunity'}
                                color={'orange'}
                                width={'30%'}
                                callback={() => setRover('opportunity')}
                            />
                        </View>
                        <View style={{
                            width: '98%',
                            alignItems: 'center',
                            marginBottom: 10,
                            justifyContent: 'space-around'
                        }}
                        >

                            <RenderText
                                text={`SOL - ${sol}`}
                                size={20}
                                weight={'bold'}
                            />
                            <CustomSlider
                                width='100%'
                                color='orange'
                                onValueChange={(e) => setSol(e)}
                                value={sol}
                                maximumValue={3200}
                                minimumValue={100}
                                size='large'
                            />
                            <View
                                style={styles.boxFavorite}
                            >
                                < SelectList
                                    data={dropdownData}
                                    setSelected={(val) => {
                                        handleCameraSelect(val);
                                    }}
                                    placeholder="Seleccione una cámara"
                                    search={false}
                                    boxStyles={{
                                        width: '95%',
                                        height: 45,
                                        position: 'relative',
                                        zIndex: 1,
                                    }}
                                    dropdownStyles={{
                                        position: 'absolute',
                                        top: 40,
                                        maxHeight: 200,
                                        width: '95%',
                                        zIndex: 1,
                                        backgroundColor: 'white'
                                    }}
                                    save='value'
                                />
                                <CustomIcon
                                    name={'favorite'}
                                    size={25}
                                    color={'orange'}
                                    callback={() => setModalVisible(!modalVisible)}
                                    type={'materialIcons'}
                                />
                            </View>

                        </View>
                    </>
                )
            }
            {
                typeFilter === 'Earth date' &&

                <View
                    style={styles.boxFavoriteEarth}
                >
                    <CustomPicker
                        onDateChange={(e) => setEarthDate(e)}
                        placeholder={'Ingrese una fecha'}
                        label={'fecha'}
                    />
                    <CustomIcon
                        name={'favorite'}
                        size={25}
                        color={'orange'}
                        callback={() => setModalVisible(!modalVisible)}
                        type={'materialIcons'}
                    />
                </View>

            }

        </View>
    )
}

export default ComponentFilter
const styles = StyleSheet.create({

    conteinerButton: {
        width: '98%',
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    boxFavorite: {
        width: '98%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxFavoriteEarth: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    }
});