'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var service = {
  /**
   * Determines whether validating element is Date
   * @param {any} s validation target
   * @return {boolean}
   */
  Date: _lodash.isDate,

  /**
   * Determines whether suplied date is in ISO format
   * @param {any} s validation target
   * @return {boolean}
   */
  dateString: function dateString(s) {
    return !(0, _lodash.isNil)(Date.parse(String(s)));
  }
};

exports.default = service;