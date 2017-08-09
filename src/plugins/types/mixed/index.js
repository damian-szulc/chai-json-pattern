import { isString, isArray, isNil, isNull, isNaN, isUndefined, isSymbol, isEmpty } from 'lodash';
import { positiveSafeInteger } from '../helpers';

const service = {
  /**
   * Determines whether validating element is nill
   * @param {any} s validation target
   * @return {boolean}
   */
  nill: isNil,

  /**
   * Determines whether validating element is null
   * @param {any} s validation target
   * @return {boolean}
   */
  null: isNull,

  /**
   * Determines whether validating element is NaN
   * @param {any} s validation target
   * @return {boolean}
   */
  NaN: isNaN,

  /**
   * Determines whether validating element is Symbol
   * @param {any} s validation target
   * @return {boolean}
   */
  Symbol: isSymbol,

  /**
   * Determines whether validating element is undefined
   * @param {any} s validation target
   * @return {boolean}
   */
  undefined: isUndefined,

  /**
   * Determines whether validating element is empty
   * @param {any} s validation target
   * @return {boolean}
   */
  empty: isEmpty,

  /**
   * Always pass
   * @param {any} s validation target
   * @return {boolean}
   */
  any() {
    return true;
  },

  /**
  * Specifies the maximum number of items in the array or chars in string
  * @param {any} s matching target value
  * @param {any} p pattern value
  * @return {bolean}
  */
  maxLength(s, p) {
    return positiveSafeInteger(p) && ( isArray(s) || isString(s) ) && s.length <= p;
  },

  /**
   * Specifies the minimum number of items in the array or chars in string
   * @param {any} s matching target value
   * @param {any} p pattern value
   * @return {bolean}
  */
  minLength(s, p) {
    const maxlen = Number(p);
    return maxlen && ( isArray(s) || isString(s) ) && s.length >= p;
  },

  /**
   * Specifies the exact number of items in the array or chars in string
   * @param {any} s matching target value
   * @param {any} p pattern value
   * @return {bolean}
   */
  length(s, p) {
    const maxlen = Number(p);
    return maxlen && ( isArray(s) || isString(s) ) && s.length === p;
  },
};

export default service;