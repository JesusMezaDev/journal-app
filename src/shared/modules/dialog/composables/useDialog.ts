import { useDialogStore } from '@/shared/modules/dialog/store/dialog.store';

export const useDialog = () => {
    const { setDialog, show } = useDialogStore();

   return {
     set: setDialog,
     show,
   }
}