import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, ScrollView, RefreshControl,Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../components/tabs';

import api from '../services/api';

export default function Gyms({ navigation }) {
    const [gyms, setGyms] = useState();
    const [refreshing, setRefreshing] = useState();

    useEffect(() => {
        getGyms();
    }, []);

    function getGyms() {
        AsyncStorage.getItem('owner').then(async _owner => {
            const owner = JSON.parse(_owner);
            setRefreshing(true);
            const responseGyms = await api.get(`/api/gyms?owner_id=${owner.id}`);
            setGyms(responseGyms.data.data || []);
            setRefreshing(false);
        });

    }

    return (
        <>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getGyms} />
                }>
                <Text style={styles.title}>Suas Academias</Text>
                {
                    (gyms && gyms.length > 0)
                        ? gyms.map(gym => (
                            <View key={gym.id} style={styles.cardMail}>
                                <Text style={styles.name}>{gym.name}</Text>
                                <Text style={styles.cardText}>{gym.address}</Text>
                                <View style={styles.doubleContent}>
                                    <View style={{ flexGrow: 1, flexBasis: '45%', marginRight: 10 }}>
                                        <Text style={styles.label}>Capacidade</Text>
                                        <Text style={styles.cardText}>{gym.capacity}</Text>
                                    </View>
                                    <View style={{ flexGrow: 1, flexBasis: '45%', marginLeft: 10 }}>
                                        <Text style={styles.label}>Alunos</Text>
                                        <Text style={styles.cardText}>{gym.__meta__.students_count}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                        : (
                            <Text style={styles.text}>Você não possui academias</Text>
                        )
                }
            </ScrollView>

            <TouchableOpacity style={styles.buttonNew} onPress={() => navigation.navigate('GymsStore')}>
                <Image style={styles.btnNewImage} source={{uri:"https://img.icons8.com/fluent-systems-regular/48/ffffff/plus-math.png"}}/>
            </TouchableOpacity>
            <Tabs navigation={navigation} menuActive="Gyms" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        paddingTop: 20,
    },
    loadButton: {
        width: '90%',
        height: 50,
        backgroundColor: '#252526',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 25,
        alignSelf: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        color: '#ff5c00',
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 20
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    cardMail: {
        backgroundColor: '#222',
        marginVertical: 5,
        padding: 20,
    },
    label: {
        opacity: .65,
        color: '#fff'
    },
    cardText: {
        fontSize: 16,
        color: '#fff'
    },
    mailId: {
        opacity: .5,
        marginBottom: 10,
        color: '#fff'
    },
    menuTop: {
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: '#fff',
        paddingHorizontal: 20,
        marginTop: 20
    },
    doubleContent: {
        flexDirection: 'row',
        maxWidth: '100%',
        marginTop: 15
    },
    buttonNew: {
        backgroundColor: '#ff5c00',
        position: 'absolute',
        bottom: 80,
        right: 10,
        height: 60,
        zIndex: 2,
        width: 60,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnNewImage: {
        width: 25,
        height: 25
    }
});