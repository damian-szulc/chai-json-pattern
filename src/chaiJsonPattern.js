import parse from './parser';
import matcher, { addValidators } from './matcher';

/**
 * Parse expected pattern and start matching
 * @param  {any} match   [description]
 * @param  {any} object   [description]
 * @param  {string} expected [description]
 * @param  {object} utils    [description]
 * @return {object}          [description]
 */
function parseAndMatch(match, object, expected, utils) {
  const { parsed, error } = parse(expected);
  if (error) {
    throw new Error(error);
  }

  return match(object, parsed, utils);
}

/**
 * Create assertion
 * @param  {any} _chai [description]
 * @param  {object} utils [description]
 */
export const chaiJsonPattern = function(_chai, utils) {
  const match = matcher(utils);

  _chai.Assertion.addMethod('matchPattern', function(expected) {
    const object = utils.flag(this, 'object');
    const [isValid, exp, obj] = parseAndMatch(match, object, expected, utils);

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

export default plugin => {
  addValidators(plugin);
  return chaiJsonPattern;
};

export const addPlugin = addValidators;
