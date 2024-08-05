import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({
    width = '100%',
    label,
    value,
    onChangeText,
    placeholder = 'Enter text'

}) => {
    return (
        <View style={{ width }}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = StyleSheet.create({

    label: {
        fontSize: 18,
        color: 'black',
        marginBottom:5,
        marginTop:20
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        backgroundColor: 'white',
        fontSize:16
    },
});

export default CustomTextInput;
