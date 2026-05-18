'use strict';

const test = require('ava');
const randomRec2020Color = require('./');

test('returns a CSS color() string with two-decimal channels and no alpha by default', (t) => {
  for (let i = 0; i < 20; i++) {
    const color = randomRec2020Color();
    t.regex(color, /^color\(rec2020 (?:0\.\d{2}|1\.00) (?:0\.\d{2}|1\.00) (?:0\.\d{2}|1\.00)\)$/);
  }
});

test.serial('keeps integer percentage ranges within bounds', (t) => {
  withRandomValues([0.73, 0.21, 0.45], () => {
    t.is(randomRec2020Color(0, 100, 0, 100, 0, 100), 'color(rec2020 73% 21% 45%)');
  });
});

test.serial('keeps decimal percentage ranges to two decimal places', (t) => {
  withRandomValues([0.5, 0.5, 0.5], () => {
    t.is(randomRec2020Color(1.5, 1.5, 2.25, 2.25, 10.5, 10.5), 'color(rec2020 1.50% 2.25% 10.50%)');
  });
});

test.serial('omits alpha when no alpha range is supplied', (t) => {
  withRandomValues([0.1, 0.2, 0.3], () => {
    t.is(randomRec2020Color(), 'color(rec2020 0.10 0.20 0.30)');
  });

  withRandomValues([0.1, 0.2, 0.3, 0.4], () => {
    t.is(randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1), 'color(rec2020 0.10 0.20 0.30 / 0.40)');
  });
});

test('treats undefined alpha arguments as omission', (t) => {
  const result = randomRec2020Color(0, 1, 0, 1, 0, 1, undefined, undefined);
  t.notRegex(result, / \/ /);
});

test('returns numeric channels when useObjectExport is true', (t) => {
  const color = randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1, true);

  t.is(typeof color, 'object');
  t.is(typeof color.red, 'number');
  t.is(typeof color.green, 'number');
  t.is(typeof color.blue, 'number');
  t.is(typeof color.alpha, 'number');
  t.true(color.red >= 0 && color.red <= 1);
  t.true(color.green >= 0 && color.green <= 1);
  t.true(color.blue >= 0 && color.blue <= 1);
  t.true(color.alpha >= 0 && color.alpha <= 1);
});

test('omits alpha from object output when not requested', (t) => {
  const color = randomRec2020Color(0, 1, 0, 1, 0, 1, undefined, undefined, true);
  t.false('alpha' in color);
});

test.serial('validates ranges before generating any random values', (t) => {
  const originalRandom = Math.random;
  let calls = 0;
  Math.random = () => {
    calls++;
    return 0.5;
  };

  try {
    t.throws(() => randomRec2020Color(0, 1, 0, 1, 1, 0), {
      instanceOf: RangeError,
      message: 'blue minimum must be less than or equal to maximum'
    });
  } finally {
    Math.random = originalRandom;
  }

  t.is(calls, 0);
});

test('validates range values', (t) => {
  t.throws(() => randomRec2020Color(Number.NaN), {
    instanceOf: TypeError,
    message: 'red range must use finite numbers'
  });

  t.throws(() => randomRec2020Color(1, 0), {
    instanceOf: RangeError,
    message: 'red minimum must be less than or equal to maximum'
  });

  t.throws(() => randomRec2020Color(0, 1, 0, 1, 0, 1, 2, 1), {
    instanceOf: RangeError,
    message: 'alpha minimum must be less than or equal to maximum'
  });
});

function withRandomValues(values, run) {
  const originalRandom = Math.random;
  let index = 0;

  Math.random = () => values[index++];

  try {
    run();
  } finally {
    Math.random = originalRandom;
  }
}
