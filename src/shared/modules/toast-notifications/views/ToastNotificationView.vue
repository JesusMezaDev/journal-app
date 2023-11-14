<template>
    <transition name="dialog">
    <div v-if="showNotification" class="toast align-items-center position-fixed bottom-0 end-0 p-3 show" role="alert" aria-live="assertive" aria-atomic="true" :class="notificationClass">
      <div class="d-flex">
        <div class="toast-body">
          Hello, world! This is a toast message.
        </div>
        <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" @click="closeNotification"></button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
    import { watch } from 'vue';
    import { storeToRefs } from 'pinia';
    import { useJournalStore } from '@/stores/journal';

    interface notification {
      message: string;
      class: 'bg-success' | 'bg-secondary' | 'bg-danger' | 'bg-warning' | '';
      
    }

    const { notificationClass } = withDefaults(defineProps<{ notificationClass: 'bg-success' | 'bg-secondary' | 'bg-danger' | 'bg-warning' | '' }>(), { notificationClass: '' });
    
    let idTimeOut: number = 0;

    const { showNotification } = storeToRefs(useJournalStore());

    const closeNotification = () => showNotification.value = false;

    watch(
      () => showNotification.value, (newValue, oldValue) => {
        if (newValue) idTimeOut = setTimeout(() => showNotification.value = false, 3000);

        if (!newValue) clearTimeout(idTimeOut);
      }
    );
</script>

<style scoped>
  .dialog-enter-active,
  .dialog-leave-active {
      transition: opacity 300ms ease;
  }

  .dialog-enter-from,
  .dialog-leave-to {
      opacity: 0;
  }
</style>