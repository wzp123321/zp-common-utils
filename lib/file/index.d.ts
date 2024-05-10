/**
 * 文件上传处理
 * @param accept 允许的后缀
 * @param multiple 是否支持多选
 * @returns 目标文件域
 */
export declare const handleFileChoose: (accept: string, multiple?: boolean) => Promise<unknown>;
/**
 * 文件转本地url
 * @param file
 * @returns
 */
export declare const transferFileToUrl: (file: File) => any;
/**
 * 二进制响应处理
 * @param blob 二进制流
 * @param name 输出文件名
 */
export declare const FBlobHandler: (blob: Blob, name?: string) => Promise<void>;
/**
 * 文件下载处理
 * @param url 源路径
 * @param name 输出文件名
 */
export declare const FDownLoadHandler: (url: string, name?: string) => Promise<void>;
/**
 * 文件分片
 * @param file
 * @returns
 */
export declare const mapFileChunks: (file: File) => {
    index: number;
    data: Blob;
}[];
