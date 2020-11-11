# set-delayed-interval

[![Build Status](https://travis-ci.org/vasco-santos/set-delayed-interval.svg?branch=main)](https://travis-ci.org/vasco-santos/set-delayed-interval)
[![dependencies Status](https://david-dm.org/vasco-santos/set-delayed-interval/status.svg)](https://david-dm.org/vasco-santos/set-delayed-interval)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> An asynchronous setInterval that is properly delayed using promises and can be delayed on boot

## Motivation



## Install

```sh
npm i set-delayed-interval
```

## Usage

### Parameters

|  Name  | Type | Description |
|--------|------|-------------|
|  task  | `() => Promise` | recurrent task to run |
| interval | `number` | interval between each task (in ms) |
| [delay] | `number` | delay before first run (in ms). Defaults to `interval`. |

### Returns

| Type | Description |
|------|-------------|
| `{ cancel: () => {} }` | interval properties |

### Example

```js
const setDelayedInterval = require('set-delayed-interval')

setDelayedInterval()(() => task, 10000, 1000)
```

## Contribute

Feel free to dive in! [Open an issue](https://github.com/vasco-santos/set-delayed-interval/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Vasco Santos