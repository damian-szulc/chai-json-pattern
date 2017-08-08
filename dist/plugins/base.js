'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  return {
    inRange: _lodash.inRange,
    isArray: _lodash.isArray,
    isArrayBuffer: _lodash.isArrayBuffer,
    isBuffer: _lodash.isBuffer,
    isDate: _lodash.isDate,
    isElement: _lodash.isElement,
    isEmpty: _lodash.isEmpty,
    isEqual: _lodash.isEqual,
    isEqualWith: _lodash.isEqualWith,
    isError: _lodash.isError,
    isFinite: _lodash.isFinite,
    isInteger: _lodash.isInteger,
    isLength: _lodash.isLength,
    isNil: _lodash.isNil,
    isRegExp: _lodash.isRegExp,
    isSafeInteger: _lodash.isSafeInteger,
    // aliases
    Boolean: _lodash.isBoolean,
    String: _lodash.isString,
    Number: _lodash.isNumber,
    NaN: _lodash.isNaN,
    Null: _lodash.isNull,
    Object: _lodash.isObject,
    Undefined: _lodash.isUndefined,
    // extra
    isDateString: function isDateString(s) {
      return !(0, _lodash.isNil)(Date.parse(String(s)));
    },
    kebabCase: function kebabCase(s, p) {
      return s === (0, _lodash.kebabCase)(p);
    },
    lowerCase: function lowerCase(s, p) {
      return s === (0, _lodash.lowerCase)(p);
    }
  };
};

var _lodash = require('lodash');