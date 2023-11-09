<template>
    <button class="btn fs-1" :class="classButton"></button>
</template>

<script setup lang="ts">
    const { icon, btnClass } = withDefaults(defineProps<{ icon?: string, btnClass?: string }>(), { icon: 'bi-plus', btnClass: 'btn-primary' });
    const classButton = `${ btnClass } ${ icon }`;
</script>

<style lang="scss" scoped>
    button {
        border-radius: 100%;
        bottom: 20px;
        height: 80px;
        position: fixed;
        right: 20px;
        width: 80px;
    }
</style>