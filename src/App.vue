<template>
  <div class="container">
    <RouterView />
  </div>
  <!-- <ToastNotification /> -->
  <Dialog />
</template>

<script setup lang="ts">
  import { defineAsyncComponent } from 'vue';
  // const ToastNotification = defineAsyncComponent(() => import('@/shared/modules/toast-notifications/views/ToastNotificationView.vue'));
  const Dialog = defineAsyncComponent(() => import('@/shared/modules/dialog/views/DialogView.vue'));
</script>

<style scoped>
  
</style>