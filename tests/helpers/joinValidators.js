import { expect } from 'chai';
import joinValidators from '../../src/helpers/joinValidators';

import {
  COMMAND,
  COMMAND_ARGS,
  OR,
  AND,
} from '../../src/constants';

describe('joinValidators', function() {
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
      [COMMAND_ARGS]: ['test', 2.32, true],
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
          [COMMAND_ARGS]: ['test', 2.32, true],
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
          [COMMAND_ARGS]: ['test', 2.32, true],
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
          [COMMAND_ARGS]: ['test', 2.32, true],
        },
        {
          [OR]: [
            {
              [COMMAND]: 'isString',
              [COMMAND_ARGS]: [false],
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
