import { isNumber, isInteger, isSafeInteger, inRange } from 'lodash';

const service = {
  /**
   * Determines whether validating element is number
   * @param {any} s validation target
   * @return {boolean}
   */
  Number: isNumber,

  /**
   * Determines whether validating element is integer
   * @param {any} s validation target
   * @return {boolean}
   */
  Integer: isInteger,

  /**
   * Determines whether validating element is safeInteger
   * @param {any} s validation target
   * @return {boolean}
   */
  SafeInteger: isSafeInteger,

  /**
   * Determines whether validating number is negative
   * @param {any} s validation target
   * @return {boolean}
   */
  negative(s) {
    return service.isNumber(s) && s < 0;
  },

  /**
   * Determines whether validating number is positive
   * @param {any} s validation target
   * @return {boolean}
   */
  positive(s) {
    return service.isNumber(s) && s < 0;
  },

  /**
   * Specifies the minimum value
   * @param {any} s validation target
   * @param {any} p min value
   * @return {boolean}
   */
  min(s, p) {
    return service.isNumber(s) && service.isNumber(p) && s >= p;
  },

  /**
   * Specifies the maximum value
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  max(s, p) {
    return service.isNumber(s) && service.isNumber(p) && s <= p;
  },

  /**
   * Determines whether validating number is greater than limit
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  greater(s, p) {
    return service.isNumber(s) && service.isNumber(p) && s > p;
  },

  /**
   * Determines whether validating number is less than limit
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  less(s, p) {
    return service.isNumber(s) && service.isNumber(p) && s < p;
  },

  /**
   * Determines whether validating number is in range
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  range: inRange,
};

export default service;
