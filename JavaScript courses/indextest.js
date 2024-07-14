const assert = require('assert');
const Rooster = require('../index');

describe('Rooster', () => {
  describe('.announceDawn', () => {
    it('returns a rooster call', () => {
      //Setup: define the expected
      const expected = 'cock-a-doodle-doo!';
      //Exercise: call the function under test
      const actual = Rooster.announceDawn();
      //Verify: use an assert function
      assert.equal(actual, expected);
    })
  });
  
  describe('.timeAtDawn', () => {
    it('returns its argument as a string', () => {
      //Setup: define the expected
      const inputNumber = 12;
      const expected = '12';
      //Exercise: call the function under test
      const actual = Rooster.timeAtDawn(inputNumber);
      //Verify: use an assert function
      assert.equal(actual, expected);
    });
    //fs.unlinkSync(path);

    it('throws a range error if passed a number less than 0', () => {
      //Setup: define the expected
      const inputNumber = -1;
      const expected = RangeError;
      //Verify: use an assert function
      assert.throws(() => {//That's the exercise
        Rooster.timeAtDawn(inputNumber);
      }, expected);
    });
    it('throws an error if passed a number greater than 23', () => {
      //Setup: define the expected
      const inputNumber = 24;
      const expected = RangeError;
      //Verify: use an assert function
      assert.throws(() => {
        Rooster.timeAtDawn(inputNumber);
      }, expected);
    });
  });
});