import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import CustomIcon from '../customIcon/CustomIcon';
import { useDispatch, useSelector } from 'react-redux';
import { removeSearch } from '../../state/search/searchSlices';

const CustomActionSheet = ({
    visible,
    onClose,
    onSelect,
    callback
}) => {

    const dispatch = useDispatch()
    const favorites = useSelector((store) => store.search.search)

    const handleDeleteFav = (name) => {
        dispatch(removeSearch(name))
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View
                style={styles.container}
            >
                <View
                    style={styles.sheet}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom:15
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                            }}
                        >
                            Favoritos
                        </Text>
                        <CustomIcon
                            name={'close'}
                            type={'materialIconItem'}
                            size={30}
                            callback={onClose}
                        />
                    </View>
                   
                    {
                        favorites.map((option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.option}
                                onPress={() => {
                                    onSelect(option);
                                    onClose();
                                }}
                            >
                                <Text
                                    style={styles.optionText}
                                >
                                    {option.nombre}
                                </Text>
                                <CustomIcon
                                    name={'trash-can'}
                                    type={'materialIconItem'}
                                    size={25}
                                    callback={() => handleDeleteFav(option.nombre)}
                                />
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        </Modal>
    );
};

export default CustomActionSheet;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    sheet: {
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
    },
    optionText: {
        fontSize: 20,
        textAlign: 'center',
    },
});
