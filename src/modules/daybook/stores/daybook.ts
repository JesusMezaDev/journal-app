import { ref } from 'vue';
import { defineStore } from 'pinia';

import type { Entry } from '../interfaces/entry';

export const useDaybookStore = defineStore('daybook', () => {
    const entries = ref<Entry[]>([]);

    /* para pruebas */
    entries.value = [
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 1'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 2'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 3'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 4'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 5'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 6'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 7'
        },
        {
            id: crypto.randomUUID(),
            date: new Date(),
            text: 'Prueba 8'
        },
    ]
    
    return {
        entries,
    }
});