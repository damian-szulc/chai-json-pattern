'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Format error message
 * @param  {object} error [description]
 * @return {string}       [description]
 */
exports.default = function (error) {
  var line = error.location && error.location.start ? 'Line: ' + error.location.start.line + ' Column: ' + error.location.start.column : '';
  return 'Parsing pattern error\n    ' + error.message + '\n    ' + line + '\n  ';
};