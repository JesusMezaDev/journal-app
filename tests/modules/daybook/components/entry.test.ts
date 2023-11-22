import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import Entry from '../../../../src/modules/daybook/components/Entry.vue';

describe('Entry', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    
    it('Render of "Entry" component', async () => {
        router.push({ name: 'daybook' });
        await router.isReady();
        const wrapper = mount(Entry, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            },
            props: {
                entry: {
                    id: '-1',
                    date: new Date(),
                    text: 'Testing',
                }
            }
        });
        expect(wrapper.findComponent(Entry).exists()).toBe(true);
        expect(wrapper.html()).toContain('entry-container');
        expect(wrapper.html()).toContain('entry-description');
    });
});