import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';

import api from '../services/api';

export default function Gyms() {
    const [gyms, setGyms] = useState();
    const [refreshing, setRefreshing] = useState();

    useEffect(() => {
        getGyms();
    }, []);

    async function getGyms() {
        setRefreshing(true);
        const responseGyms = await api.get('/api/gyms');
        setGyms(responseGyms.data.data);
        setRefreshing(false);
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getGyms} />
                }>
                <Text style={styles.title}>Suas Academias</Text>
                {gyms.map(gym => (
                    <View key={gym.id} style={styles.cardMail}>
                        <Text style={styles.mailId}>{gym.id}</Text>
                        <Text style={styles.label}>Nome</Text>
                        <Text style={styles.cardText}>{gym.name}</Text>
                    </View>
                ))}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        paddingTop: 20
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
    }
});