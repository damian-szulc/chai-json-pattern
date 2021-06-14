'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var service = {
  /**
   * Determines whether validating element is number
   * @param {any} s validation target
   * @return {boolean}
   */
  Number: _lodash.isNumber,

  /**
   * Determines whether validating element is integer
   * @param {any} s validation target
   * @return {boolean}
   */
  Integer: _lodash.isInteger,

  /**
   * Determines whether validating element is safeInteger
   * @param {any} s validation target
   * @return {boolean}
   */
  SafeInteger: _lodash.isSafeInteger,

  /**
   * Determines whether validating number is negative
   * @param {any} s validation target
   * @return {boolean}
   */
  negative: function negative(s) {
    return (0, _lodash.isNumber)(s) && s < 0;
  },


  /**
   * Determines whether validating number is positive
   * @param {any} s validation target
   * @return {boolean}
   */
  positive: function positive(s) {
    return (0, _lodash.isNumber)(s) && s < 0;
  },


  /**
   * Specifies the minimum value
   * @param {any} s validation target
   * @param {any} p min value
   * @return {boolean}
   */
  min: function min(s, p) {
    return (0, _lodash.isNumber)(s) && (0, _lodash.isNumber)(p) && s >= p;
  },


  /**
   * Specifies the maximum value
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  max: function max(s, p) {
    return (0, _lodash.isNumber)(s) && (0, _lodash.isNumber)(p) && s <= p;
  },


  /**
   * Determines whether validating number is greater than limit
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  greater: function greater(s, p) {
    return (0, _lodash.isNumber)(s) && (0, _lodash.isNumber)(p) && s > p;
  },


  /**
   * Determines whether validating number is less than limit
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  less: function less(s, p) {
    return (0, _lodash.isNumber)(s) && (0, _lodash.isNumber)(p) && s < p;
  },


  /**
   * Determines whether validating number is in range
   * @param {any} s validation target
   * @param {any} p max value
   * @return {boolean}
   */
  range: _lodash.inRange
};

exports.default = service;