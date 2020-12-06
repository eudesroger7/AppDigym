import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.0.104:7755'
});

export default api;