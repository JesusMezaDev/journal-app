<template>
    <div class="d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">{{ day }}</span>
            <span class="first-letter-capitalize mx-1 fs-3">{{ month }} {{ year }},</span>
            <span class="first-letter-capitalize mx-2 fs-4 fw-light">{{ weekDay }}</span>
        </div>
        <div>
            <input type="file" @change="onSelectedImage($event)" ref="imageSelector" v-show="false" accept="image/png, image/jpeg">
            <button class="btn btn-danger mx-2 bi bi-trash" @click="confirmDeleteEntry">
                Borrar
            </button>
            <button class="btn btn-primary bi bi-upload" @click="onSelectImage">
                Subir Foto
            </button>
        </div>
    </div>
    <hr>
    <div class="d-flex flex-column px-3 h-75">
        <textarea placeholder="¿Qué sucedió hoy?" v-model="entryText"></textarea>
    </div>
    <Fab icon="bi-floppy" @on:click="saveEntry"/>
    <img v-if="!localImage && entry?.picture"
        :src="entry.picture"
        alt="Imagen cargada remotamente"
        class="img-thumbnail">
    <img v-if="localImage"
        :src="localImage"
        alt="Imagen cargada localmente"
        class="img-thumbnail">
</template>

<script setup lang="ts">
    import { defineAsyncComponent, ref, watch } from 'vue';
    import { useRouter } from 'vue-router';

    import { useDaybookStore } from '../stores/daybook';
    import type { Entry } from '../interfaces/entry';
    import { useDialog } from '@/shared/modules/dialog/composables';
    
    import { getYearMonthDay } from '../helpers/getYearMonthDay';
    import { deleteImage, uploadImage } from '../helpers/uploadImage';

    const router = useRouter();
    const props = defineProps<{ id: string }>();
    
    const Fab = defineAsyncComponent(() => import('../components/Fab.vue'));

    const daybookStore = useDaybookStore();
    const dialog = useDialog();
    const entry = ref<Entry | undefined>(undefined);
    const entryText = ref<string>('');
    const { getEntryById, updateEntry, createEntry, deleteEntry } = daybookStore;
    const year = ref<string>();
    const month = ref<string>();
    const weekDay = ref<string>();
    const day = ref<string>();
    const file = ref<File | null>(null);
    const localImage = ref<string>();
    const imageSelector = ref<HTMLInputElement | null>(null);
    
    const loadEntry = () => {
        if (props.id === 'new') entry.value = { date: new Date(), text: '' };

        if (props.id != 'new') entry.value = getEntryById(props.id);
        
        if (!entry.value) return router.push({ name: 'no-entry' });

        entryText.value = entry.value?.text || '';
        
        const dateInfo = getYearMonthDay(new Date(entry.value?.date));
        
        year.value = dateInfo.year ?? '';
        month.value = dateInfo.month ?? '';
        weekDay.value = dateInfo.weekDay ?? '';
        day.value = dateInfo.day ?? '';
    }

    const saveEntry = async () => {
        if (file.value && entry.value!.picture) {
            await deleteImage(entry.value!.picture.trim())
        }
        
        if (file.value) entry.value!.picture = await uploadImage(file.value as File);

        entry.value!.text = entryText.value;

        if (props.id === 'new') {
            await createEntry(entry.value as Entry);
            // return router.push({ name: 'entry', params: { id: newEntry } });
            return router.push({ name: 'no-entry' });
        }

        await updateEntry(entry.value as Entry);

        file.value = null;
        localImage.value = undefined;
    }

    const confirmDeleteEntry = async () => {
        if (props.id === 'new') return;

        dialog.set({
            dialogType: 'confirm',
            message: '¿Estás seguro de eliminar esta entrada?',
            onConfirmDialog: async () => {
                await deleteEntry(props.id);
                router.push({ name: 'daybook' });
            },
            labelOkButton: 'Sí',
            labelCancelButton: 'No'
        });
        dialog.show();
    }

    const onSelectedImage = (event: Event) => {
        const input = event.target;
        
        if (!input) return;

        if (!(input instanceof HTMLInputElement)) return;
        
        const ext = input.value.split('.').pop()?.toLocaleLowerCase();

        if (!['png', 'jpg', 'jpeg'].includes(ext ?? '---')) return;

        if (!input.files) {
            localImage.value = undefined;
            return;
        }

        if (!input.files[0]) {
            localImage.value = undefined;
            return;
        }

        file.value = input.files[0];

        const fileReader = new FileReader();
        fileReader.onload = () => localImage.value = fileReader.result?.toString();
        fileReader.readAsDataURL(file.value);
    }

    const onSelectImage = () => {
        if (!imageSelector.value) return;

        if (!(imageSelector.value instanceof HTMLInputElement)) return;

        imageSelector.value.click();
    }
    
    loadEntry();

    watch(() => props.id, () => {
        loadEntry();
    });
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
</style>