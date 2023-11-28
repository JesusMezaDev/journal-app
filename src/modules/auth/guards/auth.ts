import { storeToRefs } from 'pinia';
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

import { useAuthStore } from '../stores/auth'

export const isAuthenticatedGuard = async(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore();
    const { checkAuthStatus } = authStore;
    // const { status } = storeToRefs(authStore);

    const { ok } = await checkAuthStatus();

    if (ok) next();
    else next({ name: 'login' });
}