'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _constants = require('../constants');

var service = {
  stringifyPrimitive: function stringifyPrimitive(arg) {
    if (arg === _constants.TRUE) {
      return true;
    }
    if (arg === _constants.FALSE) {
      return false;
    }
    if (arg === _constants.NULL) {
      return null;
    }
    return JSON.stringify(arg);
  },

  /**
   * Join command arguments
   * @param  {array|null} args [description]
   * @return {string}           [description]
   */
  joinCommandArgs: function joinCommandArgs(args) {
    if (!args) {
      return '';
    }
    var joinedArgs = args.map(service.stringifyPrimitive).join(', ');
    return '(' + joinedArgs + ')';
  },


  /**
   * Join command to string
   * @param  {object} validator [description]
   * @return {string}           [description]
   */
  joinCommand: function joinCommand(validator) {
    var validatorArgs = service.joinCommandArgs(validator[_constants.COMMAND_ARGS]);
    return '' + validator[_constants.COMMAND] + validatorArgs;
  },


  /**
   * Join array of commands
   * @param  {array} commands [description]
   * @param  {string} joiner   [description]
   * @param  {number} depth    [description]
   * @return {string}          [description]
   */
  joinArray: function joinArray(commands, joiner, depth) {
    var joined = commands.reverse().map(function (command) {
      return service.join(command, depth + 1);
    }).join(' ' + joiner + ' ');

    if (depth > 0) {
      return '( ' + joined + ' )';
    }
    return joined;
  },


  /**
   * Join expected commands
   * @param  {Object} [validator={}] [description]
   * @param  {Number} [depth=0]      depth of command join
   * @return {string}                [description]
   */
  join: function join(validator) {
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if ((typeof validator === 'undefined' ? 'undefined' : _typeof(validator)) !== 'object' || validator === null) {
      return service.stringifyPrimitive(validator);
    }

    if (validator[_constants.COMMAND]) {
      return service.joinCommand(validator);
    }

    if (validator[_constants.OR]) {
      return service.joinArray(validator[_constants.OR], 'OR', depth);
    }

    if (validator[_constants.AND]) {
      return service.joinArray(validator[_constants.AND], 'AND', depth);
    }
  },
  join2: function join2(validator) {
    var a = function a() {};
    // a.__proto__.toString = function() { return 'sadsa'; };
    // a.prototype.toString = function() { return 'sadsa'; };
    // a.toString = function() { return 'sadsa'; };
    // a.prototype = b;
    console.log(Object.prototype.toString.call(a));
    return a;
  }
};

exports.default = service.join;