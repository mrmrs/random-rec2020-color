'use strict';

module.exports = function randomRec2020Color(minRed = 0, maxRed = 100, minGreen = 0, maxGreen = 100, minBlue = 0, maxBlue = 100, minAlpha = 0, maxAlpha = 100, useDecimals = false) {
  const randomValue = (min, max) => {
    if (useDecimals) {
      return (Math.random() * (max - min) + min).toFixed(2);
    } else {
      return `${Math.floor((Math.random() * (max - min + 1) + min) * 100)}%`;
    }
  };

  const red = randomValue(minRed, maxRed);
  const green = randomValue(minGreen, maxGreen);
  const blue = randomValue(minBlue, maxBlue);
  const alpha = randomValue(minAlpha, maxAlpha);

  return `color(rec2020 ${red} ${green} ${blue}${alpha ? ` / ${alpha}` : ''})`;
};
