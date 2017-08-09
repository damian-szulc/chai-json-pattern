'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _array = require('./types/array');

var _array2 = _interopRequireDefault(_array);

var _boolean = require('./types/boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _date = require('./types/date');

var _date2 = _interopRequireDefault(_date);

var _mixed = require('./types/mixed');

var _mixed2 = _interopRequireDefault(_mixed);

var _number = require('./types/number');

var _number2 = _interopRequireDefault(_number);

var _object = require('./types/object');

var _object2 = _interopRequireDefault(_object);

var _string = require('./types/string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var manager = function manager() {
  /**
   * Internal validation functions
   */
  var insternalValidators = _extends({}, _array2.default, _boolean2.default, _date2.default, _mixed2.default, _number2.default, _object2.default, _string2.default);

  /**
   * Object with validators
   */
  var extenstions = {};

  return {
    /**
     * Extend of new validation fnc
     * @param {object} plugin
     */
    extend: function extend(plugin) {
      if (Object.prototype.toString.call(plugin) !== '[object Object]') {
        throw new Error('ChaiJsonPattern: suplied wrong validators');
      }

      extenstions = _extends({}, extenstions, plugin);
    },


    /**
     * Get validator by its name
     * @param {string} name
     * @return {function} validator fnc
     */
    get: function get(name) {
      if (!name || typeof name !== 'string') {
        throw new Error('ChaiJsonPattern: Wrong validator name: \'' + name + '\'');
      }
      var validator = insternalValidators[name] || extenstions[name];
      if (!validator) {
        throw new Error('ChaiJsonPattern: Validator \'' + name + '\' not found');
      }
      return validator;
    }
  };
};

exports.default = manager();