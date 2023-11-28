import axios from 'axios';

export const authApi = axios.create({
    baseURL: `${ import.meta.env.MY_AUTH_API_URL }`,
    params: {
        key: import.meta.env.MY_FIREBASE_API_KEY
    }
});