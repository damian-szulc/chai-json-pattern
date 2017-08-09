'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extend = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _matcher = require('./matcher');

var _matcher2 = _interopRequireDefault(_matcher);

var _manager = require('./plugins/manager');

var _manager2 = _interopRequireDefault(_manager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse expected pattern
 * @param  {any} expected [description]
 * @return {object}          [description]
 */
function parseAndMatch(expected) {
  if (typeof expected !== 'string') {
    return expected;
  }

  var _parse = (0, _parser2.default)(expected),
      parsed = _parse.parsed,
      error = _parse.error;

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
var chaiJsonPattern = function chaiJsonPattern(_chai, utils) {
  var match = (0, _matcher2.default)(utils);

  _chai.Assertion.addMethod('matchPattern', function (expected) {
    var object = utils.flag(this, 'object');

    var expectedObj = parseAndMatch(expected);

    var _match = match(object, expectedObj, utils),
        _match2 = _slicedToArray(_match, 3),
        isValid = _match2[0],
        exp = _match2[1],
        obj = _match2[2];

    this.assert(isValid, 'expected #{this} to be like #{exp}', 'expected #{this} to not like #{exp}', exp, obj, _chai.config.showDiff);
  });
};

exports.default = chaiJsonPattern;
var extend = exports.extend = _manager2.default.extend;