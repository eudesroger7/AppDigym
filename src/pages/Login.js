import React from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import logo from '../../assets/logo.png';

export default function Login() {
    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <Text style={styles.title}>
                Por favor, informe suas credenciais para continuar
            </Text>
            <View style={styles.form}>
                <Text style={styles.label}>Seu E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu e-mail"
                    placeholderTextColor="#bbb"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha"
                    placeholderTextColor="#bbb"
                    textContentType="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <TouchableOpacity
                    style={styles.button}>
                    <Text style={styles.buttonText}>Entrar</Text>
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
        paddingHorizontal: 25
    },
    logo: {
        width: 120,
        height: 120
    },
    form: {
        alignSelf: 'stretch',
        marginTop: 50
    },
    title: {
        fontSize: 20,
        textTransform: 'uppercase',
        color: '#0d0d0d',
        marginTop: 30,
        textAlign: 'center'
    },
    label: {
        fontSize: 18,
        textTransform: 'uppercase',
        paddingHorizontal: 5,
        color: '#0d0d0d',
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderColor: '#0d0d0d',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#0d0d0d',
        marginBottom: 20,
        borderRadius: 10,
        height: 50
    },
    button: {
        height: 50,
        backgroundColor: '#FF5C00',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});