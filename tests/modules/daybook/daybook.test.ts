/* https://codingpr.com/es/realiza-pruebas-unitarias-con-vitest-y-vue-test-utils/ */

import { expect, describe, it, test, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'

import router from '../../../src/router';
import DaybookLayout from '../../../src/modules/daybook/layouts/DaybookLayout.vue';
import Navbar from '../../../src/modules/daybook/components/Navbar.vue';
import EntryList from '../../../src/modules/daybook/components/EntryList.vue';
import NoEntrySelected from '../../../src/modules/daybook/views/NoEntrySelected.vue';
import EntryView from '../../../src/modules/daybook/views/EntryView.vue';

import { useDaybookStore } from '../../../src/modules/daybook/stores/daybook';
import { useJournalStore } from '../../../src/stores/journal';

describe('Daybook => Navbar', () => {
    beforeEach(() => {
        setActivePinia(createPinia());
    });

    router.push({ name: 'daybook' });

    it('Render of "DaybookLayout"', () => {
        expect(DaybookLayout).toBeTruthy();
    });
    
    it('Render of "Navbar"', () => {
        expect(Navbar).toBeTruthy();
    });
    
    it('Render of "EntryList"', () => {
        expect(EntryList).toBeTruthy();
    });

    test('Route to "daybook" => loading "Navbar"', async () => {
      await router.isReady();

      const wrapper = mount(Navbar, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn }), router]
        }
      });
      
      expect(wrapper.html()).toContain('Daybook');
    });
    
    test('Route to "daybook" => loading "EntryList"', async () => {
      const wrapper = mount(EntryList, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn }), router]
        }
      });
      
      expect(wrapper.find('button').html()).toContain('Nueva entrada');
      expect(wrapper.find('input').attributes('placeholder')).toContain('Buscar entrada');
    });
    
    test('Route to "daybook" => loading "NoEntrySelected"', async () => {
      const wrapper = mount(NoEntrySelected, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn }), router]
        }
      });
      
      expect(wrapper.html()).toContain('No se ha seleccionado un elemento');
    });

    const montarNuevaEntrada = () => {
        const wrapper = mount(EntryList, {
            global: {
              plugins: [createTestingPinia({ createSpy: vi.fn }), router]
            }
          }
        );

        return wrapper;
    }

    test('Click on "Nueva entrada" button => "EntryList"', async () => {
        const push = vi.spyOn(router, 'push');

        await montarNuevaEntrada().find('button').trigger('click');

        expect(push).toHaveBeenCalledOnce();
        expect(push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } });
      });
});