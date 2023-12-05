import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { useAuthStore } from '../stores/auth';
import { useDialog } from '@/shared/modules/dialog/composables';

import type { UserRequest } from '../interfaces/userRequest';

export const useAuth = () => {
    const authStore = useAuthStore();
    const { signUpUser, signInUser, checkAuthStatus } = authStore;
    const dialog = useDialog();
    const router = useRouter();

    const userForm = ref<UserRequest>({
        name: '',
        email: '',
        password: '',
    });

    return {
        userForm,
        onSubmit: async() => {
            const { ok, message } = await signUpUser(userForm.value);

            if (!ok) {
                dialog.set({ dialogType: 'error', message: message! });
                dialog.show();
                return;
            }

            router.push({ name: 'no-entry' });
        },
        login: async() => {
            const { ok, message } = await signInUser({ email: userForm.value.email.trim(), password: userForm.value.password.trim() });

            if (!ok) {
                dialog.set({ dialogType: 'error', message: message! });
                dialog.show();
                return;
            }

            router.push({ name: 'no-entry' });
        },
        checkAuthenticationStatus: async() => {
            const { ok, message } = await checkAuthStatus();
        },
    }
}