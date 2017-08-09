import { isArray } from 'lodash';

const service = {
  /**
   * Determines whether validating element is array
   * @param {any} s validation target
   * @return {boolean}
   */
  Boolean: isArray,
};

export default service;
