import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const CustomSlider = ({
    value,
    onValueChange,
    minimumValue = 100,
    maximumValue = 3200,
    color = 'blue',
    size = 'medium',
    width = '100%',
    style
}) => {

    const sliderStyles = [
        styles[size],
        style,
        
    ];

    const handleValueChange = (newValue) => {
        const roundedValue = Math.round(newValue);
        onValueChange(roundedValue);
    };

    return (
        <View style={[styles.container, { width }]}>
            <Slider
                value={value}
                onValueChange={handleValueChange}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor={color}
                thumbTintColor={color}
                step={100} // Ensure the slider moves in steps of 1
                style={sliderStyles}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    small: {
        height: 20,
    },
    medium: {
        height: 40,
    },
    large: {
        height: 60,
    },
});

export default CustomSlider;
