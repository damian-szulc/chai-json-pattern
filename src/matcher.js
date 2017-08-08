import {
  TRUE,
  FALSE,
  NULL,
  LIKE,
  COMMAND,
  COMMAND_ARGS,
  OR,
  AND,
} from './constants';
import joinValidators from './helpers/joinValidators';
import pluginManager from './plugins/manager';

export default utils => {
  /**
  * Check wheater supplied item is type
  * @param  {any}  target [description]
  * @param  {string}  type   [description]
  * @return {Boolean}        [description]
  */
  const isType = function(target, type) {
    const targetType = utils.type(target).toUpperCase();
    // looks for commands, or, and
    if (targetType === 'OBJECT'
        && (type === COMMAND || type === OR || type === AND)) {
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
  const isValidator = function(target) {
    return isType(target, COMMAND)
      || isType(target, OR)
      || isType(target, AND)
      || isType(target, 'function');
  };

  /**
   * Checks if suplied object is extendable (have '...' in pattern)
   * @param  {any}  target [description]
   * @return {Boolean}        [description]
   */
  const isLike = function(target) {
    return utils.type(target).toUpperCase() === 'OBJECT'
      && target[LIKE];
  };

  /**
   * Get arguments to command
   * @param {array|any} args
   * @return {any} command arg
   */
  const getCommandArgs = args => {
    if (!args) {
      return [];
    }
    return args.map(arg => {
      if (arg === TRUE) {
        return true;
      }
      if (arg === FALSE) {
        return false;
      }
      if (arg === NULL) {
        return null;
      }
      return arg;
    });
  };

  const service = {
    /**
     * Match value with custom validator
     * @param  {any}  object          [description]
     * @param  {object}  expected        [description]
     * @param  {Boolean} [generateExpected=true] [description]
     * @return {array}                  [description]
     */
    matchCommand(object, expected, generateExpected = true) {
      if (!isValidator(expected)) {
        return service.matchDefault(object, expected);
      }
      // match command
      if (isType(expected, COMMAND) || utils.type(expected).toUpperCase() === 'FUNCTION') {
        // when passing an object, allow using custom
        const validator = utils.type(expected).toUpperCase() === 'FUNCTION'
          ? expected
          : pluginManager.get(expected[COMMAND]);

        const isValid = !!validator(object, ...getCommandArgs(expected[COMMAND_ARGS]));

        return [isValid, isValid && generateExpected ? object : joinValidators(expected)];
      }
      // OR || AND
      if (isType(expected, OR) || isType(expected, AND)) {
        const type = expected[OR] ? OR : AND;

        const fn = expected[OR] ? 'some' : 'every';

        const isValid = expected[type][fn](condition => service.matchCommand(object, condition, false)[0]);

        return [isValid, isValid && generateExpected ? object : joinValidators(expected)];
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
    matchObject(object, expected, validate = true) {
      let isValid = validate;
      const expectedValues = {};
      Object.keys(expected).forEach(key => {
        if (key === LIKE) {
          return;
        }
        const isObject = isType(object, 'object');
        // eslint-disable-next-line
        const [valid, expValue] = service.match(isObject ? object[key] : undefined, expected[key], isObject);
        isValid = isValid && valid;
        expectedValues[key] = expValue;
      });

      const isLiked = isLike(expected);
      // like validation
      if (isType(object, 'object')) {
        let isLikeValid = true;
        Object.keys(object).forEach(key => {
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
    matchArray(target, expected, validate = true) {
      // expected array, target is not an array
      if (!isType(target, 'array')) {
        // eslint-disable-next-line
        return [false, expected.map(exp => service.match(undefined, exp, false))];
      }

      if (expected.length === 1) {
        // PATTERN: [...], means allow any
        if (expected[0] === LIKE) {
          return [validate, target];
        }
        // first expected element matches all target values
        return target
          .map(item => service.match(item, expected[0]), validate)
          .reduce((sum, [valid, expect]) => {
            sum[0] = sum[0] && valid;
            sum[1].push(expect);
            return sum;
          }, [validate, []]);
      }
      // LIKE operator as first element
      if (expected[0] === LIKE) {
        throw new Error('ChaiJsonPattern: Not implemented yet');
      }

      let expectedAtTheEnd = false;
      // LIKE operator as last element
      if (expected[expected.length - 1] === LIKE) {
        // delete last element
        expected.splice(-1, 1);
        expectedAtTheEnd = true;
      }

      const expectedValues = expected
        .map((item, index) => service.match(target[index], item), validate)
        .reduce((sum, [valid, expect]) => {
          sum[0] = sum[0] && valid;
          sum[1].push(expect);
          return sum;
        }, [validate, []]);

      if (expectedAtTheEnd) {
        return [expectedValues[0], expectedValues[1].concat(target.slice(expectedValues[1].length) || [])];
      }

      const isValid = expectedValues[0] && expectedValues[1].length === target.length;

      return [isValid, expectedValues[1]];
    },

    /**
     * Match strings, boolean's and numbers
     * @param  {any}  object          [description]
     * @param  {any}  expected        [description]
     * @param  {Boolean} [validate=true] [description]
     * @return {array}                  [description]
     */
    matchDefault(object, expected, validate = true) {
      if (expected === TRUE) {
        return [object === true, true];
      }
      if (expected === FALSE) {
        return [object === false, false];
      }
      if (expected === NULL) {
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
    match(object, expected, isValid = true) {
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
    },


  };

  return function(object, expected) {
    const [isValid, exp] = service.match(object, expected);
    return [
      isValid,
      exp,
      object,
    ];
  };
};
