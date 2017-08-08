import chai, { expect } from 'chai';
import jsonPattern from '../src/main';
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

  describe('matches array', function() {
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

    it('one validator, matches more all elements', function() {
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

    it('matches two elements', function() {
      const object = [
        'item1',
        'item2',
      ];
      expect(object).to.matchPattern(`
        [
          "item1",
          "item2"
        ]
      `);
    });

    it('matches two first elements', function() {
      const object = [
        'item1',
        'item2',
        'item3',
      ];
      expect(object).to.matchPattern(`
        [
          "item1",
          "item2",
          ...
        ]
      `);
    });

    it('matches first  three elements', function() {
      const object = [
        'item1',
        'item2',
        'item3',
      ];
      expect(object).to.matchPattern(`
        [
          "item1",
          "item2",
          "item3"
        ]
      `);
    });

    it('matches first  three elements with like operator', function() {
      const object = [
        'item1',
        'item2',
        'item3',
      ];
      expect(object).to.matchPattern(`
        [
          "item1",
          "item2",
          "item3",
          ...
        ]
      `);
    });

    it('not matches array different sizes arrays', function() {
      const object = [
        'item1',
        'item2',
        'item3',
      ];
      expect(object).not.to.matchPattern(`
        [
          "item1",
          "item2"
        ]
      `);
    });
  });

  describe('matches OR/AND expressions', function() {
    it('matches strings', function() {
      const object = {
        id: 'test',
        name: 'test',
        test: 'test',
      };
      expect(object).to.matchPattern(`
        {
          "id": "test" OR "test2",
          "name": "test2" OR "test",
          "test": "test" OR "test",
        }
      `);
    });

    it('matches numbers', function() {
      const object = {
        id: 213,
        age: 112,
        test: 112,
      };
      expect(object).to.matchPattern(`
        {
          "id": 213 OR 112,
          "age": 112 OR 213,
          "test": 112 OR 112,
        }
      `);
    });

    it('matches bools', function() {
      const object = {
        id: true,
        some: true,
        test1: false,
        test2: false,
      };
      expect(object).to.matchPattern(`
        {
          "id": true OR false,
          "some": false OR true,
          "test1": true OR false,
          "test2": false OR true,
        }
      `);
    });

    it('matches null', function() {
      const object = {
        id: null,
        name: null,
      };
      expect(object).to.matchPattern(`
        {
          "id": null,
          "name": true OR false OR Number OR String OR null,
        }
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
          "id": String
        }
      `);
    });

    it('matches number', function() {
      const object = {
        id: 123.231,
      };
      expect(object).to.matchPattern(`
        {
          "id": Number
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
          "id": Number OR String,
          "name": Number OR String
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
          "id": Number AND ( inRange(2, 3) OR inRange(5, 6) ),
          "name": Number OR String
        }
      `);
    });
  });

  describe('validate passed object', function() {
    it('matches strings', function() {
      const object = {
        id: 'test',
      };
      expect(object).to.matchPattern({
        id: 'test',
      });
    });

    it('matches number', function() {
      const object = {
        id: 12,
      };
      expect(object).to.matchPattern({
        id: 12,
      });
    });

    it('matches booleans', function() {
      const object = {
        test: true,
        test2: false,
      };
      expect(object).to.matchPattern({
        test: true,
        test2: false,
      });
    });

    it('matches nulls', function() {
      const object = {
        test: null,
      };
      expect(object).to.matchPattern({
        test: null,
      });
    });

    it('matches custom validation functions', function() {
      const object = {
        test: 123,
      };
      expect(object).to.matchPattern({
        test: arg => arg === 123,
      });
    });
  });
});
