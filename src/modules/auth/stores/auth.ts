import { ref } from 'vue';
import { defineStore, storeToRefs } from 'pinia';
import { isAxiosError } from 'axios';

import { useJournalStore } from '@/stores/journal';
import { authStatus } from '../enums/auth';
import { authApi } from '@/api/authApi';

import type { User } from '../interfaces/user';
import type { UserInfo } from '../interfaces/userInfo';
import { useDaybookStore } from '../../daybook/stores/daybook';

const handlingError = (error: unknown) => {
    if (!isAxiosError(error)) return { ok: false, message: 'Opps! Hubo un error, por favor intente más tarde.' };
    
    const errorType: string = error.response?.data.error.message;
    if (errorType.includes('EMAIL_EXISTS')) return { ok: false, message: 'El email ya existe' };
    if (errorType.includes('WEAK_PASSWORD')) return { ok: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    if (errorType.includes('INVALID_EMAIL')) return { ok: false, message: 'El email no es válido' };
    if (errorType.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) return { ok: false, message: 'Demasiados intentos. Intente más tarde' };
    
    // if (error instanceof Error) return { ok: false, message: 'Opps! Hubo un error, por favor intente más tarde.' };
    return { ok: false, message: 'Opps! Hubo un error, por favor intente más tarde.' };
}

export const useAuthStore = defineStore('auth', () => {
    const { isLoading } = storeToRefs(useJournalStore());
    const { entries } = storeToRefs(useDaybookStore());
    const idToken = ref<string>();
    const refreshToken = ref<string>();
    const status = ref<authStatus>(authStatus.authenticating);
    const user = ref<User>();

    const loginUser = (userInfo: UserInfo) => {
        if (!idToken) return;
        if (!refreshToken) return;

        localStorage.setItem('idToken', userInfo.idToken);
        idToken.value = userInfo.idToken;
        localStorage.setItem('refreshToken', userInfo.refreshToken);
        refreshToken.value = userInfo.refreshToken;

        user.value = userInfo.user;
        status.value = authStatus.authenticated;
    }
    
    const logoutUser = () => {
        idToken.value = undefined;
        refreshToken.value = undefined;
        user.value = undefined;
        status.value = authStatus.notauthenticated;
        localStorage.removeItem('idToken');
        localStorage.removeItem('refreshToken');
        entries.value = [];
    }

    const signUpUser = async(user: { name: string, email: string, password: string }) => {
        isLoading.value = true;

        const { name, email, password } = user;

        try {
            const { data } = await authApi.post(':signUp', { email, password, returnSecureToken: true });
            const { idToken, refreshToken } = data;

            await authApi.post(':update', { displayName: name, idToken });
            

            loginUser({ user: { name, email }, idToken, refreshToken });

            return { ok: true, message: null };
        } catch (error) {
            return handlingError(error);
        }
        finally {
            isLoading.value = false;
        }
    }

    const signInUser = async(user: { email: string, password: string }) => {
        isLoading.value = true;

        const { email, password } = user;

        try {
            const { data } = await authApi.post(':signInWithPassword', { email, password, returnSecureToken: true });
            const { displayName, idToken, refreshToken } = data;

            loginUser({ user: { name: displayName, email }, idToken, refreshToken });

            return { ok: true, message: null };
        } catch (error) {
            return handlingError(error);
        }
        finally {
            isLoading.value = false;
        }
    }

    const checkAuthStatus = async () => {
        const idToken = localStorage.getItem('idToken');
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!idToken) {
            logoutUser();
            return { ok: false, message: 'No hay token' };
        }
        
        if (!refreshToken) {
            logoutUser();
            return { ok: false, message: 'No hay refresh token' };
        }
        
        isLoading.value = true;

        try {
            const { data } = await authApi.post(':lookup', { idToken });
            const [userResponse] = data.users;
            const { displayName, email } = userResponse;
            const user: User = { name: displayName, email };
            loginUser({ user, idToken, refreshToken });
            return { ok: true, message: null };
        } catch (error) {
            logoutUser();
            return handlingError(error);
        }
        finally {
            isLoading.value = false;
        }
    }
    
    return {
        checkAuthStatus,
        idToken,
        logoutUser,
        refreshToken,
        signInUser,
        signUpUser,
        status,
        user,
    }
});