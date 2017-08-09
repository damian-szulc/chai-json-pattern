'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var service = {
  /**
   * Determines whether validating element is boolean
   * @param {any} s validation target
   * @return {boolean}
   */
  Boolean: _lodash.isBoolean,

  /**
   * Determines whether validating element is truthy
   * @param {any} s validation target
   * @return {boolean}
   */
  truthy: function truthy(s) {
    return !!s;
  },


  /**
   * Determines whether validating element is falsy
   * @param {any} s validation target
   * @return {boolean}
   */
  falsy: function falsy(s) {
    return !s;
  }
};

exports.default = service;