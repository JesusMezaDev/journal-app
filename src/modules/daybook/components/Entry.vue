<template>
    <div class="entry-container mb-3 pointer p-2" @click="$router.push({ name: 'entry', params: { id: entry.id } })">
        <div class="entry-title d-flex align-items-center">
            <span class="text-success fs-5 fw-bold">18</span>
            <span class="mx-1 fw-normal">Noviembre</span>
            <span class="mx-1 fw-light">2023, Sábado</span>
        </div>
        <div class="entry-description">
            {{ entry.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Entry } from '../interfaces/entry';
    const { entry } = defineProps<{ entry: Entry }>();
</script>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2C3E50;
        transition: 200ms all ease-in;

        &:hover {
            background-color: lighten($color: #2C3E50, $amount: 5);
            transition: 200ms all ease-in;
        }
        
        .entry-description {
            font-size: 12px;
        }
    }

</style>
