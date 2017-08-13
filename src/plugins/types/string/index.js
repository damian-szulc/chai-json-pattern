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

  /**
   * Determines whether the specified string is uuid
   * @param {any} source source
   * @param {any} version version of uuid
   */
  uuid(source, version) {
    const ver = version
      ? [1, 2, 3, 4, 5].find(v => v === Number(version))
      : null;

    const isUuid = new RegExp(`^[0-9a-f]{8}-[0-9a-f]{4}-[${ver || '1-5'}][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$`, 'i');
    return service.String(source)
      && isUuid.test(source);
  },

};

export default service;
