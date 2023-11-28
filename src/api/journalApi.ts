import axios from 'axios';

export const journalApi = axios.create({
    baseURL: `${ import.meta.env.MY_API_URL }`,
});

journalApi.interceptors.request.use(config => {
    config.params = {
        auth: localStorage.getItem('idToken'),
    };

    return config;
});