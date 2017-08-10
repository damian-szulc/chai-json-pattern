import { isDate, isNil } from 'lodash';

const service = {
  /**
   * Determines whether validating element is Date
   * @param {any} s validation target
   * @return {boolean}
   */
  Date: isDate,

  /**
   * Determines whether suplied date is in ISO format
   * @param {any} s validation target
   * @return {boolean}
   */
  dateString(s) {
    return !isNil(Date.parse(String(s)));
  },
};

export default service;
