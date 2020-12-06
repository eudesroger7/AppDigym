import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Tabs from '../components/tabs';

import api from '../services/api';

export default function GymsStore({ navigation }) {

    const [phone, setPhone] = useState();
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [lat, setLat] = useState();
    const [lng, setLng] = useState([]);
    const [capacity, setCapacity] = useState([]);
    const [ownerId, setOwnerId] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('owner').then((_owner) => {
            setOwnerId(JSON.parse(_owner).id);
        });
    }, [])

    async function handleSubmit() {
        const response = await api.post('/api/gyms', {
            name,
            phone,
            address,
            lat,
            lng,
            capacity,
            owner_id: ownerId
        });
        navigation.navigate('Login');
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.form}>
                    <Text style={styles.title}>
                        Preencha as informações da sua academia
                </Text>

                    <Text style={styles.label}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        autoCorrect={false}
                        autoCapitalize="words"
                        textContentType="name"
                        keyboardType="name-phone-pad"
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Endereço</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#ccc"
                        autoCorrect={false}
                        autoCapitalize="none"
                        textContentType="fullStreetAddress"
                        keyboardType="default"
                        onChangeText={setAddress}
                    />
                    <View style={styles.doubleContent}>
                        <View style={{ flexGrow: 1, flexBasis: '45%', marginRight: 10 }}>
                            <Text style={styles.label}>Latitude</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#ccc"
                                autoCorrect={false}
                                autoCapitalize="none"
                                textContentType="location"
                                keyboardType="decimal-pad"
                                onChangeText={setLat}
                            />
                        </View>
                        <View style={{ flexGrow: 1, flexBasis: '45%', marginLeft: 10 }}>
                            <Text style={styles.label}>Longitude</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#ccc"
                                autoCorrect={false}
                                autoCapitalize="none"
                                textContentType="location"
                                keyboardType="decimal-pad"
                                onChangeText={setLng}
                            />
                        </View>
                    </View>
                    <View style={styles.doubleContent}>
                        <View style={{ flexGrow: 1, flexBasis: '60%', marginRight: 10 }}>
                            <Text style={styles.label}>Telefone</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#ccc"
                                autoCorrect={false}
                                autoCapitalize="none"
                                textContentType="telephoneNumber"
                                keyboardType="phone-pad"
                                onChangeText={setPhone}
                            />
                        </View>
                        <View style={{ flexGrow: 1, flexBasis: '30%', marginLeft: 10 }}>
                            <Text style={styles.label}>Capacidade</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor="#ccc"
                                autoCorrect={false}
                                autoCapitalize="none"
                                textContentType="none"
                                keyboardType="number-pad"
                                onChangeText={setCapacity}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View >
            <Tabs navigation={navigation} />
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        backgroundColor: '#0d0d0d',
        paddingVertical: 30
    },
    logo: {
        width: 80,
        height: 80
    },
    form: {
        // alignSelf: 'stretch',
        marginTop: 50,
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
    },
    doubleContent: {
        flexDirection: 'row',
        maxWidth: '100%'
    }
});