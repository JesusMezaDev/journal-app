import axios from 'axios';

export const myApiCloudinary = axios.create({
    baseURL: `${ import.meta.env.MY_API_CLOUDINARY }`,
});