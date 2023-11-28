<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="../../../assets/journal.svg"
                alt="Libreta de anotaciones con un lápiz amarillo acomodado de manera horizontal"
                class="d-inline-block align-text-top mx-2"
                height="32">
            {{ user?.name }}
        </a>
        <div class="d-flex">
            <button class="btn btn-outline-info mx-2 bi-box-arrow-right" @click="logout"></button>
        </div>
    </nav>
</template>

<script lang="ts" setup>
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '@/modules/auth/stores/auth';
    const useAuth = useAuthStore();
    const { logoutUser } = useAuth;
    const { user } = storeToRefs(useAuth);
    const router = useRouter();
    const logout = () => {
        logoutUser();
        router.push({ name: 'login' })
    }
</script>