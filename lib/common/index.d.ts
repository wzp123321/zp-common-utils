export interface ISize {
    width: number;
    height: number;
}
/**
 * 标签尺寸计算器
 * @param label 标签文本
 * @param fontSize 文本字号
 * @param lineHeight 文本行高
 * @returns 标签尺寸信息（单位：px） -width：宽 -height：高
 */
export declare const FLabelSizeCalculator: (label: string, fontSize?: string, lineHeight?: string) => ISize;
/**
 * 获取地址参数项
 * @param key 参数名
 * @returns 参数名对应的值
 */
export declare const FGetQueryParam: (key: string) => string | undefined;
