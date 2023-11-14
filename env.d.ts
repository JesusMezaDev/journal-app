/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MY_API_URL: string,
    readonly MY_CLOUD_NAME: string,
    readonly MY_CLOUDINARY_URL: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}