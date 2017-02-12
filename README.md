# Notes

Changed:

electrode-archetype-react-app/config/archetype.js
```
    webpack: Object.assign({}, {
      devHostname: process.env.WEBPACK_HOST || "localhost", //changed
      devPort: getInt(process.env.WEBPACK_DEV_PORT, 2992),
      testPort: getInt(process.env.WEBPACK_TEST_PORT, 3001),
      modulesDirectories: []
    }, archetypeOptions.webpack),
```

electrode-archetype-react-app/arch-gulpfile.js
```

    "wds.dev": {
      desc: "Start webpack-dev-server in dev mode",
      task: mkCmd("webpack-dev-server",
        `--config ${config.webpack}/webpack.config.dev.js`,
        `--progress --colors`,
        `--port ${archetype.webpack.devPort}`,
        `--host ${archetype.webpack.devHostname}`) //added
    },
```



# trello [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save trello
```

## Usage

```js
var trello = require('trello');

trello('Rainbow');
```
## License

MIT © []()


[npm-image]: https://badge.fury.io/js/trello.svg
[npm-url]: https://npmjs.org/package/trello
[travis-image]: https://travis-ci.org/ograycode/trello.svg?branch=master
[travis-url]: https://travis-ci.org/ograycode/trello
[daviddm-image]: https://david-dm.org/ograycode/trello.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ograycode/trello
