import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import RenderText from '../renderText/RenderText'

const RenderItem = ({ item }) => {

    const photo = item.img_src

    return (

        <View style={{
            width: 120,
            height: '40%',

        }}>
            <Image
                source={{ uri: photo }}
                width={'100%'}
                height={120}
                resizeMode='cover'
                style={{
                    borderRadius: 2,
                }}

            />

        </View>

    )
}

export default RenderItem