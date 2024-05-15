/******************校验相关********************/
/**
 * 是否是邮箱
 * @param {string} str
 * @returns {boolean}
 */
export const isEmail = (str: string): boolean => {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(str);
};
/**
 * 是否是手机号码
 * @param {string} str
 * @returns {boolean}
 */
export const isCellPhoneNumber = (str: string): boolean => {
  return /^1[0-9]{10}$/.test(str);
};
/**
 * 是否是电话号码
 * @param {string} str
 * @returns {boolean}
 */
export const isTelePhonePhone = (str: string): boolean => {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(str);
};
