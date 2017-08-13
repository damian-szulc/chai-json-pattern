'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _helpers = require('../helpers');

var service = {
  /**
   * Determines whether validating element is nill
   * @param {any} s validation target
   * @return {boolean}
   */
  nil: _lodash.isNil,

  /**
   * Determines whether validating element is null
   * @param {any} s validation target
   * @return {boolean}
   */
  null: _lodash.isNull,

  /**
   * Determines whether validating element is NaN
   * @param {any} s validation target
   * @return {boolean}
   */
  NaN: _lodash.isNaN,

  /**
   * Determines whether validating element is Symbol
   * @param {any} s validation target
   * @return {boolean}
   */
  Symbol: _lodash.isSymbol,

  /**
   * Determines whether validating element is undefined
   * @param {any} s validation target
   * @return {boolean}
   */
  undefined: _lodash.isUndefined,

  /**
   * Determines whether validating element is empty
   * @param {any} s validation target
   * @return {boolean}
   */
  empty: _lodash.isEmpty,

  /**
   * Always pass
   * @param {any} s validation target
   * @return {boolean}
   */
  any: function any() {
    return true;
  },


  /**
  * Specifies the maximum number of items in the array or chars in string
  * @param {any} s matching target value
  * @param {any} p pattern value
  * @return {bolean}
  */
  maxLength: function maxLength(s, p) {
    return (0, _helpers.positiveSafeInteger)(p) && ((0, _lodash.isArray)(s) || (0, _lodash.isString)(s)) && s.length <= p;
  },


  /**
   * Specifies the minimum number of items in the array or chars in string
   * @param {any} s matching target value
   * @param {any} p pattern value
   * @return {bolean}
  */
  minLength: function minLength(s, p) {
    var maxlen = Number(p);
    return maxlen && ((0, _lodash.isArray)(s) || (0, _lodash.isString)(s)) && s.length >= p;
  },


  /**
   * Specifies the exact number of items in the array or chars in string
   * @param {any} s matching target value
   * @param {any} p pattern value
   * @return {bolean}
   */
  length: function length(s, p) {
    var maxlen = Number(p);
    return maxlen && ((0, _lodash.isArray)(s) || (0, _lodash.isString)(s)) && s.length === p;
  }
};

exports.default = service;