/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly SECRET_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
