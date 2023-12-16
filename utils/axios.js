// utils/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1',
    maxBodyLength: Infinity,
});

export default instance;
