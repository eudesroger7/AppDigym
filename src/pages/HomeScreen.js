import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

import isLoggedIn from '../utils/util.utils';

import logo from '../../assets/logo.png';

export default function HomeScreen({ navigation }) {

    useEffect(() => {
        isLoggedIn().then(loggedIn => loggedIn && navigation.navigate('Gyms'));
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <View style={styles.actions}>
                <Text style={styles.title}>Seja bem-vindo(a) ao</Text>
                <Text style={styles.titleLogo}>Digym</Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Login', { userType: 1 })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sou aluno</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login', { userType: 2 })}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Sou proprietário</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0d0d0d',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    logo: {
        width: 80,
        height: 80
    },
    title: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#fff',
        marginTop: 30,
    },
    titleLogo: {
        fontSize: 40,
        textTransform: 'uppercase',
        color: '#FF5C00',
        marginBottom: 40,
    },
    button: {
        height: 50,
        borderWidth: 1,
        borderColor: '#FF5C00',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        width: '100%',
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    actions: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});