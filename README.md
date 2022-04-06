# @algodex/hooks


[![story-book](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)](https://www.chromatic.com/builds?appId=60b0bd43c7a26d003be10f53)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/algodex/algodex-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/algodex/algodex-hooks/actions/workflows/ci.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/fa3b992cab952361e77a/maintainability)](https://codeclimate.com/repos/624385c9b3a0ab6c2f000f58/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/fa3b992cab952361e77a/test_coverage)](https://codeclimate.com/repos/624385c9b3a0ab6c2f000f58/test_coverage)

[//]: # ([![Sauce Test Status]&#40;https://app.saucelabs.com/browser-matrix/algodex.svg?auth=a575d8742c484fe2f6006e9bf6c1022c&#41;]&#40;https://app.saucelabs.com/u/algodex&#41;)

## ⚙ Getting Started

### Set up a Github token to make it easy to install the private algodex-sdk npm package.

https://github.com/settings/tokens

Make sure you add the "read:packages" permission.
Copy and save the secret.

In a Linux terminal (git-bash on Windows):

create an ~/.npmrc file with the following contents:
```
//npm.pkg.github.com/:_authToken=tokensecretgoeshere
@algodex:registry=https://npm.pkg.github.com/
```
or you can use npm login with your token
```shell
$ npm login --scope=@algodex --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN_SECRET
> Email: PUBLIC-EMAIL-ADDRESS
```

### Clone and install the necessary libraries

```shell
yarn
```

### Running Tests

Lint
```shell
yarn test-lint
```

Unit Test
```shell
yarn test-unit
```

Coverage
```shell
yarn coverage
```
