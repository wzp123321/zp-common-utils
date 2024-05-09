/*
 * @Author: wzp123321 wanzhipengx@163.com
 * @Date: 2024-05-09 22:25:45
 * @LastEditors: wzp123321 wanzhipengx@163.com
 * @LastEditTime: 2024-05-09 22:35:05
 * @FilePath: \zp-common-utils\src\file\index.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 文件上传处理
 * @param accept 允许的后缀
 * @param multiple 是否支持多选
 */
export declare function handleFileChoose(accept: string, multiple: boolean);
/**
 * 文件转本地url
 * @param file
 */
export declare function transferFileToUrl(file: File);

/**
 * 二进制响应处理
 * @param blob 二进制流
 * @param name 输出文件名
 */
export declare function FBlobHandler(blob: Blob, name?: string);

/**
 * 文件下载处理
 * @param url 源路径
 * @param name 输出文件名
 */
export declare function FDownLoadHandler(url: string, name?: string);



/**
 * 文件分片
 * @param file
 * @returns
 */
export declare function mapFileChunks(file: File);
