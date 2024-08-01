import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import RenderText from '../renderText/RenderText'

const RenderItem = ({ item, loading, rover }) => {
    const photo = item.item.img_src

    console.log(rover, 'rover en item')
    console.log(item, 'item en item')
    console.log(photo, 'item en item')
    return (

        <View style={{
            width: '100%',
            height: 500,
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 10,

        }}>
            <Image
                source={{ uri: photo }}
                width={'100%'}
                height={500}
                resizeMode='cover'
                style={{
                    borderRadius:5
                }}

            />

        </View>

    )
}

export default RenderItem