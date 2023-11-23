/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly MY_API_URL: string,
    readonly MY_CLOUD_NAME: string,
    readonly MY_CLOUDINARY_URL: string,
    readonly MY_CLOUD_API_KEY: string,
    readonly MY_CLOUD_API_SECRET: string,
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}