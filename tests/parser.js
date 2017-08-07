import { expect } from 'chai';
import parser from '../src/parser';
import {
  TRUE,
  FALSE,
  NULL,
  LIKE,
  COMMAND,
  COMMAND_ARGS,
  OR,
  AND,
} from '../src/constants';

describe('parser', () => {
  describe('is compatible with json', () => {
    it('parse string', () => {
      const toParse = `
        {
          "name": "test"
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test' });
      expect(error).to.be.undefined;
    });

    it('parse numbers', () => {
      const toParse = `
        {
          "name": "test",
          "int": 123
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test', int: 123 });
      expect(error).to.be.undefined;
    });

    it('parse true', () => {
      const toParse = `
        {
          "name": "test",
          "bool": true
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test', bool: TRUE });
      expect(error).to.be.undefined;
    });

    it('parse false', () => {
      const toParse = `
        {
          "name": "test",
          "bool": false
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test', bool: FALSE });
      expect(error).to.be.undefined;
    });

    it('parse null', () => {
      const toParse = `
        {
          "name": "test",
          "bool": null
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test', bool: NULL });
      expect(error).to.be.undefined;
    });

    it('parse array', () => {
      const toParse = `
        {
          "arr": [true, 2, "string", {}]
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ arr: [TRUE, 2, 'string', {}] });
      expect(error).to.be.undefined;
    });

    it('parse nested object', () => {
      const toParse = `
        {
          "obj": {
            "test": {
              "c": null
            }
          }
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ obj: { test: { c: NULL } } });
      expect(error).to.be.undefined;
    });
  });

  describe('like - "..." - comparer', () => {
    it('allows three dots in the end of objects', () => {
      const toParse = `
        {
          "name": "test",
          ...
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: 'test', [LIKE]: true });
      expect(error).to.be.undefined;
    });

    it('allows three dots in the end of array', () => {
      const toParse = `
        [
          "test",
          2,
          ...
        ]
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal(['test', 2, LIKE]);
      expect(error).to.be.undefined;
    });
  });

  describe('commands', () => {
    it('allows to add simple command', () => {
      const toParse = `
        {
          "name": test
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: { [COMMAND]: 'test', [COMMAND_ARGS]: null } });
      expect(error).to.be.undefined;
    });

    it('allows to add command with arguments', () => {
      const toParse = `
        {
          "name": test(true, null, 2.3, "ola")
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({ name: { [COMMAND]: 'test', [COMMAND_ARGS]: [TRUE, NULL, 2.3, 'ola'] } });
      expect(error).to.be.undefined;
    });

    it('allows to add OR of two commands', () => {
      const toParse = `
        {
          "name": test OR die
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({
        name: { [OR]: [
          { [COMMAND]: 'die', [COMMAND_ARGS]: null },
          { [COMMAND]: 'test', [COMMAND_ARGS]: null },
        ] },
      });
      expect(error).to.be.undefined;
    });

    it('allows to add AND of two commands', () => {
      const toParse = `
        {
          "name": test AND die
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({
        name: { [AND]: [
          { [COMMAND]: 'die', [COMMAND_ARGS]: null },
          { [COMMAND]: 'test', [COMMAND_ARGS]: null },
        ] },
      });
      expect(error).to.be.undefined;
    });

    it('allows to use prentices with commands', () => {
      const toParse = `
        {
          "name": test AND ( start OR stop )
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.deep.equal({
        name: { [AND]: [
          { [OR]: [
            { [COMMAND]: 'stop', [COMMAND_ARGS]: null },
            { [COMMAND]: 'start', [COMMAND_ARGS]: null },
          ] },
          { [COMMAND]: 'test', [COMMAND_ARGS]: null },
        ] },
      });
      expect(error).to.be.undefined;
    });
  });

  describe('trailing commas', () => {
    it('object trailing comma', () => {
      const toParse = `
        {
          "name": "LIKE",
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.be.deep.equal({ name: 'LIKE' });
      expect(error).to.be.undefined;
    });

    it('disallow array trailing comma', () => {
      const toParse = `
        [
          'LIKE',
        ]
      `;
      const { parsed, error } = parser(toParse);
      expect(parsed).to.be.undefined;
      expect(error).to.be.a('string');
    });
  });

  describe('when fails', () => {
    it('returns error message', () => {
      const toParse = `
        {
          "name": 'LIKE',
        }
      `;
      const { parsed, error } = parser(toParse);
      expect(error).to.be.a('string');
      expect(parsed).to.be.undefined;
    });
  });
});
