import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({ width, callback, color, text }) => {
    return (
        <View style={{ width }}>
            <Button
                title={text}
                color={color}
                onPress={callback}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    },
    buttonText: {
        fontSize: 16,
    }
});

export default CustomButton;