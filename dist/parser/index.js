'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pegjs = require('./pegjs');

var _pegjs2 = _interopRequireDefault(_pegjs);

var _errorMessage = require('./errorMessage');

var _errorMessage2 = _interopRequireDefault(_errorMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parser delivered json-pattern
 * @param  {string} expected [description]
 * @return {object}          [description]
 */
var parser = function parser(expected) {
  var parsed = void 0;
  var error = void 0;

  try {
    parsed = _pegjs2.default.parse(expected);
  } catch (e) {
    error = (0, _errorMessage2.default)(e);
  }

  return { parsed: parsed, error: error };
};

exports.default = parser;