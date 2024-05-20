import { DirectiveBinding } from 'vue';
import { IDirectiveNumberBindingVO, IDirectiveTextBindingVO } from './directive-filter.api';

/**
 * "123-foo" will be parsed to 123
 * This is used for the .number modifier in v-model
 */
export declare const looseToNumber: (val: any) => any;
export declare const addEventListener: (el: Element, event: string, handler: EventListener, options?: EventListenerOptions) => void;
export declare function removeEventListener(el: Element, event: string, handler: EventListener, options?: EventListenerOptions): void;
export declare const deduplicate: (target: string, symbol: string) => string;
/**
 * 过滤文本
 * @param domValue 文本内容
 * @param binding 指令传参
 * @returns
 */
export declare const handleTextFilter: (domValue: string, binding: DirectiveBinding<IDirectiveTextBindingVO>) => string;
/**
 * 数字过滤
 * @param domValue 文本内容
 * @param binding 指令传参
 * @returns
 */
export declare const handleNumberFilter: (domValue: string, binding: DirectiveBinding<IDirectiveNumberBindingVO>) => string;
