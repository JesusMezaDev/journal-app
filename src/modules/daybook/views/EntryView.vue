<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">18</span>
            <span class="mx-1 fs-3">Noviembre</span>
            <span class="mx-2 fs-4 fw-light">2023, Sábado</span>
        </div>
        <div>
            <button class="btn btn-danger mx-2 bi bi-trash">
                Borrar
            </button>
            <button class="btn btn-primary bi bi-upload">
                Subir Foto
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?"></textarea>
    </div>
    <Fab icon="bi-floppy" />
    <img
        src="https://tv-azteca-brightspot.s3.amazonaws.com/d7/33/cc9abfe24152a3ff46e36487aea8/dragon-ball-en-azteca-7-estas-son-las-peliculas-que-podras-ver-en-junio.jpg"
        alt="Gokú y su hijo Son Gohan surcando los cielos en la nube voladora"
        class="img-thumbnail">
</template>

<script setup lang="ts">
    import { defineAsyncComponent } from 'vue';

    const Fab = defineAsyncComponent(() => import('../components/Fab.vue'));
</script>

<style lang="scss" scoped>
    img {
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #FFFFFF, $alpha: 0.2);
    }
    
    textarea {
        background-color: transparent;
        border: none;
        font-size: 20px;
        height: 100%;
        resize: none;

        &:focus {
            outline: none;
        }
    }

    // .entry-title {

    // }
</style>