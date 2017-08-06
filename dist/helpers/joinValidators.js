'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

var service = {
  /**
   * Join command arguments
   * @param  {array|null} args [description]
   * @return {string}           [description]
   */
  joinCommandArgs: function joinCommandArgs(args) {
    if (!args) {
      return '';
    }
    var joinedArgs = args.map(function (arg) {
      return JSON.stringify(arg);
    }).join(', ');
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
  join: function join() {
    var validator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    if (validator[_constants.COMMAND]) {
      return service.joinCommand(validator);
    }

    if (validator[_constants.OR]) {
      return service.joinArray(validator[_constants.OR], 'OR', depth);
    }

    if (validator[_constants.AND]) {
      return service.joinArray(validator[_constants.AND], 'AND', depth);
    }
  }
};

exports.default = service.join;