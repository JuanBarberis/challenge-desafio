import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SelectDropType = ({
    dateFilter,
    typeFilter,
    setTypeFilter
}) => {
    return (
        <View>
            <SelectDropdown
                data={dateFilter}
                onSelect={
                    (selectedItem) => {
                        setTypeFilter(selectedItem?.name)
                    }}
                renderButton={(selectedItem, isOpened,) => {
                    
                    return (
                        <View
                            style={styles.dropdownButtonStyle}
                        >
                            <Text
                                style={styles.dropdownButtonTxtStyle}
                            >
                                {(selectedItem && selectedItem.name) || 'Seleccione una fecha'}
                            </Text>
                            <Icon
                                name={isOpened ? 'chevron-up' : 'chevron-down'}
                                style={styles.dropdownButtonArrowStyle}
                            />
                        </View>
                    );
                }}
                renderItem={(item, isSelected) => {
                    return (
                        <View
                            style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}
                        >
                            <Text
                                style={styles.dropdownItemTxtStyle}
                            >
                                {item.name}
                            </Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
        </View>
    )
}

export default SelectDropType

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: '98%',
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'center'
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});