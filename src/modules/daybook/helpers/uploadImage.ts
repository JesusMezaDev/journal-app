import { storeToRefs } from 'pinia';
import axios from 'axios';

import { useJournalStore } from '@/stores/journal';

import type { ResponseCloudinary } from '../interfaces/responseCloudinary';
import { myApiCloudinary } from '@/api/myApiCloudinary';

const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        console.log('axiosError', error);
        return;
    }
    
    console.error(error);
}

export const uploadImage = async (file: File) => {
    const { isLoading } = storeToRefs(useJournalStore());
    
    if (!file) return;

    isLoading.value = true;

    try {
        const formData = new FormData();
        formData.append('upload_preset', 'journal-app');
        formData.append('file', file);
        const { data } = await myApiCloudinary.post<ResponseCloudinary>('/cloudinary', formData);
        return data.secure_url;
    } catch (error) {
        handleError(error);
    }
    finally {
        isLoading.value = false;
    }
}

export const deleteImage = async (url: string) => {
    if (!url) return;

    const { isLoading } = storeToRefs(useJournalStore());

    isLoading.value = true;

    const pictureFile = url.split('/').pop();
    const [pictureId, ] = pictureFile!.split('.');

    try {
        const { data } = await myApiCloudinary.delete(`/cloudinary/${ pictureId }`);
        
        if (!data.ok) throw new Error('Oops! algo salió mal, intente de nuevo más tarde.');
    } catch (error) {
        handleError(error);
    }
    finally {
        isLoading.value = false;
    }
}