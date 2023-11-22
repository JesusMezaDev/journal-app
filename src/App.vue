<template>
  <div class="container">
    <RouterView />
  </div>
  <Dialog />
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  const Dialog = defineAsyncComponent(() => import('@/shared/modules/dialog/views/DialogView.vue'));
</script>

<style scoped>
  
</style>