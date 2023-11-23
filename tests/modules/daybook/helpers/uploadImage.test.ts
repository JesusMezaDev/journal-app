import { expect, describe, it, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import axios from 'axios';
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.MY_CLOUD_NAME,
    api_key: process.env.MY_CLOUD_API_KEY,
    api_secret: process.env.MY_CLOUD_API_SECRET,
});

import { uploadImage } from '../../../../src/modules/daybook/helpers/uploadImage';

describe('Upload Image Helper', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    it('Load an image and return the url', async () => {
        const { data } = await axios.get('https://res.cloudinary.com/dkymbqnzs/image/upload/v1700716711/kmj8mzgmiajtei27ztga.jpg', {
            responseType: 'arraybuffer',
        });
        const file = new File([data], 'test.jpg');
        const url = await uploadImage(file);
        expect(typeof url).toBe('string');
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');
        await cloudinary.v2.api.delete_resources([imageId], {}, () => {});
    });
});