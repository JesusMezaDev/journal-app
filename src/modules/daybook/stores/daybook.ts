import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import axios from 'axios';
import { useRouter } from 'vue-router';

import type { Entry } from '../interfaces/entry';
import { journalApi } from '@/api/journalApi';
import { useJournalStore } from '@/stores/journal';
import { useDialog } from '@/shared/modules/dialog/composables';

export const useDaybookStore = defineStore('daybook', () => {
    const { isLoading } = storeToRefs(useJournalStore());
    const searchTerm = ref<String>('');
    const entries = ref<Entry[]>([]);
    const dialog = useDialog();
    const router = useRouter();

    const handleError = (error: unknown) => {
        if (axios.isAxiosError(error)) {
            dialog.set({ dialogType: 'error', message: error.message });
            dialog.show();
            return;
        }
        
        console.error(error);
    }

    return {
        /* Store */
        entries,
        searchTerm,

        /* Getters */
        getEntriesByTerm: (): Entry[] => {
            if (searchTerm.value.trim().length === 0) return entries.value;
            return entries.value.filter(entry => entry.text.toLowerCase().includes(searchTerm.value.toLowerCase()));
        },
        getEntryById: (id: string): Entry | undefined => { 
            const entry = entries.value.find(entry => entry.id === id);

            if (!entry) return;

            return { ...entry };
        },

        /* Methods */
        loadEntries: async () => {
            isLoading.value = true;

            try {
                const { data, status, statusText } = await journalApi.get('/entries.json');
            
                if (statusText !== 'OK') return;
                
                if (!data) return entries.value = [];

                let dataEntries: Entry[] = [];

                for (let id of Object.keys(data)) {
                    dataEntries.push({
                        id,
                        ...data[id as keyof typeof data],
                    });
                };
                
                entries.value = [ ...dataEntries ].sort((entry1: Entry, entry2: Entry) => Number(new Date(entry2.date)) - Number(new Date(entry1.date)));
            } catch (error) {
                handleError(error);
            }
            finally {
                isLoading.value = false;
            }
            
        },
        updateEntry: async (entry: Entry) => {
            isLoading.value = true;

            try {
                entry.updateDate = new Date();
                
                const { id, ...rest } = entry;

                const { data, statusText, status } = await journalApi.put(`/entries/${ id }.json`, rest);

                const indexEntry = entries.value.findIndex(item => item.id === id);
                
                entries.value[indexEntry] = { ...data }; 
                
                dialog.set({ dialogType: 'success', message: 'La entrada fue actualizada correctamente.' });
                dialog.show();
            } catch (error) {
                handleError(error);
            }
            finally {
                isLoading.value = false;
            }
        },
        createEntry: async (entry: Entry) => {
            isLoading.value = true;

            try {
                const { data, statusText, status } = await journalApi.post<{ name: string }>('/entries.json', entry);

                if (statusText !== 'OK') return;

                const { id, ...rest } = entry;
                const newEntry = { id: data.name, ...rest };

                entries.value.unshift(newEntry);

                // return data.name;

                dialog.set({ dialogType: 'success', message: 'La entrada fue creada correctamente.' });
                dialog.show();
            } catch (error) {
                handleError(error);
            }
            finally {
                isLoading.value = false;
            }
        },
        deleteEntry: async (id: string) => {
            isLoading.value = true;

            try {
                const { statusText, status } = await journalApi.delete(`/entries/${ id }.json`);

                if (statusText !== 'OK') return;

                const indexEntry = entries.value.findIndex(item => item.id === id);
                
                entries.value.splice(indexEntry, 1);
                
                router.push({ name: 'no-entry' });

                dialog.set({ dialogType: 'success', message: 'La entrada fue borrada correctamente.'});
                dialog.show();
            } catch (error) {
                handleError(error);
            }
            finally {
                isLoading.value = false;
            }
        },
    }
});