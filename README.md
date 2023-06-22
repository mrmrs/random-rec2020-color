# random-rec2020-color 

Generate a random rec2020 color.

## Installation

```bash
npm install --save random-rec2020-color
```

## Usage

```javascript
var randomRec2020Color = require('random-rec2020-color')

randomRec2020Color(); // => color(rec2020 74% 21% 45%)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1, true); // => color(rec2020 .33 .78 .62)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1); // => color(rec2020 10% 88% 42% / 62%)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1, true); // => color(rec2020 56% 21% 92% / 75%)
```

or

```javascript
import randomRec2020Color from 'random-rec2020-color'

randomRec2020Color(); // => color(rec2020 74% 21% 45%)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1, true); // => color(rec2020 .33 .78 .62)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1); // => color(rec2020 10% 88% 42% / 62%)
randomRec2020Color(0, 1, 0, 1, 0, 1, 0, 1, true); // => color(rec2020 56% 21% 92% / 75%)
```

## Acknowledgements

Inspired by [random-hex-color by John Otander](http://github.com/johno/random-hex-color) which is repackaged from a [post by Paul Irish](http://www.paulirish.com/2009/random-hex-color-code-snippets/).

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted for generative doings by Adam Morse ([@mrmrs_](https://twitter.com/mrmrs_)).

***

