const test = require('ava');
const randomRec2020Color = require('./');

test('should return a valid Rec2020 color', (t) => {
  t.plan(10);

  for (let i = 0; i < 10; i++) {
    const color = randomRec2020Color();
    const regex = /^color\(rec2020 (?:\d+(\.\d+)?%?|\.\d+)(?: (?:\d+(\.\d+)?%?|\.\d+)){2}(?: \/ (?:\d+(\.\d+)?%?|\.\d+))?\)$/;

    t.regex(color, regex);
  }
});
