import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import Tabs from '../components/tabs';
import moment from 'moment';

export default function Training({ navigation }) {
    const [refreshing, setRefreshing] = useState();
    const [training, setTraining] = useState([]);

    useEffect(() => {
        getTraining();
    }, []);

    function getTraining() {
        AsyncStorage.getItem('student').then(async _student => {
            setRefreshing(true);
            const student = JSON.parse(_student);
            const response = await api.get(`/api/training?student_id=${student.id}`);
            setTraining(response.data.data);
            setRefreshing(false);
        });
    }

    function getDuration(start, finish) {
        const duration = moment.duration(moment(finish).diff(moment(start)));
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        return `${hours}h ${minutes}m ${seconds}s`
    }

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getTraining} />
                }
                style={styles.container}>
                <Text style={styles.title}>Seus Treinos</Text>
                {
                    (training && training.length > 0)
                        ? training.map(_training => (
                            <>
                                <View key={_training.id} style={styles.card}>
                                    <Text style={styles.name}>{_training.gym.name}</Text>
                                    <Text style={styles.email}>{moment(_training.created_at).format('DD/MM/YYYY')}</Text>
                                    <Text style={styles.email}>
                                        {moment(_training.start_time).format('HH:mm')} - {moment(_training.finish_time).format('HH:mm')} ({getDuration(_training.start_time, _training.finish_time)})
                                    </Text>
                                </View>
                            </>
                        ))
                        : (
                            <Text style={styles.text}>Você não possui treinos</Text>
                        )
                }
            </ScrollView>
            <Tabs navigation={navigation} menuActive="Training" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        paddingVertical: 20
    },
    title: {
        fontSize: 20,
        color: '#ff5c00',
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        marginTop: 30,
        marginBottom: 20
    },
    card: {
        backgroundColor: '#222',
        marginVertical: 5,
        padding: 20
    },
    name: {
        fontSize: 20,
        color: '#fff'
    },
    email: {
        fontSize: 16,
        color: '#fff'
    },
    gymName: {
        fontSize: 16,
        marginTop: 10,
        color: '#fff'
    }
});