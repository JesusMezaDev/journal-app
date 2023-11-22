import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import Entry from '../../../../src/modules/daybook/views/EntryView.vue';
import App from '../../../../src/App.vue';

describe('EntryView', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    
    it('Render of "EntryView" component with id = new ', async () => {
        router.push({ name: 'entry', params: { id: 'new' } });
        await router.isReady();
        const wrapper = mount(App, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
        });

        expect(wrapper.findComponent(Entry).exists()).toBe(true);
    });
});