<!-- markdownlint-disable first-line-h1 line-length -->

[![dev-badge](https://david-dm.org/andreidmt/tpl-ts-jsdoc.svg)](https://david-dm.org/andreidmt/tpl-ts-jsdoc)

# tpl-ts-jsdoc

> Plain JavaScript with types by leveraging [TypeScript's JSDoc support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).

![Vim with Typescript evaluating JavaScript code](docs/screenshot.png)

![Vim with Typescript evaluating JavaScript code](docs/screenshot-ts-error-wrong-type.png)

<!-- vim-markdown-toc GFM -->

* [Why?](#why)
* [Stack](#stack)
* [npm scripts](#npm-scripts)
* [Tools](#tools)
* [FAQ](#faq)
* [Random tips](#random-tips)
* [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Why?

* :godmode: Plain JavaScript and JSDoc
* :lipstick: TypeScript is good at _types_
* :scroll: Types are already part of docs, repeating creates noise
* :two_hearts: Incentivize documentation writing by giving them static typing powers :zap:
* :brain: Thinking about _types_ and _code logic_ are different mental activities. One is zoomed-in, focused on what each piece is, the other, zoomed-out and focused on how the data flows from one transition to another

## Stack

* Main: JavaScript + types using [TypeScript support](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) for [JSDoc](https://jsdoc.app/)
* Testing: [riteway](https://github.com/ericelliott/riteway)
* Linting: [ESLint](https://github.com/eslint/eslint), [@asd14/eslint-config](https://github.com/asd-xiv/eslint-config)
* Formatting: ESLint rules + [prettier](https://github.com/prettier/prettier)
* Environment variable: [dotenv](https://github.com/motdotla/dotenv)

## npm scripts

* Clean package install

```bash
# "setup": "rm -rf ./node_modules && npm install && npm audit fix",
npm run setup
```

* Check for package updates (with interactive console)

```bash
# "update": "npm-check --update",
npm run update
```

* Compile "src" folder into "dist" while also generating ".d.ts" - see [tsconfig.json](tsconfig.json)

```bash
# "build": "tsc --skipLibCheck",
npm run build
```

* Lint source files - see [.eslintrc](.eslintrc)

```bash
# "lint:md": "markdownlint *.md",
# "lint:js": "eslint --quiet src",
# "lint": "npm run lint:md && npm run lint:js",
npm run lint
```

* Run all ".test.js" files from "dist" folder - see [example test file](src/hello-world.test.js)

```bash
# "pretest": "npm run build",
# "test": "riteway 'dist/**/*.test.js' | tap-nirvana",
npm run test
```

* Watch changes in "src" folder and re-run tests

```bash
# "tdd": "nodemon --ext js,json --watch src --exec 'npm test'"
npm run tdd
```

## Tools

* [jsdoc](https://github.com/jsdoc/jsdoc) - An API documentation generator for JavaScript
* [better-docs](https://github.com/SoftwareBrothers/better-docs) - Beautiful toolbox for JSDoc generated documentation - with 'typescript', 'category' and 'component' plugins
* [documentation.js](https://github.com/documentationjs/documentation) - The documentation system for modern JavaScript
* [apidoc](https://apidocjs.com/) - Inline Documentation for RESTful web APIs
* [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown) - Generate markdown documentation from jsdoc-annotated JavaScript

## FAQ

_1. Can I use both JSDocs infered types and TypeScript annotations?_

No, TypeScript draws a hard line between functionalities provided in `.js` and `.ts` files. TypeScript specific syntax is only available in `.ts` files, while JSDoc interpretation in `.js`.

![TypeScript not allowing type annotations in .js files](docs/screenshot-ts-error-annotations.png)

## Random tips

* [Naming conventions that work](https://github.com/kettanaito/naming-cheatsheet)
* [Hierarchical Model-View-Controller](https://en.wikipedia.org/wiki/Hierarchical_model%E2%80%93view%E2%80%93controller)
* Better repeat yourself than a wrong abstraction
* Don't fix imaginary future problem
* Extract code in libraries and test 100%
* If possible, don't mock, E2E test

## Changelog

See the [releases section](https://github.com/andreidmt/tpl-ts-jsdoc/releases) for details.
