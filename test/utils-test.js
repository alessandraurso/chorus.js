const assert = require('assert');
const utils = require('../src/utils');

describe('utils', () => {
  describe('clamp()', () => {
    it("returns the value if it's between the min and the max", () => {
      assert.equal(utils.clamp(1, 0, 2), 1);
    });

    it('returns the min if the value is less than the min', () => {
      assert.equal(utils.clamp(-1, 0, 2), 0);
    });

    it('returns the max if the value is greater than the max', () => {
      assert.equal(utils.clamp(3, 0, 2), 2);
    });

    it('returns the min if the value is null', () => {
      assert.equal(utils.clamp(null, 0, 2), 0);
    });
  });
});