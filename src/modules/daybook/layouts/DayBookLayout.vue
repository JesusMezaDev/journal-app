<template>
    <Spinner />
    <Navbar />
    <div class="d-flex">
        <div class="col-4">
            <EntryList />
        </div>
        <div class="col">
            <RouterView />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { defineAsyncComponent, onMounted } from 'vue';
    import { useDaybookStore } from '../stores/daybook';
    
    const Navbar = defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue'));
    const EntryList = defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'));
    const Spinner = defineAsyncComponent(() => import('@/shared/modules/spinner/views/SpinnerView.vue'));

    const daybookStore = useDaybookStore();

    onMounted(async () => {
        await daybookStore.loadEntries();
    });
</script>

<style scoped>

</style>