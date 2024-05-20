import { App, DirectiveBinding } from 'vue';

export declare const VInputFilter: {
    install(app: App): void;
    directive: {
        created(el: HTMLInputElement, binding: DirectiveBinding<any>): void;
        mounted(el: HTMLInputElement, binding: DirectiveBinding<any>): void;
        beforeUpdate(el: HTMLInputElement, binding: DirectiveBinding<any>): void;
    };
};
