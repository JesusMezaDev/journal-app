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

    /* para pruebas */
    // entries.value = [
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Cupidatat consequat deserunt id nostrud aliqua labore aliquip. Non ex cupidatat ipsum sint. Deserunt magna velit eiusmod nulla. Tempor ea minim tempor exercitation aliquip culpa magna dolore fugiat minim. Dolor elit sint eu non nulla fugiat adipisicing consectetur ad. Duis velit nulla laboris officia amet non reprehenderit adipisicing officia ad mollit laboris. Est quis esse commodo amet incididunt ipsum ullamco officia aliquip adipisicing.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Labore consectetur ipsum mollit enim. Commodo magna dolor ea cillum et laborum adipisicing ad. Nulla eiusmod magna amet est laboris qui incididunt ipsum officia officia. Velit cupidatat laboris aliquip sint incididunt irure fugiat qui ad id reprehenderit incididunt voluptate amet. Ullamco cillum velit tempor ea.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Dolore velit ut pariatur commodo aliqua. Tempor aute veniam officia ea nostrud minim ipsum anim reprehenderit magna velit. Qui enim nulla consequat cillum aute pariatur deserunt consequat id ad nulla ex. Do occaecat sunt sint commodo nostrud est et anim est ea labore dolore. Dolor do ipsum veniam ex nulla esse pariatur proident veniam incididunt laborum veniam. Ut magna consequat cillum est.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Consectetur nulla sint fugiat voluptate incididunt consectetur. Laboris commodo nisi ut et sint ad eu pariatur labore officia minim irure culpa exercitation. Dolore dolore fugiat aliqua minim quis aliquip ex Lorem velit dolor velit esse eiusmod. Fugiat minim non esse minim sunt consequat et in.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Reprehenderit commodo tempor amet voluptate tempor nisi irure et occaecat qui nisi commodo incididunt cillum. Pariatur dolore cillum duis excepteur id nostrud. Ea sunt id est ex aliqua. Officia qui excepteur tempor fugiat ea do ut. Enim nisi eiusmod reprehenderit et laborum sit ad nulla elit. Tempor irure officia ipsum deserunt sint culpa veniam cillum in.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Cupidatat ut incididunt veniam aliqua anim elit aliquip deserunt ex deserunt occaecat. Id et ex esse magna adipisicing laborum sunt aliqua duis. Ullamco sunt exercitation dolore magna. Esse ex anim ut nulla mollit veniam ea. Labore et ad mollit mollit. Est magna deserunt id magna deserunt.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Pariatur et cupidatat incididunt Lorem tempor duis proident. Consectetur mollit ipsum aute quis laborum fugiat pariatur. Incididunt Lorem aute est ex dolor commodo. Ad esse aliquip qui laboris duis consequat sit elit amet est deserunt sunt. Exercitation esse aute commodo ullamco labore. Magna id fugiat non occaecat duis.'
    //     },
    //     {
    //         id: crypto.randomUUID(),
    //         date: new Date(),
    //         text: 'Id voluptate excepteur officia nisi anim ex dolore consectetur ut qui commodo. Ullamco labore laborum deserunt irure exercitation culpa nisi. Dolore ut ea minim culpa enim. Occaecat nostrud anim ad velit ipsum ea nulla fugiat sunt ut cupidatat.'
    //     },
    // ];
    
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