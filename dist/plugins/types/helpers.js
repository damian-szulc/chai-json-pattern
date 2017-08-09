"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Determines wheter num is positive and safe integer
 * @param {any} num
 */
var positiveSafeInteger = exports.positiveSafeInteger = function positiveSafeInteger(num) {
  return Number.isSafeInteger(num) && num >= 0;
};