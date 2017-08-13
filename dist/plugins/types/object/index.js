'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var service = {
  /**
   * Determines whether validating element is object
   * @param {any} s validation target
   * @return {boolean}
   */
  Object: _lodash.isObject,
  /**
   * Determines whether validating element is object
   * @param {any} s validation target
   * @return {boolean}
   */
  PlainObject: _lodash.isPlainObject
};

exports.default = service;