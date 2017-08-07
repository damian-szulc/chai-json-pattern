import { expect } from 'chai';
import joinValidators from '../../src/helpers/joinValidators';

import {
  TRUE,
  FALSE,
  NULL,
  COMMAND,
  COMMAND_ARGS,
  OR,
  AND,
} from '../../src/constants';

describe('joinValidators', function() {
  it('if its string, returns it', function() {
    const validator = 'someText';
    expect(joinValidators(validator)).to.equal('"someText"');
  });

  it('if its true, returns it', function() {
    const validator = true;
    expect(joinValidators(validator)).to.equal('true');
  });

  it('if its false, returns it', function() {
    const validator = false;
    expect(joinValidators(validator)).to.equal('false');
  });

  it('if its null, returns it', function() {
    const validator = null;
    expect(joinValidators(validator)).to.equal('null');
  });

  it('if its number, returns it', function() {
    const validator = 123.23;
    expect(joinValidators(validator)).to.equal('123.23');
  });


  it('return COMMAND', function() {
    const validator = {
      [COMMAND]: 'validatorName',
      [COMMAND_ARGS]: null,
    };
    expect(joinValidators(validator)).to.equal('validatorName');
  });

  it('return COMMAND with args', function() {
    const validator = {
      [COMMAND]: 'validatorName',
      [COMMAND_ARGS]: ['test', 2.32, TRUE],
    };
    expect(joinValidators(validator)).to.equal('validatorName("test", 2.32, true)');
  });

  it('return joined OR with commands', function() {
    const validator = {
      [OR]: [
        {
          [COMMAND]: 'test2',
          [COMMAND_ARGS]: null,
        },
        {
          [COMMAND]: 'validatorName',
          [COMMAND_ARGS]: ['test', 2.32, TRUE],
        },
      ],
    };
    expect(joinValidators(validator)).to.equal('validatorName("test", 2.32, true) OR test2');
  });

  it('return joined AND with commands', function() {
    const validator = {
      [AND]: [
        {
          [COMMAND]: 'test2',
          [COMMAND_ARGS]: null,
        },
        {
          [COMMAND]: 'validatorName',
          [COMMAND_ARGS]: ['test', 2.32, TRUE],
        },
      ],
    };
    expect(joinValidators(validator)).to.equal('validatorName("test", 2.32, true) AND test2');
  });

  it('return nested commans', function() {
    const validator = {
      [AND]: [
        {
          [COMMAND]: 'validatorName',
          [COMMAND_ARGS]: ['test', 2.32, TRUE],
        },
        {
          [OR]: [
            {
              [COMMAND]: 'isString',
              [COMMAND_ARGS]: [FALSE],
            },
            {
              [COMMAND]: 'test2',
              [COMMAND_ARGS]: null,
            },
            {
              [COMMAND]: 'test5',
              [COMMAND_ARGS]: null,
            },
          ],
        },
      ],
    };
    expect(joinValidators(validator)).to.equal('( test5 OR test2 OR isString(false) ) AND validatorName("test", 2.32, true)');
  });
});
