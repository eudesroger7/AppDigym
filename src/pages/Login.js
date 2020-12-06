import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../services/api';
import { isLoggedIn } from '../utils/util.utils';

import logo from '../../assets/logo.png';

export default function Login({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [userType, setUserType] = useState();

    useEffect(() => {
        setUserType(navigation.getParam('userType'));
        isLoggedIn().then(loggedIn => {
            if (loggedIn) {
                AsyncStorage.getItem('user').then(_user => {
                    JSON.parse(_user).user_type_id == 1 ? navigation.navigate('Map') : navigation.navigate('Gyms');
                })
            }
        });
    }, [])

    async function handleSubmit() {
        const responseToken = await api.post('/auth/token', {
            email,
            password
        });
        await AsyncStorage.setItem('token', JSON.stringify(responseToken.data));

        const responseUser = await api.get('/auth/authenticated', {
            headers: {
                Authorization: `Bearer ${responseToken.data.access_token}`
            }
        });
        await AsyncStorage.setItem('user', JSON.stringify(responseUser.data));

        await AsyncStorage.setItem(userType == 1 ? 'student' : 'owner', userType == 1 ? JSON.stringify(responseUser.data.student) : JSON.stringify(responseUser.data.owner));

        navigation.navigate(userType == 1 ? 'Map' : 'Gyms');
    }


    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <View style={styles.form}>
                <Text style={styles.title}>
                    Por favor, informe suas credenciais para continuar
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="E-MAIL"
                    placeholderTextColor="#bbb"
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="SENHA"
                    placeholderTextColor="#bbb"
                    textContentType="password"
                    autoCorrect={false}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>

                <View style={styles.register}>
                    <Text style={styles.subtitle}>
                        Ainda não tem uma conta?
                </Text>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Register', { userType })}>
                        <Text style={styles.linkText}>Cadastre-se!</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.changeUserType}>
                <Text style={styles.subtitle}>
                    Não é um {userType == 1 ? 'Aluno' : 'Proprietário'}?
                </Text>
                <TouchableOpacity style={styles.link} onPress={() => setUserType(userType == 1 ? 2 : 1)}>
                    <Text style={styles.linkText}>Acessar como {userType == 1 ? 'Proprietário' : 'Aluno'}</Text>
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
        paddingHorizontal: 25,
        backgroundColor: '#0d0d0d',
        paddingVertical: 30
    },
    logo: {
        width: 80,
        height: 80
    },
    form: {
        alignSelf: 'stretch',
        marginTop: 50,
        flex: 3,
        justifyContent: 'center'
    },
    title: {
        fontSize: 18,
        textTransform: 'uppercase',
        color: '#fff',
        marginBottom: 50,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        textTransform: 'uppercase',
        color: '#fff',
        marginTop: 30,
        textAlign: 'center'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textTransform: 'uppercase',
        height: 50
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
    register: {
        marginTop: 30,
        width: '100%',
        alignSelf: 'stretch',

    },
    link: {
        color: '#FF5C00',
        width: '100%'
    },
    linkText: {
        color: '#FF5C00',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        marginTop: 10
    },
    changeUserType: {
        marginTop: 40,
    }
});