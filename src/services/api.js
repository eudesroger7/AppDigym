import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.131.81:7755'
});

export default api;