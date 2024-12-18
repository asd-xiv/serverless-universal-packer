<!-- markdownlint-disable first-line-h1 line-length no-inline-html -->

<h1 align="center">
  :package: serverless-universal-packer
</h1>
<p align="center">
  <a href="https://dl.circleci.com/status-badge/redirect/gh/asd-xiv/serverless-universal-packer/tree/main" target="_blank">
    <img alt="CircleCI" src="https://dl.circleci.com/status-badge/img/gh/asd-xiv/serverless-universal-packer/tree/main.svg?style=svg" />
  </a>
  <a href="https://coveralls.io/github/asd-xiv/serverless-universal-packer?branch=main" target="_blank">
    <img alt="Coverage Status" src="https://coveralls.io/repos/github/asd-xiv/serverless-universal-packer/badge.svg?branch=main" />
  </a>
  <a href="https://www.npmjs.com/package/@asd14/serverless-universal-packer?activeTab=dependencies" target="_blank">
    <img alt="Dependencies" src="https://img.shields.io/badge/dependencies-0%20packages-green">
  </a>
  <a href="https://www.npmjs.com/package/@asd14/serverless-universal-packer" target="_blank">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/@asd14/serverless-universal-packer?label=npm%40latest" />
  </a>
  <a href="https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-conventionalcommits" target="_blank">
    <img alt="Semantic Release with Conventional Commits" src="https://img.shields.io/badge/semantic--release-conventionalcommits-green" />
  </a>
</p>

> Serverless plugin for custom packaging using BASH scripts with little to no
> dependencies.

- :hammer_and_wrench: **Flexibility**: Don't rely on the existence of
  specialized plugins interfacing bundler X. Easily pivot when a better suited
  builder comes out.
- :green_square: **Low complexity**: Specialized plugins mostly just proxy to
  the underlying bundler. You can do that yourself in a few command lines.
- :repeat: **Stay Updated**: Keep dependencies updated without waiting for
  plugin updates.

## Table of contents

<!-- vim-markdown-toc GFM -->

- [:inbox_tray: Install](#inbox_tray-install)
- [:wrench: Custom BASH scripts](#wrench-custom-bash-scripts)
  - [`npm-pack-ws-fix`](#npm-pack-ws-fix)
  - [`convert-to-aws-zip`](#convert-to-aws-zip)
- [:books: Examples](#books-examples)
  - [:package: NPM](#package-npm)
  - [:large_blue_diamond: Typescript](#large_blue_diamond-typescript)
  - [:zap: SWC](#zap-swc)
- [:computer: Development](#computer-development)
- [:scroll: Changelog](#scroll-changelog)

<!-- vim-markdown-toc -->

## :inbox_tray: Install

```bash
npm install --save-dev serverless-universal-packer
```

## :wrench: Custom BASH scripts

### `npm-pack-ws-fix`

Currently running `npm pack` inside a workspace/monorepo package will not
include dependencies hoisted to the root `node_modules` folder. This is a
[:bug: known issue](https://github.com/npm/cli/issues/3466).

This script is a temporary workaround until the issue is fixed. It's meant to be
run inside a child package folder, and will create a `.tgz` file in the root
folder.

Internally it copies missing dependencies from the root `node_modules` into
child package `node_modules` and runs `npm pack`. After the package is created,
the original child `node_modules` is restored.

```bash
cd packages/my-package
npx npm-pack-ws-fix
```

### `convert-to-aws-zip`

AWS Lambda requires a `.zip` file containing the `package.json` and the
`node_modules` folder.

`npm-pack-ws-fix`, which internaly uses `npm pack`, creates a `.tgz` file with
an extra folder, `package`, containing the package files. This script extracts
the `.tgz` file and recreates the `.zip` without the extra folder.

## :books: Examples

### :package: NPM

Without any additional packages, NPM provides a built-in mechanic to package
your code using [`npm pack`][examples_npm_npm-pack]. This will create a `.tgz`
file in the root of your project.

#### [`files`][examples_npm_files] : `string[]`

> The optional files field is an array of file patterns that describes the
> entries to be included when your package is installed as a dependency

#### [`bundleDependencies`][examples_npm_bundled-dependencies] : `string[] | boolean`

> This defines an array of package names that will be bundled when publishing
> the package.

[examples_npm_npm-pack]: https://docs.npmjs.com/cli/v9/commands/npm-pack
[examples_npm_files]:
  https://docs.npmjs.com/cli/v9/configuring-npm/package-json#files
[examples_npm_bundled-dependencies]:
  https://docs.npmjs.com/cli/v9/configuring-npm/package-json#bundledependencies

```json
// package.json
{
  "files": ["src"],
  "bundleDependencies": true
}
```

```yaml
# serverless.yml
plugins:
  - serverless-shell-packer

custom:
  shellPacker:
    script:
      - tgz_path=$(npx npm-pack-ws-fix | tail -n 1)
      - npx convert-to-aws-zip "$tgz_path" | tail -n 1
```

### :large_blue_diamond: Typescript

### :zap: SWC

## :computer: Development

```bash
git clone git@github.com:asd-xiv/serverless-universal-packer.git asd14.serverless-shell-packer
```

## :scroll: Changelog

See the [releases section][changelog_releases] for details.

[changelog_releases]:
  https://github.com/asd-xiv/serverless-universal-packer/releases
