/********************移动端相关工具*******************/
/**
 * 是否是安卓系统
 * @returns {boolean}
 */
export const mapIsAndroid = (): boolean => {
  const u = navigator.userAgent;
  return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
};
/**
 * 是否是IOS系统
 * @returns {boolean}
 */
export const mapIsIOS = (): boolean => {
  const u = navigator.userAgent;
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 iOS终端
};
