import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import DaybookLayout from '../../../../src/modules/daybook/layouts/DaybookLayout.vue';
import App from '../../../../src/App.vue';

describe('DaybookLayout', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    
    it('Render of "DaybookLayout" component', async () => {
        router.push({ name: 'daybook' });
        await router.isReady();
        const wrapper = mount(App, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
        });
        expect(wrapper.findComponent(DaybookLayout).exists()).toBe(true);
    });
});