import { View, Text } from 'react-native'
import React from 'react'
import CustomIcon from '../customIcon/CustomIcon'
import CustomActionSheet from '../customActionSheet.jsx/CustomActionSheet'

const ComponentActionSheet = ({
    actionSheetVisible,
    getMarsRover,
    setActionSheetVisible,
    setCamera,
    setRover,
    setEarthDate,
    setTypeFilter,
    setPage,
    setSol,
    typeFilter
}) => {
    return (
        <>

            <View
                style={{
                    position: 'absolute',
                    top: 15,
                    right: 5
                }}
            >
                {
                    typeFilter &&
                    <CustomIcon
                        size={35}
                        name={'dots-vertical'}
                        callback={() => setActionSheetVisible(true)}
                    />
                }
            </View>

            <CustomActionSheet
                visible={actionSheetVisible}
                onClose={() => setActionSheetVisible(false)}
                onSelect={(option) => {
                    getMarsRover(option)
                    setActionSheetVisible(false);
                    setCamera(option?.camera)
                    setRover(option?.rover)
                    setEarthDate(option?.earthDate)
                    setTypeFilter(option?.typeFilter)
                    setPage(option?.page)
                    setSol(option?.sol)

                }}
            />
        </>
    )
}

export default ComponentActionSheet