import { expect, describe, it, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

import router from '../../../../src/router';
import NoEntrySelected from '../../../../src/modules/daybook/views/NoEntrySelected.vue';
import App from '../../../../src/App.vue';

describe('NoEntrySelected', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });
    
    it('Render of "NoEntrySelected" component', async () => {
        router.push({ name: 'no-entry' });
        await router.isReady();
        const wrapper = mount(App, {
            global: {
                plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
        });
        expect(wrapper.findComponent(NoEntrySelected).exists()).toBe(true);
    });
});