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
    import { storeToRefs } from 'pinia';

    import { useDaybookStore } from '../stores/daybook';
    import { useAuthStore } from '@/modules/auth/stores/auth';
    
    const Navbar = defineAsyncComponent(() => import('@/modules/daybook/components/Navbar.vue'));
    const EntryList = defineAsyncComponent(() => import('@/modules/daybook/components/EntryList.vue'));
    const Spinner = defineAsyncComponent(() => import('@/shared/modules/spinner/views/SpinnerView.vue'));

    const daybookStore = useDaybookStore();
    const { userLogged } = storeToRefs(useAuthStore());

    onMounted(async () => {
        await daybookStore.loadEntries(userLogged.value!.userId);
    });
</script>

<style scoped>

</style>