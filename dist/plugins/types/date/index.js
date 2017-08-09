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
  date: _lodash.isDate,

  /**
   * Determines whether suplied date is in ISO format
   * @param {any} s validation target
   * @return {boolean}
   */
  isDateString: function isDateString(s) {
    return !(0, _lodash.isNil)(Date.parse(String(s)));
  }
};

exports.default = service;