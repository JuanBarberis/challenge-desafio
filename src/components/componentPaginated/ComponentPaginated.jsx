import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import RenderText from '../renderText/RenderText'
import CustomButton from '../customButton/CustomButtom'

const ComponentPaginated = ({
    typeFilter,
    getMarsRover,
    setPage,
    page,
    photo
}) => {
    return (
        <>
            {
                typeFilter && (
                    <View
                        style={styles.boxPage}
                    >
                        <CustomButton
                            text={'Buscar'}
                            callback={getMarsRover}
                            width={'98%'}
                            color={'orange'}
                        />
                        <View
                            style={styles.boxButtonPage}
                        >
                            <View
                                style={styles.buttonContainer}
                            >
                                {
                                    page > 1 &&
                                    <TouchableOpacity
                                        onPress={() => setPage(page - 1)}
                                    >
                                        <RenderText
                                            text={"Atras"}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                            <RenderText
                                text={page}
                                size={20}
                            />
                            <View
                                style={styles.buttonContainer}
                            >
                                {
                                    photo?.length >= 1 &&

                                    <TouchableOpacity
                                        onPress={() => setPage(page + 1)}
                                    >
                                        <RenderText
                                            text={"Siguiente"}
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                )

            }
        </>
    )
}

export default ComponentPaginated

const styles = StyleSheet.create({

    boxPage: {
        height: '10%',
        width: '100%',
        backgroundColor: '#FFDEAD',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 5,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    boxButtonPage: {
        width: '98%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 5
    },

});