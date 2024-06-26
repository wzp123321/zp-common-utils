/**
 * 文件上传处理
 * @param accept 允许的后缀
 * @param multiple 是否支持多选
 * @returns 目标文件域
 */
export const handleFileChoose = (accept: string, multiple: boolean = false) => {
  return new Promise((resolve) => {
    const element = document.createElement('input');
    element.multiple = multiple;
    element.type = 'file';
    accept && (element.accept = accept);
    element.click();
    element.onchange = () => {
      if (element.files) {
        resolve([...(element.files as any)]);
      }
      element.remove();
    };
  });
};
/**
 * 文件转本地url
 * @param file
 * @returns
 */
export const transferFileToUrl = (file: File) => {
  let url = null;
  if ((window as any).createObjectURL != undefined) {
    url = (window as any).createObjectURL(file);
  } else if (window.URL != undefined) {
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL != undefined) {
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
};
/**
 * 二进制响应处理
 * @param blob 二进制流
 * @param name 输出文件名
 */
export const FBlobHandler = (blob: Blob, name?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (blob.size) {
      const reader = new FileReader();

      if (blob.type.includes('json')) {
        reader.onloadend = (e) => {
          const res = JSON.parse(e.target?.result as string);
          reject(res?.message ?? '未知原因');
        };
        reader.readAsText(blob);
      } else {
        reader.onloadend = (e) => {
          FDownLoadHandler(e.target?.result as string, name)
            .then(() => resolve())
            .catch((error) => reject(error));
        };
        reader.readAsDataURL(blob);
      }
    } else {
      reject(`无法获取${name || '文件'}`);
    }
  });
};
/**
 * 文件下载处理
 * @param url 源路径
 * @param name 输出文件名
 */
export const FDownLoadHandler = (url: string, name?: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (url) {
      const element = document.createElement('a');
      element.href = url;
      name && (element.download = name);
      element.click();
      resolve();
      element.remove();
    } else {
      reject(`无法下载${name || '文件'}`);
    }
  });
};
/**
 * 文件分片
 * @param file
 * @returns
 */
export const mapFileChunks = (file: File) => {
  const CHUNK_SIZE = 1024 * 1024 * 10; // 每个文件切片大小定为10MB .
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const chunks = [];
  for (let index = 0; index < totalChunks; index++) {
    const start = index * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);

    chunks.push({
      index,
      data: chunk,
    });
  }

  return chunks;
};
/**
 * 获取文件后缀名
 * @param file 文件
 * @returns 后缀名
 */
export const getFileExtension = (file: File) => {
  const name = file.name;
  const arr = name.split('.');
  return arr[arr.length - 1];
};
/**
 * 格式化文件单位
 * @param {number} size  文件大小(kb)
 * @returns string
 */
export const fileFormatSize = (size: number): string => {
  let i;
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  for (i = 0; i < unit.length && size >= 1024; i++) {
    size /= 1024;
  }
  return (Math.round(size * 100) / 100 || 0) + unit[i];
};
