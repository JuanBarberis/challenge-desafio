// CustomModal.jsx
import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomModal = ({
    visible,
    onClose,
    children,
    title,
    callback,
    titleClsBtn,
    titleSvBtn,

}) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.contentContainer}>
                        {children}
                    </View>
                    <View style={styles.boxButton}>
                        <TouchableOpacity style={styles.buttonClose} onPress={onClose}>
                            <Text style={styles.buttonText}>{titleClsBtn}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={callback}>
                            <Text style={styles.buttonText}>{titleSvBtn}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        width:'100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '98%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boxChildren: {
        width: '100%',
        alignItems: 'center',
        textAlign: 'center'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center', // Centra los elementos children horizontalmente
        marginBottom: 20,
        width:'100%'
    },

    boxButton: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonClose: {
        width: '40%',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: '#FAC898',
        borderRadius: 5,
    },
    button: {
        width: '40%',
        alignItems: 'center',
        marginTop: 20,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default CustomModal;
