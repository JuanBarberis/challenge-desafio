import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DataTimePicker from '@react-native-community/datetimepicker'
import RenderText from '../renderText/RenderText';
import formatDate from '../../utils/formatDate';

const CustomPicker = ({ onDateChange, placeholder, label }) => {

    const [date, setDate] = useState(null || new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date')

    const onChange = (e, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);

        // Formatear la fecha como AAAA-MM-DD
        const formattedDate = currentDate.toISOString().split('T')[0];
        onDateChange(formattedDate);
    };

    const showMode = (modeToShow) => {
        setShow(true);
        setMode(modeToShow)
    }

    return (
        <View style={style.containerPicker}>
            <Text style={style.label}>Fecha</Text>
            <TouchableOpacity style={style.buttonPicker} onPress={() => showMode('date')}>
                <RenderText text={placeholder ? formatDate(date) : placeholder} size={16} />
                {
                    show && (

                        <DataTimePicker
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            onChange={onChange}
                        />
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default CustomPicker

const style = StyleSheet.create({
    containerPicker: {
        width: '90%',
        alignItems: 'center',
        height:100,
    },
    buttonPicker: {
        borderWidth: 1,
        borderColor: 'grey',
        width: '95%',
        height: 45,
        borderRadius: 10,
        alignItems: 'flex-start',
        paddingLeft: 20,
        justifyContent: 'center'
    },
    label: {
        alignSelf:'flex-start',
        fontSize:16,
        fontWeight:'bold',
        marginLeft:10,
        marginTop:10,

    }
})