import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import Tabs from '../components/tabs';

export default function Students({ navigation }) {
    const [refreshing, setRefreshing] = useState();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        getStudents();
    }, []);

    function getStudents() {
        AsyncStorage.getItem('owner').then(async _owner => {
            setRefreshing(true);
            const owner = JSON.parse(_owner);
            const response = await api.get(`/api/students?owner_id=${owner.id}`);
            setStudents(response.data.data);
            setRefreshing(false);
        });
    }

    return (
        <>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getStudents} />
                }
                style={styles.container}>
                <Text style={styles.title}>Seus alunos</Text>
                {
                    (students && students.length > 0)
                        ? students.map(student => (
                            <>
                                <View key={student.id} style={styles.card}>
                                    <Text style={styles.name}>{student.user.name}</Text>
                                    <Text style={styles.email}>{student.user.email}</Text>
                                    <Text style={styles.gymName}>Academia: {student.gym.name}</Text>
                                </View>
                            </>
                        ))
                        : (
                            <Text style={styles.text}>Você não possui alunos</Text>
                        )
                }
            </ScrollView>
            <Tabs navigation={navigation} menuActive="Students" />
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