import axios from 'axios';
import authService from './auth';


const defaultOptions = {
    baseURL: process.env.REACT_APP_API_HOST,
    headers: {
        'x-api-key': 'tatup_web',
    },
};

// Update instance
const instance = axios.create(defaultOptions);

// Set the AUTH token for any request
instance.interceptors.request.use(
    config => {
        config.headers['authorization'] = authService.getUserSession();
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

// Add a response interceptor
instance.interceptors.response.use(
    response => {
        return response.data;
    },
    error => {
        return Promise.reject(error.response);
    },
);

export default instance;

export const createAPIRequest = config => instance(config);
