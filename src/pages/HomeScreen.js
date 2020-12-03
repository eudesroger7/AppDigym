import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

import logo from '../../assets/logo.png';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <Text style={styles.title}>Seja bem-vindo(a) ao</Text>
            <Text style={styles.titleLogo}>Digym</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0D0D0D'
    },
    logo: {
        width: 120,
        height: 120
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
    }
});