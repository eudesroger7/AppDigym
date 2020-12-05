import AsyncStorage from '@react-native-async-storage/async-storage';

async function isLoggedIn() {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    const owner = await AsyncStorage.getItem('owner');
    const student = await AsyncStorage.getItem('student');
    return token && JSON.parse(token).access_token && user && JSON.parse(user).id && (owner || student);
}

export default isLoggedIn;