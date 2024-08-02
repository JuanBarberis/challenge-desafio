import { View, Text } from 'react-native'
import React from 'react'

const RenderText = ({ size, color, callback, weight, text }) => {
    return (
        <View>
            <Text 
                style={{ fontSize: size, fontWeight: weight, color: color }}
                onPress={callback}
            >
                {text}
            </Text>
        </View>
    );
}

export default RenderText;