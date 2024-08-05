import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const CustomIcon = ({ name, size, color, callback, type }) => {
    return (
        <TouchableOpacity onPress={callback}>
            {
                type === 'materialIcons'
                    ?
                    <MaterialIcons name={name} size={size} color={color} />
                    :
                    <MaterialCommunityIcons name={name} size={size} color={color} />
            }
        </TouchableOpacity>

    )
}

export default CustomIcon