import axios from 'axios';
import { serverUrl } from './constant';

const fetchClient = () => {
    const defaultOptions = {
    baseURL: serverUrl,
    method: 'get',
    headers: {
        'Content-Type': 'application/json',
    },
    };

    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (config) {
    const IdToken = localStorage.getItem('IdToken');
    config.headers.Authorization =  IdToken ? `Bearer ${IdToken}` : '';
    return config;
    });

    return instance;
};

export default fetchClient();