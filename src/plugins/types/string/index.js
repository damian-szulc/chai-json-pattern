import { isString, startsWith, endsWith } from 'lodash';
const service = {
  /**
   * Determines whether validating element is string
   * @param {any} s validation target
   * @return {boolean}
   */
  String: isString,

  /**
   * Matches regular expression suplied as string
   * @param {any} s source
   * @param {any} p regex pattern
   */
  regex(s, p) {
    const pattern = new RegExp(p);
    return isString(s) && pattern && pattern.test(s);
  },

  /**
   * Requires the string value to contain only a-z, A-Z, and 0-9.
   * @param {any} s source
   */
  alphanum(s) {
    return isString(s) && /^[a-zA-Z0-9]+$/.test(s);
  },

  /**
   * Determines whether the specified string is lowercase
   * @param {any} s source
   */
  lowercase(s) {
    return isString(s) && s === s.lowercase();
  },

  /**
   * Determines whether the specified string is uppercase
   * @param {any} s source
   */
  uppercase(s) {
    return isString(s) && s === s.uppercase();
  },

  /**
   * Determines whether the specified string starts with
   * @param {any} s source
   * @param {any} p pattern
   */
  startsWith,

  /**
   * Determines whether the specified string ends with
   * @param {any} s source
   * @param {any} p pattern
   */
  endsWith,

};

export default service;
