/* https://codingpr.com/es/realiza-pruebas-unitarias-con-vitest-y-vue-test-utils/ */

import { expect, describe, it, test, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia'
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing'

import App from '../src/App.vue';
import router from '../src/router';

import EntryList from '../src/modules/daybook/components/EntryList.vue';

import { useJournalStore } from '../src/stores/journal';
import { useDaybookStore } from '../src/modules/daybook/stores/daybook';

describe('App', () => {
  beforeEach(() => {
      setActivePinia(createPinia());
  });

  it('Render "App" (Main component)', async () => {
    router.push({ name: 'home' });

    await router.isReady();

    const wrapper = mount(App, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router]
      }
    });

    expect(wrapper.find('div').classes()).toContain('container');
  });

  router.push({ name: 'daybook' });

  const mountNewEntry = () => {
      const wrapper = mount(EntryList, {
          global: {
            plugins: [createTestingPinia({ createSpy: vi.fn }), router]
          }
        }
      );
      return wrapper;
  }

  it('Click on "Nueva entrada" button => "EntryList"', async () => {
      const push = vi.spyOn(router, 'push');
      await mountNewEntry().find('button').trigger('click');
      expect(push).toHaveBeenCalledOnce();
      expect(push).toHaveBeenCalledWith({ name: 'entry', params: { id: 'new' } });
  });
  
  it('Adding a new Entry into List in useDaybookStore', async () => {
    const store = useDaybookStore();
    const countBefore = store.entries.length;
    await store.createEntry({ date: new Date(), text: 'Test from file "daybook.test.ts"' })
    expect(store.entries.length).toBe(countBefore + 1);
  });
  
  it('Loading Entries in useDaybookStore', async () => {
    const store = useDaybookStore();
    await store.loadEntries();
    expect(store.entries.length).least(1);
  });

  it('Finding an Entry into List in useDaybookStore', async () => {
    const store = useDaybookStore();
    await store.loadEntries();
    store.searchTerm = 'Test from file "daybook.test.ts"'
    const entries = store.getEntriesByTerm();
    expect(entries.length).least(1);
  });
  
  it('Update an Entry', async () => {
    const store = useDaybookStore();
    await store.loadEntries();
    store.searchTerm = 'Test from file "daybook.test.ts"'
    const entries = store.getEntriesByTerm();
    if (!entries) expect(entries).toBeTruthy();
    const entry = entries[0];
    entry.text = 'Test from file "daybook.test.ts" updated';
    await store.updateEntry(entry);
    expect(entries.length).least(1);
  });
  
  it('Deleting an Entry in useDaybookStore', async () => {
    const store = useDaybookStore();
    await store.loadEntries();
    const countBefore = store.entries.length;
    store.searchTerm = 'Test from file "daybook.test.ts" updated'
    const entries = store.getEntriesByTerm();
    if (!entries) expect(entries).toBeTruthy();
    const entry = entries[0];
    await store.deleteEntry(entry.id!);
    expect(store.entries.length).toBe(countBefore - 1);
  });

  it('IsLoading variable from useJournalStore default value', () => {
    const journalStore = useJournalStore();
    expect(journalStore.isLoading).toBe(false);
  });
  
  it('Change value IsLoading variable from useJournalStore', () => {
    const journalStore = useJournalStore();
    journalStore.isLoading = true;
    expect(journalStore.isLoading).toBe(true);
  });
});