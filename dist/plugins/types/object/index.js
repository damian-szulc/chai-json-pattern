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
  Object: _lodash.isObject
};

exports.default = service;