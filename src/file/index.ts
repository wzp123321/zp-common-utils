import SparkMD5 from 'spark-md5';

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
 * 获取文件md5
 * @param file
 * @returns {Promise<string | null>}
 */
export const mapFileMD5 = (file: File): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!file) {
      resolve(null);
      return;
    }

    const fileReader = new FileReader();
    const spark = new SparkMD5.ArrayBuffer();
    // 获取文件二进制数据
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e: ProgressEvent) => {
      spark.append((e.target as any).result);
      const md5 = spark.end();
      resolve(md5);
    };
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
