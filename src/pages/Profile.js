import React, { useState, useEffect } from 'react';
import { StyleSheet, Button, View, Text, ScrollView, RefreshControl, useColorScheme, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../components/tabs';

import { isLoggedIn } from '../utils/util.utils';

export default function Profile({ navigation }) {
    const [user, setUser] = useState();
    const [student, setStudent] = useState();

    useEffect(() => {
        isLoggedIn().then(async loggedIn => {
            if (loggedIn) {
                const _user = await AsyncStorage.getItem('user');
                setUser(JSON.parse(_user));
                const _student = await AsyncStorage.getItem('student');
                setStudent(JSON.parse(_student));
            }
        });
    }, []);

    function logout() {
        AsyncStorage.clear();
        navigation.navigate('HomeScreen');
    }

    // if(!user || !student) return null;

    return (
        <>
            <View style={styles.container}>
                {
                    user && (
                        <>
                            <Text style={styles.title}>Olá,</Text>
                            <Text style={styles.titleOrange}>{user.name}</Text>
                            <View style={styles.cardMail}>
                                <Text style={styles.label}>Nome Completo</Text>
                                <Text style={styles.cardText}>{user.name}</Text>
                            </View>
                            <View style={styles.cardMail}>
                                <Text style={styles.label}>E-mail</Text>
                                <Text style={styles.cardText}>{user.email}</Text>
                            </View>
                            {
                                user.user_type_id == 1 && student && (
                                    <View style={styles.cardMail}>
                                        <Text style={styles.label}>Academia</Text>
                                        <Text style={styles.cardText}>{student.gym && student.gym.name}</Text>
                                    </View>
                                )
                            }
                        </>
                    )
                }
                <TouchableOpacity style={{ ...styles.cardMail, position: 'absolute', bottom: 50 }} onPress={logout}>
                    <Text style={styles.label}>Sair da conta</Text>
                </TouchableOpacity>
            </View>
            <Tabs navigation={navigation} menuActive="Profile" />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0d0d0d',
        paddingTop: 50,
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
        fontSize: 30,
        color: '#fff',
        textTransform: 'uppercase',
        paddingHorizontal: 20,
    },
    titleOrange: {
        fontSize: 30,
        color: '#ff5c00',
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        marginBottom: 30
    },
    name: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    cardMail: {
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    label: {
        opacity: .65,
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: 14
    },
    cardText: {
        fontSize: 20,
        color: '#fff',
        textTransform: 'uppercase'
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
    }
});