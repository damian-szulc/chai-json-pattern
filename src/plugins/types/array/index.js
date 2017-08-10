import { isArray } from 'lodash';

const service = {
  /**
   * Determines whether validating element is array
   * @param {any} s validation target
   * @return {boolean}
   */
  Array: isArray,
};

export default service;
