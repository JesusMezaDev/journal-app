import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useJournalStore = defineStore('journal', () => {
  const isLoading = ref(false);
  
  return {
    isLoading,
  }
});