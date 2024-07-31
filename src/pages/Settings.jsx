import { View, Text, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Settings = () => {

    const navigation = useNavigation()

    return (

        <View>
            <Text>Settings</Text>
            <Button title='ir a home' onPress={() => navigation.navigate('Home')} />
        </View>
    )
}

export default Settings