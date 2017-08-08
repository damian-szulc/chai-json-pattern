'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _constants = require('./constants');

var _joinValidators = require('./helpers/joinValidators');

var _joinValidators2 = _interopRequireDefault(_joinValidators);

var _manager = require('./plugin/manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = function (utils) {
  /**
  * Check wheater supplied item is type
  * @param  {any}  target [description]
  * @param  {string}  type   [description]
  * @return {Boolean}        [description]
  */
  var isType = function isType(target, type) {
    var targetType = utils.type(target).toUpperCase();
    // looks for commands, or, and
    if (targetType === 'OBJECT' && (type === _constants.COMMAND || type === _constants.OR || type === _constants.AND)) {
      return !!target[type];
    }
    // other types, like object, array, etc.
    return targetType === type.toUpperCase();
  };

  /**
   * Checks is command is validator
   * @param  {[type]}  target [description]
   * @return {Boolean}        [description]
   */
  var isValidator = function isValidator(target) {
    return isType(target, _constants.COMMAND) || isType(target, _constants.OR) || isType(target, _constants.AND);
  };

  /**
   * Checks if suplied object is extendable (have '...' in pattern)
   * @param  {any}  target [description]
   * @return {Boolean}        [description]
   */
  var isLike = function isLike(target) {
    return utils.type(target).toUpperCase() === 'OBJECT' && target[_constants.LIKE];
  };

  /**
   * Get arguments to command
   * @param {array|any} args
   * @return {any} command arg
   */
  var getCommandArgs = function getCommandArgs(args) {
    if (!args) {
      return [];
    }
    return args.map(function (arg) {
      if (arg === _constants.TRUE) {
        return true;
      }
      if (arg === _constants.FALSE) {
        return false;
      }
      if (arg === _constants.NULL) {
        return null;
      }
      return arg;
    });
  };

  var service = {
    /**
     * Match value with custom validator
     * @param  {any}  object          [description]
     * @param  {object}  expected        [description]
     * @param  {Boolean} [generateExpected=true] [description]
     * @return {array}                  [description]
     */
    matchCommand: function matchCommand(object, expected) {
      var generateExpected = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!isValidator(expected)) {
        return service.matchDefault(object, expected);
      }
      // match command
      if (isType(expected, _constants.COMMAND) || utils.type(expected).toUpperCase() === 'FUNCTION') {
        // when passing an object, allow using custom
        var validator = utils.type(expected).toUpperCase() === 'FUNCTION' ? expected : _manager2.default.get(expected[_constants.COMMAND]);

        var isValid = !!validator.apply(undefined, [object].concat(_toConsumableArray(getCommandArgs(expected[_constants.COMMAND_ARGS]))));

        return [isValid, isValid && generateExpected ? object : (0, _joinValidators2.default)(expected)];
      }
      // OR || AND
      if (isType(expected, _constants.OR) || isType(expected, _constants.AND)) {
        var type = expected[_constants.OR] ? _constants.OR : _constants.AND;

        var fn = expected[_constants.OR] ? 'some' : 'every';

        var _isValid = expected[type][fn](function (condition) {
          return service.matchCommand(object, condition, false)[0];
        });

        return [_isValid, _isValid && generateExpected ? object : (0, _joinValidators2.default)(expected)];
      }

      return service.matchDefault(object, expected);
    },


    /**
     * Validate 'object', when expected is object
     * @param  {any}  object          [description]
     * @param  {objecy}  expected        [description]
     * @param  {Boolean} [validate=true] [description]
     * @return {array}                  [description]
     */
    matchObject: function matchObject(object, expected) {
      var validate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      var isValid = validate;
      var expectedValues = {};
      Object.keys(expected).forEach(function (key) {
        if (key === _constants.LIKE) {
          return;
        }
        var isObject = isType(object, 'object');
        // eslint-disable-next-line

        var _service$match = service.match(isObject ? object[key] : undefined, expected[key], isObject),
            _service$match2 = _slicedToArray(_service$match, 2),
            valid = _service$match2[0],
            expValue = _service$match2[1];

        isValid = isValid && valid;
        expectedValues[key] = expValue;
      });

      var isLiked = isLike(expected);
      // like validation
      if (isType(object, 'object')) {
        var isLikeValid = true;
        Object.keys(object).forEach(function (key) {
          if (!expectedValues.hasOwnProperty(key)) {
            // not valid if its extra property without ...
            if (!isLiked) {
              isLikeValid = false;
              // allow it there is ...
            } else {
              expectedValues[key] = object[key];
            }
          }
        });
        isValid = isValid && isLikeValid;
      } else {
        isValid = false;
      }
      return [isValid, expectedValues];
    },


    /**
     * Match array
     * @param {any} target
     * @param {array} expected
     * @param {boolean} validate
     * @return {array} matche results
     */
    matchArray: function matchArray(target, expected) {
      var validate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // expected array, target is not an array
      if (!isType(target, 'array')) {
        // eslint-disable-next-line
        return [false, expected.map(function (exp) {
          return service.match(undefined, exp, false);
        })];
      }

      if (expected.length === 1) {
        // PATTERN: [...], means allow any
        if (expected[0] === _constants.LIKE) {
          return [validate, target];
        }
        // first expected element matches all target values
        return target.map(function (item) {
          return service.match(item, expected[0]);
        }, validate).reduce(function (sum, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              valid = _ref2[0],
              expect = _ref2[1];

          sum[0] = sum[0] && valid;
          sum[1].push(expect);
          return sum;
        }, [validate, []]);
      }
      // LIKE operator as first element
      if (expected[0] === _constants.LIKE) {
        throw new Error('ChaiJsonPattern: Not implemented yet');
      }

      var expectedAtTheEnd = false;
      // LIKE operator as last element
      if (expected[expected.length - 1] === _constants.LIKE) {
        // delete last element
        expected.splice(-1, 1);
        expectedAtTheEnd = true;
      }

      var expectedValues = expected.map(function (item, index) {
        return service.match(target[index], item);
      }, validate).reduce(function (sum, _ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            valid = _ref4[0],
            expect = _ref4[1];

        sum[0] = sum[0] && valid;
        sum[1].push(expect);
        return sum;
      }, [validate, []]);

      if (expectedAtTheEnd) {
        return [expectedValues[0], expectedValues[1].concat(target.slice(expectedValues[1].length) || [])];
      }

      var isValid = expectedValues[0] && expectedValues[1].length === target.length;

      return [isValid, expectedValues[1]];
    },


    /**
     * Match strings, boolean's and numbers
     * @param  {any}  object          [description]
     * @param  {any}  expected        [description]
     * @param  {Boolean} [validate=true] [description]
     * @return {array}                  [description]
     */
    matchDefault: function matchDefault(object, expected) {
      var validate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (expected === _constants.TRUE) {
        return [object === true, true];
      }
      if (expected === _constants.FALSE) {
        return [object === false, false];
      }
      if (expected === _constants.NULL) {
        return [object === null, null];
      }
      if (object === expected) {
        return [validate, expected];
      }

      return [false, expected];
    },


    /**
     * Match object, and expected pattern
     * @param  {any} object   [description]
     * @param  {any} expected [description]
     * @param  {true} isValid initial valid
     * @return {array}          [description]
     */
    match: function match(object, expected) {
      var isValid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      // expected command
      if (isValidator(expected)) {
        return service.matchCommand(object, expected, isValid);
      }
      // expected object
      if (isType(expected, 'object')) {
        return service.matchObject(object, expected, isValid);
      }
      // expected array
      if (isType(expected, 'array')) {
        return service.matchArray(object, expected, isValid);
      }
      // expected primitve
      return service.matchDefault(object, expected, isValid);
    }
  };

  return function (object, expected) {
    var _service$match3 = service.match(object, expected),
        _service$match4 = _slicedToArray(_service$match3, 2),
        isValid = _service$match4[0],
        exp = _service$match4[1];

    return [isValid, exp, object];
  };
};