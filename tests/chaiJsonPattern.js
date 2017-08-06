import chai, { expect } from 'chai';
import jsonPattern from '../dist/main';
chai.use(jsonPattern);

describe('chaiJsonPattern', function() {
  describe('object', function() {
    it('matches strings', function() {
      const object = {
        id: 'test',
      };
      expect(object).to.matchPattern(`
        {
          "id": "test"
        }
      `);
    });

    it('matches numbers', function() {
      const object = {
        id: 123,
      };
      expect(object).to.matchPattern(`
        {
          "id": 123
        }
      `);
    });

    it('matches boolean', function() {
      const object = {
        id: true,
      };
      expect(object).to.matchPattern(`
        {
          "id": true
        }
      `);
    });

    it('matches nested json', function() {
      const object = {
        user: {
          id: 'testId',
          name: 'Test user',
        },
      };
      expect(object).to.matchPattern(`
        {
          "user": {
            "id": "testId",
            "name": "Test user"
          }
        }
      `);
    });

    it('matches with like operator', function() {
      const object = {
        user: {
          id: 'testId',
          name: 'Test user',
        },
      };
      expect(object).to.matchPattern(`
        {
          "user": {
            "id": "testId",
            ...
          }
        }
      `);
    });
  });

  describe('array', function() {
    it('matches one string', function() {
      const object = [
        'item1',
      ];
      expect(object).to.matchPattern(`
        [
          "item1"
        ]
      `);
    });

    it('one validator, matches more then one elements', function() {
      const object = [
        {
          name: 'as',
        },
        {
          name: 'as',
        },
      ];
      expect(object).to.matchPattern(`
        [
          {
            "name": "as"
          }
        ]
      `);
    });

    it('matches first element', function() {
      const object = [
        {
          name: 'as',
        },
        {
          name: 'Pas',
        },
        {
          name: 'kwas',
        },
      ];
      expect(object).to.matchPattern(`
        [
          {
            "name": "as"
          },
          ...
        ]
      `);
    });
  });

  describe('custom validator', function() {
    it('matches strings', function() {
      const object = {
        id: 'test',
      };
      expect(object).to.matchPattern(`
        {
          "id": string
        }
      `);
    });

    it('matches number', function() {
      const object = {
        id: 123.231,
      };
      expect(object).to.matchPattern(`
        {
          "id": number
        }
      `);
    });

    it('matches number or string', function() {
      const object = {
        id: 1,
        name: 'test',
      };
      expect(object).to.matchPattern(`
        {
          "id": number OR string,
          "name": number OR string
        }
      `);
    });

    it('matches number in range', function() {
      const object = {
        id: 2,
        name: 'test',
      };
      expect(object).to.matchPattern(`
        {
          "id": number AND ( inRange(2, 3) OR inRange(5, 6) ),
          "name": number OR string
        }
      `);
    });
  });
});
