import { storeToRefs } from 'pinia';
import axios from 'axios';

import { cloudinaryApi } from '@/api/cloudinaryApi';
import { useJournalStore } from '@/stores/journal';

import type { ResponseCloudinary } from '../interfaces/responseCloudinary';

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

        const { data, status, statusText } = await cloudinaryApi.post<ResponseCloudinary>('', formData);

        if (statusText != 'OK') return;

        const { secure_url } = data;
        
        return secure_url;
    } catch (error) {
        handleError(error);
    }
    finally {
        isLoading.value = false;
    }
}