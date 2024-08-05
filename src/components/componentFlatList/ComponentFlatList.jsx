import { View, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import RenderText from '../renderText/RenderText'
import RenderItem from '../renderItem/RenderItem'

const ComponentFlatList = ({
    loading,
    photo
}) => {
    
    return (
        <>
            {
                loading ?

                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1
                        }}>
                        <ActivityIndicator
                            color={'orange'}
                            size={'large'}
                        />
                    </View>

                    :
                    <View
                        style={{
                            width: '100%',
                            marginTop: 5,
                            flex: 2,

                        }}
                    >
                        {
                            photo?.length === 0 ?
                                <View
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1
                                    }}>
                                    <RenderText
                                        text={'No hay imagenes para mostrar'}
                                        size={22}
                                    />
                                </View>
                                :
                                <FlatList
                                    contentContainerStyle={{
                                        paddingBottom: '20%',
                                        paddingTop: '3%'
                                    }}
                                    data={photo}
                                    keyExtractor={(item) => item.id.toString()}
                                    renderItem={({ item }) => (<RenderItem item={item} />)}
                                    numColumns={3}
                                    columnWrapperStyle={{
                                        justifyContent: 'space-around',
                                        marginBottom: 5
                                    }}
                                />
                        }
                    </View>
            }
        </>
    )
}

export default ComponentFlatList