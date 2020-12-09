import axios from 'axios';

const api = axios.create({
    baseURL: 'https://apidigym.usinadigital.in'
});

export default api;