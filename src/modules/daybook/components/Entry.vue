<template>
    <div class="entry-container mb-3 pointer p-2" @click="loadEntry">
        <div class="entry-title d-flex align-items-center">
            <span class="text-success fs-5 fw-bold">{{ day }}</span>
            <span class="first-letter-capitalize mx-1 fw-normal">{{ month }} {{ year }}, </span>
            <span class="first-letter-capitalize mx-1 fw-light">{{ weekDay }}</span>
        </div>
        <div class="entry-description">
            {{ entry.text }}
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import type { Entry } from '../interfaces/entry';
    import { getYearMonthDay } from '../helpers/getYearMonthDay';
    const router = useRouter();
    const { entry } = defineProps<{ entry: Entry }>();
    const { year, month, weekDay, day } = getYearMonthDay(new Date(entry.date));
    
    const loadEntry = () => {
        router.push({ name: 'entry', params: { id: entry.id }})
    }
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

</style>