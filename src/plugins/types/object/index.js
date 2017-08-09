import { isObject } from 'lodash';

const service = {
  /**
   * Determines whether validating element is object
   * @param {any} s validation target
   * @return {boolean}
   */
  Object: isObject,
};

export default service;
