import { expect, describe, it, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { shallowMount} from '@vue/test-utils';

import Fab from '../../../../src/modules/daybook/components/Fab.vue';

describe('Fab', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    
    it('Render of "Fab"', () => {
        const wrapper = shallowMount(Fab);
        expect(wrapper.html()).toBeTruthy();
    });

    it('Should show default icon "bi-plus"', () => {
        const wrapper = shallowMount(Fab);
        expect(wrapper.find('button').classes()).toContain('bi-plus');
    });
    
    it('Should show icon "bi-floppy"', () => {
        const wrapper = shallowMount(Fab, {
            props: {
                icon: 'bi-floppy'
            }
        });
        expect(wrapper.find('button').classes()).toContain('bi-floppy');
    });
    
    it('Emit "on:click" event when clicked', () => {
        const wrapper = shallowMount(Fab);
        wrapper.find('button').trigger('click');
        expect(wrapper.emitted('on:click')).toBeTruthy();
    });
});