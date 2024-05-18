/**********************数字相关工具************************/
/**
 * 处理数据千分位
 * @param {number} value
 * @param {string} returnType
 * @returns {string}
 */
export declare const thousandSeparation: (value: number, returnType?: string) => string;
/**
 * 解决加法导致精度丢失
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @returns {number}
 */
export declare const floatAdd: (arg1: number, arg2: number) => number;
/**
 * 解决减法导致精度丢失
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @returns {string}
 */
export declare const floatSub: (arg1: number, arg2: number) => string;
/**
 * 解决乘法导致精度丢失
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @returns {number| null}
 */
export declare const floatMultiply: (arg1: number | null, arg2: number | null) => number | null;
/**
 * 解决除法导致精度丢失
 * @param {number} arg1 参数1
 * @param {number} arg2 参数2
 * @returns {number| null}
 */
export declare const floatDivide: (arg1: number, arg2: number) => number | null;
/**
 * 阿拉伯数字转中文
 * @param {number} num
 * @returns {string}
 */
export declare const convertToChinaNum: (num: number) => string;
/**
 * 数字转大写金额
 * @param {number| null} value
 * @returns {string}
 */
export declare const convertNumberToAmountInWords: (value: number | null) => string;
/**
 * 生成数字数组
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
export declare const makeRange: (start: number, end: number) => number[];
/**
 * 生成随机32位数字
 * @returns {string}
 */
export declare const randomNumber32: () => string;
/**
 * 生成随机16位数字
 * @returns {string}
 */
export declare const randomNumber16: () => string;
/**
 * 生成随机四位数字
 * @returns {string}
 */
export declare const n4: () => string;
