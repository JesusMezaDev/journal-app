import axios from 'axios';

export const cloudinaryApi = axios.create({
    baseURL: `${ import.meta.env.MY_CLOUDINARY_URL }`,
});