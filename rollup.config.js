/*
 * Algodex Hooks
 * Copyright (C) 2021-2022 Algodex VASP (BVI) Corp.
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import fs from 'fs';
import babel from '@rollup/plugin-babel';
import alias from '@rollup/plugin-alias';
// import json from '@rollup/plugin-json';
// import {terser} from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import path from 'path';
import resolve from '@rollup/plugin-node-resolve';
const pkg = JSON.parse(
    fs.readFileSync('./package.json', {encoding: 'utf-8'}),
);

const projectRootDir = path.resolve(__dirname);
const customResolver = resolve({
  extensions: ['.js', '.jsx'],
});

const getPlugins = function(helper) {
  return [
  // json(),
    alias({
      entries: [
        {
          find: '@/',
          replacement: path.resolve(projectRootDir, './src/'),
        },
      ],
      customResolver,
    }),
    babel(
        {
          babelHelpers: helper,
          exclude: /^(.+\/)?node_modules\/.+$/,
        },
    ),
    nodeResolve({browser: true}),
  // terser(),
  ];
};

/**
 * @param {string} id The ID to test
 * @return {boolean}
 */
function external(id) {
  return /@algodex/.test(id) || [
    'react',
    'react-dom',
    '@emotion/core',
    '@emotion/styled',
    '@emotion/react',
    'axios',
    'ajv',
    'ajv-formats',
    'react-query',
    'prop-types',
    'react-is',
    'lodash',
    'lodash/lang',
    'millify',
    'big.js',
    '@randlabs/myalgo-connect',
    '@walletconnect/client',
    'algorand-walletconnect-qrcode-modal',
    'algosdk',
  ].includes(id);
}

const input = 'src';
const banner = `/**
 * algodex/algodex-hooks ${pkg.version}
 *
 * Copyright (c)  Algodex VASP (BVI) Corp., 2022
 *
 * All Rights Reserved.
 *
 * @license BSL
 */`;


/**
 * Rollup Configuration
 * @return {*}
 */
export default function() {
  return [
    {
      input,
      external,
      plugins: [...getPlugins('runtime'), commonjs()],
      output: {
        banner,
        dir: './dist/cjs',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    },
    // {
    //   input,
    //   external,
    //   plugins: getPlugins('bundled'),
    //   output: {
    //     banner,
    //     dir: './dist/esm',
    //     // file: pkg.main,
    //     format: 'esm',
    //     sourcemap: true,
    //     // preserveModules: true,
    //     exports: 'named',
    //   },
    // },
  ];
}
