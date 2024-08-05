import { View, StyleSheet } from 'react-native'
import React from 'react'
import dateFilter from '../../utils/dateFilter';
import CustomIcon from '../customIcon/CustomIcon';
import CustomPicker from '../customPicker/CustomPicker';
import cameraRover from '../../utils/cameraRover';
import RenderText from '../renderText/RenderText';
import CustomButton from '../customButton/CustomButtom';
import CustomSlider from '../customSlider/CustomSlider';
import SelectDrop from './SelectDrop';
import SelectDropType from './SelectDropType';

const ComponentFilter = ({
    setCamera,
    setModalVisible,
    modalVisible,
    setTypeFilter,
    typeFilter,
    rover,
    setRover,
    sol,
    setSol,
    setEarthDate,
    camera,

}) => {

    return (
        <View style={{
            width: '100%',
            height: '30%',
            flex: 1,
            marginTop: 30,
            alignItems: 'center'
        }}
        >
            {/* <View
                style={{
                    width: '100%',
                    height: 80,
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 20

                }}
            > */}
            <RenderText
                size={24}
                color="orange"
                weight="bold"
                text="MARS ROVER"
            />
            <View
                style={{
                    width: '100%',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <SelectDropType
                    dateFilter={dateFilter}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                />
            </View>
            {/* </View> */}

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

                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                marginBottom: 10,
                                flex: 1,
                                zIndex: 1,
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
                        </View>

                        <View
                            style={{
                                width: '90%',
                                alignItems: 'center',
                                marginBottom: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                                flex: 1
                            }}
                        >
                            <SelectDrop
                                cameraFilter={cameraRover}
                                camera={camera}
                                setCamera={setCamera}
                            />
                            <CustomIcon
                                name={'favorite'}
                                size={25}
                                color={'orange'}
                                callback={() => setModalVisible(!modalVisible)}
                                type={'materialIcons'}
                            />

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
        heigh: '30%',
        backgroundColor: 'white',
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',

    },
    boxFavorite: {
        // height:'10%',
        flex: 1,
        width: '50%',
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
    },

});