<template>
    <Transition name="dialog">
        <div v-if="isShowing" class="dialog-container">
            <div class="dialog position-absolute d-flex justify-content-center align-items-center h-100 w-100" @click.self="selfClose">
                <AlertDialog v-if="dialogType === 'alert'" />
                <ConfirmDialog v-if="dialogType === 'confirm'" />
                <ErrorDialog v-if="dialogType === 'error'" />
                <SuccessDialog v-if="dialogType === 'success'" />
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
    import { storeToRefs } from 'pinia';
    import AlertDialog from '@/shared/modules/dialog/components/AlertDialog.vue';
    import ConfirmDialog from '@/shared/modules/dialog/components/ConfirmDialog.vue';
    import ErrorDialog from '@/shared/modules/dialog/components/ErrorDialog.vue';
    import SuccessDialog from '@/shared/modules/dialog/components/SuccessDialog.vue';
    import { useDialogStore } from '@/shared/modules/dialog/store/dialog.store';

    const dialogStore = useDialogStore();
    const { dialogType, isShowing } = storeToRefs(dialogStore);
    const { selfClose } = dialogStore;
</script>

<style scoped>
    .dialog {
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
    }

    .dialog-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9;
    }

    .dialog-enter-active,
    .dialog-leave-active {
        transition: opacity 0.2s ease;
    }

    .dialog-enter-from,
    .dialog-leave-to {
        opacity: 0;
    }
</style>