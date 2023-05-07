<!-- markdownlint-disable first-line-h1 line-length no-inline-html -->

<h1 align="center">
  serverless-universal-packer
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
<br />

> Serverless plugin for custom packaging using bash scripts.

- 🛠️ **Flexibility**: Don't rely on the existence of specialized plugins
  interfacing bundler X. Easily pivot when a different, better builder comes
  out.
- 🔁 **Stay Updated**: Keep dependencies updated without waiting for plugin
  updates.
- 🟩 **Low complexity**: Specialized plugins mostly just proxy to the
  underlying bundler. You can do that yourself in a few lines of bash.

## Table of contents

<!-- vim-markdown-toc GFM -->

- [Install](#install)
- [Examples](#examples)
- [Development](#development)
- [Changelog](#changelog)

<!-- vim-markdown-toc -->

## Install

```bash
npm install --save-dev serverless-universal-packer
```

## Examples

## Development

```bash
git clone git@github.com:asd-xiv/serverless-universal-packer.git asd14.serverless-universal-packer
```

## Changelog

See the [releases section](https://github.com/asd-xiv/serverless-universal-packer/releases) for details.
