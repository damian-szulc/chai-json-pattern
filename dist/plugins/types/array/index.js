'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var service = {
  /**
   * Determines whether validating element is array
   * @param {any} s validation target
   * @return {boolean}
   */
  Boolean: _lodash.isArray
};

exports.default = service;