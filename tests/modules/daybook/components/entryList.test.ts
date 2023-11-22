import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import EntryList from '../../../../src/modules/daybook/components/EntryList.vue';

describe('EntryList', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    
    it('Render of "EntryList" component', async () => {
        router.push({ name: 'daybook' });
        await router.isReady();
        const wrapper = mount(EntryList, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
        });
        expect(wrapper.findComponent(EntryList).exists()).toBe(true);
        expect(wrapper.find('button').html()).toContain('Nueva entrada');
        expect(wrapper.find('input').attributes('placeholder')).toContain('Buscar entrada');
    });
});