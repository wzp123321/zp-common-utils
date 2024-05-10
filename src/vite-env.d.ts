/// <reference types="vite/client" />

declare module 'vue' {
  export interface GlobalComponents {
    ZpCommonUtils: typeof ZpCommonUtils;
  }
}
