import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

import api from '../services/api';

import logo from '../../assets/logo.png';

export default function Register({ navigation }) {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [gym, setGym] = useState();
    const [userType, setUserType] = useState();
    const [gyms, setGyms] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        setUserType(navigation.getParam('userType'));
        getGyms();
    }, []);

    async function getGyms() {
        const responseGyms = await api.get('/api/gyms');
        setGyms(responseGyms.data.data);
    }

    async function handleSubmit() {
        setSubmitting(true);
        const responseUser = await api.post('/api/users', {
            email,
            password,
            name,
            user_type_id: userType
        });
        if (userType == 1) {
            const responseStudent = await api.post('/api/students', {
                user_id: responseUser.data.id,
                gym_id: gym
            });
        } else {
            const responseOwner = await api.post('/api/owners', {
                user_id: responseUser.data.id,
                gym_id: gym
            });
        }
        setSubmitting(false);
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo} />

            <View style={styles.form}>
                <Text style={styles.title}>
                    Preencha as informações corretamente
                </Text>

                <Text style={styles.label}>Nome Completo</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    autoCorrect={false}
                    autoCapitalize="words"
                    textContentType="name"
                    keyboardType="name-phone-pad"
                    onChangeText={setName}
                />
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    autoCorrect={false}
                    autoCapitalize="none"
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Senha</Text>
                <TextInput
                    style={styles.input}
                    placeholderTextColor="#ccc"
                    textContentType="password"
                    autoCorrect={false}
                    textContentType="password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                />
                {userType == 1 &&
                    <>
                        <Text style={styles.label}>Academia</Text>

                        <View style={styles.pickerView}>
                            <Picker
                                style={styles.picker}
                                selectedValue={gym}
                                mode={'dialog'}
                                placeholder="Selecione sua Academia"
                                onValueChange={setGym}>
                                {gyms && gyms.map((gym) => {
                                    return <Picker.Item key={gym.id} label={gym.name} value={gym.id} />

                                })}
                            </Picker>
                        </View>
                    </>}
                <TouchableOpacity
                    style={styles.button}
                    disabled={submitting}
                    onPress={handleSubmit}>
                    {
                        submitting
                            ? <Text style={styles.buttonText}>Enviando...</Text>
                            : <Text style={styles.buttonText}>Confirmar</Text>
                    }
                </TouchableOpacity>

                <View style={styles.register}>
                    <Text style={styles.subtitle}>
                        Já tem uma conta?
                </Text>
                    <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login', { userType })}>
                        <Text style={styles.linkText}>Faça Login!</Text>
                    </TouchableOpacity>
                </View>
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
    label: {
        color: '#ddd'
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        fontSize: 16,
        color: '#fff',
        marginBottom: 20,
        textTransform: 'uppercase',
        height: 30
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
    },
    picker: {
        color: '#ccc',
        height: 50,
    },
    pickerView: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    }
});