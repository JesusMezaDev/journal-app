import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import Navbar from '../../../../src/modules/daybook/components/Navbar.vue';

describe('Navbar', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    
    it('Render of "Navbar" component', async () => {
        router.push({ name: 'daybook' });
        await router.isReady();
        const wrapper = mount(Navbar, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
        });
        expect(wrapper.findComponent(Navbar).exists()).toBe(true);
        expect(wrapper.find('button').classes()).toContain('bi-box-arrow-right');
        expect(wrapper.find('a').html()).toContain('Daybook');
    });
});