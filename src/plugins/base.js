import {
  inRange,
  isArray,
  isArrayBuffer,
  isBoolean,
  isBuffer,
  isDate,
  isElement,
  isEmpty,
  isEqual,
  isEqualWith,
  isError,
  isFinite,
  isInteger,
  isLength,
  isNaN,
  isNil,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isSafeInteger,
  isString,
  isUndefined,
  kebabCase as _kebabCase,
  lowerCase as _lowerCase,
} from 'lodash';

export default function() {
  return {
    inRange,
    isArray,
    isArrayBuffer,
    isBuffer,
    isDate,
    isElement,
    isEmpty,
    isEqual,
    isEqualWith,
    isError,
    isFinite,
    isInteger,
    isLength,
    isNil,
    isRegExp,
    isSafeInteger,
    // aliases
    Boolean: isBoolean,
    String: isString,
    Number: isNumber,
    NaN: isNaN,
    Null: isNull,
    Object: isObject,
    Undefined: isUndefined,
    // extra
    isDateString(s) {
      return !isNil(Date.parse(String(s)));
    },
    kebabCase(s, p) {
      return s === _kebabCase(p);
    },
    lowerCase(s, p) {
      return s === _lowerCase(p);
    },
  };
}
