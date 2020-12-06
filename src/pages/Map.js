import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync, watchPositionAsync } from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { getDistanceFromLatLonInKm } from '../utils/util.utils';
import Tabs from '../components/tabs';
import moment from 'moment';

export default function Map({ navigation }) {

    const [initialRegion, setInitialRegion] = useState();
    const [currentLocation, setCurrentLocation] = useState();
    const [currentGym, setCurrentGym] = useState();
    const [showModalStart, setShowModalStart] = useState();
    const [showModalTraining, setShowModalTraining] = useState();
    const [currentTraining, setShowCurrenTraining] = useState();
    const [timeInterval, setTimeInterval] = useState();

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enabledHighAccuracy: true
                });

                const { latitude, longitude } = coords;

                setCurrentLocation({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });
                setInitialRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                });

                watchPositionAsync({
                    accuracy: 5,
                    timeInterval: 2000,
                    distanceInterval: 1
                }, (coordinate) => {
                    setCurrentLocation(coordinate.coords);
                    checkDistance();
                });
            }
        }

        loadInitialPosition();
        getGym();
        getCurrentTraining();
        checkDistance();
    }, []);

    function checkDistance() {
        if (currentGym) {
            const current = { lat: currentLocation.latitude, lng: currentLocation.longitude };
            const positionGym = { lat: currentGym.lat, lng: currentGym.lng };
            console.log('yhu', positionGym,'as', current);

            console.log('haha', getDistanceFromLatLonInKm(current, positionGym));
            if (getDistanceFromLatLonInKm(current, positionGym) < 100) {
                setShowModalStart(true);
            }
        }
    }

    async function getGym() {
        const _student = await AsyncStorage.getItem('student');
        const response = await api.get(`/api/gyms/${JSON.parse(_student).gym_id}`);
        setCurrentGym(response.data);
    }

    async function getCurrentTraining() {
        AsyncStorage.getItem('student').then(async (_student) => {
            if (_student) {
                const { id } = JSON.parse(_student);
                const response = await api.get(`/api/training/current?student_id=${id}`);
                if (response.data) {
                    setShowModalTraining(true);
                    setShowModalStart(false);
                    setShowCurrenTraining(response.data);
                } else {
                    setShowModalTraining(false);
                }
                checkDistance();
            }
        });
    }

    async function startTraining() {
        AsyncStorage.getItem('student').then(async (_student) => {
            const { id, gym_id } = JSON.parse(_student);
            const response = await api.post(`/api/training`, {
                gym_id,
                student_id: id
            });
            getCurrentTraining(id);
        });
    }

    async function finishTraining() {
        const response = await api.put(`/api/training/${currentTraining.id}`, {
            finish_time: new Date()
        });
        getCurrentTraining();
    }

    function getDuration(start) {
        const duration = moment.duration(moment().diff(moment(start)));
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${hours}h ${minutes}m ${seconds}s`
    }

    if (!currentLocation) return null

    return (
        <>
            <MapView initialRegion={initialRegion} style={styles.map}>
                <Marker key="current" coordinate={currentLocation}>
                    <View style={styles.currentPositionBefore}>
                        <View style={styles.currentPosition} />
                    </View>
                </Marker>
                {currentGym &&
                    (<Marker key={currentGym.id} coordinate={{ latitude: currentGym.lat, longitude: currentGym.lng }} style={{ width: 100, height: 100 }}>
                        <View style={styles.markerGym}>
                            <Image style={styles.markerImage} source={{ uri: 'https://img.icons8.com/ios-filled/50/ffffff/dumbbell.png' }} />
                        </View>
                    </Marker>)
                }
            </MapView>
            {
                showModalStart && !showModalTraining && (
                    <View style={styles.modalStart}>
                        <Text style={styles.title}>Vai treinar?</Text>
                        <Text style={styles.subtitle}>Notamos que você está perto da sua academia.</Text>
                        <Text style={styles.subtitle}>Vai treinar agora?</Text>

                        <TouchableOpacity
                            onPress={startTraining}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Sim, realizar check-in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.link} onPress={() => setShowModalStart(false)}>
                            <Text style={styles.linkText}>Não, Talvez mais tarde</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            {
                showModalTraining && (
                    <View style={styles.modalTraining}>
                        <Text style={styles.title}>No pain, no gain!</Text>
                        <Text style={styles.subtitle}>Tempo de treino</Text>
                        {currentTraining && <Text style={styles.trainingTime}>{getDuration(currentTraining.start_time)}</Text>}

                        <TouchableOpacity
                            onPress={finishTraining}
                            style={styles.buttonFinish}>
                            <Text style={styles.buttonText}>Finalizar treino</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            <Tabs navigation={navigation} menuActive="Map" />
        </>
    )

}


const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    currentPositionBefore: {
        padding: 15,
        borderRadius: 50,
        backgroundColor: 'rgba(30,2,201,.45)'
    },
    currentPosition: {
        width: 15,
        height: 15,
        backgroundColor: '#1E02C9',
        borderRadius: 50
    },
    markerGym: {
        backgroundColor: '#FF5C00',
        width: 30,
        height: 30,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    markerImage: {
        width: 25,
        height: 25
    },
    trainingTime: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 50,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 22,
        textTransform: 'uppercase',
        marginBottom: 10
    },
    subtitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
        textTransform: 'uppercase',
        opacity: 0.65
    },
    modalStart: {
        position: 'absolute',
        bottom: 60,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: 200,
        padding: 20
    },
    modalTraining: {
        position: 'absolute',
        top: 30,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',
        minHeight: 200,
        padding: 20
    },
    button: {
        height: 50,
        backgroundColor: '#FF5C00',
        marginTop: 5,
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    link: {
        color: '#FF5C00',
        width: '100%'
    },
    linkText: {
        color: '#454545',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10,
        height: 30,
        textAlignVertical: 'center'
    },

    buttonFinish: {
        height: 50,
        backgroundColor: '#1E02C9',
        marginTop: 5,
        borderRadius: 50,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
});