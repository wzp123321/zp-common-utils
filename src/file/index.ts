import { Nullable } from '../vite-env';

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

export const openWindow = (
  url: string,
  opt?: {
    target?: '_self' | '_blank' | string;
    noopener?: boolean;
    noreferrer?: boolean;
  },
) => {
  const { target = '__blank', noopener = true, noreferrer = true } = opt || {};
  const feature: string[] = [];

  noopener && feature.push('noopener=yes');
  noreferrer && feature.push('noreferrer=yes');

  window.open(url, target, feature.join(','));
};

/**
 * base64转blob
 */
export const dataURLtoBlob = (base64Buf: string): Blob => {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

/**
 * 将url设置为base64
 * @param url
 */
export const urlToBase64 = (url: string, mineType?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d');

    const img = new Image();
    img.crossOrigin = '';
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png');
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
};

/**
 * 在线下载图片
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export const downloadByOnlineUrl = (url: string, filename: string, mime?: string, bom?: BlobPart) => {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom);
  });
};

/**
 * 下载基于base64的图片
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export const downloadByBase64 = (buf: string, filename: string, mime?: string, bom?: BlobPart) => {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
};

/**
 * 根据后台界面下载文件流
 * @param {*} data
 * @param {*} filename
 * @param {*} mime
 * @param {*} bom
 */
export const downloadByData = (data: BlobPart, filename: string, mime?: string, bom?: BlobPart) => {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' });

  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL);
};

/**
 * 根据文件地址下载文件
 * @param {*} sUrl
 */
export const downloadByUrl = ({
  url,
  target = '_blank',
  fileName,
}: {
  url: string;
  target?: '_self' | '_blank';
  fileName?: string;
}): boolean => {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a');
    link.href = url;
    link.target = target;

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length);
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }

  openWindow(url, { target });
  return true;
};
