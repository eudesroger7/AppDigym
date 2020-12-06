import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { isLoggedIn } from '../utils/util.utils';

import logo from '../../assets/logo.png';

export default function Tabs({ navigation, menuActive }) {

    const [userType, setUserType] = useState();

    useEffect(() => {
        AsyncStorage.getItem('user').then(_user => {
            setUserType(JSON.parse(_user).user_type_id);
        })
    })

    if (!userType) return null;

    return (
        <View style={styles.container}>
            {userType == 1 &&
                <>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
                        <Image style={styles.icon} source={{ uri: `https://img.icons8.com/fluent-systems-regular/50/${menuActive == 'Map' ? 'ff5c00' : 'ffffff'}/marker--v1.png` }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Training')}>
                        <Image style={styles.icon} source={{ uri: `https://img.icons8.com/fluent-systems-regular/50/${menuActive == 'Training' ? 'ff5c00' : 'ffffff'}/bench-press.png` }} />
                    </TouchableOpacity>
                </>
            }
            {userType == 2 &&
                <>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Gyms')}>
                        <Image style={styles.icon} source={{ uri: `https://img.icons8.com/fluent-systems-regular/50/${menuActive == 'Gyms' ? 'ff5c00' : 'ffffff'}/dumbbell--v1.png` }} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Students')}>
                        <Image style={styles.icon} source={{ uri: `https://img.icons8.com/fluent-systems-regular/50/${menuActive == 'Students' ? 'ff5c00' : 'ffffff'}/groups.png` }} />
                    </TouchableOpacity>
                </>
            }
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
                <Image style={styles.icon} source={{ uri: `https://img.icons8.com/fluent-systems-regular/50/${menuActive == 'Profile' ? 'ff5c00' : 'ffffff'}/user.png` }} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        backgroundColor: '#0d0d0d',
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',
        // justifyContent: 'space-around'
        borderTopWidth: 1,
        borderTopColor: '#454545'
    },
    button: {
        flexBasis: 10,
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 30,
        height: 30
    }
});