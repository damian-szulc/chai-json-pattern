import { isObject, isPlainObject } from 'lodash';

const service = {
  /**
   * Determines whether validating element is object
   * @param {any} s validation target
   * @return {boolean}
   */
  Object: isObject,
  /**
   * Determines whether validating element is object
   * @param {any} s validation target
   * @return {boolean}
   */
  PlainObject: isPlainObject,
};

export default service;
