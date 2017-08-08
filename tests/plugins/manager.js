import { expect } from 'chai';

describe('plugins manager', function() {
  let manager;

  beforeEach(() => {
    manager = require('../../src/plugins/manager').default;
  });

  it('throws error with wrong type of plugin', () => {
    expect(manager.extend).to.throw(Error);
    expect(() => manager.extend(null)).to.throw(Error);
    expect(() => manager.extend(false)).to.throw(Error);
    expect(() => manager.extend(true)).to.throw(Error);
    expect(() => manager.extend([])).to.throw(Error);
  });

  it('throws error when I dont pass string to get', () => {
    expect(() => manager.get()).to.throw(Error);
    expect(() => manager.get(false)).to.throw(Error);
    expect(() => manager.get(true)).to.throw(Error);
    expect(() => manager.get([])).to.throw(Error);
    expect(() => manager.get({})).to.throw(Error);
  });

  it('throws error when I get non existing name', () => {
    expect(() => manager.get('test')).to.throw(Error);
  });

  it('can add, and get plugin', () => {
    const plugin = {
      test: () => true,
    };
    manager.extend(plugin);
    expect(manager.get('test')).to.equal(plugin.test);
  });
});