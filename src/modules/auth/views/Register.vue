<template>
    <form @submit.prevent="onSubmit">
        <div class="card-sm m-5">
            <div class="text-center">
                <span class="fs-2">
                    Registro
                </span>
            </div>
            <div class="card-body">
                <div class="input-group input-group-sm m-2">
                    <span class="input-group-text bi-person" id="name"></span>
                    <input type="text" class="form-control" placeholder="Nombre" aria-label="name" aria-describedby="name" required v-model="userForm.name">
                </div>
                <div class="input-group input-group-sm m-2">
                    <span class="input-group-text bi-envelope" id="email"></span>
                    <input type="email" class="form-control" placeholder="Correo" aria-label="email" aria-describedby="email" required v-model="userForm.email">
                </div>
                <div class="input-group input-group-sm m-2">
                    <span class="input-group-text bi-key" id="password"></span>
                    <input type="password" class="form-control" placeholder="Contraseña" aria-label="password" aria-describedby="password" required v-model="userForm.password">
                </div>
                <div class="text-center m-2">
                    <button type="submit" class="btn btn-primary btn-sm">
                        <i class="bi-person-add"></i>
                        Crear cuenta
                    </button>
                </div>
                <div class="text-center m-2">
                    <router-link :to="{ name: 'login' }">¿Ya tienes cuenta?</router-link>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { useAuth } from '../composables/useAuth';
    const { userForm, onSubmit } = useAuth();
</script>

<style scoped>

</style>