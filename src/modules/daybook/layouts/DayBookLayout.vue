<template>
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
    import { defineAsyncComponent } from 'vue';
    
    const Navbar = defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue'));
    const EntryList = defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'));
</script>

<style scoped>

</style>