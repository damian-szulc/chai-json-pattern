'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = exports.chaiJsonPattern = undefined;

var _chaiJsonPattern = require('./chaiJsonPattern');

var _chaiJsonPattern2 = _interopRequireDefault(_chaiJsonPattern);

var _base = require('./plugins/base');

var _base2 = _interopRequireDefault(_base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _chaiJsonPattern2.default)((0, _base2.default)());
exports.chaiJsonPattern = _chaiJsonPattern.chaiJsonPattern;
exports.extend = _chaiJsonPattern.extend;