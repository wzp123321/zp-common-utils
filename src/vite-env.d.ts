/// <reference types="vite/client" />

export type Nullable<T> = T | null | undefined;

export interface Fn<T = any> {
  (...arg: T[]): T;
}
