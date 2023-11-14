import axios from 'axios';

export const journalApi = axios.create({
    baseURL: `${ import.meta.env.MY_API_URL }`,
});