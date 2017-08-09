import { isBoolean } from 'lodash';

const service = {
  /**
   * Determines whether validating element is boolean
   * @param {any} s validation target
   * @return {boolean}
   */
  Boolean: isBoolean,

  /**
   * Determines whether validating element is truthy
   * @param {any} s validation target
   * @return {boolean}
   */
  truthy(s) {
    return !!s;
  },

  /**
   * Determines whether validating element is falsy
   * @param {any} s validation target
   * @return {boolean}
   */
  falsy(s) {
    return !s;
  },
};

export default service;
