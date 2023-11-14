<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input type="text" class="form-control" placeholder="Buscar entrada" v-model="searchTerm" @change="getEntriesByTerm">
        </div>
        <div class="mt-2 d-flex flex-column">
            <button class="btn btn-primary mx-3 bi bi-plus-circle" @click="$router.push({ name: 'entry', params: { id: 'new' } })">
                Nueva entrada
            </button>
        </div>
        <div class="entry-scrollarea">
            <Entry v-for="entry in getEntriesByTerm()" :key="entry.id" :entry="entry" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useDaybookStore } from '../stores/daybook';

    const Entry = defineAsyncComponent(() => import('./Entry.vue'));
    const dayBookStore = useDaybookStore()
    const { getEntriesByTerm } = dayBookStore;
    const { searchTerm } = storeToRefs(dayBookStore);
</script>

<style lang="scss" scoped>
    .entry-list-container {
        border-right: 1px solid #2C3E50;
        height: calc(100vh - 56px);
    }

    .entry-scrollarea {
        height: calc(100vh - 110px);
        overflow: scroll;
    }
</style>