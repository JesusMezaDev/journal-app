/* https://codingpr.com/es/realiza-pruebas-unitarias-con-vitest-y-vue-test-utils/ */

import { expect, describe, it, test } from 'vitest';
import { mount } from '@vue/test-utils';

import App from '../src/App.vue';
import router from '../src/router';

describe('App.vue', () => {
    it('Main Render', () => {
        expect(App).toBeTruthy();
    });

    test('Main Routing to "home"', async () => {
      router.push({ name: 'home' });

      await router.isReady();

      const wrapper = mount(App, {
        global: {
          plugins: [router]
        }
      });

      expect(wrapper.html()).toContain('Welcome');
    });
});