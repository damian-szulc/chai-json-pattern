import parse from './parser';
import matcher from './matcher';
import pluginManager from './plugins/manager';

/**
 * Parse expected pattern
 * @param  {any} expected [description]
 * @return {object}          [description]
 */
function parseAndMatch(expected) {
  if (typeof expected !== 'string') {
    return expected;
  }
  const { parsed, error } = parse(expected);
  if (error) {
    throw new Error(error);
  }

  return parsed;
}

/**
 * Create assertion
 * @param  {any} _chai [description]
 * @param  {object} utils [description]
 */
const chaiJsonPattern = function(_chai, utils) {
  const match = matcher(utils);

  _chai.Assertion.addMethod('matchPattern', function(expected) {
    const object = utils.flag(this, 'object');

    const expectedObj = parseAndMatch(expected);

    const [isValid, exp, obj] = match(object, expectedObj, utils);

    this.assert(
      isValid,
      'expected #{this} to be like #{exp}',
      'expected #{this} to not like #{exp}',
      exp,
      obj,
      _chai.config.showDiff,
    );
  });
};

export default chaiJsonPattern;

export const extend = pluginManager.extend;
