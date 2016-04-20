const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const assert = require('assert');
const flexboxgrid = require('../src');

const readFile = (filename) => fs.readFileSync(filename).toString();

describe('postcss-flexboxgrid', () => {
  const fixturesDir = path.join(__dirname, 'fixtures');
  fs.readdirSync(fixturesDir).map((caseName) => {
    it(caseName, () => {
      const fixtureDir = path.join(fixturesDir, caseName);
      const actual = readFile(path.join(fixtureDir, 'actual.css'));
      const expected = readFile(path.join(fixtureDir, 'expected.css'));

      return postcss([flexboxgrid]).process(actual).then((result) => {
        assert.equal(result.css, expected);
      });
    });
  });
});
