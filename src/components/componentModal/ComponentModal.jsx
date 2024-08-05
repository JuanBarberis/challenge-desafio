import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import CustomModal from '../customModal/CustomModal'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../state/search/searchSlices'
import CustomTextInput from '../customInput/CustomInput'

const ComponentModal = ({
    setModalVisible,
    modalVisible,
    rover,
    camera,
    sol,
    earthDate,
    typeFilter,
    page,
}) => {

    const dispatch = useDispatch()
    const [name, setName] = useState('')

    const handleSave = () => {
        dispatch(addFilter({
            rover: rover,
            camera: camera,
            sol: sol,
            earthDate: earthDate,
            typeFilter: typeFilter,
            page: page,
            nombre: name
        }))
        setModalVisible(false);
    }

    return (
        <CustomModal
            visible={modalVisible}
            onClose={() => {
                setModalVisible(!modalVisible)
                setName('')
            }}
            title=""
            titleClsBtn={'Cancelar'}
            titleSvBtn={'Guardar'}
            callback={handleSave}
        >
            <View
                style={{
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 20,
                        fontWeight: '500'
                    }}>
                    Estas seguro que quieres guardar como favorita esta busquedad?
                </Text>
                <CustomTextInput
                    label={'Nombre'}
                    value={name}
                    onChangeText={(e) => setName(e)}
                    placeholder='ingrese un nombre'
                    width='100%'
                />
            </View>
        </CustomModal>
    )
}

export default ComponentModal