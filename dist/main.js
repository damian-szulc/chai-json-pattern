'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addPlugin = exports.chaiJsonPattern = undefined;

var _chaiJsonPattern = require('./chaiJsonPattern');

var _chaiJsonPattern2 = _interopRequireDefault(_chaiJsonPattern);

var _lodashPlugin = require('./lodashPlugin');

var _lodashPlugin2 = _interopRequireDefault(_lodashPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _chaiJsonPattern2.default)((0, _lodashPlugin2.default)());
exports.chaiJsonPattern = _chaiJsonPattern.chaiJsonPattern;
exports.addPlugin = _chaiJsonPattern.addPlugin;