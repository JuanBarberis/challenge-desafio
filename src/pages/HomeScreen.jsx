import { View, StyleSheet, } from 'react-native'
import React, { useState } from 'react'
import { API } from '../utils/apiCall'
import ComponentFilter from '../components/componetFilter/ComponentFilter.jsx';
import ComponentFlatList from '../components/componentFlatList/ComponentFlatList.jsx';
import ComponentPaginated from '../components/componentPaginated/ComponentPaginated.jsx';
import ComponentModal from '../components/componentModal/ComponentModal.jsx';
import ComponentActionSheet from '../components/componentActionSheet/ComponentActionSheet.jsx';

const HomeScreen = () => {

    const apiKey = 'kGRt15FiHbLqzI6YsEWK3V3Me6bFOVLfTbg2TZjS';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [actionSheetVisible, setActionSheetVisible] = useState(false);

    const [camera, setCamera] = useState(null)
    const [sol, setSol] = useState(100);
    const [photo, setPhoto] = useState([]);
    const [rover, setRover] = useState('curiosity');
    const [earthDate, setEarthDate] = useState('2023-06-06');
    const [typeFilter, setTypeFilter] = useState(null)
    const [page, setPage] = useState(1)


    const getMarsRover = async (data) => {

        setError(false);
        setLoading(true);

        try {

            let url = `/${data?.rover ? data?.rover : rover}/photos?api_key=${apiKey}`
            let type = data?.typeFilter ? data?.typeFilter : typeFilter

            if (type === 'Earth date') {
                url += `&earth_date=${data?.earthDate ? data?.earthDate : earthDate}&page=${data?.page ? data?.page : page}`
            } else if (type === 'Martial Sol') {
                url += `&sol=${data?.sol ? data?.sol : sol}&page=${data?.page ? data?.page : page}`
                if (camera) {
                    url += `&camera=${data?.camera ? data?.camera : camera}`
                }
            }
            const res = await API.get(url);

            setPhoto(res?.data?.photos);


        } catch (error) {
            console.error('Error fetching Mars photos:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <View style={styles.container}>
                <ComponentFilter
                    setPhoto={setPhoto}
                    setPage={setPage}
                    setCamera={setCamera}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    typeFilter={typeFilter}
                    setTypeFilter={setTypeFilter}
                    rover={rover}
                    setRover={setRover}
                    sol={sol}
                    setSol={setSol}
                    earthDate={earthDate}
                    setEarthDate={setEarthDate}
                />
                <ComponentFlatList
                    loading={loading}
                    photo={photo}
                />
                <ComponentPaginated
                    typeFilter={typeFilter}
                    getMarsRover={getMarsRover}
                    setPage={setPage}
                    page={page}
                    photo={photo}
                />
                <ComponentActionSheet
                    getMarsRover={getMarsRover}
                    setActionSheetVisible={setActionSheetVisible}
                    actionSheetVisible={actionSheetVisible}
                    setCamera={setCamera}
                    setRover={setRover}
                    setEarthDate={setEarthDate}
                    setTypeFilter={setTypeFilter}
                    setPage={setPage}
                    setSol={setSol}
                    typeFilter={typeFilter}

                />
            </View >
            <ComponentModal
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
                camera={camera}
                rover={rover}
                sol={sol}
                earthDate={earthDate}
                typeFilter={typeFilter}
                page={page}
            />

        </>

    );
};
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },
});