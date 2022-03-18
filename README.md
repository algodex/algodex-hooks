# @algodex/hooks

[![story-book](https://raw.githubusercontent.com/storybookjs/brand/master/badge/badge-storybook.svg)](https://www.chromatic.com/builds?appId=60b0bd43c7a26d003be10f53)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/algodex/algodex-hooks/actions/workflows/ci.yml/badge.svg)](https://github.com/algodex/algodex-hooks/actions/workflows/ci.yml)

[//]: # ([![Sauce Test Status]&#40;https://app.saucelabs.com/buildstatus/algodex?auth=a575d8742c484fe2f6006e9bf6c1022c&#41;]&#40;https://app.saucelabs.com/u/algodex&#41;)
[![unit-branches](./assets/badge-branches.svg)](./src)
[![unit-functions](./assets/badge-functions.svg)](./src)
[![unit-lines](./assets/badge-lines.svg)](./src)
[![unit-statements](./assets/badge-statements.svg)](./src)


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
```
$ npm login --scope=@algodex --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN_SECRET
> Email: PUBLIC-EMAIL-ADDRESS
```

### Clone and install the necessary libraries

```
yarn
```

### Run the development server:

```bash
yarn start
```

The browser will automatically open [http://localhost:8080](http://localhost:8080)
