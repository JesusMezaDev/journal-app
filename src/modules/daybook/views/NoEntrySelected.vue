<template>
    <div class="d-flex justify-content-center">
        <h1 class="align-self-center">No se ha seleccionado un elemento</h1>
    </div>
    <Fab />
</template>

<script lang="ts" setup>
    import { defineAsyncComponent } from 'vue';
    
    const Fab = defineAsyncComponent(() => import('../components/Fab.vue'));
</script>

<style lang="scss" scoped>
    div {
        height: 100%;
    }
</style>